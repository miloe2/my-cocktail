import React, { ReactNode } from "react";
import { Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SwiperModuleProps {
  loop?: boolean;
  navigation?: boolean;
  pagination?: boolean;
  spaceBetween?: number;
  slidesPerView?: number | "auto";
  className?: string;
  slides: ReactNode[];
  freeMode?: boolean;
  onSwiper?: (swiper: SwiperCore) => void;
}

const SwiperModule = ({
  loop = true,
  navigation = true,
  pagination = true,
  spaceBetween = 0,
  slidesPerView = 1,
  className,
  slides,
  freeMode = true,
  onSwiper,
}: SwiperModuleProps) => {
  return (
    <Swiper
      loop={loop}
      navigation={navigation}
      pagination={pagination}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      freeMode={freeMode}
      modules={[Navigation, Pagination]}
      onSlideChange={() => console.log("slide change")}
      onSwiper={onSwiper}
      className={`${className} custom-swiper`}
      style={{ marginLeft: 0 }}
    >
      {slides}
    </Swiper>
  );
};

export default SwiperModule;
