"use client";

import React, { useState } from "react";
import { getStrapiMedia } from "@/lib/utils";

interface CarouselProps {
  images: { url: string; alt?: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);
  if (!images || images.length === 0) return null;

  const goToPrev = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const goToNext = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-10">
      <div className="overflow-hidden rounded-lg shadow-lg">
        <img
          src={getStrapiMedia(images[current].url)}
          alt={images[current].alt || `Imagen ${current + 1}`}
          className="w-full h-80 object-cover transition-all duration-500"
        />
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
            aria-label="Anterior"
          >
            &#8592;
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
            aria-label="Siguiente"
          >
            &#8594;
          </button>
        </>
      )}
      <div className="flex justify-center mt-2 gap-2">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`inline-block w-2 h-2 rounded-full ${idx === current ? "bg-primary" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
