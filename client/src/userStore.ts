import { create } from "zustand";
import api from "./api/axiosInstance";

interface User {
  id: string;
  username: string;
  role: string;
}

interface UserStore {
  user: User | null | undefined;
  fetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,

  fetchUser: async () => {
    try {
      const res = await api.get("/auth/me");
      set({ user: res.data.data });
    } catch {
      set({ user: null });
    }
  },

  setUser: (user) => set({ user }),
}));
