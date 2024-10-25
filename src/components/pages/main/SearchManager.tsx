"use client";
import { useState, useCallback, ChangeEvent } from "react";
import SearchBar from "@/components/elements/SearchBar";
import { debounce } from "lodash";

const SearchManager = () => {
  const [searchText, setSearchText] = useState("");
  const debouncedQuery = useCallback(
    debounce((value: string) => {
      console.log(value);
    }, 1000),
    [],
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    debouncedQuery(searchText);
  };
  const handleSearch = () => {
    console.log("검색어", searchText);
  };
  return (
    <div>
      <SearchBar onChange={handleInputChange} onSearchClick={handleSearch} />
    </div>
  );
};

export default SearchManager;
