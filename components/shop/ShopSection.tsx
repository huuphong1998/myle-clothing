"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NiceSelect from "@/components/ui/NiceSelect";
import type { ShopProduct } from "@/lib/supabase/products";

// Nguồn: roiser-html-package/roiser/shop-grid.html, <section class="shop-grid pt-100 pb-100">
// (dòng 262-1012) — sidebar filter categories/giá/size/brand lấy từ đây theo lựa chọn gộp
// 0.2+0.3 (shop.html không có sidebar, chỉ shop-grid.html mới có).
// Tab chuyển grid/list (nav-tabs, data-bs-toggle="tab") vốn dùng Bootstrap JS — app này không
// nạp bootstrap.bundle.js nên build lại bằng React state, giống cách NiceSelect/Header đã làm.
type ViewMode = "grid" | "list";

const categoryFilters = [
  { id: "accessories", label: "Accessories (4)" },
  { id: "badge-categories", label: "Badge Categories (4)" },
  { id: "bag-backpacks", label: "Bag & Backpacks (1)" },
  { id: "category-grid", label: "Category Grid (12)" },
  { id: "clothing-apparel", label: "Clothing & Apparel (2)" },
  { id: "consumer-electric", label: "Consumer Electric (3)" },
  { id: "top-electronics", label: "Top Electronics (3)" },
  { id: "womens-collection", label: "Women's Collection (5)" },
];

const sizeFilters = ["XL", "S", "Small", "L", "XL", "Extra Large"];

const brandFilters = [
  { id: "juliate", label: "Juliate" },
  { id: "hm", label: "H&M" },
  { id: "harmoni", label: "Harmoni" },
  { id: "sowat", label: "Sowat" },
  { id: "macro", label: "MAcro" },
];

const sidebarPicks = [
  { image: "/assets/img/shop/sidebar-img-1.png", title: "Fancy Black Sunglass", offerPrice: "$450.00", price: "$257.00" },
  { image: "/assets/img/shop/sidebar-img-2.png", title: "D’valo Office Cotton", offerPrice: "$450.00", price: "$257.00" },
  { image: "/assets/img/shop/sidebar-img-3.png", title: "Black Flower Sandal", offerPrice: "$450.00", price: "$257.00" },
];

// rating/reviews/badge "New" không có cột tương ứng trong bảng products (chưa có bảng reviews —
// backlog task 1.2) — nguồn shop.html/shop-grid.html cũng hard-code đúng 3 giá trị này giống hệt
// nhau cho MỌI sản phẩm (luôn 5 sao, luôn "(15 Reviews)", luôn badge "New"), nên giữ nguyên làm
// hằng số hiển thị thay vì bịa dữ liệu mới.
const DISPLAY_RATING = 5;
const DISPLAY_REVIEWS = "(15 Reviews)";
const DISPLAY_SALE_BADGE = "New";

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

function ProductCard({ product, listView }: { product: ShopProduct; listView?: boolean }) {
  return (
    <div className={`shop-item${listView ? " grid-shop" : ""}`}>
      <div className="shop-thumb">
        <div className="overlay"></div>
        <Image src={product.image} alt="shop" fill />
        <span className="sale">{DISPLAY_SALE_BADGE}</span>
        <ul className="shop-list">
          <li>
            <a href="cart.html">
              <i className="fa-regular fa-cart-shopping"></i>
            </a>
          </li>
          <li>
            <a href="wishlist.html">
              <i className="fa-light fa-heart"></i>
            </a>
          </li>
          <li>
            <Link href={`/shop/${product.slug}`}>
              <i className="fa-light fa-eye"></i>
            </Link>
          </li>
        </ul>
      </div>
      <div className="shop-content">
        <span className="category">{product.category}</span>
        <h3 className="title">
          <Link href={`/shop/${product.slug}`}>{product.title}</Link>
        </h3>
        {listView && (
          <p>Auctor urna nunc id cursus. Scelerisque purus semper eget duis at pharetra vel turpis nunc eget.</p>
        )}
        <div className="review-wrap">
          <ul className="review">
            {Array.from({ length: DISPLAY_RATING }).map((_, index) => (
              <li key={index}>
                <i className="fa-solid fa-star"></i>
              </li>
            ))}
          </ul>
          <span>{DISPLAY_REVIEWS}</span>
        </div>
        <span className="price">
          {" "}
          {product.salePrice !== null && <span className="offer">{formatPrice(product.basePrice)}</span>}
          {formatPrice(product.salePrice ?? product.basePrice)}
        </span>
      </div>
    </div>
  );
}

export default function ShopSection({ products }: { products: ShopProduct[] }) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  // Nguồn main.js dòng 392-398: priceRange mặc định value=300, priceOutput hiển thị số đó.
  const [priceValue, setPriceValue] = useState(300);

  return (
    <section className="shop-grid pt-100 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-9 col-md-12">
            <div className="shop-grid-left">
              <div className="top-grid-content">
                <div className="shop-tab-nav">
                  <nav>
                    <div className="nav nav-tabs" role="tablist">
                      <button
                        className={`nav-link${viewMode === "grid" ? " active" : ""}`}
                        type="button"
                        role="tab"
                        aria-selected={viewMode === "grid"}
                        onClick={() => setViewMode("grid")}
                      >
                        <svg width="20" height="17" viewBox="0 0 20 17" xmlns="http://www.w3.org/2000/svg">
                          <rect x="15" width="5" height="3" fill="currentColor" />
                          <rect x="15" y="7" width="5" height="3" fill="currentColor" />
                          <rect x="15" y="14" width="5" height="3" fill="currentColor" />
                          <rect x="7.71875" width="5" height="3" fill="currentColor" />
                          <rect x="7.71875" y="7" width="5" height="3" fill="currentColor" />
                          <rect x="7.71875" y="14" width="5" height="3" fill="currentColor" />
                          <rect width="5" height="3" fill="currentColor" />
                          <rect y="7" width="5" height="3" fill="currentColor" />
                          <rect y="14" width="5" height="3" fill="currentColor" />
                        </svg>
                      </button>
                      <button
                        className={`nav-link${viewMode === "list" ? " active" : ""}`}
                        type="button"
                        role="tab"
                        aria-selected={viewMode === "list"}
                        onClick={() => setViewMode("list")}
                      >
                        <svg width="20" height="17" viewBox="0 0 20 17" xmlns="http://www.w3.org/2000/svg">
                          <rect x="5.71875" width="14.2857" height="3" fill="currentColor" />
                          <rect x="5.71875" y="7" width="14.2857" height="3" fill="currentColor" />
                          <rect x="5.71875" y="14" width="14.2857" height="3" fill="currentColor" />
                          <rect width="3.80952" height="3" fill="currentColor" />
                          <rect y="7" width="3.80952" height="3" fill="currentColor" />
                          <rect y="14" width="3.80952" height="3" fill="currentColor" />
                        </svg>
                      </button>
                    </div>
                  </nav>
                  <span>Showing 1–{products.length} of {products.length} results</span>
                </div>
                <NiceSelect
                  className="shop-select country"
                  defaultValue=""
                  options={[
                    { value: "", label: "Default Shorting" },
                    { value: "vdt", label: "Most Popular" },
                    { value: "can", label: "Date" },
                    { value: "uk", label: "Tranding" },
                    { value: "dk", label: "Featured" },
                    { value: "dl", label: "Discounted" },
                  ]}
                />
              </div>
              <div className="tab-content">
                {viewMode === "grid" ? (
                  <div className={`tab-pane fade show active`}>
                    <div className="row gy-4">
                      {products.map((product) => (
                        <div className="col-xl-4 col-lg-6 col-md-6" key={product.slug}>
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="tab-pane fade show active">
                    <div className="grid-shop-items">
                      {products.map((product) => (
                        <ProductCard product={product} listView key={product.slug} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-12">
            <div className="shop-sidebar">
              <h3 className="sidebar-header">Categories</h3>
              <ul className="sidebar-list">
                {categoryFilters.map((filter) => (
                  <li key={filter.id}>
                    <input type="checkbox" id={filter.id} name={filter.id} value="Bike" />
                    <label htmlFor={filter.id}> {filter.label}</label>
                    <br />
                  </li>
                ))}
              </ul>
            </div>
            <div className="shop-sidebar">
              <h3 className="sidebar-header">Filter by price</h3>
              <div className="filter-box">
                <div className="range-slider">
                  <input
                    type="range"
                    min={20}
                    max={500}
                    value={priceValue}
                    id="price-range"
                    onChange={(event) => setPriceValue(Number(event.target.value))}
                  />
                  <div className="slider-line"></div>
                  <div className="range-slider-output">
                    <h3 className="price">Price: $10 — $90</h3>
                    <h3 id="price-output" className="price">
                      $<span>{priceValue}</span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="shop-sidebar">
              <h3 className="sidebar-header">Item Size</h3>
              <div className="radion-btn-area">
                {sizeFilters.map((size, index) => (
                  <div className="radio-item" key={index}>
                    <label htmlFor={`radio-${index + 1}`}>
                      <input type="radio" id={`radio-${index + 1}`} name="flavor" value="vanilla" />
                      <span className="size">{size}</span>
                    </label>
                    <span className="number">(15)</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="shop-sidebar">
              <h3 className="sidebar-header">Brands</h3>
              <ul className="sidebar-list list-2">
                {brandFilters.map((brand) => (
                  <li key={brand.id}>
                    <div className="left-item">
                      <input type="checkbox" id={brand.id} name={brand.id} value="Bike" />
                      <label htmlFor={brand.id}> {brand.label}</label>
                      <br />
                    </div>
                    <span className="number">(15)</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="shop-sidebar sticky-widget">
              <h3 className="sidebar-header">Brands</h3>
              <div className="sidebar-items">
                {sidebarPicks.map((pick) => (
                  <div className="sidebar-item" key={pick.title}>
                    <div className="item-img">
                      <Image src={pick.image} alt="img" width={85} height={85} />
                    </div>
                    <div className="content">
                      <ul className="review">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <li key={index}>
                            <i className="fa-solid fa-star"></i>
                          </li>
                        ))}
                      </ul>
                      <h4 className="title">{pick.title}</h4>
                      <span className="price">
                        {" "}
                        <span className="offer">{pick.offerPrice}</span>
                        {pick.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ul className="pagination-wrap mt-50">
          <li>
            <a href="#">1</a>
          </li>
          <li>
            <a href="#" className="active">
              2
            </a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li>
            <a href="#">
              <i className="fa-regular fa-chevrons-right"></i>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
