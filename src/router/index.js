import { createRouter, createWebHistory } from "vue-router";
import TenantListPage from "../pages/TenantListPage.vue";

const routes = [
  {
    path: "/",
    name: "tenants",
    component: TenantListPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;