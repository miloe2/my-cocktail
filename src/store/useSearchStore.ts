import { create } from "zustand";
interface searchStoreProps {
  searchKeyword: Set<string>;
  addKeyword: (word: string) => void;
  removeKeyword: (word: string) => void;
}

const useSearchStore = create<searchStoreProps>((set) => ({
  searchKeyword: new Set(),
  addKeyword: (word) =>
    set((state) => {
      const newSet = new Set(state.searchKeyword);
      newSet.add(word);
      return { searchKeyword : newSet};
    }),
  removeKeyword: (word) =>
    set((state) => {
      const newSet = new Set(state.searchKeyword);
      newSet.delete(word);
      return { searchKeyword : newSet} 
    })
}));

export default useSearchStore;
