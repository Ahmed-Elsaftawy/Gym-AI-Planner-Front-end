import { api } from "./http";
import type { ApiResponse, Profile, ProfilePayload } from "../../types/api";

export async function createProfile(payload: ProfilePayload) {
  const { data } = await api.post<ApiResponse<Profile>>("/profile", payload);
  return data.data;
}

export async function getProfile() {
  try {
    const { data } = await api.post<ApiResponse<Profile | null>>(
      "/profile/show",
      {},
      { headers: { "X-Silent-Error": "true" } },
    );

    return data.data;
  } catch {
    return null;
  }
}
