// TabContents.tsx
import React from "react";
import OptionsButton from "@/components/elements/OptionsButton";

interface TabContentsProps {
  anchorId: string;
  title: string;
  list: string[];
  onSelectOption: (options: string) => void;
}

const TabContents = ({
  anchorId,
  title,
  list,
  onSelectOption,
}: TabContentsProps) => {
  const handleUpdateClick = (label: string) => {
    onSelectOption(label);
  };

  return (
    <div className="flex flex-col mb-12" id={anchorId}>
      <h1 className="my-4">{title}</h1>
      <div>
        {list.map((item, i) => (
          <OptionsButton
            key={i}
            label={item}
            onUpdateSelection={handleUpdateClick}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(TabContents);
