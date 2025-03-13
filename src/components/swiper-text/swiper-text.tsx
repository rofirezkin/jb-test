"use client";

import React from "react";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

type SwiperTextProps = {
  onSlideChange: (swiper: SwiperClass) => void | undefined;
  onSwipper?: ((swiper: SwiperClass) => void) | undefined;
};

export default function SwipperText({
  onSlideChange,
  onSwipper,
}: SwiperTextProps) {
  return (
    <div className="relative">
      <Swiper
        onSlideChange={onSlideChange}
        className="mySwiper"
        onSwiper={onSwipper}
      >
        <SwiperSlide>
          <p className="text-center text-2xl mt-4 hero-text text-home">
            Professionals around the world shared how they feel about technology
            and I’ve listened. Now it’s your turn.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <p className="text-center text-2xl mt-4 hero-text text-home">
            I’ll ask you a handful of meaningful questions and compare your
            responses with people in your industry.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <p className="text-center text-2xl mt-4 hero-text text-home">
            You’ll get insights into current industry sentiments and a reality
            check about technology in a few minutes. Deal? Great!
          </p>
        </SwiperSlide>
      </Swiper>

      <div className="custom-pagination absolute bottom-[-50px] left-0 right-0 flex justify-center gap-2 "></div>
    </div>
  );
}
