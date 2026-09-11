"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

// Nguồn: roiser-html-package/roiser/index.html, <section class="fashion-section"> (dòng 375-510)
// Config swiper nguồn: roiser-html-package/roiser/assets/js/main.js, swiperFashion (dòng 265-307)
// Dữ liệu sản phẩm hard-code y hệt demo trong index.html — CHƯA nối Supabase (việc nối dữ liệu thật thuộc Giai đoạn 5).
type Product = {
  image: string;
  sale: string;
  category: string;
  title: string;
  rating: number;
  reviews: string;
  offerPrice: string;
  price: string;
};

const products: Product[] = [
  {
    image: "/assets/img/shop/shop-1.png",
    sale: "New",
    category: "Levi’s Cotton",
    title: "Monica Diara Party Dress",
    rating: 5,
    reviews: "(15 Reviews)",
    offerPrice: "$250.00",
    price: "$157.00",
  },
  {
    image: "/assets/img/shop/shop-2.png",
    sale: "New",
    category: "Levi’s Cotton",
    title: "Onima Black Flower Sandal",
    rating: 5,
    reviews: "(15 Reviews)",
    offerPrice: "$450.00",
    price: "$257.00",
  },
  {
    image: "/assets/img/shop/shop-3.png",
    sale: "New",
    category: "Levi’s Cotton",
    title: "Poncho Sweater international",
    rating: 5,
    reviews: "(15 Reviews)",
    offerPrice: "$550.00",
    price: "$427.00",
  },
  {
    image: "/assets/img/shop/shop-4.png",
    sale: "New",
    category: "Levi’s Cotton",
    title: "D’valo Office Cotton Suite",
    rating: 5,
    reviews: "(15 Reviews)",
    offerPrice: "$350.00",
    price: "$257.00",
  },
];

export default function FashionSection() {
  return (
    <section className="fashion-section pb-100">
      <div className="container">
        <div className="category-top heading-space space-border">
          <div className="section-heading mb-0">
            <h2 className="section-title">GET YOUR FASHION STYLE</h2>
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
          className="shop-carousel swiper"
          slidesPerView={4}
          spaceBetween={10}
          slidesPerGroup={1}
          loop
          speed={700}
          grabCursor
          navigation={{
            // Nguồn main.js dòng ~278-279: nextEl/prevEl bị đảo ngược có chủ đích
            // so với class (nextEl trỏ tới ".swiper-prev", prevEl trỏ tới ".swiper-next").
            nextEl: ".fashion-section .swiper-prev",
            prevEl: ".fashion-section .swiper-next",
          }}
          breakpoints={{
            320: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 20 },
            767: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 30 },
            992: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 30 },
            1170: { slidesPerView: 4, slidesPerGroup: 1, spaceBetween: 30 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.title}>
              <div className="shop-item">
                <div className="shop-thumb">
                  <div className="overlay"></div>
                  <Image src={product.image} alt="shop" fill />
                  <span className="sale">{product.sale}</span>
                  <ul className="shop-list">
                    <li>
                      <a href="cart.html">
                        <i className="fa-regular fa-cart-shopping"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-light fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-light fa-eye"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="shop-content">
                  <span className="category">{product.category}</span>
                  <h3 className="title">
                    <a href="shop-details.html">{product.title}</a>
                  </h3>
                  <div className="review-wrap">
                    <ul className="review">
                      {Array.from({ length: product.rating }).map((_, index) => (
                        <li key={index}>
                          <i className="fa-solid fa-star"></i>
                        </li>
                      ))}
                    </ul>
                    <span>{product.reviews}</span>
                  </div>
                  <span className="price">
                    {" "}
                    <span className="offer">{product.offerPrice}</span>
                    {product.price}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
