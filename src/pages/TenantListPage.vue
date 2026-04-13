<template>
  <DefaultLayout>
    <section class="page-section">
      <div class="grid mb-4">
        <StatCard label="Total Tenants" :value="tenants.length" icon="pi pi-building" />
        <StatCard label="Total Users" :value="totalUsers" icon="pi pi-users" />
        <StatCard label="Total Stores" :value="totalStores" icon="pi pi-shopping-bag" />
      </div>

      <AnalyticsCharts :tenants="tenants" />

      <TenantTable :tenants="tenants" />
    </section>
  </DefaultLayout>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import StatCard from "../components/StatCard.vue";
import AnalyticsCharts from "../components/AnalyticsCharts.vue";
import TenantTable from "../components/TenantTable.vue";
import { getTenants } from "../api/mockTenantApi";

const tenants = ref([]);

const fetchTenants = async () => {
  try {
    tenants.value = await getTenants();
  } catch (error) {
    console.error(error);
  }
};

const totalUsers = computed(() =>
  tenants.value.reduce((sum, t) => sum + t.users, 0)
);

const totalStores = computed(() =>
  tenants.value.reduce((sum, t) => sum + t.stores, 0)
);

onMounted(fetchTenants);
</script>