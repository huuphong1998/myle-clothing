// Nguồn: roiser-html-package/roiser/index.html, <section class="cta-section"> (dòng 567-577)
// CSS: main.css .cta-section / .cta-wrap (dòng 4856-4918)
// data-background gốc được main.js gán background-image bằng jQuery (main.js dòng 149-150);
// ở đây set thẳng background-image qua style vì không port vendor jQuery.
export default function CtaSection() {
  return (
    <section
      className="cta-section pt-100 pb-100"
      data-background="assets/img/bg-img/cta-bg.jpg"
      style={{ backgroundImage: "url(/assets/img/bg-img/cta-bg.jpg)" }}
    >
      <div className="overlay"></div>
      <div className="container">
        <div className="cta-wrap text-center">
          <span>Spring summer 22 women’s collection</span>
          <h2 className="title">
            -15% Off Discount <br />
            All Here
          </h2>
          <a href="shop.html" className="rr-primary-btn cta-btn">
            View Collections
          </a>
        </div>
      </div>
    </section>
  );
}
