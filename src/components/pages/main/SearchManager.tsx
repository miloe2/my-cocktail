"use client";
import { useCallback, useEffect, memo, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/elements/SearchBar";
import useSearchHandler from "@/hooks/useSearchHandler";
import useAppStore from "@/store/useAppStore";
import LoadingCocktail from "@/components/elements/LoadingCocktail";
import useChatStore from "@/store/useChatStore";
import useSearchStore from "@/store/useSearchStore";

interface SearchManagerProps {
  isMainPage: boolean;
}

// LoadingCocktail을 memoize 처리하여 재렌더링 방지
const MemoizedLoadingCocktail = memo(LoadingCocktail);

const SearchManager = ({ isMainPage }: SearchManagerProps) => {
  const { handleSearch, convertedIndexedDB } = useSearchHandler();
  const { temporaryText, setTemporaryText } = useSearchStore();
  const { pathLoading, setPathLoading } = useAppStore();
  const { updateChatMessage } = useChatStore();
  const router = useRouter();

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (temporaryText) {
      setSearchText(temporaryText);
      setTemporaryText("");
    }
  }, [temporaryText]);

  // searchBar 조작
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // 검색어 초기화 버튼
  const clearSearchText = () => {
    setSearchText("");
  };

  const userMessage = convertedIndexedDB(searchText, "user");
  // isMainPage가 true일 때만 router를 이용하는 함수
  const onSearchClick = useCallback(() => {
    if (!searchText) {
      return;
    }
    if (isMainPage && searchText) {
      setPathLoading();
    } else {
      updateChatMessage(userMessage);
    }
    handleSearch({ searchType: "chat", msg: userMessage });
    setSearchText("");
  }, [handleSearch, searchText, setPathLoading]); // 메모이제이션된 함수로 참조 고정

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>; // 타이머 타입을 추론
    if (pathLoading) {
      timer = setTimeout(() => {
        // 전역 상태 trigger로 BeverageModal의 apply도 같이 router 이동이 가능
        router.push("/cocktail-chat");
        setPathLoading();
      }, 6000);
    }

    return () => clearTimeout(timer);
  }, [pathLoading, setPathLoading]);

  return (
    <div className="flex flex-col w-full relative h-full">
      <SearchBar
        onChange={handleInputChange}
        onSearchClick={onSearchClick}
        clearSearchText={clearSearchText}
        value={searchText}
      />
      {pathLoading && <MemoizedLoadingCocktail />}
    </div>
  );
};

export default SearchManager;
