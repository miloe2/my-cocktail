"use client";
import { useState, ChangeEvent, useEffect } from "react";
import SearchBar from "@/components/elements/SearchBar";
import { fetchSearchResult } from "@/api";
import useSearchStore from "@/store/useSearchStore";
import SearchHints from "./SearchHints";
import useChatStore from "@/store/useChatStore";
import { searchGpt } from "@/utils/searchGpt";
import { useRouter } from "next/navigation";
import useAppStore from "@/store/useAppStore";

const SearchManager = () => {
  const { updateGptMessage, updateUserMessage } = useChatStore();
  const { setLoadingStatus } = useAppStore();
  const [searchText, setSearchText] = useState("");
  const { searchQuery, updateQuery } = useSearchStore();
  const router = useRouter();

  useEffect(() => {
    setSearchText(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearch = async () => {
    if (searchText === "") return;
    router.push("/cocktail-chat");
    updateUserMessage(searchText, "user");
    searchGpt({
      setLoadingStatus,
      searchText,
      fetchSearchResult,
      updateGptMessage,
    });
    setSearchText("");
    updateQuery("");
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
