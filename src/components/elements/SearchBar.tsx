import { ChangeEvent, KeyboardEvent } from "react";

import useModalStore from "@/store/useModalStore";

interface SearchBarProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
  clearSearchText: () => void;
}

const SearchBar = ({
  onChange,
  value,
  onSearchClick,
  clearSearchText,
}: SearchBarProps) => {
  // console.log("search rerender");
  const { modals, toggleModal } = useModalStore();
  const modalId = "beverage";

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchClick();
    }
  };

  return (
    <div className={`relative`}>
      <input
        onChange={onChange}
        onKeyDown={handleKeyDown}
        value={value}
        type="text"
        className="touch-manipulation text-base font-medium rounded-full w-full h-9 focus:ring-stone-500 focus:ring-1 bg-neutral-300 outline-none text-stone-900 pl-10 pr-[70px]"
      />
      <button
        className="absolute top-2.5 left-3"
        onClick={() => toggleModal(modalId)}
      >
        <img
          src="/icons/plus_black.svg"
          alt=""
          className={
            modals[modalId]
              ? "rotate-45 transition-all duration-300"
              : "rotate-0 transition-all duration-300"
          }
        />
      </button>
      {value && (
        <button
          className="bg-black w-5 h-5 absolute top-1/2 -translate-y-1/2 right-9 rounded-full flex justify-center items-center"
          onClick={clearSearchText}
        >
          <img
            src="/icons/plus_white.svg"
            alt=""
            className="rotate-45 w-2 h-2"
          />
        </button>
      )}
      <button
        className="absolute top-2 right-2 "
        onClick={() => onSearchClick()}
      >
        <img src="/icons/search_black.svg" alt="" />
      </button>
    </div>
  );
};
export default SearchBar;
