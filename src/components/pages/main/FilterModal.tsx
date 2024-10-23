'use client'
import React, { useState, useRef, useEffect } from 'react'
import BottomModal from '@/components/elements/BottomModal'
import { OptionsButton } from '@/components/elements/OptionsButton';
import { liqueurList } from '@/data/beverage';

  // 배열 Ref로 각 버튼을 참조
const FilterModal = () => {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selected, setSelected] = useState<number>(0);
  const idxArr = ['index1', 'index2', 'index3',];
  const [dimensions, setDimensions] = useState<{ offsetLeft: number, clientWidth: number }>({
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
        console.log(`Initial Button OffsetLeft: ${currentButton.offsetLeft}, ClientWidth: ${currentButton.clientWidth}`);
      }
    }
  }, []); 

  const handleClick = (idx: number) => {
    setSelected(idx);

    const currentButton = buttonRefs.current[idx];
    if (currentButton) {
      const offsetLeft = currentButton.offsetLeft;
      console.log(`Button Index: ${idx}, OffsetLeft: ${offsetLeft}`);
      // 기존 dimensions 상태를 복사하고 offsetLeft만 업데이트
      setDimensions((prevDimensions) => ({
        ...prevDimensions,
        offsetLeft: offsetLeft,
      }));
    }
  };

  return (
    <BottomModal
    className=''>
      <div className='w-full h-12 flex mb-4 sticky top-0 bg-stone-500 -mx-1'>
        {
          idxArr.map((btn, i) => (
              <div className='flex flex-col w-full py-2 '>
                <a href={`#index0${i+1}`} className='mx-auto w-1/2'>
                  <button 
                  key={i}
                  ref={(el) => {
                    buttonRefs.current[i] = el; // 반환값이 없도록 변경
                  }}
                  className={`${selected === i ? 'font-bold' : 'font-medium'} pt-2 w-full  text-sm   `}
                  onClick={() => handleClick(i)}
                  >{btn}</button>
                </a>
                <div 
                className={`transition-all duration-500 absolute bottom-0  h-1 border-b-2 border-zinc-50 inline-block mx-auto` }
                style={{
                  left: dimensions.offsetLeft,
                  width : dimensions.clientWidth,
                  borderBottom : '1px solid #ddd'
                }}
                ></div>
              </div>
          )) 
        }
      </div>

      <div className='flex flex-col' id='index01' style={{ scrollMarginTop: '60px' }}>
        <h1 className='mb-4'>idx01</h1>
        <div>
          {
            liqueurList.map((item) => (
              <OptionsButton
              label={item}
              ></OptionsButton>
            ))
          }
        </div>
      </div>
      <div className='h-80 w-20 bg-red-500' id='index02'></div>
      <div className='min-h-svh h-80 w-20 bg-red-400 flex justify-end items-end' id='index03'></div>
    </BottomModal>
  )
}

export default FilterModal