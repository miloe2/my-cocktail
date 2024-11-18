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
  const { updateGptMessage, updateUserMessage, updateSystemMessage } =
    useChatStore();
  const { setLoadingStatus, uuid } = useAppStore();
  const { addData } = useIndexedMessageDB();

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

  const convertedIndexedDB = (
    msg: string | ChatGptResponse,
    type: "user" | "gpt" | "system",
  ) => {
    const data = {
      user_id: uuid,
      sender_type: type,
      message: msg,
      created_at: today.toISOString(),
      is_favorite: false,
      is_saved_data: false,
    } as SQLChatData;
    return data;
  };

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
    const userMessage = convertedIndexedDB(query, "user");
    setSearchText("");
    await addData(userMessage);
    const regQuery = filterItem ? `/*#filter#*/${query}` : query;
    updateUserMessage(regQuery, time);
    const result = await searchGpt({
      setLoadingStatus,
      searchText: query,
      fetchSearchResult,
      searchType,
    });
    if (result !== "error") {
      updateGptMessage(result);
    } else {
      updateSystemMessage(
        "원하는 칵테일을 찾지 못했어요. \n 검색어를 바꿔 다시 시도해보세요! 😅",
      );
    }
    const gptMessage = convertedIndexedDB(result, "gpt");
    await addData(gptMessage);
    updateQuery("");
  };

  return { handleInputChange, handleSearch, searchText, clearSearchText };
};
export default useSearchHandler;
