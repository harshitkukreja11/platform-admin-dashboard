<template>
  <aside class="sidebar">
    <div class="sidebar-brand">
      <i class="pi pi-building"></i>
      <span>Admin Panel</span>
    </div>

    <nav class="sidebar-nav">
      <RouterLink to="/" class="sidebar-link" active-class="active-link">
        <i class="pi pi-th-large"></i>
        <span>Tenants</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>