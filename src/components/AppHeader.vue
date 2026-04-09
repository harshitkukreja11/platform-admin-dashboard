<template>
  <header
    class="header flex align-items-center justify-content-between px-4 py-3 shadow-2"
  >
    <div class="flex align-items-center gap-2">
      <i class="pi pi-building text-xl"></i>
      <h1 class="m-0 text-xl md:text-2xl font-semibold">Platform Admin</h1>
    </div>

    <ThemeToggle />
  </header>
</template>

<script setup>
import ThemeToggle from "./ThemeToggle.vue";
</script>