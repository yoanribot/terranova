"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Carousel.module.css";
import { getStrapiMedia } from "@/lib/utils";

interface CarouselProps {
  images: { url: string; alt?: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  console.log({ images });

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full max-h-[500px] mx-auto mb-10">
      <Swiper
        // effect={"fade"}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        // centeredSlides={true}
        navigation={true}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              className="object-contain w-full h-[500px]"
              src={getStrapiMedia(image.url)}
              alt={image.alt || `Slide ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
