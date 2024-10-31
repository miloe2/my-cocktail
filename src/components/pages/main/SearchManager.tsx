"use client";
import { useState, ChangeEvent, useEffect } from "react";
import SearchBar from "@/components/elements/SearchBar";
import { searchQuery } from "@/api";
import useSearchStore from "@/store/useSearchStore";
import SearchHints from "./SearchHints";
import useChatStore from "@/store/useChatStore";
import { searchGpt } from "@/utils/searchGpt";
import { useRouter } from "next/navigation";

const SearchManager = () => {
  const { updateChatMessage } = useChatStore();
  const [searchText, setSearchText] = useState("");
  const { searchQuery: query, updateQuery } = useSearchStore();
  const router = useRouter();

  useEffect(() => {
    setSearchText(query);
  }, [query]);

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
    router.push("/ask-cocktail");
    setSearchText("");
    updateChatMessage(searchText, "user");
    // if (!isChatStart) {
    // updateChatStatus();
    // }
    try {
      const rsp = await searchQuery(searchText);
      if (rsp && rsp.data) {
        updateChatMessage(rsp.data.response, "gpt");
      }
    } catch (error) {
      console.log(error);
    } finally {
      updateQuery("");
      router.push('/ask-cocktail')
    }
  };
  return (
    <div className="flex flex-col w-full relative ">
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
