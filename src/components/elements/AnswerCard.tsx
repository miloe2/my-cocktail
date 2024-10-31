import React from "react";
import { ChatGptResponse} from "@/types/types";

const AnswerCard = ({ cocktails } : ChatGptResponse) => {
  return (
    <div>
      {cocktails.map((cocktail, index) => (
        <div
          key={index}
          className="w-full bg-black rounded-md p-4 mb-4 flex text-sm"
        >
          <div className="w-20 h-20 bg-stone-700 mr-2">
            <img src="" alt={`${cocktail.name} 이미지`} />
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
