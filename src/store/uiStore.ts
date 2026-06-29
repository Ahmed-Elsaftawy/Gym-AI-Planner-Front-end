import { create } from "zustand";
import { persist } from "zustand/middleware";

type Language = "en" | "ar";
type Theme = "light" | "dark";

type UiState = {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  toggleTheme: () => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      language: "en",
      theme: "dark",
      setLanguage: (language) => set({ language }),
      toggleLanguage: () => set({ language: get().language === "en" ? "ar" : "en" }),
      toggleTheme: () => set({ theme: get().theme === "dark" ? "light" : "dark" }),
    }),
    { name: "gym-ai-ui" },
  ),
);
