import { memo } from "react";
import AnswerCard from "@/components/elements/AnswerCard";
import {
  ChatGptMessage,
  ChatUserMessage,
  ChatNoticeMessage,
} from "@/types/types";

const NoticeMessage = ({ chat }: { chat: ChatNoticeMessage }) => (
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
);

const ChatMessage = ({ chat }: { chat: ChatUserMessage }) => (
  <div className="bg-stone-00 flex justify-end items-end py-4 ">
    <div className="pb-2 text-[10px] font-thin">{chat.time}</div>
    <div className="bg-black px-4 py-2 max-w-64 flex-wrap break-words ml-1 rounded-md leading-5 text-sm">
      {chat.msg}
    </div>
  </div>
);
const FilterMessage = ({ chat }: { chat: ChatUserMessage }) => {
  const editMsg = chat.msg.replace("/*#filter#*/", "");
  const filterMsgArr = editMsg.split(", ");
  return (
    <div className="bg-stone-00 flex justify-end items-end py-4 ">
      <div className="pb-2 text-[10px] font-thin">{chat.time}</div>
      <div className="bg-black px-4 py-2 max-w-64 flex-wrap break-words ml-1 rounded-md leading-5 text-sm flex justify-end">
        {filterMsgArr.map((item, index) => (
          <div
            key={index}
            className="flex bg-stone-700  text-sm px-2 py-1 rounded-md ml-1.5 my-1"
          >
            #{item}
          </div>
        ))}
      </div>
    </div>
  );
};
const UserMessage = ({ chat }: { chat: ChatUserMessage }) => {
  console.log("################UserMessage 렌더링##################");
  return chat.msg.startsWith("/*#filter#*/") ? (
    <FilterMessage chat={chat} />
  ) : (
    <ChatMessage chat={chat} />
  );
};
// UserMessage.displayName = "UserMessage";

const AnswerCardMessage = ({ chat }: { chat: ChatGptMessage }) => (
  <AnswerCard cocktails={chat.msg.cocktails} />
);

const ChatBubble = ({
  chat,
}: {
  chat: ChatGptMessage | ChatUserMessage | ChatNoticeMessage;
}) => {
  return (
    <>
      {chat.user === "notice" && <NoticeMessage chat={chat} />}
      {chat.user === "user" && <UserMessage chat={chat} />}
      {chat.user === "gpt" && <AnswerCardMessage chat={chat} />}
    </>
  );
};
export default memo(ChatBubble);
