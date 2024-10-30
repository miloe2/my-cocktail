import React from "react";
interface CocktailRecipt {
  name: string;
  ingredients: Reciept[];
  degree: number;
}
interface Reciept {
  name: string;
  amountValue: number;
  unit: string;
}

const AnswerCard = ({ msg }: { msg: string }) => {
  // 전달받은 msg 문자열을 JSON 객체로 변환
  const cocktails = JSON.parse(msg).cocktails;

  return (
    <div>
      {cocktails.map((cocktail: CocktailRecipt, index: number) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            margin: "16px 0",
          }}
        >
          <h2>{cocktail.name}</h2>
          <p>도수: {cocktail.degree}°</p>
          <h4>재료:</h4>
          <ul>
            {cocktail.ingredients.map((ingredient: Reciept, idx: number) => (
              <li key={idx}>
                {ingredient.name} - {ingredient.amountValue} {ingredient.unit}
              </li>
            ))}
          </ul>
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
