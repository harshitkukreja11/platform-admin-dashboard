<template>
  <div class="table-section">
    <div class="table-toolbar">
      <div>
        <h2 class="page-heading">Tenant Management</h2>
        <p class="page-text">Analytics and tenant records in one view</p>
      </div>

      <div class="table-actions">
        <span class="search-box">
          <i class="pi pi-search"></i>
          <input
            v-model="localSearch"
            type="text"
            placeholder="Search tenants..."
            class="table-search-input"
          />
        </span>

        <PDropdown
          v-model="localStatus"
          :options="statusOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Filter by status"
          class="status-dropdown"
          showClear
        />
      </div>
    </div>

    <PDataTable
      :value="filteredData"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20]"
      responsiveLayout="scroll"
      stripedRows
      class="tenant-datatable"
    >
      <PColumn field="name" header="Tenant Name" sortable />
      <PColumn field="users" header="Users" sortable />
      <PColumn field="stores" header="Stores" sortable />
      <PColumn field="location" header="Location" sortable />

      <PColumn header="Status" field="status" sortable>
        <template #body="slotProps">
          <PTag
            :value="slotProps.data.status"
            :severity="getStatusSeverity(slotProps.data.status)"
          />
        </template>
      </PColumn>

      <PColumn header="Actions">
        <template #body="slotProps">
          <RouterLink
            :to="`/tenant/${slotProps.data.id}`"
            class="details-btn"
          >
            View Details
          </RouterLink>
        </template>
      </PColumn>
    </PDataTable>

    <div v-if="filteredData.length === 0" class="empty-box mt-3">
      No tenants found.
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  tenants: {
    type: Array,
    default: () => [],
  },
});

const localSearch = ref("");
const localStatus = ref(null);

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
  { label: "Pending", value: "Pending" },
];

const filteredData = computed(() => {
  return props.tenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(localSearch.value.toLowerCase()) ||
      tenant.location.toLowerCase().includes(localSearch.value.toLowerCase());

    const matchesStatus =
      !localStatus.value || tenant.status === localStatus.value;

    return matchesSearch && matchesStatus;
  });
});

const getStatusSeverity = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "danger";
    case "Pending":
      return "warning";
    default:
      return "info";
  }
};
</script>