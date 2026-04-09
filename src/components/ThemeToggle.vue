<template>
  <button class="theme-toggle-btn" @click="theme.toggleTheme">
    <i :class="theme.isDark.value ? 'pi pi-sun' : 'pi pi-moon'"></i>
    <span>{{ theme.isDark.value ? "Light Mode" : "Dark Mode" }}</span>
  </button>
</template>

<script setup>
import { inject } from "vue";

const theme = inject("theme");
</script>