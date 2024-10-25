// OptionsButton.tsx
import React from "react";

export interface OptionsButtonProps {
  label: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export const OptionsButton = ({
  label = "button",
  onClick,
  isSelected = false,
}: OptionsButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${isSelected ? 'bg-black border border-black' : 'border border-zinc-400'}
        px-3 py-[2px] rounded-full text-sm mr-2 mb-3`}
    >
      {label}
    </button>
  );
};

export default OptionsButton;
