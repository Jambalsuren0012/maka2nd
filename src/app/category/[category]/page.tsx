import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CategoryProducts from "@/components/category/category-products";
import { getProductsByCategory, STATIONERY_CATEGORIES } from "@/lib/products";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

function getCategory(category: string) {
  return STATIONERY_CATEGORIES.find((item) => item.slug === category);
}

export function generateStaticParams() {
  return STATIONERY_CATEGORIES.map(({ slug }) => ({
    category: slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  const categoryMeta = getCategory(category);

  if (!categoryMeta) {
    return {
      title: "Ангилал олдсонгүй",
    };
  }

  return {
    title: categoryMeta.title,
    description: categoryMeta.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  const categoryMeta = getCategory(category);

  if (!categoryMeta) {
    notFound();
  }

  const products = await getProductsByCategory(category, 100);

  return (
    <main className="min-h-screen bg-neutral-50">
      <CategoryProducts
        key={category}
        products={products}
        title={categoryMeta.title}
        description={categoryMeta.description}
        categoryLabel={categoryMeta.title}
      />
    </main>
  );
}
