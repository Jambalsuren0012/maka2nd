import BestSellers from "@/components/home/best-sellers";
import BrandsMarquee from "@/components/home/brands-marquee";
import CategoryShowcase, {
  type CategoryShowcaseItem,
} from "@/components/home/category-showcase";
import FeaturedProduct from "@/components/home/featured-product";
import HeroSlider from "@/components/home/hero-slider";
import { getProducts, STATIONERY_CATEGORIES } from "@/lib/products";

export default async function HomePage() {
  const products = await getProducts(100);

  const featuredProduct = products.length > 0 ? products[0] : null;

  const categoryItems: CategoryShowcaseItem[] = [
    {
      key: "all",
      title: "Бүх бичиг хэрэг",
      description: "Сургууль, ажил, бүтээлч санаанд хэрэгтэй сонголтууд.",
      href: "/category",
      image: products[0]?.thumbnail ?? "/placeholder.png",
      count: products.length,
      featured: true,
    },
    ...STATIONERY_CATEGORIES.map((category) => {
      const categoryProducts = products.filter(
        (product) => product.category === category.slug,
      );

      return {
        key: category.slug,
        title: category.title,
        description: category.description,
        href: `/category/${category.slug}`,
        image: categoryProducts[0]?.thumbnail ?? "/placeholder.png",
        count: categoryProducts.length,
      };
    }),
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
