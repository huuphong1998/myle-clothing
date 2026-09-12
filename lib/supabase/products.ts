import { createClient } from "@/lib/supabase/server";

// Đọc dữ liệu catalog thật từ Supabase (bảng products/product_variants/categories,
// migration supabase/migrations/20260912045938_create_catalog_tables.sql) — chỉ dùng anon key
// qua createClient() (@/lib/supabase/server, dùng @supabase/ssr), RLS đã cho phép đọc công khai
// nên không cần service role key. Chỉ chạy trong Server Component.
export type ShopProduct = {
  slug: string;
  image: string;
  category: string;
  title: string;
  basePrice: number;
  salePrice: number | null;
};

export type ProductDetail = ShopProduct & {
  images: string[];
  description: string | null;
  stockQuantity: number;
};

type ProductRow = {
  slug: string;
  name: string;
  base_price: number | string;
  sale_price: number | string | null;
  images: string[];
  categories: { name: string } | null;
};

function toShopProduct(row: ProductRow): ShopProduct {
  return {
    slug: row.slug,
    image: row.images[0] ?? "",
    category: row.categories?.name ?? "",
    title: row.name,
    basePrice: Number(row.base_price),
    salePrice: row.sale_price === null ? null : Number(row.sale_price),
  };
}

export async function getShopProducts(): Promise<ShopProduct[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("slug, name, base_price, sale_price, images, categories(name)")
    .eq("status", "active")
    .order("created_at", { ascending: true })
    .returns<ProductRow[]>();

  if (error) {
    throw new Error(`Không lấy được danh sách sản phẩm: ${error.message}`);
  }

  return (data ?? []).map(toShopProduct);
}

export async function getProductDetailBySlug(slug: string): Promise<ProductDetail | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "slug, name, description, base_price, sale_price, images, categories(name), product_variants(stock_quantity)"
    )
    .eq("status", "active")
    .eq("slug", slug)
    .maybeSingle<
      ProductRow & {
        description: string | null;
        product_variants: { stock_quantity: number }[];
      }
    >();

  if (error) {
    throw new Error(`Không lấy được chi tiết sản phẩm "${slug}": ${error.message}`);
  }

  if (!data) {
    return null;
  }

  return {
    ...toShopProduct(data),
    images: data.images,
    description: data.description,
    stockQuantity: data.product_variants.reduce((sum, variant) => sum + variant.stock_quantity, 0),
  };
}
