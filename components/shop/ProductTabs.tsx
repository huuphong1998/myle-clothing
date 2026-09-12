"use client";

import { useState } from "react";

// Nguồn: roiser-html-package/roiser/shop-details.html, <section class="product-description pb-100">
// (dòng 361-523). Bảng size/review vẫn là text tĩnh dùng chung cho mọi sản phẩm (không có dữ
// liệu tương ứng trong Supabase — bảng reviews thuộc backlog task 1.2 chưa làm). Riêng đoạn mô
// tả: dùng products.description thật khi có (cột này đã tồn tại trong Supabase), fallback về
// đúng 2 đoạn lorem gốc của template khi sản phẩm chưa có description (hầu hết sản phẩm seed
// hiện tại — chỉ "Poncho Sweater International" có description thật).
// Bootstrap tab JS (data-bs-toggle="tab") không được nạp trong app này nên build lại bằng
// React state, giống cách ShopSection xử lý tab grid/list.
type TabKey = "description" | "additional" | "reviews";

export default function ProductTabs({ description }: { description: string | null }) {
  const [activeTab, setActiveTab] = useState<TabKey>("description");

  return (
    <section className="product-description pb-100">
      <div className="container">
        <ul className="nav tab-navigation" role="tablist">
          <li role="presentation">
            <button
              className={activeTab === "description" ? "active" : ""}
              type="button"
              role="tab"
              aria-selected={activeTab === "description"}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
          </li>
          <li role="presentation">
            <button
              className={activeTab === "additional" ? "active" : ""}
              type="button"
              role="tab"
              aria-selected={activeTab === "additional"}
              onClick={() => setActiveTab("additional")}
            >
              Additional information
            </button>
          </li>
          <li role="presentation">
            <button
              className={activeTab === "reviews" ? "active" : ""}
              type="button"
              role="tab"
              aria-selected={activeTab === "reviews"}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews (3)
            </button>
          </li>
        </ul>
        <div className="tab-content">
          {activeTab === "description" && (
            <div className="tab-pane fade show active description">
              <div className="desc-wrap">
                <div className="left-content">
                  {description ? (
                    <p className="mb-0">{description}</p>
                  ) : (
                    <>
                      <p className="mb-30">
                        Credibly negotiate emerging materials whereas clicks-and-mortar intellectual capital.
                        Compellingly whiteboard client-centric sourcescross-platform schemas. Distinctively develop
                        future-proof outsourcing without multimedia based portals. Progressively coordinate generation
                        architectures for collaborative solutions. Professionally restore backward-compatible quality
                        vectors before customer directed metrics. Holisticly restore technically sound internal or
                        &quot;organic&quot; sources before client-centered human capital underwhelm holistic mindshare
                        for prospective innovation.
                      </p>
                      <p className="mb-0">
                        Seamlessly target fully tested infrastructures whereas just in time process improvements.
                        Dynamically exploit team driven functionalities vis a vis global total linkage redibly
                        synthesize just in time technology rather than open-source strategic theme areas.
                      </p>
                    </>
                  )}
                </div>
                <div className="right-content">
                  <img src="/assets/img/shop/shop-details-img.jpg" alt="" />
                </div>
              </div>
            </div>
          )}
          {activeTab === "additional" && (
            <div className="tab-pane fade show active">
              <table className="table product-table">
                <thead>
                  <tr>
                    <th scope="col">Size</th>
                    <th scope="col">Bust</th>
                    <th scope="col">Waist</th>
                    <th scope="col">Hip</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>S</td>
                    <td>34 -36</td>
                    <td>28-30</td>
                    <td>38-40</td>
                  </tr>
                  <tr>
                    <td>M</td>
                    <td>36 -38</td>
                    <td>30-32.5</td>
                    <td>40-43</td>
                  </tr>
                  <tr>
                    <td>L</td>
                    <td>38-40</td>
                    <td>32-34.5</td>
                    <td>42-45.5</td>
                  </tr>
                  <tr>
                    <td>XL</td>
                    <td>40-42</td>
                    <td>35-37</td>
                    <td>46-38</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="tab-pane fade review show active">
              <div className="row product-review gy-lg-0 gy-4">
                <div className="col-lg-5 col-md-12">
                  <div className="reviewr-wrap">
                    <div className="review-list">
                      <div className="review-item">
                        <div className="review-thumb">
                          <img src="/assets/img/shop/review-list-1.jpg" alt="img" />
                        </div>
                        <div className="content">
                          <div className="content-top">
                            <h4 className="name">
                              Eleanor Fant <span>06 March, 2023</span>
                            </h4>
                            <ul className="review">
                              {Array.from({ length: 5 }).map((_, index) => (
                                <li key={index}>
                                  <i className="fa-sharp fa-solid fa-star"></i>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <p>
                            Designed very similarly to the nearly double priced Galaxy tab S6, with the only removal
                            being.
                          </p>
                        </div>
                      </div>
                      <div className="review-item">
                        <div className="review-thumb">
                          <img src="/assets/img/shop/review-list-2.jpg" alt="img" />
                        </div>
                        <div className="content">
                          <div className="content-top">
                            <h4 className="name">
                              Haliey White <span>06 March, 2023</span>
                            </h4>
                            <ul className="review">
                              {Array.from({ length: 5 }).map((_, index) => (
                                <li key={index}>
                                  <i className="fa-sharp fa-solid fa-star"></i>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <p>
                            Designed very similarly to the nearly double priced Galaxy tab S6, with the only removal
                            being.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7 col-md-12">
                  <div className="review-form-wrap">
                    <h4 className="title">Review this product</h4>
                    <span className="publish">Your email address will not be published. Required fields are marked *</span>
                    <div className="review-box">
                      <span>Your ratings :</span>
                      <ul className="review">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <li key={index}>
                            <i className="fa-sharp fa-solid fa-star"></i>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="blog-contact-form form-2 review-form">
                      <div className="request-form">
                        <form action="contact.php" method="post" className="form-horizontal">
                          <div className="form-group row">
                            <div className="col-md-12">
                              <div className="form-item">
                                <input type="text" id="fullname" name="fullname" className="form-control" placeholder="Your Name" />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-item">
                                <input type="text" id="email" name="email" className="form-control" placeholder="Your Email" />
                              </div>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-md-12">
                              <div className="form-item message-item">
                                <textarea id="message" name="message" cols={30} rows={5} className="form-control address" placeholder="Comment"></textarea>
                              </div>
                            </div>
                          </div>
                          <div className="checkbox-wrap">
                            <input type="checkbox" id="save-comment" name="save-comment" value="Boat" />
                            <label htmlFor="save-comment">
                              Save my name, email, and website in this browser for the next time I comment.
                            </label>
                            <br />
                          </div>
                          <div className="submit-btn">
                            <button id="submit" className="rr-primary-btn" type="submit">
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
