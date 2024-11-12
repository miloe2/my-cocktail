"use client";
import React, { useState, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { SwiperSlide } from "swiper/react";
import { debounce } from "lodash";
import SwiperCore from "swiper";
import BottomModal from "@/components/elements/BottomModal";
import SwiperModule from "@/components/elements/SwiperModule";
import {
  drinkList,
  fruitList,
  liquorList,
  ginList,
  rumList,
  syrupList,
} from "@/data/beverage";
import useModalStore from "@/store/useModalStore";
import useSearchHandler from "@/hooks/useSearchHandler";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import TabContents from "./TabContents";

interface BeverageModalProps {
  modalId: string;
}
interface tabListProps {
  title: string;
  list: { name: string; eng: string }[];
}

const BeverageModal = ({ modalId }: BeverageModalProps) => {
  console.log("beverage modal");

  const tabList = [
    { title: "리큐르", list: liquorList },
    { title: "진", list: ginList },
    { title: "럼", list: rumList },
    { title: "음료", list: drinkList },
    { title: "과일", list: fruitList },
    { title: "시럽", list: syrupList },
    // { title: "주류", list: liquorCategoryList },
  ];

  const { closeModal } = useModalStore();
  const { handleSearch } = useSearchHandler();
  const router = useRouter();

  const optionsSet = useRef(new Set());
  const swiperRef = useRef<SwiperCore | null>(null);
  const contentRefs = useRef<(HTMLElement | null)[]>([]);

  const [selected, setSelected] = useState<number>(0);

  const scrollToContent = (index: number) => {
    if (contentRefs.current[index]) {
      contentRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // tab 클릭시, 해당 위치로 스크롤 이동
  const handleTab = debounce((index: number) => {
    setSelected(index);
    scrollToContent(index);
  }, 50);

  // 스크롤에 따라 tab 메뉴 Swipe
  const handleTabIO = debounce((index: number) => {
    setSelected(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  }, 200);

  // 스크롤 감시를 위한 IO설정 & ref 전달
  useIntersectionObserver(contentRefs.current, handleTabIO);

  // 필터 적용 클릭 시, router 이동 & item전달
  const handleApply = async () => {
    router.push("/cocktail-chat");
    let filterItem = Array.from(optionsSet.current).join(", ");
    // console.log("searchQuery", filterItem);
    handleSearch("filter", filterItem);
    closeModal(modalId);
    optionsSet.current.clear();
  };

  // 필터 아이템 추가/삭제
  const addOptionToSet = useCallback((label: string) => {
    if (optionsSet.current.has(label)) {
      optionsSet.current.delete(label);
    } else {
      optionsSet.current.add(label);
    }
  }, []);

  // SwiperMoudule 사용을 위한 slides template
  const slides = useMemo(
    () =>
      tabList.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="mx-auto w-1/2" onClick={() => handleTab(index)}>
            <div
              className={`${
                selected === index ? "text-white" : "text-stone-500"
              } bg-red-00 text-center py-4`}
            >
              {slide.title}
            </div>
          </div>
        </SwiperSlide>
      )),
    [selected, handleTab],
  );

  // tabContents template
  const ContentsMemo = React.memo(
    ({
      tabList,
      addOptionToSet,
      contentRefs,
    }: {
      tabList: tabListProps[];
      addOptionToSet: (label: string) => void;
      contentRefs: React.MutableRefObject<(HTMLElement | null)[]>;
    }) => (
      <div className="modal-tab">
        {tabList.map((tab: tabListProps, index: number) => (
          <TabContents
            key={index}
            title={tab.title}
            list={tab.list}
            onSelectOption={(label) => addOptionToSet(label)}
            ref={(el) => {
              contentRefs.current[index] = el;
            }}
          />
        ))}
      </div>
    ),
  );
  ContentsMemo.displayName = "ContentsMemo";

  return (
    <BottomModal
      id={modalId}
      tab={
        <SwiperModule
          loop={false}
          navigation={false}
          pagination={false}
          slidesPerView={3.6}
          slides={slides}
          freeMode={false}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        />
      }
      content={
        <ContentsMemo
          tabList={tabList}
          addOptionToSet={addOptionToSet}
          contentRefs={contentRefs}
        />
      }
      onPrimaryAction={handleApply}
    />
  );
};

export default React.memo(BeverageModal);
