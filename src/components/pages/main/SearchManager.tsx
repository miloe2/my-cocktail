"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/elements/SearchBar";
import useSearchHandler from "@/hooks/useSearchHandler";
import SearchHints from "./SearchHints";
interface SearchManagerProps {
  isMainPage: boolean;
}

const SearchManager = ({ isMainPage }: SearchManagerProps) => {
  const { searchText, handleInputChange, handleSearch, clearSearchText } =
    useSearchHandler();

  const router = useRouter();

  // isMainPage가 true일 때만 router를 이용하는 함수
  const onSearchClick = useCallback(() => {
    if (isMainPage && searchText) {
      router.push("/cocktail-chat");
    }
    handleSearch("chat");
  }, [isMainPage, router, handleSearch]); // 메모이제이션된 함수로 참조 고정

  return (
    <div className="flex flex-col w-full relative ">
      <>
        <SearchBar
          onChange={handleInputChange}
          onSearchClick={onSearchClick}
          clearSearchText={clearSearchText}
          value={searchText}
        />
        {isMainPage && (
          <div className="-mr-4 mt-4">
            <SearchHints />
          </div>
        )}
      </>
    </div>
  );
};

export default SearchManager;
