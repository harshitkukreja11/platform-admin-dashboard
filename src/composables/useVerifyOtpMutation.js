import { useMutation } from "@tanstack/vue-query";
import { verifyOtpApi } from "../api/authApi";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

export function useVerifyOtpMutation() {
  const authStore = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: verifyOtpApi,

    onSuccess: (data) => {
      console.log("OTP VERIFY SUCCESS", data);

      authStore.setTokens(
        data.access_token,
        data.refresh_token,

        // USER OBJECT
        {
          name:
            data.user?.name ||
            data.user_name ||
            "Admin",

          role:
            data.user?.role ||
            data.role ||
            "Administrator",

          email:
            data.user?.email || "",
        }
      );

      router.push("/");
    },

    onError: (error) => {
      console.log(
        "OTP VERIFY ERROR",
        error
      );
    },
  });
}