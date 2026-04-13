<template>
  <div class="layout-wrapper">
    <SidebarMenu />

    <div class="layout-main">
      <AppHeader />
      <main class="layout-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import AppHeader from "../components/AppHeader.vue";
import SidebarMenu from "../components/SidebarMenu.vue";
</script>