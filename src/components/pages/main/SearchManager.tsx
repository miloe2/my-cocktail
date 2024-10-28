"use client";
import { useState, ChangeEvent, useEffect } from "react";
import SearchBar from "@/components/elements/SearchBar";
import { searchQuery } from "@/api";
import useSearchStore from "@/store/useSearchStore";
import SearchHints from "./SearchHints";
import useChatStore from "@/store/useChatStore";

const SearchManager = () => {
  const { isChatStart } = useChatStore();
  const [searchText, setSearchText] = useState("");
  const { searchQuery: query } = useSearchStore();

  // const debouncedQuery = useCallback(
  //   debounce((value: string) => {
  //     updateQuery(value);
  //     console.log('searchQuery', searchQuery);
  //   }, 1000),
  //   [],
  // );

  useEffect(() => {
    setSearchText(query);
  }, [query]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    // debouncedQuery(searchText);
  };
  const handleSearch = async () => {
    const rsp = await searchQuery(searchText);
    console.log("components rsp", rsp);
    // setResult(rsp)
    // console.log("검색어", searchText);
  };
  return (
    <div className="flex flex-col w-full">
      {!isChatStart ? (
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
      ) : (
        <div className="bg-red-500 flex">
          <div>isChatStart {isChatStart.toString()}</div>
        </div>
      )}
    </div>
  );
};

export default SearchManager;
