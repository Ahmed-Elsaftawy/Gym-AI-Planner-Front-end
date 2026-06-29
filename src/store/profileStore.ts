import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Profile } from "../types/api";

type ProfileState = {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
  clearProfile: () => void;
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: "gym-ai-profile",
      partialize: (state) => ({ profile: state.profile }),
    },
  ),
);
