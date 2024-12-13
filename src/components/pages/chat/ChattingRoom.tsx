import React, { useEffect, useRef, useMemo, memo, useState } from "react";
import { debounce } from "lodash";
import SkeletoneAnswerCard from "@/components/elements/SkeletoneAnswerCard";
import ChatBubble from "@/components/elements/ChatBubble";
import useChatStore from "@/store/useChatStore";
import useAppStore from "@/store/useAppStore";
import useIndexedMessageDB from "@/hooks/useIndexedMessageDB";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { PAGE_SIZE } from "@/utils/utils";

const ChattingRoom = () => {
  const { chatMessages, currentIndex, loadChatHistory, setCurrentIndex } =
    useChatStore();
  const { isDBReady, getPaginatedData, addData } = useIndexedMessageDB();
  const { isLoading } = useAppStore();
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const chatStartRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [isFinalMessage, setIsFinalMessage] = useState(false);

  const fetchData = async () => {
    if (!isDBReady || isHistoryLoading) return [];
    console.log("fetchData 호출");

    const chatContainer = chatContainerRef.current;
    const prevScrollHeight = chatContainer?.scrollHeight || 0;
    try {
      setIsHistoryLoading(true);
      const rsp = (await getPaginatedData(currentIndex)) || [];

      if (rsp.length > 0) {
        const newIndex = rsp[rsp.length - 1].id as number;
        setCurrentIndex(newIndex);
      }

      if (rsp.length < PAGE_SIZE) {
        setIsFinalMessage(true);
      }

      // 스크롤 위치 복원
      requestAnimationFrame(() => {
        if (chatContainer) {
          console.log(chatContainer);
          const newScrollHeight = chatContainer.scrollHeight;
          console.log("계산값", newScrollHeight - prevScrollHeight);
          chatContainer.scrollTop += newScrollHeight - prevScrollHeight; // 변경된 높이만큼 추가
          // document.documentElement.scrollTop += newScrollHeight - prevScrollHeight; // 변경된 높이만큼 추가
          console.log("chatContainer.scrollTop:", chatContainer.scrollTop);
          console.log(
            "chatContainer.scrollHeight:",
            chatContainer.scrollHeight,
          );
          console.log(
            "chatContainer.clientHeight:",
            chatContainer.clientHeight,
          );
        }
      });

      return rsp.sort((a, b) => (a.id as number) - (b.id as number));
    } catch (error) {
      console.error(error);
      return [];
    } finally {
      setIsHistoryLoading(false);
    }
  };

  const renderChatData = async () => {
    if (!isDBReady || isHistoryLoading) return; // 데이터 로드 조건이 충족되지 않으면 중단
    console.log("rednerChatData!!!");
    try {
      const data = await fetchData(); // fetchData로 데이터 가져오기
      if (data.length > 0) loadChatHistory(data); // 데이터가 있으면 히스토리에 로드
    } catch (error) {
      console.error("Error rendering chat data:", error); // 에러 로그 출력
    }
  };
  // DB 초기화
  // useEffect(() => {
  //   renderChatData();
  // }, [isDBReady]);

  // Intersection Observer 설정
  const observedElements = chatStartRef.current ? [chatStartRef.current] : [];
  // useIntersectionObserver(observedElements, (renderChatData), isFinalMessage);
  useIntersectionObserver(
    observedElements,
    debounce(renderChatData, 300),
    isFinalMessage,
  );

  // 채팅이 생성되면 스크롤 이동
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [addData]);

  // 메모이제이션된 메시지
  // const memoizedChatMessages = useMemo(() => {
  //   return chatMessages?.map((chat, index) => (
  //     <ChatBubble key={index} chat={chat} />
  //   ));
  // }, [chatMessages]);
  const memoizedChatMessages = useMemo(() => {
    const result: React.ReactNode[] = [];
    let lastDate = "";

    chatMessages?.forEach((chat, index) => {
      // 메시지의 날짜를 추출
      const currentDate = new Date(chat.created_at).toLocaleDateString(
        "ko-KR",
        {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          weekday: "short",
        },
      );

      // 날짜가 변경되었으면 구분선 추가
      if (currentDate !== lastDate) {
        lastDate = currentDate;
        result.push(
          <div
            key={`separator-${index}`}
            className="text-sm w-full h-16  flex justify-center bg-yellow-00"
          >
            <div className="bg-red-00 w-full h-1/2  border-b border-solid border-b-stone-400" />
            <div className="flex-shrink-0 self-center px-6">{currentDate}</div>
            <div className="bg-red-00 w-full h-1/2  border-b border-solid border-b-stone-400" />
          </div>,
        );
      }

      // 메시지 추가
      result.push(<ChatBubble key={chat.id || index} chat={chat} />);
    });

    return result;
  }, [chatMessages]);

  // console.log("채팅방 (검색창도있고, 뒤로가기도있음)", new Date().getSeconds());

  return (
    <div
      className="flex flex-col relative w-full bg-yellow-00 overflow-auto h-full no-scroll"
      ref={chatContainerRef}
    >
      <div ref={chatStartRef} className="bg-red-00" />
      <div className="bg-blue-00 pb-16 px-4 ">
        {memoizedChatMessages}
        {isLoading && <SkeletoneAnswerCard />}
      </div>
      <div ref={chatEndRef} />
    </div>
  );
};
export default memo(ChattingRoom);
