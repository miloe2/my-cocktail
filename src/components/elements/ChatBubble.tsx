import React from "react";
import { ChatMessage } from "@/types/types";

// const ChatBubble = () => {
const ChatBubble = ({ user, msg }: ChatMessage) => {
  const time = "2024-10-28";

  return (
    <>
      {user === "user" ? (
        <div className="bg-stone-00 flex justify-end items-end py-4 ">
          <div className="pb-2 text-[10px] font-thin">{time}</div>
          <div className="bg-black px-4 py-2 max-w-64 flex-wrap break-words ml-2 rounded-md  leading-5 text-sm">
            {msg}
          </div>
        </div>
      ) : (
        <div className="bg-stone-00 flex justify-start items-end py-2 ">
          <div className="bg-black px-4 py-2 max-w-64 flex-wrap break-words mr-2  rounded-md  leading-5 text-sm">
            {msg}
          </div>
          <div className="pb-2 text-[10px] font-thin">{time}</div>
        </div>
      )}
    </>
  );
};

export default ChatBubble;
