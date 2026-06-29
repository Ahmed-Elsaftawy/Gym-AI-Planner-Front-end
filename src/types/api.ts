export type ApiStatus = "Success" | "Sucess" | "Failed" | "Error";

export type ApiResponse<T> = {
  status: ApiStatus;
  message?: string;
  data: T;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
};

export type ProfilePayload = {
  goal: "bulk" | "cut" | "recomp" | "strength" | "endurance";
  experience: "begginer" | "intermediate" | "advanced";
  daysPerWeek: number;
  sessionLength: number;
  equipment: "full_gym" | "home" | "dumbelss";
  preferredSplit: "full_body" | "upper_lower" | "ppl" | "custom";
  injuries?: string;
};

export type Profile = ProfilePayload & {
  id: number;
  user_id: string;
  daysperweek?: number;
  sessionlength?: number;
  preferredsplit?: ProfilePayload["preferredSplit"];
};

export type WorkoutExercise = {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  rpe: number;
  notes?: string;
  alternatives?: string[];
};

export type WorkoutDay = {
  day: string;
  focus: string;
  exercises: WorkoutExercise[];
};

export type PlanJson = {
  overview?: {
    goal?: string;
    frequency?: string;
    split?: string;
    notes?: string;
  };
  weeklySchedule?: WorkoutDay[];
  progression?: string;
};

export type PlanRecord = {
  id?: number;
  user_id?: string;
  plan_json: string | PlanJson;
  created_at?: string;
};
