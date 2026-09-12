import ShopSection from "@/components/shop/ShopSection";
import { getShopProducts } from "@/lib/supabase/products";

// Nguồn page-header: roiser-html-package/roiser/shop.html dòng 241-260.
// Nội dung grid/sidebar bên dưới lấy từ shop-grid.html (xem components/shop/ShopSection.tsx).
// Server Component: fetch trực tiếp từ Supabase (anon key qua @supabase/ssr, RLS cho đọc công
// khai) — không còn dùng mảng mock, không lộ service role key ra client.
export default async function ShopPage() {
  const products = await getShopProducts();

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
      <ShopSection products={products} />
    </>
  );
}
