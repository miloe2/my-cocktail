import { create } from "zustand";
interface searchStoreProps {
  searchKeyword: string[];
  addKeyword: (word: string) => void;
  removeKeyword: (word: string) => void;
}

const useSearchStore = create<searchStoreProps>((set) => ({
  searchKeyword: [],
  addKeyword: (word) =>
    set((state) => ({
      searchKeyword: [...state.searchKeyword, word],
    })),
  removeKeyword: (word) =>
    set((state) => ({
      searchKeyword: state.searchKeyword.filter((keyword) => keyword !== word),
    })),
}));

export default useSearchStore;
