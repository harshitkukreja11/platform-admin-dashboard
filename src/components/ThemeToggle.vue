<template>
  <button class="theme-toggle-btn" @click="ui.toggleTheme()">
    <i :class="ui.isDark ? 'pi pi-sun' : 'pi pi-moon'"></i>
  </button>
</template>

<script setup>
import { useUiStore } from "../stores/ui";

const ui = useUiStore();
</script>