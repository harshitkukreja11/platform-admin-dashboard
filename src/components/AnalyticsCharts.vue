<template>
  <section class="mb-4">
    <div class="flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
      <div>
        <h2 class="page-heading">Analytics</h2>
        <p class="page-text m-0">Visual overview of tenants, users, and stores</p>
      </div>
    </div>

    <div class="grid">
      <ChartCard
        title="Users by Tenant"
        type="bar"
        :data="usersByTenantData"
        :options="barOptions"
      />

      <ChartCard
        title="Stores by Tenant"
        type="line"
        :data="storesByTenantData"
        :options="lineOptions"
      />

      <ChartCard
        title="Tenant Status Distribution"
        type="doughnut"
        :data="statusDistributionData"
        :options="doughnutOptions"
      />

      <ChartCard
        title="Users vs Stores"
        type="radar"
        :data="usersVsStoresData"
        :options="radarOptions"
      />
    </div>
  </section>
</template>

<script setup>
import { computed, inject } from "vue";
import ChartCard from "./ChartCard.vue";

const props = defineProps({
  tenants: {
    type: Array,
    default: () => [],
  },
});

const theme = inject("theme", null);

const isDarkMode = computed(() => theme?.isDark?.value ?? false);
const textColor = computed(() => (isDarkMode.value ? "#f8fafc" : "#1f2937"));
const mutedColor = computed(() => (isDarkMode.value ? "#94a3b8" : "#6b7280"));
const borderColor = computed(() => (isDarkMode.value ? "#334155" : "#e5e7eb"));

const labels = computed(() => props.tenants.map((tenant) => tenant.name));
const usersData = computed(() => props.tenants.map((tenant) => tenant.users));
const storesData = computed(() => props.tenants.map((tenant) => tenant.stores));

const statusCounts = computed(() => {
  const result = {
    Active: 0,
    Inactive: 0,
    Pending: 0,
  };

  props.tenants.forEach((tenant) => {
    if (result[tenant.status] !== undefined) {
      result[tenant.status] += 1;
    }
  });

  return result;
});

const commonScales = computed(() => ({
  x: {
    ticks: { color: textColor.value },
    grid: { color: borderColor.value },
  },
  y: {
    beginAtZero: true,
    ticks: { color: textColor.value },
    grid: { color: borderColor.value },
  },
}));

const commonPlugins = computed(() => ({
  legend: {
    labels: {
      color: textColor.value,
    },
  },
}));

const usersByTenantData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: "Users",
      data: usersData.value,
      backgroundColor: [
        "#3b82f6",
        "#60a5fa",
        "#2563eb",
        "#93c5fd",
        "#1d4ed8",
      ],
      borderRadius: 8,
    },
  ],
}));

const storesByTenantData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: "Stores",
      data: storesData.value,
      borderColor: "#10b981",
      backgroundColor: "rgba(16, 185, 129, 0.2)",
      fill: true,
      tension: 0.35,
    },
  ],
}));

const statusDistributionData = computed(() => ({
  labels: ["Active", "Inactive", "Pending"],
  datasets: [
    {
      data: [
        statusCounts.value.Active,
        statusCounts.value.Inactive,
        statusCounts.value.Pending,
      ],
      backgroundColor: ["#22c55e", "#ef4444", "#f59e0b"],
      borderWidth: 0,
    },
  ],
}));

const usersVsStoresData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: "Users",
      data: usersData.value,
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.2)",
    },
    {
      label: "Stores",
      data: storesData.value,
      borderColor: "#8b5cf6",
      backgroundColor: "rgba(139, 92, 246, 0.2)",
    },
  ],
}));

const barOptions = computed(() => ({
  plugins: commonPlugins.value,
  scales: commonScales.value,
}));

const lineOptions = computed(() => ({
  plugins: commonPlugins.value,
  scales: commonScales.value,
}));

const doughnutOptions = computed(() => ({
  plugins: commonPlugins.value,
}));

const radarOptions = computed(() => ({
  plugins: commonPlugins.value,
  scales: {
    r: {
      angleLines: { color: borderColor.value },
      grid: { color: borderColor.value },
      pointLabels: { color: textColor.value },
      ticks: {
        color: mutedColor.value,
        backdropColor: "transparent",
      },
    },
  },
}));
</script>