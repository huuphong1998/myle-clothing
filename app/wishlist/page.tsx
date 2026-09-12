import Image from "next/image";

// Nguồn: roiser-html-package/roiser/wishlist.html (backlog task 0.7). Giữ nguyên class/cấu
// trúc HTML gốc (cart-table table-2), dữ liệu hard-code y hệt source — kể cả dòng 3 lặp
// category/title "Ups System"/"Quantum Sound Enigma" giống hệt dòng 2 (lỗi copy-paste có sẵn
// trong template gốc, không tự sửa) và số cột thead (4) không khớp số cột tbody (5, có thêm
// product-subtotal) — cũng là quirk có sẵn trong source. Không có JS riêng cho trang này trong
// main.js nên hoàn toàn tĩnh, không xử lý remove/add-to-cart. CHƯA nối bảng wishlist_items thật
// (thuộc backlog task 1.10, cần task 1.2 làm bảng trước).
const wishlistItems = [
  {
    image: "/assets/img/shop/cart-img-1.png",
    category: "Headphone",
    title: "Power Guard Fortress",
    price: "$550.00",
  },
  {
    image: "/assets/img/shop/cart-img-2.png",
    category: "Ups System",
    title: "Quantum Sound Enigma",
    price: "$550.00",
  },
  {
    image: "/assets/img/shop/cart-img-3.png",
    category: "Ups System",
    title: "Quantum Sound Enigma",
    price: "$550.00",
  },
];

export default function WishlistPage() {
  return (
    <>
      <section className="page-header">
        <div className="shape">
          <img src="/assets/img/shapes/page-header-shape.png" alt="shape" />
        </div>
        <div className="container">
          <div className="page-header-content">
            <h1 className="title">Wishlist</h1>
            <h4 className="sub-title">
              <span className="home">
                <a href="index.html">
                  <span>Home</span>
                </a>
              </span>
              <span className="icon">
                <i className="fa-solid fa-angle-right"></i>
              </span>
              <span className="inner">
                <span>Wishlist</span>
              </span>
            </h4>
          </div>
        </div>
      </section>

      <section className="cart-section pt-130 pb-130">
        <div className="container">
          <div className="table-content cart-table table-2">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th className="product-remove"></th>
                  <th className="cart-product-name text-center">Product name</th>
                  <th className="product-price"> Price</th>
                  <th className="product-quantity">Stock Status</th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems.map((item, index) => (
                  <tr key={index}>
                    <td className="product-remove">
                      <button type="button">
                        <i className="fa-sharp fa-regular fa-xmark"></i>
                      </button>
                    </td>
                    <td className="product-thumbnail">
                      <a href="shop-details.html">
                        <Image src={item.image} alt="img" width={80} height={80} />
                      </a>
                      <div className="product-thumbnail">
                        <span className="category">{item.category}</span>
                        <h4 className="title">{item.title}</h4>
                      </div>
                    </td>
                    <td className="product-price">
                      <span className="amount">{item.price}</span>
                    </td>
                    <td className="product-quantity">
                      <span>Out of stock</span>
                    </td>
                    <td className="product-subtotal">
                      <button type="button" className="rr-primary-btn">
                        Add to cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
