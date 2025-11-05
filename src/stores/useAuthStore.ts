// src/stores/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Session } from "next-auth";
import { useRollsStore } from "./useRollsStore";

interface AuthState {
  user: Session["user"] | null;
  accessToken?: string;
  isLoading: boolean;
  setUser: (user: Session["user"] | null) => void;
  setAccessToken: (token?: string) => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: undefined,
      isLoading: true,
      setUser: (user) => set({ user }),
      setAccessToken: (token) => set({ accessToken: token }),
      setLoading: (isLoading) => set({ isLoading }),
      clearAuth: () =>
        set({ user: null, accessToken: undefined, isLoading: false }),
      logout: () => {
        set({ user: null });
        useRollsStore.getState().clearRolls();
      },
    }),
    {
      name: "auth-store", // stored in sessionStorage
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) =>
          sessionStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
);
