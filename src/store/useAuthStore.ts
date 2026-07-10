import { create } from "zustand";
import { authApi } from "@/api/api";
import type { User } from "@/types/user";

interface AuthState {
  user: User | null;

  login: (token: string) => Promise<void>;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  login: async (token: string) => {
    localStorage.setItem("token", token);

    try {
      const response = await authApi.me();

      set({
        user: response.data,
      });
    } catch (error) {
      console.error("Failed to fetch user", error);

      set({
        user: null,
      });
    }
  },

  fetchUser: async () => {
    try {
      const response = await authApi.me();

      set({
        user: response.data,
      });
    } catch (error) {
      console.error("Failed to fetch user", error);

      set({
        user: null,
      });
    }
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      user: null,
    });
  },
}));