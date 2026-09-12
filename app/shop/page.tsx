import ShopSection from "@/components/shop/ShopSection";

// Nguồn page-header: roiser-html-package/roiser/shop.html dòng 241-260.
// Nội dung grid/sidebar bên dưới lấy từ shop-grid.html (xem components/shop/ShopSection.tsx).
export default function ShopPage() {
  return (
    <>
      <section className="page-header">
        <div className="shape">
          <img src="/assets/img/shapes/page-header-shape.png" alt="shape" />
        </div>
        <div className="container">
          <div className="page-header-content">
            <h1 className="title">Shop</h1>
            <h4 className="sub-title">
              <span className="home">
                <a href="#">
                  <span>Home</span>
                </a>
              </span>
              <span className="icon">
                <i className="fa-solid fa-angle-right"></i>
              </span>
              <span className="inner">
                <span>Shop</span>
              </span>
            </h4>
          </div>
        </div>
      </section>
      <ShopSection />
    </>
  );
}
