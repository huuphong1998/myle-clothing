import Image from "next/image";

// Nguồn: roiser-html-package/roiser/index.html, <section class="blog-section"> (dòng 705-771)
// CSS: main.css .post-card / .post-meta (dòng 5100-5216)
type Post = {
  image: string;
  title: string;
};

const posts: Post[] = [
  { image: "/assets/img/blog/post-1.jpg", title: "Fashion Around the: Exploring Cultural Influences" },
  { image: "/assets/img/blog/post-2.jpg", title: "Embracing Ethical and Eco friendly Fashion" },
  { image: "/assets/img/blog/post-3.jpg", title: "How to Decorate Your Car for Halloween" },
];

export default function BlogSection() {
  return (
    <section className="blog-section pb-100">
      <div className="container">
        <div className="section-heading text-center">
          <h2 className="section-title mb-0">Our Latest News Insight</h2>
        </div>
        <div className="row gy-lg-0 gy-4 justify-content-center">
          {posts.map((post) => (
            <div key={post.image} className="col-lg-4 col-md-6">
              <div className="post-card">
                <div className="post-thumb">
                  <Image src={post.image} alt="post" fill />
                </div>
                <div className="post-content-wrap">
                  <div className="post-content">
                    <ul className="post-meta">
                      <li>
                        <i className="fa-sharp fa-solid fa-calendar-days"></i>3 Comment
                      </li>
                      <li>
                        <i className="fa-regular fa-tag"></i>oil Change
                      </li>
                    </ul>
                    <h3 className="title">
                      <a href="blog-details.html">{post.title}</a>
                    </h3>
                  </div>
                  <div className="post-bottom">
                    <a href="blog-details.html" className="read-more">
                      Read More
                      <i className="fa-regular fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
