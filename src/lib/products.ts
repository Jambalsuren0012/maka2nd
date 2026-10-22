export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  brand?: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];

  discountPercentage?: number;
  availabilityStatus?: string;
  warrantyInformation?: string;
  shippingInformation?: string;
};

export const STATIONERY_CATEGORIES = [
  {
    slug: "notebooks",
    title: "Дэвтэр, тэмдэглэлийн дэвтэр",
    description: "Өдөр бүрийн төлөвлөгөө, санаа, тэмдэглэлд.",
  },
  {
    slug: "writing",
    title: "Үзэг, бичгийн хэрэгсэл",
    description: "Тэмдэглэлээ цэгцтэй, өнгөлөг хөтлөх сонголтууд.",
  },
  {
    slug: "art-supplies",
    title: "Зураг, урлал",
    description: "Зурах, будах, бүтээхэд хэрэгтэй бүх зүйл.",
  },
  {
    slug: "desk-essentials",
    title: "Ширээний хэрэгсэл",
    description: "Ажлын ширээгээ эмх цэгцтэй байлгах жижиг туслагчид.",
  },
] as const;

export type StationeryCategory = (typeof STATIONERY_CATEGORIES)[number]["slug"];

const image = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1200&q=85`;

const products: Product[] = [
  {
    id: 1001,
    title: "Өдөр тутмын төлөвлөгч дэвтэр",
    description:
      "Зөөлөн хавтастай, долоо хоног болон өдрийн төлөвлөлттэй дэвтэр.",
    category: "notebooks",
    brand: "Өдөр",
    price: 18900,
    rating: 4.9,
    stock: 42,
    thumbnail: image("photo-1517842645767-c639042777db"),
    images: [image("photo-1517842645767-c639042777db")],
    discountPercentage: 10,
    availabilityStatus: "Бэлэн",
    shippingInformation: "1–2 ажлын өдөрт хүргэнэ",
  },
  {
    id: 1002,
    title: "Цэгтэй хуудастай тэмдэглэлийн дэвтэр",
    description:
      "Bullet journal болон өдөр тутмын тэмдэглэлд зориулсан 160 хуудастай.",
    category: "notebooks",
    brand: "Цэг",
    price: 14500,
    rating: 4.8,
    stock: 36,
    thumbnail: image("photo-1455390582262-044cdead277a"),
    images: [image("photo-1455390582262-044cdead277a")],
    availabilityStatus: "Бэлэн",
    shippingInformation: "1–2 ажлын өдөрт хүргэнэ",
  },
  {
    id: 1003,
    title: "Хатуу хавтастай тэмдэглэлийн дэвтэр",
    description: "Зузаан цаастай, цүнхэнд авч явахад тохиромжтой A5 дэвтэр.",
    category: "notebooks",
    brand: "Цэг",
    price: 22000,
    rating: 4.9,
    stock: 24,
    thumbnail: image("photo-1519682337058-a94d519337bc"),
    images: [image("photo-1519682337058-a94d519337bc")],
    discountPercentage: 5,
    availabilityStatus: "Бэлэн",
    shippingInformation: "1–2 ажлын өдөрт хүргэнэ",
  },
  {
    id: 1004,
    title: "Байгальд ээлтэй дахин боловсруулсан дэвтэр",
    description: "Дахин боловсруулсан цаас, минимал загвартай 120 хуудастай.",
    category: "notebooks",
    brand: "Ногоон",
    price: 12500,
    rating: 4.7,
    stock: 31,
    thumbnail: image("photo-1494438639946-1ebd1d20bf85"),
    images: [image("photo-1494438639946-1ebd1d20bf85")],
    availabilityStatus: "Бэлэн",
    shippingInformation: "1–2 ажлын өдөрт хүргэнэ",
  },
  {
    id: 1005,
    title: "Өнгөт гелэн үзгийн багц",
    description: "Жигд бичигдэх 0.5 мм үзүүртэй, 6 өнгийн багц.",
    category: "writing",
    brand: "Өнгө",
    price: 9800,
    rating: 4.8,
    stock: 56,
    thumbnail: image("photo-1453738773917-9c3eff1db985"),
    images: [image("photo-1453738773917-9c3eff1db985")],
    availabilityStatus: "Бэлэн",
    shippingInformation: "1–2 ажлын өдөрт хүргэнэ",
  },
  {
    id: 1006,
    title: "Хар бэхтэй бичгийн үзэг",
    description: "Түргэн хатдаг бэх, зөөлөн бариултай өдөр тутмын үзэг.",
    category: "writing",
    brand: "Өдөр",
    price: 4500,
    rating: 4.6,
    stock: 83,
    thumbnail: image("photo-1513475382585-d06e58bcb0e0"),
    images: [image("photo-1513475382585-d06e58bcb0e0")],
    availabilityStatus: "Бэлэн",
    shippingInformation: "1–2 ажлын өдөрт хүргэнэ",
  },
  {
    id: 1007,
    title: "Пастел тодруулагчийн багц",
    description: "Ном, тэмдэглэлд зөөлөн өнгө нэмэх 5 пастел тодруулагч.",
    category: "writing",
    brand: "Өнгө",
    price: 11500,
    rating: 4.9,
    stock: 47,
    thumbnail: image("photo-1513364776144-60967b0f800f"),
    images: [image("photo-1513364776144-60967b0f800f")],
    discountPercentage: 8,
    availabilityStatus: "Бэлэн",
    shippingInformation: "1–2 ажлын өдөрт хүргэнэ",
  },
  {
    id: 1008,
    title: "Механик харандаа, балны ком",
    description: "0.5 мм механик харандаа болон HB балтай хос багц.",
    category: "writing",
    brand: "Өдөр",
    price: 7900,
    rating: 4.7,
    stock: 39,
    thumbnail: image("photo-1455390582262-044cdead277a"),
    images: [image("photo-1455390582262-044cdead277a")],
    availabilityStatus: "Бэлэн",
    shippingInformation: "1–2 ажлын өдөрт хүргэнэ",
  },
  {
    id: 1009,
    title: "Усан будгийн өнгөний багц",
    description: "12 тунгалаг өнгө, жижиг бийртэй авсаархан багц.",
    category: "art-supplies",
    brand: "Урлан",
    price: 24500,
    rating: 4.9,
    stock: 18,
    thumbnail: image("photo-1513364776144-60967b0f800f"),
    images: [image("photo-1513364776144-60967b0f800f")],
    availabilityStatus: "Бэлэн",
    shippingInformation: "1–2 ажлын өдөрт хүргэнэ",
  },
  {
    id: 1010,
    title: "Зургийн харандааны сет",
    description: "Өөр өөр хатуулагтай 12 харандаа, баллуур, үзүүрлэгчтэй.",
    category: "art-supplies",
    brand: "Урлан",
    price: 19800,
    rating: 4.8,
    stock: 22,
    thumbnail: image("photo-1453738773917-9c3eff1db985"),
    images: [image("photo-1453738773917-9c3eff1db985")],
    discountPercentage: 7,
    availabilityStatus: "Бэлэн",
    shippingInformation: "1–2 ажлын өдөрт хүргэнэ",
  },
  {
    id: 1011,
    title: "Өнгийн маркерын багц",
    description: "Нарийн болон өргөн үзүүртэй 10 өнгийн маркер.",
    category: "art-supplies",
    brand: "Өнгө",
    price: 16900,
    rating: 4.7,
    stock: 26,
    thumbnail: image("photo-1513364776144-60967b0f800f"),
    images: [image("photo-1513364776144-60967b0f800f")],
    availabilityStatus: "Бэлэн",
    shippingInformation: "1–2 ажлын өдөрт хүргэнэ",
  },
  {
    id: 1012,
    title: "Уран зургийн цаас A4",
    description: "Зузаан, ширхэглэг гадаргуутай 20 хуудас зургийн цаас.",
    category: "art-supplies",
    brand: "Урлан",
    price: 8900,
    rating: 4.6,
    stock: 34,
    thumbnail: image("photo-1516979187457-637abb4f9353"),
    images: [image("photo-1516979187457-637abb4f9353")],
    availabilityStatus: "Бэлэн",
    shippingInformation: "1–2 ажлын өдөрт хүргэнэ",
  },
  {
    id: 1013,
    title: "Модон ширээний зохион байгуулагч",
    description: "Үзэг, хайч, жижиг хэрэгслээ нэг дор эмхлэх тавиур.",
    category: "desk-essentials",
    brand: "Эмх",
    price: 28900,
    rating: 4.8,
    stock: 14,
    thumbnail: image("photo-1497366754035-f200968a6e72"),
    images: [image("photo-1497366754035-f200968a6e72")],
    availabilityStatus: "Бэлэн",
    shippingInformation: "1–2 ажлын өдөрт хүргэнэ",
  },
  {
    id: 1014,
    title: "Наадаг цаасны пастел багц",
    description: "Тэмдэглэл, санаагаа ангилахад тохирох 6 өнгө, 300 хуудастай.",
    category: "desk-essentials",
    brand: "Эмх",
    price: 6500,
    rating: 4.7,
    stock: 68,
    thumbnail: image("photo-1494438639946-1ebd1d20bf85"),
    images: [image("photo-1494438639946-1ebd1d20bf85")],
    availabilityStatus: "Бэлэн",
    shippingInformation: "1–2 ажлын өдөрт хүргэнэ",
  },
  {
    id: 1015,
    title: "Өдөр тутмын бичгийн хэрэгслийн ком",
    description: "Харандаа, баллуур, үзүүрлэгч, шугамтай ширээний багц.",
    category: "desk-essentials",
    brand: "Өдөр",
    price: 13900,
    rating: 4.8,
    stock: 29,
    thumbnail: image("photo-1513475382585-d06e58bcb0e0"),
    images: [image("photo-1513475382585-d06e58bcb0e0")],
    discountPercentage: 12,
    availabilityStatus: "Бэлэн",
    shippingInformation: "1–2 ажлын өдөрт хүргэнэ",
  },
  {
    id: 1016,
    title: "Хайч, цавууны сургуулийн багц",
    description:
      "Сургууль болон гар урлалд хэрэглэхэд аюулгүй жижиг хэрэгслийн багц.",
    category: "desk-essentials",
    brand: "Урлан",
    price: 10200,
    rating: 4.6,
    stock: 41,
    thumbnail: image("photo-1513364776144-60967b0f800f"),
    images: [image("photo-1513364776144-60967b0f800f")],
    availabilityStatus: "Бэлэн",
    shippingInformation: "1–2 ажлын өдөрт хүргэнэ",
  },
];

export async function getProducts(limit = 24): Promise<Product[]> {
  return products.slice(0, Math.max(0, limit));
}

export async function getProductsByCategory(
  category: string,
  limit = 24,
): Promise<Product[]> {
  return products
    .filter((product) => product.category === category)
    .slice(0, Math.max(0, limit));
}

export async function getProduct(id: string | number): Promise<Product | null> {
  const productId = Number(String(id).trim());

  if (!Number.isInteger(productId)) {
    return null;
  }

  return products.find((product) => product.id === productId) ?? null;
}

export { products as demoProducts };
