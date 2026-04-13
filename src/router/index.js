import { createRouter, createWebHistory } from "vue-router";
import TenantListPage from "../pages/TenantListPage.vue";
import TenantDetailsPage from "../pages/TenantDetailsPage.vue";

const routes = [
  {
    path: "/",
    name: "tenant-list",
    component: TenantListPage,
  },
  {
    path: "/tenant/:id",
    name: "tenant-details",
    component: TenantDetailsPage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;