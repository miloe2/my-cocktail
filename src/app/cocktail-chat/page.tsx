"use client";
import React from "react";
import ChattingRoom from "@/components/pages/chat/ChattingRoom";
import BeverageModal from "@/components/pages/main/BeverageModal";
import SearchManager from "@/components/pages/main/SearchManager";
import useModalStore from "@/store/useModalStore";

const AskCocktailPage = () => {
  const { openModal } = useModalStore();
  const modalId = "beverage";

  return (
    <div className="max-w-5xl mx-auto h-svh overflow-hidden">
      {/* <div className="pb-14 bg-stone-400 "> */}
      <ChattingRoom />
      {/* </div> */}
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
