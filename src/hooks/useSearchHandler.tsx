"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { fetchSearchResult } from "@/api";
import useSearchStore from "@/store/useSearchStore";
import useChatStore from "@/store/useChatStore";
import { searchGpt } from "@/utils/searchGpt";
import useAppStore from "@/store/useAppStore";

const useSearchHandler = () => {
  const { updateGptMessage, updateUserMessage } = useChatStore();
  const { setLoadingStatus } = useAppStore();
  const { searchQuery, updateQuery } = useSearchStore();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setSearchText(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const clearSearchText = () => {
    setSearchText("");
    console.log("clicked", searchText);
  };

  const today = new Date();
  const time = `${today.getHours().toString().padStart(2, "0")}:${today.getMinutes().toString().padStart(2, "0")}`;

  const handleSearch = async (
    searchType: "chat" | "filter",
    filterItem?: string,
  ) => {
    if (!searchText && !filterItem) {
      console.log("검색어 없음");
      return;
    }
    const query = searchText || (filterItem as string);
    updateUserMessage(query, time);
    // console.log("searchGPT 실행해!!");
    searchGpt({
      setLoadingStatus,
      searchText: query,
      fetchSearchResult,
      searchType,
      updateGptMessage,
    });
    setSearchText("");
    updateQuery("");
  };

  return { handleInputChange, handleSearch, searchText, clearSearchText };
};
export default useSearchHandler;
