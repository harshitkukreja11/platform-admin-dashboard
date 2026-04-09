<template>
  <div class="layout-wrapper min-h-screen">
    <AppHeader />
    <main class="layout-content p-3 md:p-4 lg:p-5">
      <slot />
    </main>
  </div>
</template>

<script setup>
import AppHeader from "../components/AppHeader.vue";
</script>