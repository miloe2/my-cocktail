"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import ChattingRoom from "@/components/pages/main/ChattingRoom";
import SearchBar from "@/components/elements/SearchBar";
import useChatStore from "@/store/useChatStore";
import useSearchStore from "@/store/useSearchStore";
import { fetchSearchResult } from "@/api";

const AskCocktailPage = () => {
  const { updateUserMessage, updateGptMessage } = useChatStore();
  const [searchText, setSearchText] = useState("");
  const [log, setLog] = useState("");
  const { searchQuery } = useSearchStore();

  useEffect(() => {
    setSearchText(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleSearch = async () => {
    setSearchText("");
    updateUserMessage(searchText, "user");
    try {
      const rsp = await fetchSearchResult(searchText);
      if (rsp) {
        updateGptMessage(rsp, "gpt");
      }
    } catch (error) {
      console.log(error);
      setLog(`오류 발생: ${error}`);
      console.log(log);
    }
  };
  return (
    <div className="">
      <div className="pb-14">
        <ChattingRoom />
      </div>
      <div
        className="fixed bottom-0 h-14 bg-[#2f2f2f] px-4 pt-2"
        style={{ width: `calc(100vw)` }}
      >
        <SearchBar
          onChange={handleInputChange}
          onSearchClick={handleSearch}
          value={searchText}
        />
      </div>
    </div>
  );
};

export default AskCocktailPage;
