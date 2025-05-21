import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null, // or { id, name, token }
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
