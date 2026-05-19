<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <h1>Platform Admin Login</h1>
        <p>Sign in to continue to dashboard</p>
      </div>

      <form @submit.prevent="submitLogin" class="auth-form">
        <!-- EMAIL -->
        <div class="form-group">
          <label>Email</label>

          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="auth-input"
          />
        </div>

        <!-- PASSWORD -->
        <div class="form-group">
          <label>Password</label>

          <div class="password-wrapper">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              class="auth-input"
            />

            <i
              :class="
                showPassword
                  ? 'pi pi-eye-slash'
                  : 'pi pi-eye'
              "
              class="password-icon"
              @click="showPassword = !showPassword"
            ></i>
          </div>
        </div>

        <!-- BUTTON -->
        <button
          type="submit"
          class="auth-btn"
          :disabled="isPending"
        >
          <i
            v-if="isPending"
            class="pi pi-spin pi-spinner"
          ></i>

          {{ isPending ? "Logging in..." : "Login" }}
        </button>

        <!-- ERROR -->
        <div
          v-if="errorMessage"
          class="auth-error"
        >
          <i class="pi pi-exclamation-circle"></i>

          <span>{{ errorMessage }}</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useLoginMutation } from "../composables/useLoginMutation";

const email = ref("");
const password = ref("");

const showPassword = ref(false);

const errorMessage = ref("");

const { mutate, isPending } = useLoginMutation();

const submitLogin = () => {
  errorMessage.value = "";

  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  // Required validation
  if (!emailValue || !passwordValue) {
    errorMessage.value =
      "Email and password are required";

    return;
  }

  // Email validation
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailValue)) {
    errorMessage.value =
      "Please enter a valid email address";

    return;
  }

  mutate(
    {
      email: emailValue,
      password: passwordValue,
    },
    {
      onError: (error) => {
        console.log("LOGIN ERROR", error);

        errorMessage.value =
          error?.response?.data?.detail ||
          error?.response?.data?.message ||
          error?.message ||
          "Login failed";
      },
    }
  );
};
</script>