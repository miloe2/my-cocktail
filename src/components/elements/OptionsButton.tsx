// OptionsButton.tsx
'use client'
import React, {useState} from "react";

export interface OptionsButtonProps {
  label: string;
  onClick?: () => void;
  onUpdateSelection : (label:string) => void;
  // isSelected?: boolean;
}

export const OptionsButton =({
  label = "button",
  onClick,
  onUpdateSelection,
  // isSelected = false,
}: OptionsButtonProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = (label:string) => {
    setIsSelected((prev) => !prev); // 이전 상태를 반전
    onUpdateSelection(label)
    if(onClick) {
      onClick()
    }
  };

  return (
    <button
      onClick={() => handleClick(label)}
      className={`
        ${isSelected ? "bg-black border border-black" : "border border-zinc-400"}
        px-3 py-[2px] rounded-full text-sm mr-2 mb-3`}
    >
      {label}
    </button>
  );
};

export default  React.memo(OptionsButton);
