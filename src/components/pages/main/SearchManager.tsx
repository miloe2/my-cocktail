"use client";
import { useState, ChangeEvent } from "react";
import SearchBar from "@/components/elements/SearchBar";
import { searchQuery } from "@/api";

const SearchManager = () => {
  const [searchText, setSearchText] = useState("");
  const [result] = useState("");
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
    const rsp = await searchQuery(searchText);
    console.log("components rsp", rsp);
    // setResult(rsp)
    // console.log("검색어", searchText);
  };
  return (
    <div>
      <SearchBar onChange={handleInputChange} onSearchClick={handleSearch} />
      {result}
    </div>
  );
};

export default SearchManager;
