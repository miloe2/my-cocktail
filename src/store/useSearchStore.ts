import { create } from 'zustand';
interface useSearchStoreProps {
  searchKeyword : string[];
  addKeyword : (word:string) => void;
}

const useSearchStore = create<useSearchStoreProps>((set) => ({
  searchKeyword : [],
  addKeyword : (word) => 
    set((state) => ({
    searchKeyword : [...state.searchKeyword, word]
  }))
}));

export default useSearchStore;
