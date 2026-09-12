-- Schema: Catalog (backlog.md task 1.1) — categories, products, product_variants.
-- Tên bảng/cột theo đúng spec.md mục 7 (tiếng Anh), không dùng san_pham/bien_the.
-- sale_price bổ sung vào products vì shop.html/shop-details.html có sẵn UI giá gạch/giá
-- giảm (span.offer) — đã xác nhận và cập nhật spec.md mục 7 cùng đợt với migration này.

create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  created_at timestamptz not null default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id),
  name text not null,
  slug text unique not null,
  description text,
  base_price numeric not null,
  sale_price numeric,
  images text[] not null default '{}',
  status text not null default 'active' check (status in ('active', 'draft')),
  created_at timestamptz not null default now()
);

create table product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  size text,
  color text,
  sku text unique,
  price numeric,
  stock_quantity integer not null default 0,
  image text,
  created_at timestamptz not null default now()
);

-- RLS: đọc công khai, ghi chỉ admin.
-- Chưa có cơ chế role cho user (thuộc backlog task 3.7 — Nhóm 3B, chưa làm), nên tạm thời
-- không tạo policy insert/update/delete cho anon/authenticated: chỉ request dùng service_role
-- key (bypass RLS mặc định) mới ghi được. Khi có role admin thật, thay bằng policy kiểm tra role.

alter table categories enable row level security;
create policy "categories are publicly readable"
  on categories for select
  using (true);

alter table products enable row level security;
create policy "products are publicly readable"
  on products for select
  using (true);

alter table product_variants enable row level security;
create policy "product_variants are publicly readable"
  on product_variants for select
  using (true);
