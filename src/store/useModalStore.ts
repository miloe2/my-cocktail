import { create } from "zustand";

interface ModalStore {
  modals: { [key: string]: boolean };
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  modals: {},
  openModal: (id) =>
    set((state) => ({
      modals: { ...state.modals, [id]: true },
    })),
  closeModal: (id) =>
    set((state) => ({
      modals: { ...state.modals, [id]: false },
    })),
}));

export default useModalStore;