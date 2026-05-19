import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "../pages/LoginPage.vue";
import VerifyOtpPage from "../pages/VerifyOtpPage.vue";
import TenantListPage from "../pages/TenantListPage.vue";
import TenantDetailsPage from "../pages/TenantDetailsPage.vue";

import { useAuthStore } from "../stores/auth";

const routes = [
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/verify-otp",
    component: VerifyOtpPage,
  },
  {
    path: "/",
    component: TenantListPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/tenant/:id",
    component: TenantDetailsPage,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return "/login";
  }
});

export default router;