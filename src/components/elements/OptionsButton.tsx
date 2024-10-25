import React, { useState } from "react";

export interface OptionsButtonProps {
  label: string;
  // isSelected? :boolean;
  onClick?: (isSelected : boolean) => void;
}

export const OptionsButton = ({
  label = "button",
  onClick,
}: OptionsButtonProps) => {
  const [ isSelected , setIsSelected ] = useState(false);

  const handleClick = () => {
    setIsSelected((prev) => {
      const newValue = !prev;
      if(onClick) {
        onClick(newValue);
      }
      return newValue
    })
  }

  // const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const buttonElement = e.currentTarget;
  //   clicked.split(" ").forEach((style) => {
  //     buttonElement.classList.toggle(style);
  //   });

  //   // 배경색을 추가하거나 제거
  //   // if (buttonElement.classList.contains('clicked')) {
  //   //   buttonElement.classList.remove('clicked');
  //   // } else {
  //   //   buttonElement.classList.add('clicked');
  //   // }

  //   // 외부에서 전달받은 onClick 실행
  //   if (onClick) {
  //     onClick();
  //   }
  // };

  return (
    <button
      onClick={handleClick}
      className={`
        ${isSelected ? 'bg-black border border-black' : 'border border-zinc-400'}
        px-3 py-[2px] rounded-full   text-sm mr-2 mb-3`}
    >
      {label}
    </button>
  );
};

export default OptionsButton;
