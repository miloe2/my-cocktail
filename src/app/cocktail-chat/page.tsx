"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import ChattingRoom from "@/components/pages/chat/ChattingRoom";
import SearchBar from "@/components/elements/SearchBar";
import useChatStore from "@/store/useChatStore";
import useSearchStore from "@/store/useSearchStore";
import { fetchSearchResult } from "@/api";
import { searchGpt } from "@/utils/searchGpt";
import useAppStore from "@/store/useAppStore";
import useModalStore from "@/store/useModalStore";
import BeverageModal from "@/components/pages/main/BeverageModal";

const AskCocktailPage = () => {
  const { updateUserMessage, updateGptMessage } = useChatStore();
  const { setLoadingStatus } = useAppStore();
  const [searchText, setSearchText] = useState("");
  const { searchQuery } = useSearchStore();
  const { modals, openModal } = useModalStore();
  const modalId = "beverage";

  useEffect(() => {
    setSearchText(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearch = async () => {
    console.log("################# 검색창 엔터 ######################");
    if (searchText === "") return;
    updateUserMessage(searchText, "user");
    searchGpt({
      setLoadingStatus,
      searchText,
      fetchSearchResult,
      updateGptMessage,
    });
    setSearchText("");
  };

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
          <SearchBar
            onChange={handleInputChange}
            onSearchClick={handleSearch}
            value={searchText}
          />
        </div>
      </div>
      {modals[modalId] && <BeverageModal modalId={modalId} />}
    </div>
  );
};

export default AskCocktailPage;
