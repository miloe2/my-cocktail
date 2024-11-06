"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { fetchSearchResult } from "@/api";
import useSearchStore from "@/store/useSearchStore";
import useChatStore from "@/store/useChatStore";
import { searchGpt } from "@/utils/searchGpt";
import { useRouter } from "next/navigation";
import useAppStore from "@/store/useAppStore";

const useSearchHandler = () => {
  const { updateGptMessage, updateUserMessage } = useChatStore();
  const { setLoadingStatus } = useAppStore();
  const { searchQuery, updateQuery } = useSearchStore();
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  useEffect(() => {
    setSearchText(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const today = new Date();
  const time = `${today.getHours()}:${today.getMinutes()}`;

  const handleSearch = async (redirectToPath?: string) => {
    if (searchText === "") return;
    if (redirectToPath) {
      router.push(redirectToPath);
    }
    updateUserMessage(searchText, time);
    searchGpt({
      setLoadingStatus,
      searchText,
      fetchSearchResult,
      updateGptMessage,
    });
    setSearchText("");
    updateQuery("");
  };

  return { handleInputChange, handleSearch, searchText };
};
export default useSearchHandler;
