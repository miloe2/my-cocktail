import React from "react";

interface ScrollableBoxProps {
  children: React.ReactNode;
}

const ScrollableBox = ({ children }: ScrollableBoxProps) => {
  return (
    <div className="w-full flex flex-nowrap overflow-y-scroll h-auto overflow-x-hidden scroll-container">
      {React.Children.map(children, (child, index) => (
        <div key={index} className="h-20 mr-2 grow-0 min-w-52 w-full">
          {child}
        </div>
      ))}
    </div>
  );
};
export default ScrollableBox;
