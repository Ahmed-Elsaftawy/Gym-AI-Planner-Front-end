import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";
import { useProfileStore } from "../../store/profileStore";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "https://gym-ai-planner-production-4841.up.railway.app/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || "Unexpected error";

    const silentError = error.config?.headers?.["X-Silent-Error"] === "true";

    if (status === 401) {
      useAuthStore.getState().logout();
      useProfileStore.getState().clearProfile();
      toast.error("Session expired. Please log in again.");
      window.location.assign("/login");
    } else if (!silentError) {
      toast.error(message);
    }

    return Promise.reject(error);
  },
);
