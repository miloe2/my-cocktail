import { ChangeEvent, KeyboardEvent } from "react";

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
        className="touch-manipulation text-base font-medium rounded-md w-full h-9 focus:ring-stone-500 focus:ring-1 bg-neutral-600 outline-none text-stone-100 pl-3 pr-[70px]"
      />
      {value && (
        <button
          className="bg-neutral-500 w-6 h-6 absolute top-1.5 right-10 rounded-full"
          onClick={clearSearchText}
        >
          &times;
        </button>
      )}
      <button
        className="absolute top-2 right-2 "
        onClick={() => onSearchClick()}
      >
        <img src="/icons/search.svg" alt="" />
      </button>
    </div>
  );
};
export default SearchBar;
