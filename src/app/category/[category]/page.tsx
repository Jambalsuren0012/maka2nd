import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CategoryProducts from "@/components/category/category-products";
import { getProductsByCategory } from "@/lib/products";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

const categoryMetadata = {
  smartphones: {
    title: "Ухаалаг утас",
    description:
      "Шинэ үеийн ухаалаг гар утас, өдөр тутмын хэрэглээ болон ажлын хэрэгцээнд тохирсон бүтээгдэхүүнүүд.",
  },

  laptops: {
    title: "Зөөврийн компьютер",
    description:
      "Ажил, хичээл, бүтээлч хэрэглээ болон тоглоомд зориулсан зөөврийн компьютерууд.",
  },

  tablets: {
    title: "Таблет",
    description:
      "Ажил, сургалт, зураг зурах болон зугаа цэнгэлд тохирсон таблетууд.",
  },

  "mobile-accessories": {
    title: "Дагалдах хэрэгсэл",
    description:
      "Цэнэглэгч, кабель, чихэвч болон ухаалаг төхөөрөмжийн бусад дагалдах хэрэгслүүд.",
  },
} as const;

type CategoryKey = keyof typeof categoryMetadata;

function isValidCategory(category: string): category is CategoryKey {
  return category in categoryMetadata;
}

export function generateStaticParams() {
  return Object.keys(categoryMetadata).map((category) => ({
    category,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  if (!isValidCategory(category)) {
    return {
      title: "Ангилал олдсонгүй",
    };
  }

  const categoryMeta = categoryMetadata[category];

  return {
    title: categoryMeta.title,
    description: categoryMeta.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!isValidCategory(category)) {
    notFound();
  }

  const categoryMeta = categoryMetadata[category];

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
