// OptionsButton.tsx
"use client";
import React from "react";

export interface OptionsButtonProps {
  label: string;
  onClick?: () => void;
  isSelected: boolean;
}

export const OptionsButton = ({
  label = "button",
  isSelected,
  onClick,
}: OptionsButtonProps) => {
  // console.log("option Button");
  return (
    <button
      onClick={onClick}
      // onClick={() => handleClick(label)}
      className={`
        ${isSelected ? "bg-black border border-black" : "border border-zinc-400"}
        px-3 py-[2px] rounded-full text-sm mr-2 mb-3`}
    >
      {label}
    </button>
  );
};

export default React.memo(OptionsButton);
