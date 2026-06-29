import type { PlanJson, PlanRecord } from "../types/api";

export function parsePlan(record?: PlanRecord | null): PlanJson | null {
  if (!record?.plan_json) return null;
  if (typeof record.plan_json === "object") return record.plan_json;

  try {
    return JSON.parse(record.plan_json) as PlanJson;
  } catch {
    return { overview: { notes: record.plan_json } };
  }
}
