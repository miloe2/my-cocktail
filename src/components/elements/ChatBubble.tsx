import React from "react";
import { ChatMessage } from "@/types/types";
import AnswerCard from "@/components/elements/AnswerCard";

const ChatBubble = React.memo(({ user, msg }: ChatMessage) => {
  const time = "2024-10-28";
  console.log("chatbubble render");
  return (
    <>
      {user === "user" && typeof msg ==="string" ? (
        <div className="bg-stone-00 flex justify-end items-end py-4 ">
          <div className="pb-2 text-[10px] font-thin">{time}</div>
          <div className="bg-black px-4 py-2 max-w-64 flex-wrap break-words ml-2 rounded-md  leading-5 text-sm">
            {msg}
          </div>
        </div>
      ) : (
        <div className="">
          <AnswerCard
          user='gpt' 
          msg={msg} />                                                                                               
        </div>
      )}
    </>
  );
});

ChatBubble.displayName = "ChatBubble";
export default ChatBubble;
