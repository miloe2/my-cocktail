import { create } from "zustand";

interface AppStore {
  isLoading: boolean;
  setLoadingStatus: () => void;
  pathLoading: boolean;
  setPathLoading: () => void;
  uuid: string;
  setUUID: (value: string) => void;
}

const useAppStore = create<AppStore>((set) => ({
  isLoading: false,
  setLoadingStatus: () =>
    set((state) => ({
      isLoading: !state.isLoading,
    })),
  pathLoading: false,
  setPathLoading: () =>
    set((state) => ({
      pathLoading: !state.pathLoading,
    })),
  uuid: "",
  setUUID: (value) =>
    set(() => {
      return { uuid: value };
    }),
}));

export default useAppStore;
