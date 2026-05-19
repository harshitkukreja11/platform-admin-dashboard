import http from "./http";

export const loginApi = async (payload) => {
  const response = await http.post(
    "/api/v1/auth/login",
    {
      email: payload.email,
      password: payload.password,
      platform_only: true,
      is_owner_portal: false,
    }
  );

  return response.data;
};

export const verifyOtpApi = async (payload) => {
  const response = await http.post(
    "/api/v1/auth/verify-login-otp",
    {
      otp: payload.otp,
      pending_token: payload.pendingToken,
    }
  );

  return response.data;
};