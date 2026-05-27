import { create } from "zustand";

interface UIStore {
  isMainNavOpen: boolean;
  toggleMainNav: () => void;
  openMainNav: () => void;
  closeMainNav: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isMainNavOpen: false,
  toggleMainNav: () =>
    set((state) => ({ isMainNavOpen: !state.isMainNavOpen })),
  openMainNav: () => set({ isMainNavOpen: true }),
  closeMainNav: () => set({ isMainNavOpen: false }),
}));
