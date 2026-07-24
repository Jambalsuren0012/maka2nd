import BestSellers from "@/components/home/best-sellers";
import BrandsMarquee from "@/components/home/brands-marquee";
import CategoryShowcase, {
  type CategoryShowcaseItem,
} from "@/components/home/category-showcase";
import FeaturedProduct from "@/components/home/featured-product";
import HeroSlider from "@/components/home/hero-slider";
import { getProducts, getProductsByCategory } from "@/lib/products";

export default async function HomePage() {
  const [products, smartphones, laptops, tablets, accessories] =
    await Promise.all([
      getProducts(30),
      getProductsByCategory("smartphones", 100),
      getProductsByCategory("laptops", 100),
      getProductsByCategory("tablets", 100),
      getProductsByCategory("mobile-accessories", 100),
    ]);

  const featuredProduct = products.length > 0 ? products[0] : null;

  const firstAvailableImage =
    smartphones[0]?.images?.[0] ??
    smartphones[0]?.thumbnail ??
    laptops[0]?.images?.[0] ??
    laptops[0]?.thumbnail ??
    tablets[0]?.images?.[0] ??
    tablets[0]?.thumbnail ??
    accessories[0]?.images?.[0] ??
    accessories[0]?.thumbnail ??
    products[0]?.images?.[0] ??
    products[0]?.thumbnail ??
    "/placeholder.png";

  const categoryItems: CategoryShowcaseItem[] = [
    {
      key: "all",
      title: "Бүх бүтээгдэхүүн",
      description: "Манай бүх бүтээгдэхүүнтэй танилцаарай",
      href: "/category",
      image: firstAvailableImage,
      count:
        smartphones.length +
        laptops.length +
        tablets.length +
        accessories.length,
      featured: true,
    },
    {
      key: "smartphones",
      title: "Ухаалаг утас",
      description: "Шинэ үеийн ухаалаг гар утаснууд",
      href: "/category/smartphones",
      image:
        smartphones[0]?.thumbnail ??
        smartphones[0]?.images?.[0] ??
        "/placeholder.png",
      count: smartphones.length,
    },
    {
      key: "laptops",
      title: "Зөөврийн компьютер",
      description: "Ажил, хичээлд зориулсан төхөөрөмжүүд",
      href: "/category/laptops",
      image:
        laptops[0]?.thumbnail ?? laptops[0]?.images?.[0] ?? "/placeholder.png",
      count: laptops.length,
    },
    {
      key: "tablets",
      title: "Таблет",
      description: "Ажил болон зугаа цэнгэлийн таблетууд",
      href: "/category/tablets",
      image:
        tablets[0]?.thumbnail ?? tablets[0]?.images?.[0] ?? "/placeholder.png",
      count: tablets.length,
    },
    {
      key: "accessories",
      title: "Дагалдах хэрэгсэл",
      description: "Цэнэглэгч, кабель, чихэвч болон бусад",
      href: "/category/mobile-accessories",
      image:
        accessories[0]?.thumbnail ??
        accessories[0]?.images?.[0] ??
        "/placeholder.png",
      count: accessories.length,
    },
  ];

  return (
    <main className="bg-neutral-50">
      <HeroSlider />

      <CategoryShowcase items={categoryItems} />

      <BestSellers products={products} />

      {featuredProduct && <FeaturedProduct product={featuredProduct} />}

      <BrandsMarquee />
    </main>
  );
}
