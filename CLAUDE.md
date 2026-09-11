# CLAUDE.md

## Ngôn ngữ & quy ước
- Giao tiếp bằng tiếng Việt, code/biến đặt tên tiếng Anh.
- Function component + hooks, không dùng class component.

## Nguồn thiết kế — QUAN TRỌNG
- Giao diện port từ _template-reference/roiser-html-package/roiser/.
- Giữ nguyên class name, cấu trúc HTML, và giá trị CSS gốc (đọc từ
  main.css, không đoán) khi chuyển sang component.
- Không tự ý đổi bố cục, màu sắc, font, icon set nếu chưa hỏi.
- Port từng trang/section theo đúng backlog, không gộp nhiều trang 1 task.

## Cấu trúc thư mục
- app/ (Next.js App Router), components/, lib/ (Supabase client, helpers)

## Điều cấm
- Không tự viết hàm mã hóa mật khẩu — dùng Supabase Auth hoặc bcrypt.
- Không hardcode API key/secret — luôn đọc từ .env.
- Không thêm thư viện ngoài kế hoạch mà không hỏi trước.
- Mọi API route xử lý đơn hàng/thanh toán phải validate dữ liệu ở backend.