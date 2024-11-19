"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { fetchSearchResult } from "@/api";
import useSearchStore from "@/store/useSearchStore";
import useChatStore from "@/store/useChatStore";
import { searchGpt } from "@/utils/searchGpt";
import useAppStore from "@/store/useAppStore";
import useIndexedMessageDB from "./useIndexedMessageDB";
import { ChatGptResponse, SQLChatData } from "@/types/types";

const useSearchHandler = () => {
  const { updateChatMessage } = useChatStore();
  const { setLoadingStatus, uuid } = useAppStore();
  const { addData } = useIndexedMessageDB();

  const { searchQuery, updateQuery } = useSearchStore();
  const [searchText, setSearchText] = useState("");
  const today = new Date();

  // SearchHint 부분에서만 사용 (input value를 query로 변환 기능은 사용안함)
  useEffect(() => {
    setSearchText(searchQuery);
  }, [searchQuery]);

  // searchBar 조작
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // 검색어 초기화 버튼
  const clearSearchText = () => {
    setSearchText("");
  };

  // data 타입 변경
  const convertedIndexedDB = (
    msg: string | ChatGptResponse,
    type: "user" | "gpt" | "system",
  ): SQLChatData => {
    const data = {
      user_id: uuid,
      sender_type: type,
      message: msg,
      created_at: today.toISOString(),
      is_favorite: false,
      is_saved_data: false,
    };
    return data;
  };

  // 실제 검색 로직
  const handleSearch = async (
    searchType: "chat" | "filter",
    filterItem?: string,
  ) => {
    const query = filterItem ? `/*#filter#*/${filterItem}` : searchText;
    if (!query) {
      console.log("검색어 없음");
      return;
    }
    const userMessage = convertedIndexedDB(query, "user");
    setSearchText("");
    await addData(userMessage);
    updateChatMessage(userMessage);

    const result = await searchGpt({
      setLoadingStatus,
      searchText: query,
      fetchSearchResult,
      searchType,
    });

    const gptMessage = convertedIndexedDB(
      result !== "error"
        ? result
        : "원하는 칵테일을 찾지 못했어요. \n 검색어를 바꿔 다시 시도해보세요! 😅",
      result !== "error" ? "gpt" : "system",
    );

    updateChatMessage(gptMessage);
    await addData(gptMessage);
    updateQuery("");
  };

  return { handleInputChange, handleSearch, searchText, clearSearchText };
};
export default useSearchHandler;
