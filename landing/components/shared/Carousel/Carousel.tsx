"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Carousel.css";
import { getStrapiMedia } from "@/lib/utils";

interface CarouselProps {
  images: { url: string; alt?: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-[50vh] sm:h-[500px] mx-auto mb-10">
      <Swiper
        effect={"fade"}
        speed={700}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        className="mySwiper h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              className="object-contain w-full h-full sm:max-h-[500px] bg-black"
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
