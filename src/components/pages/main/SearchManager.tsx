"use client";
import { useState, ChangeEvent, useEffect } from "react";
import SearchBar from "@/components/elements/SearchBar";
import { searchQuery } from "@/api";
import useSearchStore from "@/store/useSearchStore";
import SearchHints from "./SearchHints";
import useChatStore from "@/store/useChatStore";
import ChattingRoom from "./ChattingRoom";

const SearchManager = () => {
  const { isChatStart, updateChatStatus, updateChatMessage } = useChatStore();
  const [searchText, setSearchText] = useState("");
  const { searchQuery: query } = useSearchStore();

  useEffect(() => {
    setSearchText(query);
  }, [query]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleSearch = async () => {
    setSearchText("");
    // setSearchText("api는 호출됨");
    if (!isChatStart) {
      updateChatStatus();
    }
    try {
      const rsp = await searchQuery(searchText);
      if (rsp && rsp.data) {
        updateChatMessage(searchText, "user");
        updateChatMessage(rsp.data.response, "gpt");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col w-full relative ">
      {!isChatStart ? (
        <>
          <SearchBar
            onChange={handleInputChange}
            onSearchClick={handleSearch}
            value={searchText}
          />
          <div className="-mr-4 mt-4">
            <SearchHints />
          </div>
        </>
      ) : (
        <>
          <div
            className="relative w-full pb-0 overflow-scroll no-scroll"
            style={{ height: `calc(100vh)` }}
          >
            <ChattingRoom />
          </div>
          <div className="sticky bottom-4 w-full h-auto ">
            <SearchBar
              onChange={handleInputChange}
              onSearchClick={handleSearch}
              value={searchText}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchManager;
