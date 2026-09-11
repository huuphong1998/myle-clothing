# Backlog.md — MYLE CLOTHING

Backlog chia theo `spec.md`. Gồm 3 nhóm chính theo yêu cầu ban đầu (Port giao diện /
Nối dữ liệu / Hoàn thiện) cộng thêm **Nhóm 3 — Admin Dashboard** (bổ sung theo yêu
cầu, vì admin không nằm trong 5 module gốc và không có sẵn trang trong template
Roiser). Mỗi task được thiết kế để hoàn thành trong 1 buổi làm việc. Không trộn
việc giữa các nhóm.

---

## Nhóm 0 — Port giao diện (giữ nguyên CSS, chưa nối dữ liệu)

Nguồn: `roiser-html-package/roiser/*.html`. Mỗi task port đúng 1 trang, giữ nguyên
class CSS/cấu trúc HTML gốc, nội dung tĩnh (hard-code), build bằng Next.js, KHÔNG
nối Supabase/API ở nhóm này.

- [ ] **0.0** — Setup layout dùng chung: copy toàn bộ assets Roiser (CSS/JS/font/ảnh)
  vào `public/`, dựng `app/layout.tsx` + component `Header`/`Footer` dùng chung từ
  template, dựng skeleton route cho các trang bên dưới. (Task nền tảng, làm trước
  tiên.)
- [ ] **0.1** — Port `index.html` → trang chủ (`/`).
- [ ] **0.2** — Port `shop.html` → trang danh mục sản phẩm (`/shop`).
- [ ] **0.3** — Port `shop-grid.html` → danh sách sản phẩm dạng lưới (giữ nguyên bố
  cục filter/sort tĩnh).
- [ ] **0.4** — Port `shop-details.html` → chi tiết sản phẩm (`/shop/[slug]`, dữ
  liệu sản phẩm mẫu hard-code).
- [ ] **0.5** — Port `cart.html` → giỏ hàng (`/cart`, dữ liệu giỏ hàng mẫu hard-code).
- [ ] **0.6** — Port `checkout.html` → trang thanh toán (`/checkout`, form tĩnh,
  chưa xử lý submit).
- [ ] **0.7** — Port `wishlist.html` → danh sách yêu thích (`/wishlist`, dữ liệu mẫu).
- [ ] **0.8** — Port `login.html` → đăng nhập (`/login`, form tĩnh, chưa xử lý submit).
- [ ] **0.9** — Port `register.html` → đăng ký (`/register`, form tĩnh, chưa xử lý
  submit).
- [ ] **0.10** — Port `about.html` → giới thiệu (`/about`).
- [ ] **0.11** — Port `contact.html` → liên hệ (`/contact`, form tĩnh).
- [ ] **0.12** — Port `faq.html` → câu hỏi thường gặp (`/faq`).
- [ ] **0.13** — Dựng trang "Tài khoản của tôi" (`/account`): template Roiser không
  có sẵn trang này, nên **tự thiết kế bố cục dựa trên logic nghiệp vụ** (tab/section
  cho: lịch sử đơn hàng, chi tiết đơn, địa chỉ đã lưu, wishlist, thông tin cá nhân),
  nhưng **tái sử dụng các thành phần UI có sẵn trong template** (màu sắc, font, nút
  bấm, card, table, form input, spacing) để đảm bảo đồng bộ phong cách với các trang
  khác. Dữ liệu tĩnh (mẫu) ở bước này.
- [ ] **0.14** — Port `blog-grid-2.html` → danh sách bài viết blog (`/blog`).
  *(Template có 2 biến thể `blog-grid.html`/`blog-grid-2.html`; chọn `blog-grid-2`
  làm bản chính theo spec.md mục 6. Có thể port thêm `blog-grid.html` sau nếu cần
  biến thể bố cục khác.)*
- [ ] **0.15** — Port `blog-details.html` → chi tiết bài viết (`/blog/[slug]`, dữ
  liệu mẫu hard-code).
- [ ] **0.16** — Port `error.html` → trang lỗi 404, dùng cơ chế `app/not-found.tsx`
  của Next.js, giữ nguyên giao diện gốc.

---

## Nhóm 1 — Nối dữ liệu (Supabase + wiring vào giao diện đã port)

### 1A. Schema Supabase (làm trước, theo mục 7 spec.md)

- [ ] **1.0** — Schema: Auth & Users — bảng `addresses`; cấu hình Supabase Auth
  (email/password + OAuth Google, Facebook); rule chặn OAuth nếu email đã đăng ký
  bằng email/password (theo spec mục 3 "Hệ thống/Tích hợp"); RLS cho `addresses`.
- [ ] **1.1** — Schema: Catalog — bảng `categories`, `products`, `product_variants`;
  RLS đọc công khai (public read), ghi chỉ admin.
- [ ] **1.2** — Schema: Giỏ hàng, Wishlist, Reviews — bảng `cart_items`,
  `wishlist_items`, `reviews`; RLS mỗi user chỉ thao tác dữ liệu của chính mình.
- [ ] **1.3** — Schema: Đơn hàng & Khuyến mãi — bảng `orders`, `order_items`,
  `coupons`, `flash_sales`; RLS phù hợp (khách chỉ xem đơn của mình).
- [ ] **1.4** — Schema: Thanh toán & Fulfillment — bảng `payment_transactions`,
  `fulfillment_requests` (đã gồm `retry_count`, `last_error` theo spec); chuẩn bị
  sẵn cho Nhóm 2, chưa cần logic ở task này.
- [ ] **1.5** — Schema: Blog & Email logs — bảng `blog_posts`, `email_logs`; RLS đọc
  công khai cho `blog_posts`, ghi chỉ admin.

### 1B. Nối module vào giao diện Nhóm 0

- [ ] **1.6** — Module Đăng nhập/Đăng ký → nối `login.html`/`register.html` (0.8,
  0.9) với Supabase Auth: đăng ký, đăng nhập email/password, đăng nhập Google/
  Facebook, xử lý lỗi email trùng theo rule đã chốt.
- [ ] **1.7** — Module Catalog (danh sách) → nối `shop.html`, `shop-grid.html`
  (0.2, 0.3) với bảng `products`/`product_variants`: hiển thị danh sách thật, tìm
  kiếm & lọc theo danh mục/giá/size/màu.
- [ ] **1.8** — Module Catalog (chi tiết) → nối `shop-details.html` (0.4): hiển thị
  chi tiết sản phẩm thật, chọn size/màu, hiển thị đánh giá (reviews) thật.
- [ ] **1.9** — Module Giỏ hàng → nối `cart.html` (0.5) với `cart_items`: thêm/sửa/
  xóa sản phẩm, tính tổng tiền theo dữ liệu thật.
- [ ] **1.10** — Module Wishlist → nối `wishlist.html` (0.7) với `wishlist_items`:
  thêm/xóa sản phẩm yêu thích.
- [ ] **1.11** — Module Checkout (tạo đơn nháp) → nối `checkout.html` (0.6): chọn
  địa chỉ, áp mã coupon/flash sale (rule "lấy mức giảm cao hơn", không cộng dồn),
  kiểm tra & trừ tồn kho tại thời điểm bấm thanh toán (rule "không giữ chỗ trước"),
  tạo `orders` + `order_items` ở trạng thái `pending`. **Chưa tích hợp PayPal thật**
  (việc đó thuộc Nhóm 2).
- [ ] **1.12** — Module Đơn hàng (My Account) → nối trang `/account` (0.13) với
  `orders`, `order_items`, `addresses`, `wishlist_items` thật: xem lịch sử đơn hàng,
  chi tiết đơn, địa chỉ đã lưu.
- [ ] **1.13** — Module Blog → nối `/blog` (0.14) và `/blog/[slug]` (0.15) với bảng
  `blog_posts` thật.

---

## Nhóm 2 — Hoàn thiện (thanh toán, email, bảo mật trước khi public)

- [ ] **2.0** — Tích hợp PayPal Checkout SDK thật vào `checkout.html`: tạo PayPal
  order, hiển thị nút thanh toán, xử lý flow approve trên client.
- [ ] **2.1** — PayPal Webhook (server-to-server): xác nhận thanh toán, cập nhật
  `orders.status = paid` và ghi `payment_transactions` — theo rule đã chốt, webhook
  là nguồn sự thật duy nhất (không tạo đơn chỉ từ callback client).
- [ ] **2.2** — Tích hợp API xưởng sản xuất: khi đơn `paid`, tự động gửi đơn sang
  API xưởng, lưu kết quả vào `fulfillment_requests`.
- [ ] **2.3** — Retry & xử lý lỗi API xưởng: hàng đợi retry theo backoff, sau khi
  hết số lần thử → đánh dấu `needs_manual_review` + cảnh báo (email/log) cho admin —
  theo rule đã chốt.
- [ ] **2.4** — Email giao dịch: order confirmation (gửi khi đơn chuyển `paid`).
- [ ] **2.5** — Email giao dịch: shipping/tracking update (gửi khi `fulfillment_
  requests`/tracking thay đổi trạng thái).
- [ ] **2.6** — Email giao dịch: password reset (qua flow Supabase Auth).
- [ ] **2.7** — Bảo mật: rà soát Row Level Security (RLS) trên toàn bộ bảng đã tạo
  ở Nhóm 1 (bao gồm `blog_posts`, `email_logs`) — đảm bảo user chỉ đọc/ghi đúng dữ
  liệu của mình, admin có quyền riêng.
- [ ] **2.8** — Bảo mật: validate input & rate-limit cho các API route nhạy cảm
  (checkout, áp coupon, gửi review) để chống spam/injection.
- [ ] **2.9** — Bảo mật: rà soát biến môi trường/secrets (PayPal keys, Supabase
  service role key, API key xưởng) — đảm bảo không lộ ra client, cấu hình đúng trên
  Vercel (production vs preview env).
- [ ] **2.10** — Kiểm thử end-to-end luồng mua hàng đầy đủ ở chế độ PayPal Sandbox
  (đăng ký → chọn hàng → giỏ hàng → checkout → thanh toán → webhook → fulfillment →
  email) trước khi chuyển sang production.

---

## Nhóm 3 — Admin Dashboard (bổ sung)

Template Roiser không có sẵn trang admin, nên đây không phải "port" mà là xây UI
mới — nhưng vẫn giữ tinh thần 3 pha (UI trước, nối dữ liệu sau, hoàn thiện cuối) để
đồng bộ cách làm với 2 nhóm trên. Nên tái dùng bảng màu/font từ Roiser để đồng bộ
thương hiệu, không cần phức tạp về UI.

### 3A. Xây UI admin (tĩnh, chưa nối dữ liệu)

- [ ] **3.0** — Setup layout admin: sidebar điều hướng, header, khung trang dùng
  chung; chặn truy cập tạm thời bằng route group (`/admin`), chưa cần auth thật.
- [ ] **3.1** — UI Dashboard tổng quan (số liệu doanh thu/đơn hàng — dữ liệu mẫu).
- [ ] **3.2** — UI Quản lý sản phẩm: danh sách + form thêm/sửa sản phẩm & biến thể
  (dữ liệu mẫu).
- [ ] **3.3** — UI Quản lý đơn hàng: danh sách + trang chi tiết đơn, hiển thị trạng
  thái fulfillment (dữ liệu mẫu).
- [ ] **3.4** — UI Quản lý khuyến mãi: danh sách + form coupon và flash sale (dữ
  liệu mẫu).
- [ ] **3.5** — UI Quản lý blog: danh sách + form thêm/sửa bài viết (dữ liệu mẫu).
- [ ] **3.6** — UI Quản lý khách hàng: danh sách khách hàng + trang chi tiết (dữ
  liệu mẫu).

### 3B. Nối dữ liệu admin

- [ ] **3.7** — Phân quyền admin: thêm cơ chế `role` cho user trong Supabase, route
  guard/middleware chỉ cho phép admin vào `/admin/*`.
- [ ] **3.8** — Nối Quản lý sản phẩm (3.2) với `products`/`product_variants`: CRUD
  thật, cập nhật tồn kho.
- [ ] **3.9** — Nối Quản lý đơn hàng (3.3) với `orders`/`order_items`/
  `fulfillment_requests`: xem đơn thật, xử lý thủ công các đơn `needs_manual_review`.
- [ ] **3.10** — Nối Quản lý khuyến mãi (3.4) với `coupons`/`flash_sales`: CRUD thật.
- [ ] **3.11** — Nối Quản lý blog (3.5) với `blog_posts`: CRUD thật.
- [ ] **3.12** — Nối Quản lý khách hàng (3.6) với dữ liệu `users`/`orders` thật
  (read-only, xem lịch sử mua hàng theo khách).
- [ ] **3.13** — Nối Dashboard tổng quan (3.1) với số liệu thật (doanh thu, số đơn
  theo khoảng thời gian).

### 3C. Hoàn thiện admin

- [ ] **3.14** — Bảo mật admin: kiểm tra RLS + middleware chặn user thường gọi
  thẳng API admin (không chỉ chặn ở giao diện); audit log cho thao tác quan trọng
  (sửa giá, hủy đơn, tạo coupon).
- [ ] **3.15** — Kiểm thử luồng admin end-to-end: thêm sản phẩm → hiển thị trên
  site, tạo coupon → áp dụng thử khi checkout, cập nhật trạng thái đơn → khách thấy
  thay đổi trong `/account`.
