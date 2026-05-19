import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
  state: () => ({
    isDark: false,

    tenantSearch: "",

    tenantStatus: null,
  }),

  getters: {
    themeClass: (state) =>
      state.isDark ? "app-dark" : "",
  },

  actions: {
    initializeTheme() {
      const saved = localStorage.getItem(
        "platform-admin-theme"
      );

      if (saved) {
        this.isDark = saved === "dark";
      } else {
        this.isDark =
          window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches;
      }

      // APPLY THEME TO DOM
      document.documentElement.classList.toggle(
        "app-dark",
        this.isDark
      );
    },

    toggleTheme() {
      this.isDark = !this.isDark;

      localStorage.setItem(
        "platform-admin-theme",
        this.isDark ? "dark" : "light"
      );

      // APPLY THEME TO DOM
      document.documentElement.classList.toggle(
        "app-dark",
        this.isDark
      );
    },

    setTenantSearch(val) {
      this.tenantSearch = val;
    },

    setTenantStatus(val) {
      this.tenantStatus = val;
    },
  },
});