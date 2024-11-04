// TabContents.tsx
import React from "react";
import OptionsButton from "@/components/elements/OptionsButton";

interface TabContentsProps {
  anchorId: string;
  title: string;
  list: ListArray[];
  onSelectOption: (options: string) => void;
}
interface ListArray {
  name: string;
  eng: string;
}

const TabContents = ({
  anchorId,
  title,
  list,
  onSelectOption,
}: TabContentsProps) => {
  console.log("tab contents");
  const handleUpdateClick = (label: string) => {
    onSelectOption(label);
  };

  return (
    <div className="flex flex-col mb-8" id={anchorId}>
      <div className="my-4 flex space-x-2">
        <div className="w-4 h-4 bg-stone-500">
          <img src="" alt="" />
        </div>
        <h1>{title}</h1>
      </div>
      <div>
        {list.map((item, i) => (
          <OptionsButton
            key={i}
            label={item.name}
            onUpdateSelection={handleUpdateClick}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(TabContents);
