"use client";

import Lottie from "lottie-react";
import React from "react";
import animationData from "public/Lottie.json";

type LottieAnimationProps = {
  description: string;
  showDescription: boolean;
};

export default function LottieAnimation({
  description,
  showDescription,
}: LottieAnimationProps) {
  return (
    <div className="relative">
      <div className="relative mt-10 lottie-animation ">
        <p className="absolute text-[12px] z-10 mt-3.5  ">
          WA businesses feel confident about future growth
        </p>
        <p className="absolute text-[12px] top-14 z-10 right-0">
          AI cant replace creativity
        </p>
        <p className="absolute text-[12px] top-1/2 z-10">
          Sales measure true success
        </p>
        <p className="absolute text-[12px] bottom-0 right-0 z-10 mb-20">
          Human connection drives WA business
        </p>
        <p className="absolute text-[12px] bottom-3 z-10 w-60">
          The primary barrier to digital transformation is financial investment
        </p>

        <Lottie
          animationData={animationData}
          loop={true}
          className="hero-animation"
        />
      </div>
      {showDescription && (
        <div className="absolute top-32">
          <h1 className="text-white text-center">{description}</h1>
        </div>
      )}
    </div>
  );
}
