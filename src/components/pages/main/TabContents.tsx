import React from "react";
import OptionsButton from "@/components/elements/OptionsButton";
import useSearchStore from "@/store/useSearchStore";

interface TabContentsProps {
  anchorId: string;
  title: string;
  list: string[];
}

const TabContents = ({ anchorId, title, list }: TabContentsProps) => {
  const { searchKeyword, addKeyword, removeKeyword } = useSearchStore();

  const handleClick = (item : string , isSelected : boolean) => {
    console.log(item, isSelected)
    // const isContain = searchKeyword.includes(item);
    // if (!isContain) {
    //   addKeyword(item);
    // } else {
    //   removeKeyword(item);
    // }
  };

  return (
    <div className="w-full flex flex-col" id={anchorId}>
      {/* <button onClick={click}>click</button> */}
      <h1 className="mb-4">{title}</h1>
      <div className="w-full">
        {list.map((item, i) => (
          <OptionsButton
            key={i}
            label={item}
            // isSelected={searchKeyword.includes(item)}
            onClick={(isSelected) => handleClick(item, isSelected)}
          ></OptionsButton>
        ))}
      </div>
    </div>
  );
};

export default TabContents;
