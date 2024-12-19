"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LoadingCocktail = () => {
  const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });
  const [lottieData, setLottieData] = useState<object | null>(null);

  useEffect(() => {
    // public 폴더 내 파일을 절대 경로로 로드
    fetch("/lotties/cocktail-loading.json")
      .then((response) => response.json())
      .then((data) => setLottieData(data));
  }, []);

  if (!lottieData) return null; // 데이터가 로드될 때까지는 렌더링하지 않음
  return (
    <div style={{ zIndex: 999 }}>
      <div className="bg-black opacity-80 w-svw h-svh overflow-hidden fixed top-0 left-0" />
      <div className="flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-40 h-40">
          <Lottie animationData={lottieData} play />
        </div>
        <span className="text-center text-sm">
          알맞는 재료를 검색중이에요!{" "}
        </span>
      </div>
    </div>
  );
};

export default LoadingCocktail;
