<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1>Verify OTP</h1>

      <form @submit.prevent="submitOtp">
        <input
          v-model="otp"
          type="text"
          maxlength="6"
          placeholder="Enter 6-digit OTP"
        />

        <button type="submit" :disabled="isPending">
          {{ isPending ? "Verifying..." : "Verify OTP" }}
        </button>

        <p v-if="errorMessage" class="error-text">
          {{ errorMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useVerifyOtpMutation } from "../composables/useVerifyOtpMutation";

const authStore = useAuthStore();

const otp = ref("");
const errorMessage = ref("");

const { mutate, isPending } = useVerifyOtpMutation();

const submitOtp = () => {
  errorMessage.value = "";

  if (!/^\d{6}$/.test(otp.value)) {
    errorMessage.value = "OTP must be 6 digits";
    return;
  }

  mutate(
    {
      otp: otp.value,
      pendingToken: authStore.pendingToken,
    },
    {
      onError: (error) => {
        errorMessage.value =
          error?.response?.data?.detail ||
          "OTP verification failed";
      },
    }
  );
};
</script>