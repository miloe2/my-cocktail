import { create } from "zustand";
import { ChatMessage, ChatStore } from "@/types/types"

const useChatStore = create<ChatStore>((set) => ({
  isChatStart: false,
  chatMessages: [],
  updateChatStatus: () =>
    set((state) => ({
      isChatStart: !state.isChatStart,
    })),
  updateChatMessage: (msg, user) => set((state) => ({
    chatMessages: [
      ...state.chatMessages,
      {
        time: new Date(), // 현재 시간을 저장
        user, // 메시지의 발신자 정보 ('user' 또는 'gpt')
        msg, // 실제 메시지 내용
      },
    ],
  })),
}));

export default useChatStore;
