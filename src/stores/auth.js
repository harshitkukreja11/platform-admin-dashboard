import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    pendingToken: "",

    accessToken:
      localStorage.getItem("bt_access_token") || "",

    refreshToken:
      localStorage.getItem("bt_refresh_token") || "",

    // ADD USER STATE
    user: JSON.parse(
      localStorage.getItem("bt_user")
    ) || null,
  }),

  getters: {
    isAuthenticated: (state) =>
      !!state.accessToken,
  },

  actions: {
    setPendingToken(token) {
      this.pendingToken = token;
    },

    // UPDATED
    setTokens(access, refresh, user = null) {
      this.accessToken = access;
      this.refreshToken = refresh;

      localStorage.setItem(
        "bt_access_token",
        access
      );

      localStorage.setItem(
        "bt_refresh_token",
        refresh
      );

      // STORE USER
      if (user) {
        this.user = user;

        localStorage.setItem(
          "bt_user",
          JSON.stringify(user)
        );
      }
    },

    // OPTIONAL HELPER
    setUser(user) {
      this.user = user;

      localStorage.setItem(
        "bt_user",
        JSON.stringify(user)
      );
    },

    logout() {
      this.pendingToken = "";
      this.accessToken = "";
      this.refreshToken = "";
      this.user = null;

      localStorage.removeItem(
        "bt_access_token"
      );

      localStorage.removeItem(
        "bt_refresh_token"
      );

      localStorage.removeItem("bt_user");
    },
  },
});