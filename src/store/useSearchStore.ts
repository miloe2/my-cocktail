import { create } from "zustand";
interface searchStoreProps {
  selectedOption: Set<string>;
  addKeyword: (word: string) => void;
  removeKeyword: (word: string) => void;
}

const useSearchStore = create<searchStoreProps>((set) => ({
  selectedOption: new Set(),
  addKeyword: (word) =>
    set((state) => {
      const newSet = new Set(state.selectedOption);
      newSet.add(word);
      return { selectedOption : newSet};
    }),
  removeKeyword: (word) =>
    set((state) => {
      const newSet = new Set(state.selectedOption);
      newSet.delete(word);
      return { selectedOption : newSet} 
    })
}));

export default useSearchStore;
