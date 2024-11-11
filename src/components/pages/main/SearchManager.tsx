"use client";
import SearchBar from "@/components/elements/SearchBar";
import SearchHints from "./SearchHints";
import useSearchHandler from "@/hooks/useSearchHandler";
import { useRouter } from "next/navigation";
interface SearchManagerProps {
  showHintComponent: boolean;
}

const SearchManager = ({ showHintComponent }: SearchManagerProps) => {
  const { searchText, handleInputChange, handleSearch, clearSearchText } =
    useSearchHandler();
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
          clearSearchText={clearSearchText}
          value={searchText}
        />
        {showHintComponent && (
          <div className="-mr-4 mt-4">
            <SearchHints />
          </div>
        )}
      </>
    </div>
  );
};

export default SearchManager;
