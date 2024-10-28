import React, { useEffect, useRef } from "react";
import useChatStore from "@/store/useChatStore";
import ChatBubble from "@/components/elements/ChatBubble";

const ChattingRoom = () => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const { updateChatStatus, chatMessages } = useChatStore();
  const handleChatStatus = () => {
    updateChatStatus();
  };
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);
  return (
    <div className="flex flex-col relative w-full">
      <div className="fixed top-6 flex">
        <div
          className="bg-stone-600 rounded-full w-6 h-6 flex justify-center items-center"
          onClick={handleChatStatus}
        >
          <svg
            fill="#ffffff"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g data-name="Layer 2">
              <g data-name="arrow-ios-back">
                <rect
                  width="24"
                  height="24"
                  transform="rotate(90 12 12)"
                  opacity="0"
                />
                <path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z" />
              </g>
            </g>
          </svg>
        </div>
      </div>
      {/* <div>isChatStart {isChatStart.toString()}</div> */}
      <div>
        {chatMessages.map((chat) => (
          <ChatBubble key={chat.msg} user={chat.user} msg={chat.msg} />
        ))}
        <div ref={chatEndRef} className="" />
      </div>
    </div>
  );
};

export default ChattingRoom;
