import { create } from "zustand";
interface searchStoreProps {
  selectedOption: Set<string>;
  addOption: (word: string) => void;
  removeOption: (word: string) => void;
  clearOptions: () => void;

  searchQuery: string;
  updateQuery: (query: string) => void;
}

const useSearchStore = create<searchStoreProps>((set) => ({
  selectedOption: new Set(),
  searchQuery: "",
  addOption: (word) =>
    set((state) => {
      const newSet = new Set(state.selectedOption);
      newSet.add(word);
      return { selectedOption: newSet };
    }),
  removeOption: (word) =>
    set((state) => {
      const newSet = new Set(state.selectedOption);
      newSet.delete(word);
      return { selectedOption: newSet };
    }),
  clearOptions: () =>
    set(() => {
      const newSet = new Set<string>();
      return { selectedOption: newSet };
    }),
  updateQuery: (query) =>
    set(() => {
      // console.log(query, "-------SearchQuery useStore");
      return { searchQuery: query };
    }),
}));

export default useSearchStore;
