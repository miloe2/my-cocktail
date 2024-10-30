"use client";
import { useState, ChangeEvent, useEffect } from "react";
import SearchBar from "@/components/elements/SearchBar";
import { searchQuery } from "@/api";
import useSearchStore from "@/store/useSearchStore";
import SearchHints from "./SearchHints";
import useChatStore from "@/store/useChatStore";
import { useRouter } from "next/navigation";

const SearchManager = () => {
  const { updateChatMessage } = useChatStore();
  const [searchText, setSearchText] = useState("");
  const [log, setLog] = useState("");
  const { searchQuery: query } = useSearchStore();
  const router = useRouter();

  useEffect(() => {
    setSearchText(query);
  }, [query]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleSearch = async () => {
    setLog("요청시작");
    setSearchText("");
    updateChatMessage(searchText, "user");
    // if (!isChatStart) {
    // updateChatStatus();
    // }
    try {
      const rsp = await searchQuery(searchText);
      if (rsp && rsp.data) {
        updateChatMessage(rsp.data.response, "gpt");
        setLog(`응답 받음: ${JSON.stringify(rsp.data)}`);
      }
    } catch (error) {
      console.log(error);
      setLog(`오류 발생: ${error}`);
    } finally {
      router.push("/ask-cocktail");
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
