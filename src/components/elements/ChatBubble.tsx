import { memo } from "react";
import AnswerCard from "@/components/elements/AnswerCard";
import { SQLChatData, ChatGptResponse } from "@/types/types";
import { convertToKST } from "@/utils/utils";

const NoticeMessage = ({ chat }: { chat: SQLChatData }) => (
  <div className="bg-stone-00 flex py-4">
    <div className="bg-black px-4 py-2 max-w-64 flex-wrap break-words rounded-md leading-5 text-sm">
      {(chat.message as string).split("\n").map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ))}
    </div>
  </div>
);

const ChatMessage = ({ chat }: { chat: SQLChatData }) => (
  <div className="bg-stone-00 flex justify-end items-end py-4 ">
    <div className="pb-2 text-[10px] font-thin">
      {convertToKST(chat.created_at)}
    </div>
    <div className="bg-black px-4 py-2 max-w-64 flex-wrap break-words ml-1 rounded-md leading-5 text-sm">
      {chat.message as string}
    </div>
  </div>
);
const FilterMessage = ({ chat }: { chat: SQLChatData }) => {
  const editMsg = (chat.message as string).replace("/*#filter#*/", "");
  const filterMsgArr = editMsg.split(", ");
  return (
    <div className="bg-stone-00 flex justify-end items-end py-4 ">
      <div className="pb-2 text-[10px] font-thin">
        {convertToKST(chat.created_at)}
      </div>
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
const UserMessage = ({ chat }: { chat: SQLChatData }) => {
  console.log("################UserMessage 렌더링##################");
  return (chat.message as string).startsWith("/*#filter#*/") ? (
    <FilterMessage chat={chat} />
  ) : (
    <ChatMessage chat={chat} />
  );
};
// UserMessage.displayName = "UserMessage";

const AnswerCardMessage = ({ chat }: { chat: SQLChatData }) => (
  <AnswerCard cocktails={(chat.message as ChatGptResponse).cocktails} />
);

const ChatBubble = ({ chat }: { chat: SQLChatData }) => {
  return (
    <>
      {chat.sender_type === "system" && <NoticeMessage chat={chat} />}
      {chat.sender_type === "user" && <UserMessage chat={chat} />}
      {chat.sender_type === "gpt" && <AnswerCardMessage chat={chat} />}
    </>
  );
};
export default memo(ChatBubble);
