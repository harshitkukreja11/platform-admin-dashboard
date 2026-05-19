<template>
  <header class="app-header">
    <div>
      <h1 class="app-title">
        Platform Admin Dashboard
      </h1>

      <p class="app-subtitle">
        Tenant & Platform Management
      </p>
    </div>

    <div class="header-actions">
      <!-- USER -->
      <div
        v-if="authStore.user"
        class="header-user"
      >
        <div class="user-avatar">
          {{
            authStore.user?.full_name
              ?.charAt(0)
              ?.toUpperCase() || "A"
          }}
        </div>

        <div class="user-info">
          <div class="user-name">
            {{
              authStore.user?.full_name ||
              "Admin User"
            }}
          </div>

          <div class="user-role">
            {{
              authStore.user?.role ||
              "Administrator"
            }}
          </div>
        </div>
      </div>

      <!-- THEME BUTTON -->
      <button
        class="theme-toggle-btn"
        @click="uiStore.toggleTheme"
      >
        <i
          :class="
            uiStore.isDark
              ? 'pi pi-sun'
              : 'pi pi-moon'
          "
        ></i>

        {{
          uiStore.isDark
            ? "Light"
            : "Dark"
        }}
      </button>
    </div>
  </header>
</template>

<script setup>
import { onMounted } from "vue";

import { useAuthStore } from "../stores/auth";
import { useUiStore } from "../stores/ui";

const authStore = useAuthStore();
const uiStore = useUiStore();

onMounted(() => {
  uiStore.initializeTheme();
});
</script>