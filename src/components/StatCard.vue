<template>
  <div class="col-12 md:col-6 xl:col-4">
    <div class="stat-card">
      <div class="stat-icon">
        <i :class="icon"></i>
      </div>
      <div>
        <div class="stat-label">{{ label }}</div>
        <div class="stat-value">{{ value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: [String, Number],
  icon: String,
});
</script>