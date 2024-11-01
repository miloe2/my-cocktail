import React from "react";

const SkeletoneAnswerCard = () => {
  return (
    <div>
        <div
          className="w-11/12 bg-stone-700 rounded-md p-4 mb-4 flex text-sm animate-pulse"
        >
          <div className="w-20 h-20 bg-stone-600 mr-4"></div>
          <div className="flex flex-col bg-red-0 justify-between">
            <div className="w-20 h-6 bg-stone-600 rounded-md"></div>
            <div className="w-40 h-5 bg-stone-600  rounded-md"></div>
            <div className="w-32 h-5 bg-stone-600  rounded-md"></div>
          </div>
        </div>
    </div>
  );
};

export default SkeletoneAnswerCard;
