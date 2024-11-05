import React from "react";

const SkeletoneAnswerCard = () => {
  return (
    <div>
      <div className="w-[95%] bg-stone-700 rounded-md p-4 mb-4 flex text-sm animate-pulse relative">
        <span className="absolute -top-2 -right-2 bg-stone-600 text-white text-xs  w-9 h-6 rounded-full"></span>
        <div className="w-20 h-20 bg-stone-600 mr-4 rounded-md flex-shrink-0"></div>
        <div className="flex flex-col bg-red-00 w-full">
          <div className="w-24 h-5 bg-stone-600 rounded-sm mb-3"></div>
          <ul className="grid grid-cols-2 bg-yellow-00 gap-y-2">
            <li className="w-16 h-4 bg-stone-600 rounded-sm"></li>
            <li className="w-24 h-4 bg-stone-600 rounded-sm"></li>
            <li className="w-20 h-4 bg-stone-600 rounded-sm"></li>
            <li className="w-20 h-4 bg-stone-600 rounded-sm"></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SkeletoneAnswerCard;
