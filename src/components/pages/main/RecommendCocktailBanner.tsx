"use client";
import dynamic from "next/dynamic";
import { useEffect, useState, memo } from "react";
import RandomCocktailCard from "./RandomCocktailCard";
import Image from "next/image";

const RecommendCocktailBanner = () => {
  const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });
  const [lottieData, setLottieData] = useState<object | null>(null);
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);

  useEffect(() => {
    // public 폴더 내 파일을 절대 경로로 로드
    fetch("/lotties/todays-cocktail.json")
      .then((response) => response.json())
      .then((data) => setLottieData(data));
  }, []);

  const MemoizedLottie = memo(
    ({ animationData }: { animationData?: object }) => {
      return (
        <Lottie
          animationData={animationData}
          play
          loop={false}
          className="h-full"
        />
      );
    },
  );
  MemoizedLottie.displayName = "MemoizedLottie";

  const handleOpenClick = () => {
    setIsCardOpen(!isCardOpen);
  };

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
      <div
        className="flex bg-black w-full py-4 rounded-md px-6 "
        onClick={handleOpenClick}
      >
        <div className="w-full flex flex-col justify-center ">
          <p className="font-bold text-lg">레시피를 뽑아봐요!</p>
          <p className="text-sm mt-2 leading-6">
            클릭하고 랜덤 칵테일 <br />
            레시피를 추천받아봐요!🍹 <br className="block md:hidden" />{" "}
          </p>
        </div>
        <div className="w-36 h-24 flex justify-center items-center relative ">
          {!isCardOpen && lottieData ? (
            <MemoizedLottie animationData={lottieData} />
          ) : (
            <Image
              src="/lotties/todays-cocktail.thumnail.svg"
              alt="Thumbnail"
              width={200}
              height={200}
            />
          )}
        </div>
      </div>
      {isCardOpen && <RandomCocktailCard onClose={handleOpenClick} />}
    </>
  );
};

export default memo(RecommendCocktailBanner);
