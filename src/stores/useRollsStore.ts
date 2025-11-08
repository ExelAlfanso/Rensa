import { create } from "zustand";
import api from "@/lib/axios";
import { useAuthStore } from "./useAuthStore";

interface Roll {
  _id: string;
  name: string;
  imageUrl: string;
}

interface RollsState {
  rolls: Roll[];
  isLoading: boolean;
  fetchRolls: () => Promise<void>;
  clearRolls: () => void;
  createRoll: (newRoll: { name: string; imageUrl?: string }) => Promise<void>;
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
      const res = await api.get(`/rolls?userId=${user.id}`);
      console.log("Fetched rolls:", res.data);
      set({ rolls: res.data.data || [] });
    } catch (err) {
      console.error("Error fetching rolls:", err);
    } finally {
      set({ isLoading: false });
    }
  },
  createRoll: async (newRoll: { name: string; imageUrl?: string }) => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error("User not authenticated");
    set({ isLoading: true });
    try {
      const res = await api.post("/rolls/newRoll", {
        ...newRoll,
        userId: user.id,
      });
      set((state) => ({
        rolls: [...state.rolls, res.data.data],
      }));
    } catch (err) {
      console.error("Error creating roll:", err);
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  clearRolls: () => set({ rolls: [] }),
}));
