import React, { ReactNode } from "react";
import { Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
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
}

const SwiperModule = ({
  loop=true,
  navigation=true,
  pagination=true,
  spaceBetween = 0,
  slidesPerView = 1,
  className,
  slides,
  freeMode = true,
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
      onSwiper={(swiper) => console.log(swiper)}
      className={`${className} custom-swiper`}
      style={{ marginLeft: 0 }}
    >
      {slides}
    </Swiper>
  );
};

export default SwiperModule;

// "use client";

// import React, { ReactNode } from "react";
// import { Swiper } from "swiper/react";
// import { FreeMode, Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// interface SwiperModuleProps {
//   loop: boolean;
//   navigation: boolean;
//   pagination: boolean;
//   spaceBetween: number;
//   slidesPerView: number | 'auto';
//   className? : string;
//   freeMode? : boolean;
//   slides: ReactNode[];
// }
// const SwiperModule = ({
//   loop,
//   navigation,
//   pagination,
//   spaceBetween,
//   slidesPerView,
//   className,
//   slides,
//   freeMode = true,
// }: SwiperModuleProps) => {
//   return (
//     <Swiper
//       loop={loop}
//       navigation={navigation}
//       pagination={pagination}
//       spaceBetween={spaceBetween}
//       slidesPerView={slidesPerView}
//       freeMode={freeMode}
//       // modules={modules} // 전달받은 모듈 사용
//       modules={[Navigation, Pagination]}
//       onSlideChange={() => console.log("slide change")}
//       onSwiper={(swiper) => console.log(swiper)}
//       className={`${className} custom-swiper`}
//       style={{ marginLeft: 0 }}
//     >
//       {slides}
//     </Swiper>
//   );
// };

// export default SwiperModule;
