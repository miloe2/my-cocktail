// TabContents.tsx
import React, { forwardRef } from "react";
import OptionsButton from "@/components/elements/OptionsButton";

interface TabContentsProps {
  title: string;
  list: ListArray[];
  toggleOption: (label: string) => void;
  hasOption: (label: string) => boolean;
}
interface ListArray {
  name: string;
  eng: string;
}

const TabContents = forwardRef<HTMLDivElement, TabContentsProps>(
  function TabContents({ title, list, toggleOption, hasOption }, ref) {
    // console.log("tab contents");
    return (
      <div className="flex flex-col mb-8" ref={ref}>
        <div className="my-4 flex space-x-2">
          <h1>{title}</h1>
        </div>
        <div>
          {list.map((item, i) => (
            <OptionsButton
              key={i}
              label={item.name}
              isSelected={hasOption(item.name)}
              onClick={() => toggleOption(item.name)}
            />
          ))}
        </div>
      </div>
    );
  },
);

export default TabContents;
