<template>
  <DefaultLayout>
    <section class="page-section">
      <RouterLink to="/" class="back-link">
        <i class="pi pi-arrow-left"></i>
        Back to Tenants
      </RouterLink>

      <div v-if="loading" class="loading-box">
        <i class="pi pi-spin pi-spinner"></i>
        <span>Loading tenant details...</span>
      </div>

      <div v-else-if="!tenant" class="error-box">
        Tenant not found.
      </div>

      <div v-else class="details-card">
        <div class="details-header">
          <div>
            <h2 class="page-heading mb-2">{{ tenant.name }}</h2>
            <p class="page-text mb-0">Tenant information and platform summary</p>
          </div>

          <span class="tenant-status details-status" :class="statusClass">
            {{ tenant.status }}
          </span>
        </div>

        <div class="grid mt-4">
          <div class="col-12 md:col-4">
            <div class="detail-box">
              <div class="detail-label">Tenant Name</div>
              <div class="detail-value">{{ tenant.name }}</div>
            </div>
          </div>

          <div class="col-12 md:col-4">
            <div class="detail-box">
              <div class="detail-label">Users</div>
              <div class="detail-value">{{ tenant.users }}</div>
            </div>
          </div>

          <div class="col-12 md:col-4">
            <div class="detail-box">
              <div class="detail-label">Stores</div>
              <div class="detail-value">{{ tenant.stores }}</div>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-box">
              <div class="detail-label">Location</div>
              <div class="detail-value">{{ tenant.location }}</div>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-box">
              <div class="detail-label">Status</div>
              <div class="detail-value">{{ tenant.status }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, RouterLink } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import { getTenantById } from "../api/mockTenantApi";

const route = useRoute();
const tenant = ref(null);
const loading = ref(false);

const fetchTenant = async () => {
  loading.value = true;
  try {
    tenant.value = await getTenantById(route.params.id);
  } catch (error) {
    console.error(error);
    tenant.value = null;
  } finally {
    loading.value = false;
  }
};

const statusClass = computed(() => {
  if (!tenant.value) return "";
  if (tenant.value.status === "Active") return "status-active";
  if (tenant.value.status === "Inactive") return "status-inactive";
  return "status-pending";
});

onMounted(() => {
  fetchTenant();
});
</script>