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
      <ChattingRoom />
      <div className="fixed bottom-0 h-14 bg-neutral-800 px-4 pt-2 max-w-5xl mx-auto w-full">
        <div className="w-full  flex items-center">
          <div
            className="bg-neutral-600 w-8 h-8 rounded-full mr-2 flex justify-center items-center cursor-pointer"
            onClick={() => openModal(modalId)}
          >
            <img src="/icons/plus_white.svg" />
          </div>
          <SearchManager isMainPage={false} />
        </div>
      </div>
      {<BeverageModal modalId={modalId} />}
      {/* {modals[modalId] && <BeverageModal modalId={modalId} />} */}
    </div>
  );
};

export default AskCocktailPage;
