"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const testpage = () => {
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
    <div className="w-full bg-red-950 h-40">
      <Lottie loop animationData={lottieData} play />
    </div>
  );
};

export default testpage;
