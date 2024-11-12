"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { fetchSearchResult } from "@/api";
import useSearchStore from "@/store/useSearchStore";
import useChatStore from "@/store/useChatStore";
import { searchGpt } from "@/utils/searchGpt";
import useAppStore from "@/store/useAppStore";

const useSearchHandler = () => {
  const { updateGptMessage, updateUserMessage, updateSystemMessage } =
    useChatStore();
  const { setLoadingStatus } = useAppStore();
  const { searchQuery, updateQuery } = useSearchStore();
  const [searchText, setSearchText] = useState("");

  // SearchHint 부분에서만 사용 이제 해당 내용은 사용안함
  useEffect(() => {
    setSearchText(searchQuery);
  }, [searchQuery]);

  // searchBar 조작
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const clearSearchText = () => {
    setSearchText("");
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
    // 검색어/필터아이템을 query로 선언
    const query = searchText || (filterItem as string);
    updateUserMessage(query, time);
    setSearchText("");
    const result = await searchGpt({
      setLoadingStatus,
      searchText: query,
      fetchSearchResult,
      searchType,
    });
    if (result === "error") {
      updateSystemMessage("오류입니다~~");
    } else {
      updateGptMessage(result);
    }
    updateQuery("");
  };

  return { handleInputChange, handleSearch, searchText, clearSearchText };
};
export default useSearchHandler;
