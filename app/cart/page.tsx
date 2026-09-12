import Image from "next/image";

// Nguồn: roiser-html-package/roiser/cart.html (backlog task 0.5). Giữ nguyên class/cấu trúc
// HTML gốc, dữ liệu giỏ hàng hard-code y hệt source (kể cả số subtotal/total không khớp toán
// học trong template gốc — không tự sửa số). CHƯA nối bảng cart_items thật (thuộc backlog task
// 1.9, cần bảng cart_items ở task 1.2 làm trước) nên không có logic cộng dồn khi đổi số lượng.
const cartItems = [
  {
    image: "/assets/img/shop/cart-img-1.png",
    title: "Power Guard Fortress",
    price: "$550.00",
    quantity: 1,
    subtotal: "$230.50",
  },
  {
    image: "/assets/img/shop/cart-img-2.png",
    title: "Quantum Sound Enigma",
    price: "$550.00",
    quantity: 1,
    subtotal: "$230.50",
  },
];

export default function CartPage() {
  return (
    <>
      <section className="page-header">
        <div className="shape">
          <img src="/assets/img/shapes/page-header-shape.png" alt="shape" />
        </div>
        <div className="container">
          <div className="page-header-content">
            <h1 className="title">Cart Page</h1>
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
                <span>Cart Page</span>
              </span>
            </h4>
          </div>
        </div>
      </section>

      <section className="cart-section pt-130 pb-130">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="cart-top-content">
                <p>
                  Add <span>$59.69</span> to cart and get free shipping
                </p>
                <div className="line"></div>
              </div>
              <div className="table-content cart-table">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th className="product-remove"></th>
                      <th className="cart-product-name text-center">Products</th>
                      <th className="product-price"> Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-subtotal">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.title}>
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
                            <h4 className="title">{item.title}</h4>
                          </div>
                        </td>
                        <td className="product-price">
                          <span className="amount">{item.price}</span>
                        </td>
                        <td className="product-quantity">
                          <div className="quantity__group">
                            <input
                              type="number"
                              className="input-text qty text"
                              name="quantity"
                              defaultValue={item.quantity}
                              min={1}
                              max={100}
                              step={1}
                              autoComplete="off"
                            />
                          </div>
                        </td>
                        <td className="product-subtotal">
                          <span className="amount">{item.subtotal}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="cart-btn-wrap">
                <div className="left-item">
                  <input type="text" className="form-control" placeholder="Coupon Code" />
                  <button type="button" className="rr-primary-btn">
                    Apply Coupon
                  </button>
                </div>
                <button type="button" className="rr-primary-btn update-btn">
                  Update Cart
                </button>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="checkout-wrapper">
                <div className="checkout-top checkout-item item-1">
                  <h4 className="title">Cart Totals</h4>
                </div>
                <div className="checkout-top checkout-item">
                  <h4 className="title">Subtotal</h4>
                  <span className="price">$1100.00</span>
                </div>
                <div className="checkout-shipping checkout-item">
                  <h4 className="title">Shipping</h4>
                  <div className="shipping-right">
                    <div className="checkout-option-wrapper">
                      <div className="shipping-option">
                        <input id="flat_rate" type="radio" name="shipping" />
                        <label htmlFor="flat_rate">Free Shipping</label>
                      </div>
                      <div className="shipping-option">
                        <input id="local_pickup" type="radio" name="shipping" />
                        <label htmlFor="local_pickup">Flat Rate</label>
                      </div>
                      <div className="shipping-option">
                        <input id="free_shipping" type="radio" name="shipping" />
                        <label htmlFor="free_shipping">Local Pickup</label>
                      </div>
                    </div>
                    <p>
                      Shipping options will be updated <br /> during checkout
                    </p>
                    <span>Calculate Shipping</span>
                  </div>
                </div>
                <div className="checkout-total checkout-item">
                  <h4 className="title">Total</h4>
                  <span>$724</span>
                </div>
              </div>
              <div className="checkout-proceed">
                <a href="checkout.html" className="rr-primary-btn checkout-btn">
                  Proceed to Checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
