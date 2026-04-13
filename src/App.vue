<template>
  <div :class="[{ 'app-dark': isDark }, 'app-shell']">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted, provide, ref, watch } from "vue";

const isDark = ref(false);

const setTheme = (value) => {
  isDark.value = value;
  localStorage.setItem("platform-admin-theme", value ? "dark" : "light");
};

const toggleTheme = () => {
  setTheme(!isDark.value);
};

provide("theme", {
  isDark,
  toggleTheme,
  setTheme,
});

onMounted(() => {
  const savedTheme = localStorage.getItem("platform-admin-theme");
  if (savedTheme) {
    isDark.value = savedTheme === "dark";
  } else {
    isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
});

watch(isDark, (value) => {
  document.documentElement.style.colorScheme = value ? "dark" : "light";
});
</script>