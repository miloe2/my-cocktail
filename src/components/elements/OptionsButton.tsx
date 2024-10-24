import React from "react";

export interface OptionsButtonProps {
  label: string;
  onClick?: () => void;
}

export const OptionsButton = ({
  label = "button",
  onClick,
  ...props
}: OptionsButtonProps) => {
  const clicked = "bg-black";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonElement = e.currentTarget;
    clicked.split(" ").forEach((style) => {
      buttonElement.classList.toggle(style);
    });

    // 배경색을 추가하거나 제거
    // if (buttonElement.classList.contains('clicked')) {
    //   buttonElement.classList.remove('clicked');
    // } else {
    //   buttonElement.classList.add('clicked');
    // }

    // 외부에서 전달받은 onClick 실행
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-3 py-[2px] rounded-full ring-1 ring-zinc-400 text-sm mr-3 mb-3 "
      {...props}
    >
      {label}
    </button>
  );
};

export default OptionsButton;
