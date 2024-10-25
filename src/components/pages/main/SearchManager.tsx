"use client";
import { useState, useCallback, ChangeEvent } from "react";
import SearchBar from "@/components/elements/SearchBar";
import { test } from "@/api";

const SearchManager = () => {
  const [searchText, setSearchText] = useState("");
  // const debouncedQuery = useCallback(
  //   debounce((value: string) => {
  //     updateQuery(value);
  //     console.log('searchQuery', searchQuery);
  //   }, 1000),
  //   [],
  // );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    // debouncedQuery(searchText);
  };
  const handleSearch = async () => {
    await test();
    // console.log("검색어", searchText);
  };
  return (
    <div>
      <SearchBar onChange={handleInputChange} onSearchClick={handleSearch} />
    </div>
  );
};

export default SearchManager;
