"use client";
import React, { useState, useRef, useEffect } from "react";
import BottomModal from "@/components/elements/BottomModal";
import { liquorList, ginList, rumList } from "@/data/beverage";
import TabContents from "./TabContents";
import useSearchStore from "@/store/useSearchStore";
import useModalStore from "@/store/useModalStore";
interface BeverageModalProps {
  modalId: string;
}

// 배열 Ref로 각 버튼을 참조
const BeverageModal = ({ modalId }: BeverageModalProps) => {
  const { selectedOption, updateQuery, clearOptions } = useSearchStore();
  const { closeModal } = useModalStore();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selected, setSelected] = useState<number>(0);
  const idxArr = ["리큐르", "진", "럼"];
  const [dimensions, setDimensions] = useState<{
    offsetLeft: number;
    clientWidth: number;
  }>({
    offsetLeft: 0,
    clientWidth: 0,
  });

  useEffect(() => {
    if (buttonRefs.current[0]) {
      const currentButton = buttonRefs.current[0];
      if (currentButton) {
        setDimensions({
          offsetLeft: currentButton.offsetLeft,
          clientWidth: currentButton.clientWidth,
        });
        // console.log(
        //   `Initial Button OffsetLeft: ${currentButton.offsetLeft}, ClientWidth: ${currentButton.clientWidth}`,
        // );
      }
    }
  }, []);

  const handleClick = (idx: number) => {
    setSelected(idx);

    const currentButton = buttonRefs.current[idx];
    if (currentButton) {
      const offsetLeft = currentButton.offsetLeft;
      // console.log(`Button Index: ${idx}, OffsetLeft: ${offsetLeft}`);
      // 기존 dimensions 상태를 복사하고 offsetLeft만 업데이트
      setDimensions((prevDimensions) => ({
        ...prevDimensions,
        offsetLeft: offsetLeft,
      }));
    }
  };
  const handleApply = () => {
    const selectedOptionArray = Array.from(selectedOption);
    // console.log(JSON.stringify(selectedOptionArray));
    let query = selectedOptionArray.join(", ");
    // console.log(query)
    // console.log('selectOption', selectedOption);
    updateQuery(query);
    closeModal(modalId);
  };
  const handleRefresh = () => {
    clearOptions();
  };

  return (
    <BottomModal
      id={modalId}
      onPrimaryAction={handleApply}
      onSecondaryAction={handleRefresh}
      tab={
        <div className="flex ">
          {idxArr.map((btn, i) => (
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
          ))}
        </div>
      }
      content={
        <>
          <TabContents anchorId="index01" title={idxArr[0]} list={liquorList} />
          <TabContents anchorId="index02" title={idxArr[1]} list={ginList} />
          <TabContents anchorId="index03" title={idxArr[2]} list={rumList} />
        </>
      }
    />
  );
};

export default BeverageModal;

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
