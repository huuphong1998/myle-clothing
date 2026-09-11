import Image from "next/image";

// Nguồn: roiser-html-package/roiser/index.html, <section class="hero-section"> (dòng 241-264)
export default function Hero() {
  return (
    <section className="hero-section">
      <div className="overlay"></div>
      <div className="hero-images">
        <div className="hero-people">
          <Image
            src="/assets/img/images/hero-peoples.png"
            alt="img"
            width={1068}
            height={650}
          />
        </div>
        <div className="hero-shape">
          <Image
            src="/assets/img/shapes/hero-shape-1.png"
            alt="shape"
            width={1103}
            height={506}
          />
        </div>
        <div className="hero-shape-2">
          <Image
            src="/assets/img/shapes/hero-shape-2.png"
            alt="shape"
            width={1511}
            height={637}
          />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xl-8"></div>
          <div className="col-xl-4 col-lg-12">
            <div className="hero-content">
              <h4 className="sub-title">ummer 22 women’s collection</h4>
              <h2 className="title">
                Super COLLECTION <br />
                FOR WOMEN
              </h2>
              <h5 className="price">
                <span>From</span>$320.00
              </h5>
              <a href="shop.html" className="rr-primary-btn">
                View Collections
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
