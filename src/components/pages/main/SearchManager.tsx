"use client";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/elements/SearchBar";
import useSearchHandler from "@/hooks/useSearchHandler";
import SearchHints from "./SearchHints";
interface SearchManagerProps {
  showHintComponent: boolean;
}

const SearchManager = ({ showHintComponent }: SearchManagerProps) => {
  const { searchText, handleInputChange, handleSearch, clearSearchText } =
    useSearchHandler();
  const router = useRouter();
  const handleMainSearch = () => {
    router.push("/cocktail-chat");
    handleSearch("chat");
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
