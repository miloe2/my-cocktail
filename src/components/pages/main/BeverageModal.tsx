"use client";
import React, { useState, useRef, useCallback } from "react";
import BottomModal from "@/components/elements/BottomModal";
import {
  liquorCategoryList,
  drinkList,
  fruitList,
  liquorList,
  ginList,
  rumList,
  syrupList,
} from "@/data/beverage";
import TabContents from "./TabContents";
import useSearchStore from "@/store/useSearchStore";
import useModalStore from "@/store/useModalStore";
import SwiperModule from "@/components/elements/SwiperModule";
import { SwiperSlide } from "swiper/react";
interface BeverageModalProps {
  modalId: string;
}

const BeverageModal = ({ modalId }: BeverageModalProps) => {
  console.log("beverage modal");
  const { updateQuery } = useSearchStore();
  const optionsSet = useRef(new Set());
  const { closeModal } = useModalStore();
  const [selected, setSelected] = useState<number>(0);
  const tabList = [
    { title : "주류", list: liquorCategoryList },
    { title: "음료", list: drinkList },
    { title: "과일", list: fruitList },
    { title: "리큐르", list: liquorList },
    { title: "진", list: ginList },
    { title: "럼", list: rumList },
    { title: "시럽", list: syrupList },
  ]
  const slides = tabList.map((slide, index) => (
    <SwiperSlide key={index}>
      <div
        className="mx-auto w-1/2"
        onClick={() => handleTab(index)}
      >
        <div
          className={`${selected === index ? "text-white" : "text-stone-500"} bg-red-00 text-center py-4`}
        >
          {slide.title}
        </div>
      </div>
    </SwiperSlide>
  ));


  const contentRefs = useRef([]);
  const scrollToContent = (index : number) => {
    // 해당 ref가 존재하는 경우 스크롤 이동
    if (contentRefs.current[index]) {
      //@ts-ignore
      contentRefs.current[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTab = (index: number) => {
    setSelected(index);
    scrollToContent(index)
  };
  // const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const handleApply = () => {
    let query = Array.from(optionsSet.current).join(", ");
    updateQuery(query);
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
        <>
        {
          tabList.map((tab, index) => (
            <TabContents
              key={index}
              title={tab.title}
              list={tab.list}
              onSelectOption={(label) => addOptionToSet(label)}
              //@ts-ignore
              ref={(el) => (contentRefs.current[index] = el)}
            />
          ))
        }
        </>
      }
      onPrimaryAction={handleApply}
      onSecondaryAction={handleRefresh}
    />
  );
};

export default React.memo(BeverageModal);
