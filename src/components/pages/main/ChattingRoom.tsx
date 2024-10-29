import React, { useEffect, useRef, useCallback, useMemo } from "react";
import useChatStore from "@/store/useChatStore";
import ChatBubble from "@/components/elements/ChatBubble";
import { useRouter } from "next/navigation";

const ChattingRoom = React.memo(() => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const { updateChatStatus, chatMessages } = useChatStore();
  const router = useRouter();

  const handleChatStatus = useCallback(() => {
    updateChatStatus();
    console.log("Status UPDATE");
  }, [updateChatStatus]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  // 메모이제이션된 메시지
  const memoizedChatMessages = useMemo(() => {
    return chatMessages.map((chat, index) => (
      <ChatBubble key={index} user={chat.user} msg={chat.msg} />
    ));
  }, [chatMessages]);

  const handleBack = () => {
    router.back();
  };

  console.log("chattingRoom render");

  return (
    <div className="flex flex-col relative w-full bg-yellow-00 px-4">
      <div className="fixed top-4 flex" onClick={handleBack}>
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
      {memoizedChatMessages}
      <div ref={chatEndRef} className="" />
    </div>
  );
});
ChattingRoom.displayName = "ChattingRoom";
export default ChattingRoom;
