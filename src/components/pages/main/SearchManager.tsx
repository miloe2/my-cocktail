"use client";
import { useState, ChangeEvent, useEffect } from "react";
import SearchBar from "@/components/elements/SearchBar";
import { searchQuery } from "@/api";
import useSearchStore from "@/store/useSearchStore";

const SearchManager = () => {
  const [searchText, setSearchText] = useState("");
  const {searchQuery : query} = useSearchStore();
  const [result] = useState("");
  
  // const debouncedQuery = useCallback(
  //   debounce((value: string) => {
  //     updateQuery(value);
  //     console.log('searchQuery', searchQuery);
  //   }, 1000),
  //   [],
  // );

  useEffect(() => {
    setSearchText(query)
  }, [query])

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
      <SearchBar onChange={handleInputChange} onSearchClick={handleSearch} value={searchText} />
    </div>
  );
};

export default SearchManager;
