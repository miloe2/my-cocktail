// // TabContents.tsx
// import React, {useCallback, useState} from "react";
// import OptionsButton from "@/components/elements/OptionsButton";
// import useSearchStore from "@/store/useSearchStore";

// interface TabContentsProps {
//   anchorId: string;
//   title: string;
//   list: string[];
// }


// const ParentComponent = () => {
//   const [toggleStates, setToggleStates] = useState(
//     Array(30).fill(false) // 30개의 버튼을 false로 초기화
//   );

//   const handleToggle = useCallback(
//     (index: number) => {
//       setToggleStates((prevState) =>
//         prevState.map((state, i) => (i === index ? !state : state))
//       );
//     },
//     []
//   );

//   return (
//     <div>
//       {toggleStates.map((isToggled, index) => (
//         <OptionsButton
//           key={index}
//           label={`Button ${index + 1}`}
//           isSelected={isToggled}
//           onClick={() => handleToggle(index)}
//         />
//       ))}
//     </div>
//   );
// };

// export default ParentComponent;
// TabContents.tsx
import React, {useCallback} from "react";
import OptionsButton from "@/components/elements/OptionsButton";
import useSearchStore from "@/store/useSearchStore";

interface TabContentsProps {
  anchorId: string;
  title: string;
  list: string[];
}

const TabContents = ({ anchorId, title, list }: TabContentsProps) => {
  const { selectedOption, addOption, removeOption } = useSearchStore();

  // const handleClick = useCallback(
  //   (item: string) => {
  //     if (selectedOption.has(item)) {
  //       removeOption(item);
  //     } else {
  //       addOption(item);
  //     }
  //   },
  //   [selectedOption, addOption, removeOption]
  // );
  const handleUpdateClick = (label: string) => {
    if (selectedOption.has(label)) {
        removeOption(label);
      } else {
        addOption(label);
      }
    console.log(selectedOption)
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