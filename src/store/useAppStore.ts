import { create } from "zustand";

interface AppStore {
  isLoading : boolean;
}

const useModalStore = create<AppStore>((set) => ({
  isLoading : false,
  setLoadingStatus : () => set((state) => ({
    isLoading : !state.isLoading
  })),
}));

export default useModalStore;
