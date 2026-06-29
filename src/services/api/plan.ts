import { api } from "./http";
import type { ApiResponse, PlanRecord } from "../../types/api";

export async function getPlan() {
  try {
    const { data } = await api.get<ApiResponse<PlanRecord>>("/plan", {
      headers: { "X-Silent-Error": "true" },
    });
    return data.data;
  } catch {
    return null;
  }
}

export async function generatePlan() {
  const { data } = await api.post<ApiResponse<PlanRecord>>("/plan/generate");
  return data.data;
}
