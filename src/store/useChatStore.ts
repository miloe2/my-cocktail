import { create } from "zustand";
import { ChatStore } from "@/types/types";

const useChatStore = create<ChatStore>((set) => ({
  isChatStart: false,
  chatMessages: [
    {
      user: "user",
      msg: "hello",
    },
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
