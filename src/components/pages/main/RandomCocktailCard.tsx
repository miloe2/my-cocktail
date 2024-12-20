import React, { useState, useEffect } from "react";
import Image from "next/image";

interface RandomCocktailCardProps {
  onClose: () => void;
}
type CocktailData = {
  [key: string]: string;
};

const RandomCocktailCard = ({ onClose }: RandomCocktailCardProps) => {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  const [cocktailData, setCocktailData] = useState<CocktailData | null>();
  // const [isLoading, setIsLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // let flipTimeout: ReturnType<typeof setTimeout>;

    const fetchRandomCocktail = async () => {
      try {
        const rsp = await fetch(url);
        const data = await rsp.json();
        setCocktailData(data.drinks[0]); // 상태 업데이트 요청

        // 상태 업데이트 후 flip 실행
        // flipTimeout = setTimeout(() => {
        setIsFlipped(true);
        // }, 200);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRandomCocktail();

    return () => {
      // clearTimeout(flipTimeout); // 타이머 정리
      setIsFlipped(false); // 상태 초기화
    };
  }, []);

  const getIngredients = (data: CocktailData) => {
    // strIngredient와 strMeasure를 함께 필터링
    return Object.keys(data)
      .filter((key) => key.startsWith("strIngredient") && data[key]) // 유효한 strIngredient만 필터링
      .map((key) => {
        const index = key.replace("strIngredient", ""); // 숫자 추출
        return {
          ingredient: data[`strIngredient${index}`],
          measure: data[`strMeasure${index}`] || "", // strMeasure가 null이면 빈 문자열 반환
        };
      });
  };

  return (
    <>
      {/* Dimmed Background */}
      <div
        className="w-full h-full absolute inset-0 bg-black opacity-60"
        onClick={onClose}
      />

      {/* Card Wrapper */}
      <div
        className={`bg-white [perspective:1100px] [transform-style:preserve-3d] min-w-64 h-96 rounded-lg absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000`}
        style={{
          transform: `translate(-50%, -50%) ${cocktailData && isFlipped ? "rotateX(0deg)" : "rotateX(180deg)"}`,
        }}
      >
        {/* Front Side */}
        {cocktailData && (
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
            <div
              className={`${isFlipped ? "animate-none" : "animate-pulse"} w-full h-1/2 rounded-t-lg bg-neutral-300`}
            >
              <img
                src={cocktailData.strDrinkThumb}
                alt=""
                className="object-cover w-full h-full rounded-t-lg"
              />
            </div>
            <div className="w-full text-black px-4 py-4">
              <h1 className="font-bold text-lg">{cocktailData.strDrink}</h1>
              <div className="grid grid-cols-2 gap-1 mt-2">
                {getIngredients(cocktailData).map((item, index) => (
                  <div key={index} className="">
                    <span className="font-medium text-sm mr-1">
                      {item.ingredient}
                    </span>
                    <span className="text-[12px]">
                      {item.measure && `${item.measure.split(" ").join("")}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Back Side */}
        <div
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            width: "100%",
            height: "100%",
            transform: "rotateX(180deg)",
          }}
          className="rounded-lg flex justify-center items-center "
        >
          <Image
            src="/images/common/card-background.jpg"
            alt="card-back"
            width={200}
            height={400}
            className="w-full h-full rounded-lg"
          />
          <div className="w-full h-full absolute inset-0 bg-black opacity-20 rounded-lg" />
        </div>
      </div>
    </>
  );
};

export default RandomCocktailCard;
