import { notFound } from "next/navigation";
import ProductGallery from "@/components/shop/ProductGallery";
import ProductTabs from "@/components/shop/ProductTabs";
import { getProductDetailBySlug } from "@/lib/supabase/products";

// Nguồn: roiser-html-package/roiser/shop-details.html.
// page-header dòng 241-260; row gallery/product-info dòng 262-358 (ProductGallery + phần info
// dưới đây); mô tả/tab dòng 361-523 (ProductTabs).
// Slug tự đặt (kebab-case theo tên sản phẩm, cột products.slug) vì template gốc không có khái
// niệm slug — mọi link "Shop Details" trong site đều trỏ thẳng tới đúng 1 file shop-details.html
// tĩnh. Server Component: fetch trực tiếp từ Supabase (anon key qua @supabase/ssr) theo slug,
// không dùng generateStaticParams tĩnh nữa vì catalog có thể đổi độc lập với lần deploy.
// rating (luôn 5 sao) là hằng số hiển thị giống hệt shop-grid.html, không có cột tương ứng
// trong DB (chưa có bảng reviews — backlog task 1.2).
const DISPLAY_RATING = 5;

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

export default async function ShopDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductDetailBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <section className="page-header">
        <div className="shape">
          <img src="/assets/img/shapes/page-header-shape.png" alt="shape" />
        </div>
        <div className="container">
          <div className="page-header-content">
            <h1 className="title">Shop Details</h1>
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
                <span>Shop Details</span>
              </span>
            </h4>
          </div>
        </div>
      </section>

      <section className="shop-section single pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 product-details-wrap">
              <ProductGallery images={product.images} />
            </div>
            <div className="col-lg-6">
              <div className="product-details">
                <div className="product-info">
                  <div className="product-inner">
                    <span className="category">{product.category}</span>
                    <h3 className="title">{product.title}</h3>
                    <div className="rating-wrap">
                      <ul className="rating">
                        {Array.from({ length: DISPLAY_RATING }).map((_, index) => (
                          <li key={index}>
                            <i className="fa-sharp fa-solid fa-star"></i>
                          </li>
                        ))}
                      </ul>
                      <span>(1 customer review)</span>
                    </div>
                    <h4 className="price">
                      {formatPrice(product.salePrice ?? product.basePrice)}{" "}
                      {product.salePrice !== null && <span>{formatPrice(product.basePrice)}</span>}
                    </h4>
                    <div className="product-desc-wrap">
                      <p className="desc">
                        Eget taciti odio cum habitant egestas conubia turpis phasellus, ante parturient <br /> donec
                        duis primis nam faucibus augue malesuada venenatis
                      </p>
                      <span className="view-text">
                        <i className="fa-sharp fa-regular fa-eye"></i>28 people are viewing this right now
                      </span>
                    </div>
                    <div className="item-left-line">
                      <span>Only {product.stockQuantity} items left in stock!</span>
                      <div className="line"></div>
                    </div>
                    <ul className="details-list">
                      <li>
                        <i className="fa-light fa-arrow-right-arrow-left"></i>Free returns
                      </li>
                      <li>
                        <i className="fa-light fa-truck"></i>Free shipping via DHL, fully insured
                      </li>
                      <li>
                        <i className="fa-light fa-circle-check"></i>All taxes and customs duties included
                      </li>
                    </ul>
                  </div>
                  <div className="product-btn">
                    <form>
                      <input type="number" name="age" id="age" min={1} max={100} step={1} defaultValue={1} />
                    </form>
                    <div className="cart-btn-wrap-2">
                      <a href="cart.html" className="rr-primary-btn cart-btn">
                        Add To Cart
                      </a>
                    </div>
                  </div>
                  <a href="checkout.html" className="shop-details-btn rr-primary-btn">
                    Buy The Item Now
                  </a>
                  <ul className="product-meta">
                    <li>
                      <a href="#">Compare</a>
                    </li>
                    <li>
                      <a href="#">Ask a question</a>
                    </li>
                    <li>
                      <a href="#">Share</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductTabs description={product.description} />
    </>
  );
}
