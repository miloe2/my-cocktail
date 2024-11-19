import React, { useEffect, useRef, useMemo, memo } from "react";
import SkeletoneAnswerCard from "@/components/elements/SkeletoneAnswerCard";
import ChatBubble from "@/components/elements/ChatBubble";
import useChatStore from "@/store/useChatStore";
import useAppStore from "@/store/useAppStore";
import useIndexedMessageDB from "@/hooks/useIndexedMessageDB";

const ChattingRoom = () => {
  const { chatMessages } = useChatStore();
  const { getAllData, isDBReady } = useIndexedMessageDB();
  const { isLoading } = useAppStore();
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isDBReady) {
      fetchData()
        .then((rsp) => {
          console.log(rsp);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [isDBReady]);

  const fetchData = async () => {
    try {
      const rsp = await getAllData();
      return rsp;
    } catch (error) {
      console.error(error);
    }
  };

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

  // console.log("채팅방 (검색창도있고, 뒤로가기도있음)", new Date().getSeconds());

  return (
    <div className="flex flex-col relative w-full bg-yellow-00 px-4">
      {memoizedChatMessages}
      {isLoading && <SkeletoneAnswerCard />}
      <div ref={chatEndRef} />
    </div>
  );
};
export default memo(ChattingRoom);
