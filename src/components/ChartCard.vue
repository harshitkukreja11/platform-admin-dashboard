<template>
  <div class="col-12 lg:col-6">
    <div class="chart-card">
      <div class="chart-card-header">
        <h3 class="chart-title">{{ title }}</h3>
      </div>
      <canvas :ref="setCanvasRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
});

const canvasEl = ref(null);
let chartInstance = null;

const setCanvasRef = (el) => {
  canvasEl.value = el;
};

const renderChart = () => {
  if (!canvasEl.value) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(canvasEl.value, {
    type: props.type,
    data: props.data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      ...props.options,
    },
  });
};

onMounted(() => {
  renderChart();
});

watch(
  () => [props.data, props.options, props.type],
  () => {
    renderChart();
  },
  { deep: true }
);

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>