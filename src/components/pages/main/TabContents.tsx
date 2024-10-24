import React from "react";
import OptionsButton from "@/components/elements/OptionsButton";
import useSearchStore from "@/store/useSearchStore";

interface TabContentsProps {
  anchorId: string;
  title: string;
  list: string[];
}

const TabContents = ({
  anchorId,
  title,
  list,
}: TabContentsProps) => {
  const { searchKeyword, addKeyword, removeKeyword } = useSearchStore();

  const handleClick = (item: string) => {
    const isContain = searchKeyword.includes(item);
    if (!isContain) {
      addKeyword(item);
    } else {
      removeKeyword(item);
    }
  };
  const click = () => {
    console.log(searchKeyword);
  };

  return (
    <div
      className="flex flex-col"
      id={anchorId}
    >
      {/* <button onClick={click}>click</button> */}
      <h1 className="mb-4">{title}</h1>
      <div>
        {list.map((item, i) => (
          <OptionsButton
            key={i}
            label={item}
            onClick={() => handleClick(item)}
          ></OptionsButton>
        ))}
      </div>
    </div>
  );
};

export default TabContents;
