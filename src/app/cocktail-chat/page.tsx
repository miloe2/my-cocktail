"use client";
import React from "react";
import ChattingRoom from "@/components/pages/chat/ChattingRoom";
import useModalStore from "@/store/useModalStore";
import BeverageModal from "@/components/pages/main/BeverageModal";
import SearchManager from "@/components/pages/main/SearchManager";

const AskCocktailPage = () => {
  const { modals, openModal } = useModalStore();
  const modalId = "beverage";
  return (
    <div className="max-w-5xl mx-auto">
      <div className="pb-14">
        <ChattingRoom />
      </div>
      <div className="fixed bottom-0 h-14 bg-[#2f2f2f] px-4 pt-2 max-w-5xl mx-auto w-full flex">
        <div
          className="bg-stone-700 w-10 h-9 rounded-full mr-2 flex justify-center items-center text-3xl font-thin align-top"
          onClick={() => openModal(modalId)}
        >
          +
        </div>
        <div className="w-full">
          <SearchManager showHintComponent={false} />
        </div>
      </div>
      {modals[modalId] && <BeverageModal modalId={modalId} />}
    </div>
  );
};

export default AskCocktailPage;
