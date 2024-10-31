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
          className="w-full bg-black rounded-md p-4 mb-4 flex text-sm"
        >
          <div className="w-20 h-20 bg-stone-700 mr-2">
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

{
  /* <h2 className="text-lg font-bold">{parsedMsg.name}</h2>
<p className="text-sm text-gray-500">도수: {parsedMsg.degree}%</p>
<p className="text-sm mb-2">맛: {parsedMsg.taste}</p>
<h3 className="font-semibold mt-2">재료:</h3>
<ul className="list-disc list-inside">
  {parsedMsg.receipt.map((item : Reciept, index: number) => (
    <li key={index}>
      {item.ingredient} - {item.amount || "적당량"}
    </li>
  ))}
</ul> */
}
