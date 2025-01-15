"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import RippleButton from "@/components/elements/RippleButton";

const testpage = () => {
  const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });
  const [lottieData, setLottieData] = useState<object | null>(null);

  useEffect(() => {
    // public 폴더 내 파일을 절대 경로로 로드
    fetch("/lotties/todays-cocktail.json")
      .then((response) => response.json())
      .then((data) => setLottieData(data));
  }, []);
  const handleClick = () => {
    // console.log("Ripple button clicked!");
  };
  if (!lottieData) return null; // 데이터가 로드될 때까지는 렌더링하지 않음

  return (
    <div className="w-full bg-red-950 h-40">
      <Lottie loop={false} animationData={lottieData} play />
      <RippleButton
        onClick={handleClick}
        className="hover:bg-blue-500 bg-stone-900"
      >
        click me
      </RippleButton>
    </div>
  );
};

export default testpage;
