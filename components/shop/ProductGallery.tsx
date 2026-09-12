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
// Ảnh lấy từ products.images thật trong Supabase (mỗi sản phẩm hiện chỉ có 1 ảnh thật trong
// mảng images — không dùng lại bộ ảnh demo dùng chung shop-slider-*/shop-thumb-* của template
// nữa, vì giờ mỗi sản phẩm đã có ảnh thật riêng; xem thêm memory roiser-template-asset-gaps
// về lý do trước đây phải dùng ảnh demo dùng chung).
export default function ProductGallery({ images }: { images: string[] }) {
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
        {images.map((src, index) => (
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
        {images.map((src, index) => (
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
