import React, { useEffect, useRef, useMemo, memo } from "react";
import { useRouter } from "next/navigation";
import SkeletoneAnswerCard from "@/components/elements/SkeletoneAnswerCard";
import ChatBubble from "@/components/elements/ChatBubble";
import useChatStore from "@/store/useChatStore";
import useAppStore from "@/store/useAppStore";

const ChattingRoom = () => {
  const { chatMessages } = useChatStore();
  const { isLoading } = useAppStore();
  const router = useRouter();
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // 채팅이 생성되면 스크롤 이동
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  // 메모이제이션된 메시지
  const memoizedChatMessages = useMemo(() => {
    return chatMessages.map((chat, index) => (
      <ChatBubble key={index} chat={chat} />
    ));
  }, [chatMessages]);

  const handleBack = () => {
    router.back();
  };

  console.log("채팅방 (검색창도있고, 뒤로가기도있음)", new Date().getSeconds());

  return (
    <div className="flex flex-col relative w-full bg-yellow-00 px-4">
      <div className="fixed top-4 flex" onClick={handleBack}>
        {/* <div
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
        </div> */}
      </div>
      {memoizedChatMessages}
      {isLoading && <SkeletoneAnswerCard />}
      <div ref={chatEndRef} />
    </div>
  );
};
export default memo(ChattingRoom);
