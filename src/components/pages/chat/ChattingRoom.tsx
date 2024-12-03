import React, { useEffect, useRef, useMemo, memo, useState } from "react";
import SkeletoneAnswerCard from "@/components/elements/SkeletoneAnswerCard";
import ChatBubble from "@/components/elements/ChatBubble";
import useChatStore from "@/store/useChatStore";
import useAppStore from "@/store/useAppStore";
import useIndexedMessageDB from "@/hooks/useIndexedMessageDB";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

const ChattingRoom = () => {
  const { chatMessages, currentIndex, loadChatHistory, setCurrentIndex } =
    useChatStore();
  const { isDBReady, getPaginatedData } = useIndexedMessageDB();
  const { isLoading } = useAppStore();
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const chatStartRef = useRef<HTMLDivElement | null>(null);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [isFinalMessage, setIsFinalMessage] = useState(false);

  const fetchData = async () => {
    if (!isDBReady || isHistoryLoading) return [];

    try {
      setIsHistoryLoading(true);
      const rsp = (await getPaginatedData(currentIndex)) || []; // undefined일 경우 빈 배열로 대체
      console.log("getPaginatedData result:", rsp);

      if (rsp.length > 0) {
        const newIndex = rsp[rsp.length - 1].id;
        setCurrentIndex(newIndex as number);
      }

      if (rsp.length < 10) {
        setIsFinalMessage(true);
      }

      return rsp.sort((a, b) => (a.id as number) - (b.id as number));
    } catch (error) {
      console.error(error);
      return [];
    } finally {
      setIsHistoryLoading(false);
    }
  };

  const renderChatData = async () => {
    if (isDBReady || !isHistoryLoading) {
      fetchData()
        .then((rsp) => {
          if (rsp) {
            console.log(rsp);
            loadChatHistory(rsp);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    renderChatData();
  }, [isDBReady]);

  // Intersection Observer 설정
  const observedElements = chatStartRef.current ? [chatStartRef.current] : [];
  useIntersectionObserver(observedElements, renderChatData, isFinalMessage);

  // 채팅이 생성되면 스크롤 이동
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  // 메모이제이션된 메시지
  const memoizedChatMessages = useMemo(() => {
    return chatMessages?.map((chat, index) => (
      <ChatBubble key={index} chat={chat} />
    ));
  }, [chatMessages]);

  // console.log("채팅방 (검색창도있고, 뒤로가기도있음)", new Date().getSeconds());

  return (
    <div className="flex flex-col relative w-full bg-yellow-00 px-4">
      <div ref={chatStartRef}></div>
      {memoizedChatMessages}
      {isLoading && <SkeletoneAnswerCard />}
      <div ref={chatEndRef} />
      {/* {currentIndex}  */}
    </div>
  );
};
export default memo(ChattingRoom);
