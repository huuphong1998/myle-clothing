-- Seed dữ liệu mẫu cho categories/products/product_variants — CHỈ chạy trên DEV.
-- Tên/giá/mô tả/ảnh lấy đúng từ roiser-html-package/roiser/shop.html, shop-grid.html,
-- shop-details.html — không tự bịa. Ghi chú nguồn cho từng sản phẩm bên dưới.
--
-- Riêng size (S/M/L/XL) lấy từ bảng size chart thật trong shop-details.html (chỉ mô tả
-- cho "Poncho Sweater International") — áp dụng chung cho các sản phẩm thời trang khác vì
-- template không có UI chọn size/màu riêng cho từng sản phẩm trong shop.html/shop-grid.html.
-- SKU, stock_quantity là dữ liệu vận hành (không phải nội dung sản phẩm) nên tự đặt hợp lý.

insert into categories (name, slug) values
  ('Levi''s Cotton', 'levis-cotton'),   -- nguồn: shop.html/shop-grid.html, <span class="category">
  ('Modern Dress', 'modern-dress');     -- nguồn: shop-details.html dòng 314, <span class="category">

insert into products (category_id, name, slug, description, base_price, sale_price, images, status) values
  -- Nguồn: shop.html dòng 277-291 (shop-1.png)
  (
    (select id from categories where slug = 'levis-cotton'),
    'Monica Diara Party Dress',
    'monica-diara-party-dress',
    null,
    250.00, 157.00,
    array['/assets/img/shop/shop-1.png'],
    'active'
  ),
  -- Nguồn: shop.html dòng 306-320 (shop-2.png)
  (
    (select id from categories where slug = 'levis-cotton'),
    'Onima Black Flower Sandal',
    'onima-black-flower-sandal',
    null,
    450.00, 257.00,
    array['/assets/img/shop/shop-2.png'],
    'active'
  ),
  -- Nguồn: shop-details.html dòng 314-328 (category, title, price, mô tả), shop-3.png
  (
    (select id from categories where slug = 'modern-dress'),
    'Poncho Sweater International',
    'poncho-sweater-international',
    'Eget taciti odio cum habitant egestas conubia turpis phasellus, ante parturient donec duis primis nam faucibus augue malesuada venenatis',
    360.00, 260.00,
    array['/assets/img/shop/shop-3.png'],
    'active'
  ),
  -- Nguồn: shop-grid.html dòng 431-455 (shop-8.png)
  (
    (select id from categories where slug = 'levis-cotton'),
    'D''valo Office Cotton Suite',
    'dvalo-office-cotton-suite',
    null,
    350.00, 257.00,
    array['/assets/img/shop/shop-8.png'],
    'active'
  ),
  -- Nguồn: shop-grid.html dòng 460-484 (shop-9.png)
  (
    (select id from categories where slug = 'levis-cotton'),
    'Govicta Men''s Shoes Leather',
    'govicta-mens-shoes-leather',
    null,
    350.00, 257.00,
    array['/assets/img/shop/shop-9.png'],
    'active'
  ),
  -- Nguồn: shop-grid.html dòng 489-513 (shop-10.png)
  (
    (select id from categories where slug = 'levis-cotton'),
    'City Tech Polo Shirt',
    'city-tech-polo-shirt',
    null,
    350.00, 257.00,
    array['/assets/img/shop/shop-10.png'],
    'active'
  ),
  -- Nguồn: shop-grid.html dòng 518-542 (shop-11.png)
  (
    (select id from categories where slug = 'levis-cotton'),
    'Hygge Fleece Pullover Hoodie',
    'hygge-fleece-pullover-hoodie',
    null,
    350.00, 257.00,
    array['/assets/img/shop/shop-11.png'],
    'active'
  ),
  -- Nguồn: shop-grid.html dòng 547-571 (shop-12.png)
  (
    (select id from categories where slug = 'levis-cotton'),
    'Jacket With Logo In Brown',
    'jacket-with-logo-in-brown',
    null,
    350.00, 257.00,
    array['/assets/img/shop/shop-12.png'],
    'active'
  ),
  -- Nguồn: shop-grid.html dòng 576-600 (shop-13.png)
  (
    (select id from categories where slug = 'levis-cotton'),
    'Marshall Premium Ferret Diet',
    'marshall-premium-ferret-diet',
    null,
    350.00, 257.00,
    array['/assets/img/shop/shop-13.png'],
    'active'
  ),
  -- Nguồn: shop-grid.html dòng 634-658 (shop-15.png)
  (
    (select id from categories where slug = 'levis-cotton'),
    'Mink Fur Coat Trendy',
    'mink-fur-coat-trendy',
    null,
    350.00, 257.00,
    array['/assets/img/shop/shop-15.png'],
    'active'
  );

insert into product_variants (product_id, size, color, sku, price, stock_quantity, image)
select
  p.id,
  v.size,
  v.color,
  p.slug || '-' || lower(v.size),
  coalesce(p.sale_price, p.base_price),
  20,
  p.images[1]
from products p
cross join (values ('M', null), ('L', null)) as v(size, color)
where p.slug not in ('onima-black-flower-sandal', 'jacket-with-logo-in-brown');

-- 2 sản phẩm có gợi ý màu ngay trong tên gốc (không bịa) — gắn màu theo đúng tên.
insert into product_variants (product_id, size, color, sku, price, stock_quantity, image)
select
  p.id,
  v.size,
  case p.slug
    when 'onima-black-flower-sandal' then 'Black'
    when 'jacket-with-logo-in-brown' then 'Brown'
  end,
  p.slug || '-' || lower(v.size),
  coalesce(p.sale_price, p.base_price),
  20,
  p.images[1]
from products p
cross join (values ('M'), ('L')) as v(size)
where p.slug in ('onima-black-flower-sandal', 'jacket-with-logo-in-brown');
