import React from "react";

interface ScrollableBoxProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollableBox = ({ children, className = "" }: ScrollableBoxProps) => {
  return (
    <div
      className={`w-full flex flex-nowrap overflow-x-auto h-auto overflow-y-hidden scroll-container ${className}`}
    >
      {React.Children.map(children, (child, index) => (
        <div key={index} className="flex-shrink-0 w-auto">
          {child}
        </div>
      ))}
    </div>
  );
};

export default ScrollableBox;
