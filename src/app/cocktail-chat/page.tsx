"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import ChattingRoom from "@/components/pages/main/ChattingRoom";
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
  const { openModal } = useModalStore();
  const modalId = "beverage";

  useEffect(() => {
    setSearchText(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearch = async () => {
    console.log("################# 검색창 엔터 ######################");
    if(searchText === "") return;
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
    <div className="">
      <div className="pb-14">
        <ChattingRoom />
      </div>
      <div className="fixed bottom-0 h-14 bg-[#2f2f2f] px-4 pt-2 w-full flex">
        <div
          className="bg-stone-700 w-9 h-9 rounded-full mr-2 flex justify-center items-center text-3xl font-thin align-top"
          onClick={() => openModal(modalId)}
        >
          +
        </div>
        <div className="w-11/12">
          <SearchBar
            onChange={handleInputChange}
            onSearchClick={handleSearch}
            value={searchText}
          />
        </div>
      </div>
      <BeverageModal modalId={modalId} />
    </div>
  );
};

export default AskCocktailPage;
