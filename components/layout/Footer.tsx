export default function Footer() {
  return (
    <>
      <footer className="footer-section bg-grey pt-60">
        <div className="container">
          <div className="footer-items">
            <div className="footer-item">
              <div className="icon">
                <img src="/assets/img/icon/footer-1.png" alt="icon" />
              </div>
              <div className="content">
                <h4 className="title">Free Shipping</h4>
                <span>Free shipping on orders over $65</span>
              </div>
            </div>
            <div className="footer-item">
              <div className="icon">
                <img src="/assets/img/icon/footer-2.png" alt="icon" />
              </div>
              <div className="content">
                <h4 className="title">Free Returns</h4>
                <span>30-days free return polic</span>
              </div>
            </div>
            <div className="footer-item">
              <div className="icon">
                <img src="/assets/img/icon/footer-3.png" alt="icon" />
              </div>
              <div className="content">
                <h4 className="title">Secured Payments</h4>
                <span>We accept all major credit card</span>
              </div>
            </div>
            <div className="footer-item item-2">
              <div className="icon">
                <img src="/assets/img/icon/footer-4.png" alt="icon" />
              </div>
              <div className="content">
                <h4 className="title">Customer Service</h4>
                <span>Top notch customer service</span>
              </div>
            </div>
          </div>
          <div className="row footer-widget-wrap pb-60">
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <div className="widget-header">
                  <h3 className="widget-title">About Store</h3>
                </div>
                <div className="footer-contact">
                  <div className="icon"><i className="fa-sharp fa-solid fa-phone-rotary" /></div>
                  <div className="content">
                    <span>Have Question? Call Us 24/7</span>
                    <a href="tel:+25836922569">+258 3692 2569</a>
                  </div>
                </div>
                <ul className="schedule-list">
                  <li><span>Monday - Friday:</span>8:00am - 6:00pm</li>
                  <li><span>Saturday:</span>8:00am - 6:00pm</li>
                  <li><span>Sunday</span> Service Close</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="footer-widget">
                <div className="widget-header">
                  <h3 className="widget-title">Our Stores</h3>
                </div>
                <ul className="footer-list">
                  <li><a href="contact.html">New York</a></li>
                  <li><a href="contact.html">London SF</a></li>
                  <li><a href="contact.html">Los Angele</a></li>
                  <li><a href="contact.html">Chicago</a></li>
                  <li><a href="contact.html">Las Vegas</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="footer-widget">
                <div className="widget-header">
                  <h3 className="widget-title">Shop Categories</h3>
                </div>
                <ul className="footer-list">
                  <li><a href="shop-grid.html">New Arrivals</a></li>
                  <li><a href="shop-grid.html">Best Selling</a></li>
                  <li><a href="shop-grid.html">Vegetables</a></li>
                  <li><a href="shop-grid.html">Fresh Meat</a></li>
                  <li><a href="shop-grid.html">Fresh Seafood</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="footer-widget">
                <div className="widget-header">
                  <h3 className="widget-title">Useful Links</h3>
                </div>
                <ul className="footer-list">
                  <li><a href="contact.html">Privacy Policy</a></li>
                  <li><a href="contact.html">Terms & Conditions</a></li>
                  <li><a href="contact.html">Contact Us</a></li>
                  <li><a href="blog-grid.html">Latest News</a></li>
                  <li><a href="contact.html">Our Sitemaps</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <div className="widget-header">
                  <h3 className="widget-title">Our Newsletter</h3>
                </div>
                <div className="news-form-wrap">
                  <p className="mb-20">Subscribe to the mailing list to receive updates one the new arrivals and other discounts</p>
                  <div className="footer-form mb-20">
                    <form action="#" className="rr-subscribe-form">
                      <input className="form-control" type="email" name="email" placeholder="Email address" />
                      <input type="hidden" name="action" value="mailchimpsubscribe" />
                      <button className="submit">Subscribe</button>
                      <div className="clearfix"></div>
                    </form>
                  </div>
                  <p className="mb-0">I would like to receive news and special offer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-area">
          <div className="container">
            <div className="row copyright-content">
              <div className="col-lg-6">
                <div className="footer-img-wrap">
                  <span>Payment System:</span>
                  <div className="footer-img"><a href="#"><img src="/assets/img/images/footer-img-1.png" alt="img" /></a></div>
                </div>
              </div>
              <div className="col-lg-6">
                <p>Copyright & Design 2024 <span>©Roiser</span>. All Right Reserved</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* ./ footer-section */}
    </>
  );
}
