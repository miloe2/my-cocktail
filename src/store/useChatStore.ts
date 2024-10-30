import { create } from "zustand";
import { ChatStore } from "@/types/types";

const useChatStore = create<ChatStore>((set) => ({
  isChatStart: false,
  chatMessages: [
    {
      user: "user",
      msg: "hello",
    },
    {
      user: 'gpt',
      msg : `
      {
  "cocktails": [
    {
      "name": "모히토",
      "ingredients": [
        { "name": "럼", "amountValue": 50, "unit": "ml" },
        { "name": "민트", "amountValue": 10, "unit": "g" },
        { "name": "라임 주스", "amountValue": 30, "unit": "ml" },
        { "name": "설탕", "amountValue": 15, "unit": "g" },
        { "name": "탄산수", "amountValue": 100, "unit": "ml" }
      ],
      "degree": 15
    },
    {
      "name": "마가리타",
      "ingredients": [
        { "name": "테킬라", "amountValue": 50, "unit": "ml" },
        { "name": "라임 주스", "amountValue": 25, "unit": "ml" },
        { "name": "오렌지 리큐르", "amountValue": 15, "unit": "ml" }
      ],
      "degree": 30
    }
  ]
}`
    }
    // {
    //   user: "gpt",
    //   msg: "Counting objects: 100% (29/29), done.",
    // },
    //     {
    //       user: "user",
    //       msg: `Compressing objects: 100% (15/15), done.
    // Writing objects: 100% (16/16), 2.65 KiB | 677.00 KiB/s, done.
    // Total 16 (delta 5), reused 0 (delta 0), pack-reused `,
    //     },
    //     {
    //       user: "user",
    //       msg: `Counting objects: 100% (29/29), done.
    // Delta compression using up to 16 threads
    // Compressing objects: 100% (15/15), done.`,
    //     },
    //     {
    //       user: "gpt",
    //       msg: `일괄 작업을 끝내시겠습니까 (Y/N)?
    // ^C
    //   31:12  error  Unnecessary escape character:     no-useless-escape`,
    //     },
    //     {
    //       user: "gpt",
    //       msg: "Counting objects: 100% (29/29), done.",
    //     },
    //     {
    //       user: "user",
    //       msg: `Compressing objects: 100% (15/15), done.
    // Writing objects: 100% (16/16), 2.65 KiB | 677.00 KiB/s, done.
    // Total 16 (delta 5), reused 0 (delta 0), pack-reused `,
    //     },
    //     {
    //       user: "user",
    //       msg: `Counting objects: 100% (29/29), done.
    // Delta compression using up to 16 threads
    // Compressing objects: 100% (15/15), done.`,
    //     },
    //     {
    //       user: "gpt",
    //       msg: `일괄 작업을 끝내시겠습니까 (Y/N)?
    // ^C
    //   31:12  error  Unnecessary escape character:     no-useless-escape`,
    //     },
    //     {
    //       user: "user",
    //       msg: `Compressing objects: 100% (15/15), done.
    // Writing objects: 100% (16/16), 2.65 KiB | 677.00 KiB/s, done.
    // Total 16 (delta 5), reused 0 (delta 0), pack-reused `,
    //     },
    //     {
    //       user: "user",
    //       msg: `Counting objects: 100% (29/29), done.
    // Delta compression using up to 16 threads
    // Compressing objects: 100% (15/15), done.`,
    //     },
    //     {
    //       user: "gpt",
    //       msg: `일괄 작업을 끝내시겠습니까 (Y/N)?
    // ^C
    //   31:12  error  Unnecessary escape character:     no-useless-escape`,
    //     },
    //     {
    //       user: "gpt",
    //       msg: "Counting objects: 100% (29/29), done.",
    //     },
    //     {
    //       user: "user",
    //       msg: `Compressing objects: 100% (15/15), done.
    // Writing objects: 100% (16/16), 2.65 KiB | 677.00 KiB/s, done.
    // Total 16 (delta 5), reused 0 (delta 0), pack-reused `,
    //     },
    //     {
    //       user: "user",
    //       msg: `Counting objects: 100% (29/29), done.
    // Delta compression using up to 16 threads
    // Compressing objects: 100% (15/15), done.`,
    //     },
    //     {
    //       user: "gpt",
    //       msg: `일괄 작업을 끝내시겠습니까 (Y/N)?
    // ^C
    //   31:12  error  Unnecessary escape character:     no-useless-escape`,
    //     },
  ],
  updateChatStatus: () =>
    set((state) => ({
      isChatStart: !state.isChatStart,
    })),
  updateChatMessage: (msg, user) =>
    set((state) => ({
      chatMessages: [
        ...state.chatMessages,
        {
          // time: new Date(), // 현재 시간을 저장
          user, // 메시지의 발신자 정보 ('user' 또는 'gpt')
          msg, // 실제 메시지 내용
        },
      ],
    })),
}));

export default useChatStore;
