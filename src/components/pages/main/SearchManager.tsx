"use client";
import SearchBar from "@/components/elements/SearchBar";
import SearchHints from "./SearchHints";
import useSearchHandler from "@/hooks/useSearchHandler";

const SearchManager = () => {
  const { searchText, handleInputChange, handleSearch } = useSearchHandler();
  return (
    <div className="flex flex-col w-full relative ">
      <>
        <SearchBar
          onChange={handleInputChange}
          onSearchClick={handleSearch}
          path={'/cocktail-chat'}
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
