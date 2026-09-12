// Dữ liệu sản phẩm mẫu hard-code, lấy đúng ảnh/tên/giá thật từ
// roiser-html-package/roiser/shop-grid.html (<div class="tab-pane ... id="nav-home">, dòng 312-662).
// CHƯA nối Supabase — việc nối dữ liệu thật thuộc Nhóm 1 (task 1.7/1.8).
export type Product = {
  slug: string;
  image: string;
  sale: string;
  category: string;
  title: string;
  rating: number;
  reviews: string;
  offerPrice: string;
  price: string;
};

export const products: Product[] = [
  {
    slug: "monica-diara-party-dress",
    image: "/assets/img/shop/shop-1.png",
    sale: "New",
    category: "Levi’s Cotton",
    title: "Monica Diara Party Dress",
    rating: 5,
    reviews: "(15 Reviews)",
    offerPrice: "$250.00",
    price: "$157.00",
  },
  {
    slug: "onima-black-flower-sandal",
    image: "/assets/img/shop/shop-2.png",
    sale: "New",
    category: "Levi’s Cotton",
    title: "Onima Black Flower Sandal",
    rating: 5,
    reviews: "(15 Reviews)",
    offerPrice: "$450.00",
    price: "$257.00",
  },
  {
    slug: "poncho-sweater-international",
    image: "/assets/img/shop/shop-3.png",
    sale: "New",
    category: "Levi’s Cotton",
    title: "Poncho Sweater International",
    rating: 5,
    reviews: "(15 Reviews)",
    offerPrice: "$550.00",
    price: "$427.00",
  },
  {
    slug: "legendary-whitetails-mens",
    image: "/assets/img/shop/shop-7.png",
    sale: "New",
    category: "Levi’s Cotton",
    title: "Legendary Whitetails Men's.",
    rating: 5,
    reviews: "(15 Reviews)",
    offerPrice: "$350.00",
    price: "$257.00",
  },
  {
    slug: "dvalo-office-cotton-suite",
    image: "/assets/img/shop/shop-8.png",
    sale: "New",
    category: "Levi’s Cotton",
    title: "D’valo Office Cotton Suite",
    rating: 5,
    reviews: "(15 Reviews)",
    offerPrice: "$350.00",
    price: "$257.00",
  },
  {
    slug: "govicta-mens-shoes-leather",
    image: "/assets/img/shop/shop-9.png",
    sale: "New",
    category: "Levi’s Cotton",
    title: "Govicta Men's Shoes Leather",
    rating: 5,
    reviews: "(15 Reviews)",
    offerPrice: "$350.00",
    price: "$257.00",
  },
  {
    slug: "city-tech-polo-shirt",
    image: "/assets/img/shop/shop-10.png",
    sale: "New",
    category: "Levi’s Cotton",
    title: "City Tech Polo Shirt",
    rating: 5,
    reviews: "(15 Reviews)",
    offerPrice: "$350.00",
    price: "$257.00",
  },
  {
    slug: "hygge-fleece-pullover-hoodie",
    image: "/assets/img/shop/shop-11.png",
    sale: "New",
    category: "Levi’s Cotton",
    title: "Hygge Fleece Pullover Hoodie",
    rating: 5,
    reviews: "(15 Reviews)",
    offerPrice: "$350.00",
    price: "$257.00",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
