import { create } from "zustand";

interface ChatStore {
  isChatStart: boolean;
  updateChatStatus: () => void;
}

const useChatStore = create<ChatStore>((set) => ({
  isChatStart: false,
  updateChatStatus: () =>
    set((state) => ({
      isChatStart: !state.isChatStart,
    })),
}));

export default useChatStore;
