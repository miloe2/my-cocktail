import React from "react";
import { ChatGptMessage, ChatUserMessage } from "@/types/types";
import AnswerCard from "@/components/elements/AnswerCard";

const ChatBubble = React.memo(
  ({ chat }: { chat: ChatGptMessage | ChatUserMessage }) => {
    const time = "2024-10-28";
    console.log("chatbubble render");
    console.log(chat.msg);
    return (
      <>
        {chat.user === "user" ? (
          <div className="bg-stone-00 flex justify-end items-end py-4 ">
            <div className="pb-2 text-[10px] font-thin">{time}</div>
            <div className="bg-black px-4 py-2 max-w-64 flex-wrap break-words ml-2 rounded-md  leading-5 text-sm">
              {chat.msg}
            </div>
          </div>
        ) : (
          <AnswerCard cocktails={chat.msg.cocktails} />
        )}
      </>
    );
  },
);

ChatBubble.displayName = "ChatBubble";
export default ChatBubble;
