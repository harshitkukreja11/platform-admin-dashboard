<template>
  <DefaultLayout>
    <section class="page-section">
      <div v-if="isLoading" class="loading-box">
        <i class="pi pi-spin pi-spinner"></i>
        <span>Loading tenant details...</span>
      </div>

      <div v-else-if="!tenant" class="error-box">
        Tenant not found.
      </div>

      <div v-else class="details-card">
        <h2 class="page-heading">{{ tenant.name }}</h2>
        <p class="page-text">Tenant information and platform summary</p>

        <div class="grid mt-4">
          <div class="col-12 md:col-6">
            <div class="detail-box">
              <div class="detail-label">Users</div>
              <div class="detail-value">{{ tenant.users }}</div>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-box">
              <div class="detail-label">Stores</div>
              <div class="detail-value">{{ tenant.stores }}</div>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-box">
              <div class="detail-label">Status</div>
              <div class="detail-value">{{ tenant.status }}</div>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="detail-box">
              <div class="detail-label">Location</div>
              <div class="detail-value">{{ tenant.location }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "../layouts/DefaultLayout.vue";
import { useRoute } from "vue-router";
import { useTenantQuery } from "../composables/useTenantQuery";

const route = useRoute();
const { tenant, isLoading } = useTenantQuery(route.params.id);
</script>