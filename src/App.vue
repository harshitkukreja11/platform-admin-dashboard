<template>
  <div :class="[ui.themeClass, 'app-shell']">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useUiStore } from "./stores/ui";

const ui = useUiStore();

onMounted(() => {
  ui.initializeTheme();
});
</script>