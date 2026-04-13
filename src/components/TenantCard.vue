<template>
  <div class="col-12 md:col-6 xl:col-4">
    <PCard class="tenant-card">
      <template #title>
        <div class="flex align-items-center justify-content-between gap-2">
          <span>{{ tenant.name }}</span>
          <span class="tenant-status" :class="statusClass">
            {{ tenant.status }}
          </span>
        </div>
      </template>

      <template #content>
        <div class="tenant-meta">
          <div class="tenant-box">
            <div class="tenant-box-label">Users</div>
            <div class="tenant-box-value">{{ tenant.users }}</div>
          </div>

          <div class="tenant-box">
            <div class="tenant-box-label">Stores</div>
            <div class="tenant-box-value">{{ tenant.stores }}</div>
          </div>
        </div>

        <div class="tenant-location">
          <i class="pi pi-map-marker"></i>
          <span>{{ tenant.location }}</span>
        </div>

        <RouterLink :to="`/tenant/${tenant.id}`" class="details-btn">
          View Details
        </RouterLink>
      </template>
    </PCard>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  tenant: {
    type: Object,
    required: true,
  },
});

const statusClass = computed(() => {
  if (props.tenant.status === "Active") return "status-active";
  if (props.tenant.status === "Inactive") return "status-inactive";
  return "status-pending";
});
</script>