"use client";
import { useState, ChangeEvent, useEffect } from "react";
import SearchBar from "@/components/elements/SearchBar";
import { fetchSearchResult } from "@/api";
import useSearchStore from "@/store/useSearchStore";
import SearchHints from "./SearchHints";
import useChatStore from "@/store/useChatStore";
import { searchGpt } from "@/utils/searchGpt";
import { useRouter } from "next/navigation";

const SearchManager = () => {
  const { updateGptMessage,  } = useChatStore();
  const [searchText, setSearchText] = useState("");
  const [log, setLog] = useState("");
  const { searchQuery, updateQuery } = useSearchStore();
  const router = useRouter();

  useEffect(() => {
    setSearchText(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const finalCallback = () => {
    updateQuery('');
    router.push('/ask-cocktail')
  }
  // const handleSearch = async () => {
  //   searchGpt({
  //     searchText,
  //     setSearchText,
  //     searchQuery: query, // `query`를 `searchQuery`로 변경하여 전달
  //     updateChatMessage,
  //     finalCallback,
  //   });
  // };
  
  const handleSearch = async () => {
    setLog("요청시작");
    setSearchText("");
    router.push('/ask-cocktail')
    // updateChatMessage(searchText, "user");

    // if (!isChatStart) {
    // updateChatStatus();
    // }
    try {
      const rsp = await fetchSearchResult(searchText);
      if (rsp) {
        updateGptMessage(rsp, "gpt");
      }
    } catch (error) {
      console.log(error);
    } finally {
      // updateQuery("");
    }
  };
  return (
    <div className="flex flex-col w-full relative ">
      <div className="bg-blue-900 hidden">LOG TEST {log}</div>
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
    </div>
  );
};

export default SearchManager;
