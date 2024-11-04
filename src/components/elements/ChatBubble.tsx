import { memo } from "react";
import {
  ChatGptMessage,
  ChatUserMessage,
  ChatNoticeMessage,
} from "@/types/types";
import AnswerCard from "@/components/elements/AnswerCard";

const ChatBubble = ({
  chat,
}: {
  chat: ChatGptMessage | ChatUserMessage | ChatNoticeMessage;
}) => {
  const time = "2024-11-01";
  // console.log("chatbubble render");
  console.log(
    "채팅 버블 여기에서 user vs gpt로 나눠서 렌더링",
    new Date().getSeconds(),
  );
  return (
    <>
      {chat.user === "notice" ? (
        <div className="bg-stone-00 flex py-4">
          <div className="bg-black px-4 py-2 max-w-64 flex-wrap break-words ml-2 rounded-md  leading-5 text-sm">
            가지고 계신 재료로 <br />딱 맞는 칵테일을 찾아드릴게요!
          </div>
        </div>
      ) : chat.user === "user" ? (
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
};
export default memo(ChatBubble);
