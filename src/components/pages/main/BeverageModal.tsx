"use client";
import React, { useState, useRef, useCallback, useMemo } from "react";
import BottomModal from "@/components/elements/BottomModal";
import {
  drinkList,
  fruitList,
  liquorList,
  ginList,
  rumList,
  syrupList,
} from "@/data/beverage";
import TabContents from "./TabContents";
import useModalStore from "@/store/useModalStore";
import SwiperModule from "@/components/elements/SwiperModule";
import { SwiperSlide } from "swiper/react";
import useSearchHandler from "@/hooks/useSearchHandler";
import { useRouter } from "next/navigation";
interface BeverageModalProps {
  modalId: string;
}
interface tabListProps {
  title: string;
  list: { name: string; eng: string }[];
}

const BeverageModal = ({ modalId }: BeverageModalProps) => {
  console.log("beverage modal");
  const optionsSet = useRef(new Set());
  const { closeModal } = useModalStore();
  const [selected, setSelected] = useState<number>(0);
  const { handleSearch } = useSearchHandler();
  const router = useRouter();

  const tabList = [
    { title: "리큐르", list: liquorList },
    { title: "진", list: ginList },
    { title: "럼", list: rumList },
    { title: "음료", list: drinkList },
    { title: "과일", list: fruitList },
    { title: "시럽", list: syrupList },
    // { title: "주류", list: liquorCategoryList },
  ];
  const contentRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollToContent = (index: number) => {
    if (contentRefs.current[index]) {
      contentRefs.current[index].scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTab = (index: number) => {
    setSelected(index);
    scrollToContent(index);
  };
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
      <>
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
      </>
    ),
  );
  ContentsMemo.displayName = "ContentsMemo";

  // const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const handleApply = async () => {
    router.push("/cocktail-chat");
    let filterItem = Array.from(optionsSet.current).join(", ");
    // updateQuery(query);
    console.log("searchQuery", filterItem);
    handleSearch("filter", filterItem);
    closeModal(modalId);
  };
  const handleRefresh = () => {
    optionsSet.current.clear();
  };

  const addOptionToSet = useCallback((label: string) => {
    if (optionsSet.current.has(label)) {
      optionsSet.current.delete(label);
    } else {
      optionsSet.current.add(label);
    }
  }, []);

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
      onSecondaryAction={handleRefresh}
    />
  );
};

export default React.memo(BeverageModal);
