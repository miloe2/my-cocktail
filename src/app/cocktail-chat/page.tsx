"use client";
import React from "react";
import ChattingRoom from "@/components/pages/chat/ChattingRoom";
import BeverageModal from "@/components/pages/main/BeverageModal";
import SearchManager from "@/components/pages/main/SearchManager";
import useModalStore from "@/store/useModalStore";
// import useIndexedMessageDB from "@/hooks/useIndexedMessageDB";
import useAppStore from "@/store/useAppStore";

const AskCocktailPage = () => {
  const { openModal } = useModalStore();
  const { uuid } = useAppStore();
  // const { getAllData } = useIndexedMessageDB();
  const modalId = "beverage";
  // data 호출하기 (추후 업데이트)
  // const fetchChatMessages = async() => {
  //   const rsp = await getAllData();
  //   console.log(rsp)
  //   return rsp;
  // }
  // useEffect(() => {
  //   // fetchChatMessages();
  // }, [])
  return (
    <div className="max-w-5xl mx-auto">
      <div
        className="pb-14 bg-red-00"
        onClick={() => {
          console.log(uuid);
        }}
      >
        <ChattingRoom />
      </div>
      <div className="fixed bottom-0 h-14 bg-[#2f2f2f] px-4 pt-2 max-w-5xl mx-auto w-full flex">
        <div
          className="bg-stone-700 w-10 h-9 rounded-full mr-2 flex justify-center items-center text-3xl font-thin align-top cursor-pointer"
          onClick={() => openModal(modalId)}
        >
          +
        </div>
        <div className="w-full">
          <SearchManager isMainPage={false} />
        </div>
      </div>
      {<BeverageModal modalId={modalId} />}
      {/* {modals[modalId] && <BeverageModal modalId={modalId} />} */}
    </div>
  );
};

export default AskCocktailPage;
