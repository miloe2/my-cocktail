"use client";

import { useState, useEffect } from "react";

export const Tutorial = () => {
  const [step, setStep] = useState<number>(0);

  const handleClick = () => {
    if (step < 2) setStep(step + 1);
  };

  useEffect(() => {
    if (step === 2) {
      document.cookie = "hasVisited=true; Path=/; SameSite=Lax";
    }
  }, [step]);

  const images = [
    "/images/common/tutorial_01.png",
    "/images/common/tutorial_02.png",
  ];

  return (
    <div
      className={`${step === 2 ? "hidden" : "block"} absolute top-0 left-0 w-full h-full`}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black w-full h-full " />

      {/* Tutorial content */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full "
        onClick={handleClick}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Tutorial step ${index + 1}`}
            className={`${step === index ? "block" : "hidden"} w-full h-full object-cover`}
          />
        ))}
      </div>
    </div>
  );
};

export default Tutorial;
