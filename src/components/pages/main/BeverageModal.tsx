"use client";
import React, { useState, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { SwiperSlide } from "swiper/react";
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

  const handleTab = (index: number) => {
    setSelected(index);
    scrollToContent(index);
  };

  const handleTabIO = (index: number) => {
    setSelected(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index); // 선택된 탭으로 스와이퍼 이동
    }
  };

  useIntersectionObserver(contentRefs.current, handleTabIO);

  const handleApply = async () => {
    router.push("/cocktail-chat");
    let filterItem = Array.from(optionsSet.current).join(", ");
    console.log("searchQuery", filterItem);
    handleSearch("filter", filterItem);
    closeModal(modalId);
  };

  const addOptionToSet = useCallback((label: string) => {
    if (optionsSet.current.has(label)) {
      optionsSet.current.delete(label);
    } else {
      optionsSet.current.add(label);
    }
  }, []);

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
