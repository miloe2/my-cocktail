import { memo } from "react";
import AnswerCard from "@/components/elements/AnswerCard";
import {
  ChatGptMessage,
  ChatUserMessage,
  ChatNoticeMessage,
} from "@/types/types";

const ChatBubble = ({
  chat,
}: {
  chat: ChatGptMessage | ChatUserMessage | ChatNoticeMessage;
}) => {
  // console.log(time)
  // console.log("chatbubble render");
  // console.log(
  //   "채팅 버블 여기에서 user vs gpt로 나눠서 렌더링",
  //   new Date().getSeconds(),
  // );
  return (
    <>
      {chat.user === "notice" ? (
        <div className="bg-stone-00 flex py-4">
          <div className="bg-black px-4 py-2 max-w-64 flex-wrap break-words rounded-md leading-5 text-sm">
            {chat.msg.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </div>
        </div>
      ) : chat.user === "user" ? (
        <div className="bg-stone-00 flex justify-end items-end py-4 ">
          <div className="pb-2 text-[10px] font-thin">{chat.time}</div>
          <div className="bg-black px-4 py-2 max-w-64 flex-wrap break-words ml-1 rounded-md  leading-5 text-sm">
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
