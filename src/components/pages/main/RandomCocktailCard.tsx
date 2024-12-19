import React, { useState, useEffect } from "react";
import Image from "next/image";

interface RandomCocktailCardProps {
  onClose: () => void;
}

const RandomCocktailCard = ({ onClose }: RandomCocktailCardProps) => {
  // const [cocktailData, setCocktailData] = useState();
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // 렌더링 후 flip 애니메이션 실행
    const flipTimeout = setTimeout(() => setIsFlipped(true), 100);

    return () => {
      // 컴포넌트 언마운트 시 상태 초기화
      setIsFlipped(false);
      clearTimeout(flipTimeout);
    };
  }, []);
  const rawdata = {
    drinks: [
      {
        idDrink: "13936",
        strDrink: "Miami Vice",
        strDrinkAlternate: null,
        strTags: "IBA",
        strVideo: null,
        strCategory: "Cocktail",
        strIBA: null,
        strAlcoholic: "Alcoholic",
        strGlass: "Cocktail glass",
        strInstructions:
          "First: Mix pina colada with 2.5 oz. of rum with ice(set aside). Second: Mix daiquiri with 2.5 oz. of rum with ice. Third: While frozen, add pina colda mix then daiquiri mix in glass (Making sure they do not get mixed together).",
        strInstructionsES:
          "Primero: Mezclar la piña colada con 2,5 onzas de ron con hielo (reservar). Segundo: Mezclar el daiquiri con 2,5 onzas de ron y hielo. Tercero: Mientras está congelado, añada la mezcla de piña colada y luego la de daiquiri en el vaso (asegurándose de que no se mezclen).",
        strInstructionsDE:
          "Zuerst: Pina Colada mit 7,5 cl. Rum und Eis mischen (beiseite legen). Zweitens: Daiquiri mit 7,5 cl. Rum und Eis mischen. Drittens: Im gefrorenen Zustand Pina Colda-Mix hinzufügen, dann Daiquiri in Glas mischen (Achten Sie darauf, dass sie nicht miteinander vermischt werden).",
        strInstructionsFR:
          "Premièrement, mélanger la pina colada avec 2,5 oz de rhum et des glaçons : Mélanger la pina colada avec 2,5 oz de rhum et de la glace (mettre de côté). Deuxièmement : Mélanger le daiquiri avec 2,5 oz de rhum et de la glace. Troisièmement : pendant que le verre est gelé, ajouter le mélange de pina colada puis le mélange de daiquiri dans le verre (en veillant à ce qu'ils ne se mélangent pas).",
        strInstructionsIT:
          "Primo: mescola la pina colada con 75ml di rum con ghiaccio (mettere da parte).\r\nSecondo: mescola daiquiri con 75ml di rum con ghiaccio.\r\nTerzo: mentre è freddo, aggiungi il mix di pina colada e poi i daiquiri nel bicchiere (assicurandoti che non si mescolino insieme).",
        "strInstructionsZH-HANS": null,
        "strInstructionsZH-HANT": null,
        strDrinkThumb:
          "https://www.thecocktaildb.com/images/media/drink/qvuyqw1441208955.jpg",
        strIngredient1: "151 proof rum",
        strIngredient2: "Pina colada mix",
        strIngredient3: "Daiquiri mix",
        strIngredient4: null,
        strIngredient5: null,
        strIngredient6: null,
        strIngredient7: null,
        strIngredient8: null,
        strIngredient9: null,
        strIngredient10: null,
        strIngredient11: null,
        strIngredient12: null,
        strIngredient13: null,
        strIngredient14: null,
        strIngredient15: null,
        strMeasure1: "5 oz Bacardi ",
        strMeasure2: "frozen ",
        strMeasure3: "frozen ",
        strMeasure4: null,
        strMeasure5: null,
        strMeasure6: null,
        strMeasure7: null,
        strMeasure8: null,
        strMeasure9: null,
        strMeasure10: null,
        strMeasure11: null,
        strMeasure12: null,
        strMeasure13: null,
        strMeasure14: null,
        strMeasure15: null,
        strImageSource: null,
        strImageAttribution: null,
        strCreativeCommonsConfirmed: "No",
        dateModified: "2015-09-02 16:49:15",
      },
    ],
  };

  const data = rawdata.drinks[0];
  return (
    <>
      {/* Dimmed Background */}
      <div
        className="w-full h-full absolute inset-0 bg-black opacity-60"
        onClick={onClose}
      />

      {/* Card Wrapper */}
      <div
        className={`bg-white [perspective:1100px] [transform-style:preserve-3d] min-w-64 h-96 rounded-lg absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500`}
        style={{
          transform: `translate(-50%, -50%) ${isFlipped ? "rotateX(0deg)" : "rotateX(180deg)"}`,
        }}
      >
        {/* Front Side */}
        <div
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            width: "100%",
            height: "100%",
            transform: "rotateX(0deg)",
          }}
          className="bg-white rounded-lg"
        >
          <div className="w-full h-1/2 rounded-t-lg">
            <img
              src={data.strDrinkThumb}
              alt=""
              className="object-cover w-full h-full rounded-t-lg"
            />
          </div>
          <div className="w-full text-black p-4">
            <h1 className="font-bold text-lg">{data.strDrink}</h1>
            {data.strIngredient1}
            {data.strMeasure1}
          </div>
        </div>

        {/* Back Side */}
        <div
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            width: "100%",
            height: "100%",
            transform: "rotateX(180deg)",
          }}
          className=" rounded-lg flex justify-center items-center "
        >
          <Image
            src="/images/common/card-background.jpg"
            alt="card-back"
            width={200}
            height={400}
            className="w-full h-full"
          />
          <div className="w-full h-full absolute inset-0 bg-black opacity-20" />
        </div>
      </div>
    </>
  );
};

export default RandomCocktailCard;
