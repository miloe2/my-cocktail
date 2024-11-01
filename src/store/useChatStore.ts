import { create } from "zustand";
import { ChatStore } from "@/types/types";

const useChatStore = create<ChatStore>((set) => ({
  isChatStart: false,
  chatMessages: [
    // {
    //   user: "user",
    //   msg: "hello",
    // },
    // {
    //   user: "user",
    //   msg: "hello",
    // },
  ],
  updateChatStatus: () =>
    set((state) => ({
      isChatStart: !state.isChatStart,
    })),
  updateGptMessage: (msg, user) =>
    set((state) => {
      console.log(state.chatMessages)
      return {
        chatMessages: [
          ...state.chatMessages,
          {
            user,
            msg,
          },
        ],
      };
    }),
    setLastGptMessage: (newMsg) => 
      set((state) => {
        console.log('로딩컴퍼넌트를 실제 레시피로')
        const copied = [...state.chatMessages];
        copied[copied.length - 1].msg = newMsg;

        return { chatMessages : copied }
      }),
  updateUserMessage: (msg, user) =>
    set((state) => ({
      chatMessages: [
        ...state.chatMessages,
        {
          user, // 메시지의 발신자 정보 ('user' 또는 'gpt')
          msg, // 실제 메시지 내용
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
