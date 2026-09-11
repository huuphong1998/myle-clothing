"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

// Nguồn: roiser-html-package/roiser/index.html, <section class="category-section"> (dòng 264-329)
const categories = [
  { title: "Women Wear", image: "/assets/img/images/cate-1.png" },
  { title: "Shoes Collection", image: "/assets/img/images/cate-2.png" },
  { title: "Bag Collection", image: "/assets/img/images/cate-3.png" },
  { title: "Watch Hare", image: "/assets/img/images/cate-4.png" },
  { title: "Accessories", image: "/assets/img/images/cate-5.png" },
  { title: "Sunglasses", image: "/assets/img/images/cate-6.png" },
];

export default function Category() {
  return (
    <section className="category-section pt-100 pb-100">
      <div className="container">
        <div className="category-top heading-space space-border">
          <div className="section-heading mb-0">
            <h2 className="section-title">Best for your categories</h2>
            <p>29 categories belonging to a total 15,892 products</p>
          </div>
          {/* Carousel Arrows */}
          <div className="swiper-arrow">
            <div className="swiper-nav swiper-next">
              <i className="fa-regular fa-arrow-left"></i>
            </div>
            <div className="swiper-nav swiper-prev">
              <i className="fa-regular fa-arrow-right"></i>
            </div>
          </div>
        </div>
        <Swiper
          modules={[Navigation]}
          className="category-carousel swiper"
          slidesPerView={6}
          spaceBetween={10}
          slidesPerGroup={1}
          loop
          speed={700}
          grabCursor
          navigation={{
            // Nguồn main.js dòng ~223-225: nextEl/prevEl bị đảo ngược có chủ đích
            // so với class (nextEl trỏ tới ".swiper-prev", prevEl trỏ tới ".swiper-next").
            nextEl: ".category-section .swiper-prev",
            prevEl: ".category-section .swiper-next",
          }}
          breakpoints={{
            320: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 20 },
            450: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 20 },
            767: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 30 },
            992: { slidesPerView: 4, slidesPerGroup: 1, spaceBetween: 30 },
            1170: { slidesPerView: 6, slidesPerGroup: 1, spaceBetween: 30 },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.title}>
              <div className="category-item">
                <div className="category-img">
                  <Image src={category.image} alt="category" width={200} height={200} />
                </div>
                <h3 className="title">
                  <a href="shop.html">{category.title}</a>
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
