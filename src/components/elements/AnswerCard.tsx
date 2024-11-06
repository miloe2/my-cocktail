import React from "react";
import { ChatGptResponse } from "@/types/types";
import { findImage } from "@/utils/imageUrls";

const AnswerCard = ({ cocktails }: ChatGptResponse) => {
  // console.log("answerCard redner");
  console.log("레시피를 알려주너는 엔서카드", new Date().getSeconds());

  return (
    <div>
      {cocktails.map((cocktail, index) => (
        <div
          key={index}
          className="w-[95%] bg-black rounded-md p-4 mb-4 flex text-sm relative"
        >
          <span className="absolute -top-2 -right-2 bg-stone-500 text-white text-xs  w-9 h-6 flex justify-center items-center rounded-full">
            {cocktail.degree}°
          </span>
          <div className="w-20 h-20 bg-stone-700 mr-4 rounded-md overflow-hidden flex-shrink-0">
            <img
              src={findImage(cocktail.name)}
              alt={`${cocktail.name}`}
              className="object-cover w-full h-full"
            />
            {/* <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
    {cocktail.degree}°
  </span> */}
          </div>
          <div className="w-full">
            <h2 className="font-bold text-base mb-1.5">{cocktail.name}</h2>
            <ul className="grid grid-cols-2 text-[12px] w-full gap-1">
              {cocktail.ingredients.map((ingredient, idx) => (
                <li key={idx} className="min-w-1/2">
                  {ingredient.name} {ingredient.amountValue}
                  {ingredient.unit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnswerCard;
