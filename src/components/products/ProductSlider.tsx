"use client";
import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

export default function ProductSlider({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <section className="product-gallery" aria-label="Product image gallery">
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="product-main-swiper"
      >
        {images.map((image, i) => {
          return (
            <SwiperSlide key={`main-image-${i}`}>
              <Image
                alt={`Product image ${i + 1}`}
                src={image}
                width={500}
                height={500}
                loading="eager"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="product-thumbnail-swiper"
      >
        {images.map((image, i) => {
          return (
            <SwiperSlide key={`thumb-image-${i}`}>
              <Image
                alt={`Product thumbnail ${i + 1}`}
                src={image}
                width={500}
                height={500}
                loading="eager"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
