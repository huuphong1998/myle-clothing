import Image from "next/image";

// Nguồn: roiser-html-package/roiser/index.html, <section class="discount-section"> (dòng 333-373)
// CSS: main.css .discount-item (dòng 4616-4707), .product-overlay (dòng 391-401)
export default function DiscountSection() {
  return (
    <section className="discount-section overflow-hidden pb-100">
      <div className="row gy-lg-0 gy-4">
        <div className="col-lg-4 col-md-6">
          <div className="discount-item item-1">
            <div className="product-overlay"></div>
            <div className="shape">
              <Image src="/assets/img/shapes/dis-shpe.png" alt="shape" width={633} height={300} />
            </div>
            <div className="content">
              <span>Special 50% Disocunt</span>
              <h3 className="title">
                The Latest Men’s Trends <br /> This Season
              </h3>
              <a href="shop.html">
                <i className="fa-regular fa-plus"></i>View Collections
              </a>
            </div>
            <div className="men">
              <Image src="/assets/img/images/discount-men-1.png" alt="img" width={233} height={256} />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="discount-item">
            <div className="product-overlay"></div>
            <div className="shape">
              <Image src="/assets/img/shapes/dis-shpe.png" alt="shape" width={633} height={300} />
            </div>
            <div className="men">
              <Image src="/assets/img/images/discount-men-2.png" alt="img" width={281} height={241} />
            </div>
            <div className="content">
              <span>Special 50% Disocunt</span>
              <h3 className="title">
                Latest Kids Trends <br />
                This Season
              </h3>
              <a href="shop.html">
                <i className="fa-regular fa-plus"></i>View Collections
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="discount-item">
            <div className="product-overlay"></div>
            <div className="shape">
              <Image src="/assets/img/shapes/dis-shpe.png" alt="shape" width={633} height={300} />
            </div>
            <div className="men">
              <Image src="/assets/img/images/discount-men-3.png" alt="img" width={301} height={252} />
            </div>
            <div className="content">
              <span>Special 50% Disocunt</span>
              <h3 className="title">
                Latest Women’s Trends <br />
                This Season
              </h3>
              <a href="shop.html">
                <i className="fa-regular fa-plus"></i>View Collections
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
