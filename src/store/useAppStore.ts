import { create } from "zustand";

interface AppStore {
  isLoading: boolean;
  setLoadingStatus: () => void;
}

const useAppStore = create<AppStore>((set) => ({
  isLoading: false,
  setLoadingStatus: () =>
    set((state) => ({
      isLoading: !state.isLoading,
    })),
}));

export default useAppStore;
