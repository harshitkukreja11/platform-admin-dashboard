import { useMutation } from "@tanstack/vue-query";
import { loginApi } from "../api/authApi";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

export function useLoginMutation() {
  const authStore = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: loginApi,

    onSuccess: (data) => {
      console.log("LOGIN SUCCESS", data);

      // STORE PENDING TOKEN
      authStore.setPendingToken(
        data?.pending_token || ""
      );

      // NAVIGATE TO OTP PAGE
      router.push("/verify-otp");
    },

    onError: (error) => {
      console.log("LOGIN ERROR", error);
    },
  });
}