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
          className="w-11/12 bg-black rounded-md p-4 mb-4 flex text-sm"
        >
          <div className="w-20 h-20 bg-stone-700 mr-4">
            <img src={findImage(cocktail.name)} alt={`${cocktail.name}`} />
          </div>
          <div>
            <h2>{cocktail.name}</h2>
            <p>도수: {cocktail.degree}°</p>
            <h4>재료:</h4>
            <ul>
              {cocktail.ingredients.map((ingredient, idx) => (
                <li key={idx}>
                  {ingredient.name} - {ingredient.amountValue} {ingredient.unit}
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
