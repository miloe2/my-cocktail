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
  const { updateGptMessage, setLastGptMessage, updateUserMessage } = useChatStore();
  const [searchText, setSearchText] = useState("");
  const { searchQuery, updateQuery } = useSearchStore();
  const router = useRouter();

  useEffect(() => {
    setSearchText(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  // const finalCallback = () => {
  //   updateQuery("");
  //   router.push("/ask-cocktail");
  // };

  const handleSearch = async () => {
    setSearchText("");
    router.push("/ask-cocktail");
    updateUserMessage(searchText, "user");
    searchGpt({
      searchText,
      fetchSearchResult,
      updateGptMessage,
      setLastGptMessage
    });
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
