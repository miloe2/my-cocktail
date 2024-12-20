"use client";
import React, { useCallback, memo } from "react";
import ScrollableBox from "@/components/elements/ScrollableBox";
import useSearchStore from "@/store/useSearchStore";

const SearchHints = memo(() => {
  const { setTemporaryText } = useSearchStore();

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const text = (e.target as HTMLElement).innerText; // 클릭된 요소의 텍스트 가져오기
    setTemporaryText(text);
  }, []);

  SearchHints.displayName = "SearchHints";
  return (
    <>
      {/* <div>SearchHints</div> */}
      <ScrollableBox>
        <div
          className="py-2.5 px-4 ml-6 bg-neutral-600 rounded-md mr-3"
          onClick={handleClick}
        >
          도수가 낮은 칵테일 추천해줘
        </div>
        <div
          className="py-2.5 px-4 bg-neutral-600 rounded-md mr-3"
          onClick={handleClick}
        >
          짐빔으로 만들수 있는 칵테일은?
        </div>
        <div
          className="py-2.5 px-4 bg-neutral-600 rounded-md mr-3"
          onClick={handleClick}
        >
          혼자 즐기는 칵테일
        </div>
      </ScrollableBox>
    </>
  );
});
export default memo(SearchHints);
