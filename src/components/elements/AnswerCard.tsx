import React from "react";
import { CocktailRecipt, Reciept, ChatMessage } from "@/types/types";

const cocktailsImage = new Set(

);

const AnswerCard = ({ msg }: { msg: string }) => {
  // 전달받은 msg 문자열을 JSON 객체로 변환
  const cocktails = JSON.parse(msg).cocktails;

  return (
    <div className="">
      {cocktails.map((cocktail: CocktailRecipt, index: number) => (
        <div
          key={index}
          className="w-11/12 bg-black rounded-md p-4 mb-2 flex text-sm"
        >
          <div className="w-20 h-20 bg-stone-700 mr-4">
            <img src="" alt="" />
          </div>
          <div>
            <h2>{cocktail.name}</h2>
            {/* <p>도수: {cocktail.degree}°</p> */}
            <h4>재료:</h4>
            <ul>
              {cocktail.ingredients.map((ingredient: Reciept, idx: number) => (
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
