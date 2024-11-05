"use client";
import React, { useState, useRef } from "react";
import BottomModal from "@/components/elements/BottomModal";
import { liquorCategoryList, drinkList, fruitList, syrupList,  liquorList, ginList, rumList } from "@/data/beverage";
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
  const idxArr = ["주류", "음료", "과일", "리큐르", "진", "럼", "시럽"];
  const slides = idxArr.map((slide, index) => (
    <SwiperSlide key={index + 1}>
      <a
        href={`#index0${index + 1}`}
        className="mx-auto w-1/2"
        onClick={() => handleTab(index)}
      >
        <div
          className={`${selected === index ? "text-white" : "text-stone-500"} bg-red-00 text-center py-4`}
        >
          {slide}
        </div>
      </a>
    </SwiperSlide>
  ));

  const handleTab = (index: number) => {
    setSelected(index);
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
  // const [dimensions, setDimensions] = useState<{
  //   offsetLeft: number;
  //   clientWidth: number;
  // }>({
  //   offsetLeft: 0,
  //   clientWidth: 0,
  // });

  // useEffect(() => {
  //   if (buttonRefs.current[0]) {
  //     const currentButton = buttonRefs.current[0];
  //     if (currentButton) {
  //       setDimensions({
  //         offsetLeft: currentButton.offsetLeft,
  //         clientWidth: currentButton.clientWidth,
  //       });
  //       // console.log(
  //       //   `Initial Button OffsetLeft: ${currentButton.offsetLeft}, ClientWidth: ${currentButton.clientWidth}`,
  //       // );
  //     }
  //   }
  // }, []);

  // 탭키 활성화하는 handler
  // const handleClick = (idx: number) => {
  //   setSelected(idx);

  //   const currentButton = buttonRefs.current[idx];
  //   if (currentButton) {
  //     const offsetLeft = currentButton.offsetLeft;
  //     // console.log(`Button Index: ${idx}, OffsetLeft: ${offsetLeft}`);
  //     // 기존 dimensions 상태를 복사하고 offsetLeft만 업데이트
  //     setDimensions((prevDimensions) => ({
  //       ...prevDimensions,
  //       offsetLeft: offsetLeft,
  //     }));
  //   }
  // };
  const addOptionToSet = (label: string) => {
    if (optionsSet.current.has(label)) {
      optionsSet.current.delete(label);
    } else {
      optionsSet.current.add(label);
    }
    console.log(optionsSet);
  };

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
          <TabContents
            anchorId="index01"
            title={idxArr[0]}
            list={liquorCategoryList}
            onSelectOption={(label) => addOptionToSet(label)}
          />
          <TabContents
            anchorId="index02"
            title={idxArr[1]}
            list={drinkList}
            onSelectOption={(label) => addOptionToSet(label)}
          />
          <TabContents
            anchorId="index03"
            title={idxArr[2]}
            list={fruitList}
            onSelectOption={(label) => addOptionToSet(label)}
          />
          <TabContents
            anchorId="index04"
            title={idxArr[3]}
            list={liquorList}
            onSelectOption={(label) => addOptionToSet(label)}
          />
          <TabContents
            anchorId="index05"
            title={idxArr[4]}
            list={ginList}
            onSelectOption={(label) => addOptionToSet(label)}
          />
          <TabContents
            anchorId="index06"
            title={idxArr[5]}
            list={rumList}
            onSelectOption={(label) => addOptionToSet(label)}
          />
          <TabContents
            anchorId="index07"
            title={idxArr[6]}
            list={syrupList}
            onSelectOption={(label) => addOptionToSet(label)}
          />
        </>
      }
      onPrimaryAction={handleApply}
      onSecondaryAction={handleRefresh}
    />
  );
};

export default React.memo(BeverageModal);

{
  /* {idxArr.map((btn, i) => (
      <div key={i} className="flex flex-col w-full py-2 ">
        <a href={`#index0${i + 1}`} className="mx-auto w-1/2">
          <button
            ref={(el) => {
              buttonRefs.current[i] = el; // 반환값이 없도록 변경
            }}
            className={`${selected === i ? "font-bold" : "font-medium"} pt-2 w-full  text-sm   `}
            onClick={() => handleClick(i)}
          >
            {btn}
          </button>
        </a>
        <div
          className={`transition-all duration-500 absolute bottom-0  h-1 border-b-2 border-zinc-50 inline-block mx-auto`}
          style={{
            left: dimensions.offsetLeft,
            width: dimensions.clientWidth,
            borderBottom: "1px solid #ddd",
          }}
        ></div>
      </div>
    ))} */
}
{
  /* </div> */
}
