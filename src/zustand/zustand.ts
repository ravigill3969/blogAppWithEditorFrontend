import { create } from "zustand";

type AppState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
};

const useAppStore = create<AppState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
}));

export default useAppStore;
