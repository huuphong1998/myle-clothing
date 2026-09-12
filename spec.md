# Spec.md — MYLE CLOTHING (POD eCommerce)

## 1. Mục tiêu

Xây dựng website bán hàng online (eCommerce) cho thương hiệu thời trang Print-on-Demand
(POD), phục vụ khách hàng tại Mỹ và quốc tế. Giao diện port từ template **Roiser**
(`roiser-html-package/`), backend/database dùng **Supabase**, framework **Next.js**.

Mô hình vận hành: dropshipping — khi có đơn hàng, hệ thống tự động đẩy đơn qua **API
riêng của xưởng sản xuất** để xưởng in và giao hàng trực tiếp cho khách (không qua nền
tảng POD trung gian như Printful/Printify).

## 2. Người dùng

### Khách hàng (Customer)
- Khu vực: Mỹ (USA) và quốc tế (ship toàn cầu).
- Giới tính: Unisex.
- Độ tuổi: 18–50.
- Phong cách: trẻ trung, năng động.
- Bắt buộc đăng ký tài khoản để mua hàng (không có guest checkout).
- Ngôn ngữ hiển thị: tiếng Anh.

### Quản trị viên (Admin)
- Quản lý sản phẩm, đơn hàng, tồn kho, khuyến mãi qua admin dashboard.
- Ngôn ngữ hiển thị: tiếng Việt.

## 3. Tính năng PHẢI có (bản đầu — MVP)

### Khách hàng
- Đăng ký / đăng nhập bằng email-password.
- Đăng nhập bằng Google / Facebook (OAuth qua Supabase Auth).
- Duyệt danh mục sản phẩm, xem chi tiết sản phẩm (chọn size, màu sắc).
- Tìm kiếm & lọc sản phẩm (danh mục, giá, size, màu).
- Giỏ hàng (cart) — thêm/sửa/xóa sản phẩm.
- Thanh toán (checkout) qua **PayPal**, hỗ trợ thanh toán bằng thẻ tín dụng/ghi nợ
  (qua PayPal Checkout, không cần Stripe riêng).
- Danh sách yêu thích (wishlist).
- Đánh giá & nhận xét sản phẩm (reviews & ratings).
- Trang "Tài khoản của tôi" (My Account): lịch sử đơn hàng, địa chỉ đã lưu,
  wishlist, thông tin cá nhân.
- Áp dụng mã giảm giá (coupon code) khi checkout.
- Xem sản phẩm đang flash sale / giảm giá theo %.
- Nhận email tự động: xác nhận đơn hàng, cập nhật trạng thái giao hàng,
  khôi phục mật khẩu.
- Website responsive, tối ưu tốt trên di động (không làm app native).
- Trang nội dung: About, Contact, FAQ, Blog (danh sách + chi tiết), Error (404).

### Admin
- Quản lý sản phẩm (thêm/sửa/xóa, biến thể size/màu, giá, hình ảnh, tồn kho).
- Quản lý đơn hàng (xem, cập nhật trạng thái, theo dõi trạng thái đẩy đơn qua xưởng).
- Quản lý tồn kho.
- Quản lý mã giảm giá, flash sale, chương trình giảm giá %.
- Quản lý bài viết blog.
- Giao diện admin bằng tiếng Việt.

### Hệ thống / Tích hợp
- Khi đơn hàng được đặt và thanh toán thành công → tự động gọi API của xưởng sản
  xuất để tạo đơn sản xuất/giao hàng (dropshipping tự động).
- Đồng bộ trạng thái đơn hàng/tracking từ xưởng về hệ thống (nếu API xưởng hỗ trợ).
- Ship hàng quốc tế (không giới hạn trong nước Mỹ).
- Chỉ giao dịch bằng **USD** (không đa tiền tệ).
- Xác nhận thanh toán qua **PayPal Webhook** (server-to-server) làm nguồn sự thật duy
  nhất để tạo đơn hàng chính thức — không tạo đơn chỉ dựa vào callback phía trình
  duyệt, tránh mất đơn hoặc tạo đơn trùng do gián đoạn mạng/đóng tab giữa chừng.
- Khi gọi API xưởng sản xuất thất bại (timeout, xưởng down...): hệ thống **tự động
  retry theo hàng đợi (queue + backoff)**; nếu vẫn thất bại sau số lần thử quy định,
  đơn hàng được đánh dấu trạng thái "cần xử lý thủ công" và gửi cảnh báo cho admin.
- Tồn kho theo biến thể **không giữ chỗ trước** (no reserve) — hệ thống chỉ kiểm tra
  và trừ tồn kho tại thời điểm khách bấm thanh toán; nếu hết hàng ngay lúc đó, hiển
  thị lỗi và yêu cầu khách chọn biến thể khác.
- Khuyến mãi: nếu một sản phẩm vừa đang flash sale vừa được áp mã coupon, hệ thống
  **tự động so sánh và áp mức giảm giá cao hơn** giữa flash sale và coupon (không
  cộng dồn cả hai).
- Tài khoản trùng email giữa email/password và OAuth (Google/Facebook): nếu email đã
  đăng ký bằng email/password, hệ thống **chặn đăng nhập OAuth** với email đó và yêu
  cầu khách đăng nhập lại bằng email/password ban đầu (không tự động gộp tài khoản).

## 4. Tính năng KHÔNG làm ở bản đầu

- Live chat trực tuyến.
- Chương trình affiliate / referral.
- Chương trình tích điểm (loyalty program).
- Đa tiền tệ (multi-currency).
- Guest checkout (mua không cần tài khoản).
- App di động dạng native (iOS/Android) — chỉ làm web responsive.
- Đa ngôn ngữ cho trang khách hàng (chỉ tiếng Anh; đa ngôn ngữ chỉ áp dụng cho admin
  nếu cần mở rộng sau).
- Cổng thanh toán khác ngoài PayPal (ví dụ Stripe) — có thể bổ sung ở bản sau.

## 5. Công nghệ

- **Frontend/Framework**: Next.js (App Router), TypeScript.
- **Giao diện**: Port từ template Roiser (HTML/CSS có sẵn tại `roiser-html-package/`).
- **Backend/Database**: Supabase (Postgres, Auth, Storage) — setup project từ đầu.
- **Xác thực**: Supabase Auth — email/password + OAuth Google, Facebook.
- **Thanh toán**: PayPal Checkout (hỗ trợ thẻ tín dụng/ghi nợ qua PayPal).
- **Tích hợp fulfillment**: API riêng của xưởng sản xuất (dropshipping tự động).
- **Email**: dịch vụ email transactional (ví dụ Supabase + Resend/SendGrid) cho email
  xác nhận đơn hàng, cập nhật giao hàng, khôi phục mật khẩu.
- **Đa ngôn ngữ**: i18n cho giao diện (tiếng Anh cho khách hàng, tiếng Việt cho admin).
- **Hosting/Deploy**: Vercel.
- **Đơn vị tiền tệ**: USD.

## 6. Màn hình chính

### Khách hàng
| Trang | Mô tả |
|---|---|
| index.html | Trang chủ |
| shop.html | Trang danh mục sản phẩm |
| shop-grid.html | Danh sách sản phẩm dạng lưới (có filter/search) |
| shop-details.html | Chi tiết sản phẩm (chọn size, màu, số lượng, đánh giá) |
| cart.html | Giỏ hàng |
| checkout.html | Thanh toán (PayPal, áp mã giảm giá) |
| wishlist.html | Danh sách yêu thích |
| login.html | Đăng nhập (email/password, Google, Facebook) |
| register.html | Đăng ký tài khoản |
| my-account.html | Tài khoản của tôi (đơn hàng, địa chỉ, wishlist, thông tin cá nhân) |
| about.html | Giới thiệu |
| contact.html | Liên hệ |
| faq.html | Câu hỏi thường gặp |
| blog.html / blog-grid-2.html | Danh sách bài viết blog |
| blog-details.html | Chi tiết bài viết |
| error.html | Trang lỗi 404 |

### Admin
| Trang | Mô tả |
|---|---|
| Dashboard | Tổng quan doanh thu, đơn hàng |
| Quản lý sản phẩm | Thêm/sửa/xóa sản phẩm, biến thể, tồn kho |
| Quản lý đơn hàng | Danh sách đơn, chi tiết, trạng thái fulfillment |
| Quản lý khuyến mãi | Coupon, flash sale, giảm giá % |
| Quản lý blog | Thêm/sửa/xóa bài viết |
| Quản lý khách hàng | Danh sách khách hàng, chi tiết tài khoản |

## 7. Dữ liệu cần lưu (Data Model)

- **users**: id, email, password (Supabase Auth), full_name, phone, auth_provider
  (email/google/facebook — 1 email chỉ gắn với đúng 1 provider ban đầu), created_at.
- **addresses**: id, user_id, full_name, address_line, city, state, country, zip_code,
  is_default.
- **categories**: id, name, slug.
- **products**: id, category_id, name, slug, description, base_price, sale_price
  (nullable — giá sau giảm, hiển thị kèm base_price gạch ngang khi có; theo UI mẫu
  shop.html/shop-details.html), images[], status (active/draft), created_at.
- **product_variants**: id, product_id, size, color, sku, price, stock_quantity, image.
- **cart_items**: id, user_id, product_variant_id, quantity, created_at.
- **wishlist_items**: id, user_id, product_id, created_at.
- **reviews**: id, product_id, user_id, rating (1–5), comment, created_at.
- **coupons**: id, code, discount_type (percent/fixed), discount_value, start_date,
  end_date, usage_limit, used_count, is_active.
- **flash_sales**: id, product_id (hoặc product_variant_id), discount_percent,
  start_time, end_time, is_active.
- **orders**: id, user_id, status (pending/paid/processing/shipped/delivered/cancelled/
  needs_manual_review), total_amount, currency (USD), shipping_address_id, coupon_id,
  applied_discount_source (coupon/flash_sale/none), created_at.
- **order_items**: id, order_id, product_variant_id, quantity, unit_price,
  fulfillment_status.
- **payment_transactions**: id, order_id, paypal_transaction_id, paypal_webhook_event_id,
  amount, status, created_at.
- **fulfillment_requests**: id, order_id, workshop_order_id, request_payload,
  response_payload, status (pending/success/failed/manual_review), retry_count,
  last_error, tracking_number, synced_at.
- **blog_posts**: id, title, slug, content, cover_image, author, published_at.
- **email_logs**: id, user_id, order_id (nullable), type (order_confirmation/
  shipping_update/password_reset), sent_at, status.
