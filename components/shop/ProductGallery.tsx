"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";

// Nguồn: roiser-html-package/roiser/shop-details.html, <div class="product-slider-wrap">
// (dòng 266-308). Config Swiper y hệt main.js dòng 349-368 (swiper = product-gallary-thumb,
// swiper2 = product-gallary, liên kết qua thumbs: { swiper }).
// Ghi chú nguồn thiếu file: shop-slider-2.jpg và shop-slider-3.jpg không tồn tại trong
// roiser-html-package (chỉ có shop-slider-1.jpg) — giống lỗ hổng ảnh đã ghi nhận trước đây,
// nên dùng lại đúng ảnh thật shop-slider-1.jpg cho cả 3 slide thay vì bịa ảnh mới.
const galleryImages = [
  "/assets/img/shop/shop-slider-1.jpg",
  "/assets/img/shop/shop-slider-1.jpg",
  "/assets/img/shop/shop-slider-1.jpg",
];

const thumbImages = [
  "/assets/img/shop/shop-thumb-1.png",
  "/assets/img/shop/shop-thumb-2.png",
  "/assets/img/shop/shop-thumb-3.png",
];

export default function ProductGallery() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="product-slider-wrap">
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        direction="vertical"
        spaceBetween={10}
        slidesPerView={3}
        freeMode
        watchSlidesProgress
        className="swiper product-gallary-thumb"
      >
        {thumbImages.map((src, index) => (
          <SwiperSlide key={src + index}>
            <div className="thumb-item">
              <Image src={src} alt="shop" width={112} height={112} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        modules={[Navigation, Thumbs]}
        spaceBetween={10}
        loop
        navigation={{
          nextEl: ".swiper-nav-next",
          prevEl: ".swiper-nav-prev",
        }}
        thumbs={{ swiper: thumbsSwiper }}
        className="swiper product-gallary"
      >
        <span className="sale">Sale</span>
        {galleryImages.map((src, index) => (
          <SwiperSlide key={src + index}>
            <div className="gallary-item">
              <Image src={src} alt="shop" width={600} height={713} />
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-nav-next">
          <i className="las la-arrow-right"></i>
        </div>
        <div className="swiper-nav-prev">
          <i className="las la-arrow-left"></i>
        </div>
      </Swiper>
    </div>
  );
}
