import { api } from "./http";
import type { ApiResponse, LoginPayload, RegisterPayload, User } from "../../types/api";

export async function registerUser(payload: RegisterPayload) {
  const { data } = await api.post<ApiResponse<User>>("/user/register", payload);
  return data.data;
}

export async function loginUser(payload: LoginPayload) {
  const { data } = await api.post<ApiResponse<string>>("/user/login", payload);
  return data.data;
}
