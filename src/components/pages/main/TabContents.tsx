// TabContents.tsx
import React from "react";
import OptionsButton from "@/components/elements/OptionsButton";
import useSearchStore from "@/store/useSearchStore";

interface TabContentsProps {
  anchorId: string;
  title: string;
  list: string[];
}

const TabContents = ({ anchorId, title, list }: TabContentsProps) => {
  console.log('tab rerender', )

  const { selectedOption, addOption, removeOption } = useSearchStore();

  const handleClick = (item: string) => {
    const isContain = selectedOption.has(item);
    if (!isContain) {
      addOption(item);
    } else {
      removeOption(item);
    }
  };

  return (
    <div className="flex flex-col mb-12" id={anchorId}>
      <h1 className="my-4">{title}</h1>
      <div>
        {list.map((item, i) => (
          <OptionsButton
            key={i}
            label={item}
            isSelected={selectedOption.has(item)}
            onClick={() => handleClick(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default TabContents;
