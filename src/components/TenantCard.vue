<template>
  <div class="col-12 sm:col-6 xl:col-4">
    <div class="tenant-card-wrapper h-full">
      <Card class="tenant-card h-full">
        <template #title>
          <div class="flex align-items-center gap-2">
            <i class="pi pi-briefcase text-primary"></i>
            <span>{{ tenant.name }}</span>
          </div>
        </template>

        <template #content>
          <div class="grid">
            <div class="col-6">
              <div class="info-box">
                <div class="info-label">Users</div>
                <div class="info-value">{{ tenant.users }}</div>
              </div>
            </div>

            <div class="col-6">
              <div class="info-box">
                <div class="info-label">Stores</div>
                <div class="info-value">{{ tenant.stores }}</div>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import Card from "primevue/card";

defineProps({
  tenant: {
    type: Object,
    required: true,
  },
});
</script>