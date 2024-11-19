import { create } from "zustand";
import { ChatStore } from "@/types/types";

const useChatStore = create<ChatStore>((set) => ({
  // isChatStart: false,
  chatMessages: [
    {
      id: 999999,
      created_at: "2024-11-18T03:58:32.010Z",
      is_favorite: false,
      is_saved_data: false,
      message: "가지고 계신 재료로 \n 딱 맞는 칵테일을 찾아드릴게요! 🍹",
      sender_type: "system",
      user_id: "",
    },
  ],
  updateChatMessage: (data) =>
    set((state) => ({
      chatMessages: [...state.chatMessages, data],
    })),
  loadChatHistory: (historyData) =>
    set(() => ({
      chatMessages: historyData,
    })),
}));

// {
//   user: "notice",
//   msg: "가지고 계신 재료로 \n 딱 맞는 칵테일을 찾아드릴게요! 🍹",
// },
// {
//   user: "user",
//   time: "16:02",
//   msg: "ㅎㅇㅎㅇㅎㅇ 초콜릿시럽, 민트, 라임",
// },
// {
//   user: "gpt",
//   msg: {
//     cocktails: [
//       {
//         name: "진 파인애플 칵테일",
//         ingredients: [
//           { name: "진", amountValue: 50, unit: "ml" },
//           { name: "파인애플 주스", amountValue: 150, unit: "ml" },
//         ],
//         degree: 15,
//       },
//     ],
//   },
// },
// {
//   user: "gpt",
//   msg: {
//     cocktails: [
//       {
//         name: "모히또",
//         ingredients: [
//           { name: "화이트 럼", amountValue: 50, unit: "ml" },
//           { name: "신선한 민트 잎", amountValue: 10, unit: "g" },
//           { name: "라임 주스", amountValue: 30, unit: "ml" },
//           { name: "설탕", amountValue: 2, unit: "티스푼" },
//           { name: "소다수", amountValue: 100, unit: "ml" },
//         ],
//         degree: 10,
//       },
//     ],
//   },
// },
// {
//   user: "user",
//   time: "16:02",
//   msg: "/*#filter#*/미도리, 트리플 섹, 위스키, 바나나, 파인애플, 사과, 초콜릿시럽, 민트, 라임",
// },
// updateChatStatus: () =>
//   set((state) => ({
//     isChatStart: !state.isChatStart,
//   })),
// updateGptMessage: (msg) =>
//   set((state) => {
//     console.log(state.chatMessages);
//     return {
//       chatMessages: [
//         ...state.chatMessages,
//         {
//           user: "gpt",
//           msg,
//         },
//       ],
//     };
//   }),
// updateUserMessage: (msg, time) =>
//   set((state) => ({
//     chatMessages: [
//       ...state.chatMessages,
//       {
//         user: "user", // 메시지의 발신자 정보 ('user' 또는 'gpt')
//         msg, // 실제 메시지 내용
//         time,
//       },
//     ],
//   })),
// updateSystemMessage: (msg) =>
//   set((state) => ({
//     chatMessages: [
//       ...state.chatMessages,
//       {
//         user: "notice", // 메시지의 발신자 정보 ('user' 또는 'gpt')
//         msg, // 실제 메시지 내용
//       },
//     ],
//   })),

export default useChatStore;
