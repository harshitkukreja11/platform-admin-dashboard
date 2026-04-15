<template>
  <DefaultLayout>
    <section class="page-section">
      <div v-if="isLoading" class="loading-box">
        <i class="pi pi-spin pi-spinner"></i>
        <span>Loading tenants...</span>
      </div>

      <div v-else-if="isError" class="error-box">
        Failed to load tenants.
      </div>

      <template v-else>
        <div class="grid mb-4">
          <StatCard
            label="Total Tenants"
            :value="tenants.length"
            icon="pi pi-building"
          />
          <StatCard
            label="Total Users"
            :value="totalUsers"
            icon="pi pi-users"
          />
          <StatCard
            label="Total Stores"
            :value="totalStores"
            icon="pi pi-shopping-bag"
          />
        </div>

        <AnalyticsCharts :tenants="tenants" />
        <TenantTable :tenants="tenants" />
      </template>
    </section>
  </DefaultLayout>
</template>

<script setup>
import { computed } from "vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import StatCard from "../components/StatCard.vue";
import AnalyticsCharts from "../components/AnalyticsCharts.vue";
import TenantTable from "../components/TenantTable.vue";
import { useTenantsQuery } from "../composables/useTenantsQuery";

const { tenants, isLoading, isError } = useTenantsQuery();

const totalUsers = computed(() =>
  tenants.value.reduce((sum, t) => sum + t.users, 0)
);

const totalStores = computed(() =>
  tenants.value.reduce((sum, t) => sum + t.stores, 0)
);
</script>