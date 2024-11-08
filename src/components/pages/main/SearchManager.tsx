"use client";
import SearchBar from "@/components/elements/SearchBar";
import SearchHints from "./SearchHints";
import useSearchHandler from "@/hooks/useSearchHandler";
import { useRouter } from "next/navigation";

const SearchManager = () => {
  const { searchText, handleInputChange, handleSearch } = useSearchHandler();
  const router = useRouter();
  // 3. 페이지별 특화된 핸들러
  const handleMainSearch = () => {
    handleSearch("chat");
    router.push("/cocktail-chat"); // 라우터 이동
  };
  return (
    <div className="flex flex-col w-full relative ">
      <>
        <SearchBar
          onChange={handleInputChange}
          onSearchClick={handleMainSearch}
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
