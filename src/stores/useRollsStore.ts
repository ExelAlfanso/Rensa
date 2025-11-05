import { create } from "zustand";
import api from "@/lib/axios";
import { useAuthStore } from "./useAuthStore";

interface Roll {
  _id: string;
  name: string;
}

interface RollsState {
  rolls: Roll[];
  isLoading: boolean;
  fetchRolls: () => Promise<void>;
  clearRolls: () => void;
}

export const useRollsStore = create<RollsState>((set, get) => ({
  rolls: [],
  isLoading: false,

  fetchRolls: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    // Avoid refetching if already fetched
    if (get().rolls.length > 0) return;

    set({ isLoading: true });
    try {
      const res = await api.get(`/users/${user.id}`);
      set({ rolls: res.data.rolls || [] });
    } catch (err) {
      console.error("Error fetching rolls:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  clearRolls: () => set({ rolls: [] }),
}));
