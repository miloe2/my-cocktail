'use client'
import { testPhone } from '@/api';
import SwiperModule from '@/components/elements/SwiperModule';
import React, { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testpage = () => {
  return (
    <div className='w-full bg-red-950 h-40'>
      <SwiperModule
        slides={[
          <SwiperSlide key={1}>sldie1</SwiperSlide>,
          <SwiperSlide key={2}>slide2</SwiperSlide>,
          <SwiperSlide key={3}>slide3</SwiperSlide>,
        ]}
      />
    </div>
  )
}

export default testpage