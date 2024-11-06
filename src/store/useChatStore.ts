import { create } from "zustand";
import { ChatStore } from "@/types/types";

const useChatStore = create<ChatStore>((set) => ({
  isChatStart: false,
  chatMessages: [
    {
      user: "notice",
      msg: "welcome",
    },
    {
      user: "gpt",
      msg: {
        cocktails: [
          {
            name: "진 파인애플 칵테일",
            ingredients: [
              { name: "진", amountValue: 50, unit: "ml" },
              { name: "파인애플 주스", amountValue: 150, unit: "ml" },
            ],
            degree: 15,
          },
        ],
      },
    },
    {
      user: "gpt",
      msg: {
        cocktails: [
          {
            name: "모히또",
            ingredients: [
              { name: "화이트 럼", amountValue: 50, unit: "ml" },
              { name: "신선한 민트 잎", amountValue: 10, unit: "g" },
              { name: "라임 주스", amountValue: 30, unit: "ml" },
              { name: "설탕", amountValue: 2, unit: "티스푼" },
              { name: "소다수", amountValue: 100, unit: "ml" },
            ],
            degree: 10,
          },
        ],
      },
    },
  ],
  updateChatStatus: () =>
    set((state) => ({
      isChatStart: !state.isChatStart,
    })),
  updateGptMessage: (msg) =>
    set((state) => {
      console.log(state.chatMessages);
      return {
        chatMessages: [
          ...state.chatMessages,
          {
            user: "gpt",
            msg,
          },
        ],
      };
    }),
  updateUserMessage: (msg, time) =>
    set((state) => ({
      chatMessages: [
        ...state.chatMessages,
        {
          user: "user", // 메시지의 발신자 정보 ('user' 또는 'gpt')
          msg, // 실제 메시지 내용
          time,
        },
      ],
    })),
  // updateChatMessage: (msg, user) =>
  //   set((state) => ({
  //     chatMessages: [
  //       ...state.chatMessages,
  //       {
  //         // time: new Date(), // 현재 시간을 저장
  //         user, // 메시지의 발신자 정보 ('user' 또는 'gpt')
  //         msg, // 실제 메시지 내용
  //       },
  //     ],
  //   })
  // ),
}));

export default useChatStore;
