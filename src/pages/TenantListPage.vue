<template>
  <DefaultLayout>
    <section class="page-section">
      <div
        class="flex flex-column md:flex-row md:align-items-center md:justify-content-between gap-3 mb-4"
      >
        <div>
          <h2 class="m-0 text-2xl font-semibold">Tenant List</h2>
          <p class="mt-2 mb-0 page-subtitle">
            Manage tenants, users, and stores from one place.
          </p>
        </div>

        <div class="summary-badge">
          Total Tenants: <strong>{{ tenants.length }}</strong>
        </div>
      </div>

      <div v-if="loading" class="text-center py-6">
        <i class="pi pi-spin pi-spinner text-3xl mb-3"></i>
        <p class="m-0">Loading tenants...</p>
      </div>

      <div v-else-if="error" class="error-box">
        <i class="pi pi-exclamation-triangle mr-2"></i>
        {{ error }}
      </div>

      <div v-else class="grid">
        <TenantCard
          v-for="tenant in tenants"
          :key="tenant.id"
          :tenant="tenant"
        />
      </div>
    </section>
  </DefaultLayout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import TenantCard from "../components/TenantCard.vue";
import { getTenants } from "../api/mockTenantApi";

const tenants = ref([]);
const loading = ref(false);
const error = ref("");

const fetchTenants = async () => {
  loading.value = true;
  error.value = "";

  try {
    const data = await getTenants();
    tenants.value = data;
  } catch (err) {
    error.value = "Failed to load tenant data.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTenants();
});
</script>