"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
// import thumnail from "/next.svg"
import Image from "next/image";

const RecommendCocktail = () => {
  const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });
  const [lottieData, setLottieData] = useState<object | null>(null);

  useEffect(() => {
    // public 폴더 내 파일을 절대 경로로 로드
    fetch("/lotties/todays-cocktail.json")
      .then((response) => response.json())
      .then((data) => setLottieData(data));
  }, []);

  // const [cocktail, setCocktail] = useState(null);

  // useEffect(() => {
  //   const fetchRandomCocktail = async () => {
  //     try {
  //       const res = await fetch('https://api.adviceslip.com/advice');
  //       const data = await res.json();
  //       console.log(data);
  //       // setCocktail(data);
  //     } catch (error) {
  //       console.error('Fetch error:', error);
  //     }
  //   };

  //   fetchRandomCocktail();
  // }, []);
  // if (!lottieData) return null; // 데이터가 로드될 때까지는 렌더링하지 않음

  return (
    <>
      <div className="flex bg-neutral-600 w-full h-36 mt-3 rounded-md px-4">
        <div className="w-full flex flex-col justify-center ">
          <p className="font-bold text-lg">오늘의 칵테일</p>
          <p className="text-sm mt-2 leading-6">
            칵테일이 고민되시나요? <br /> 오늘의 칵테일을 클릭하고{" "}
            <br className="block md:hidden" /> 칵테일 레시피를 추천받아봐요{" "}
          </p>
        </div>
        <div className="h-full w-36 flex justify-center items-center ">
          {!lottieData ? (
            // <div className="w-full h-full bg-red-500 animate-pulse "></div>
            <Image
              src="/lotties/todays-cocktail.thumnail.svg"
              alt="Thumbnail"
              width={200}
              height={200}
            />
          ) : (
            <Lottie
              animationData={lottieData}
              play
              loop={false}
              className="h-full z-0"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default RecommendCocktail;
