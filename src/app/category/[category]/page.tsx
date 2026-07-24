import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CategoryProducts from "@/components/category/category-products";
import {
  ELECTRONIC_CATEGORIES,
  getProductsByCategory,
  type ElectronicCategory,
} from "@/lib/products";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

const categoryInformation: Record<
  ElectronicCategory,
  {
    title: string;
    description: string;
    image: string;
  }
> = {
  smartphones: {
    title: "Ухаалаг утас",
    description: "Шинэ үеийн ухаалаг гар утаснуудыг нэг дороос сонгоорой.",
    image: "/assets/category-hero.jpg",
  },

  laptops: {
    title: "Зөөврийн компьютер",
    description:
      "Ажил, хичээл болон өдөр тутмын хэрэглээнд тохирсон компьютерууд.",
    image: "/assets/category-hero.jpg",
  },

  tablets: {
    title: "Таблет",
    description:
      "Ажил, бүтээлч хэрэглээ болон зугаа цэнгэлд зориулсан таблетууд.",
    image: "/assets/category-hero.jpg",
  },

  "mobile-accessories": {
    title: "Гар утасны дагалдах хэрэгсэл",
    description:
      "Чихэвч, цэнэглэгч, кабель болон бусад хэрэгцээт дагалдах хэрэгслүүд.",
    image: "/assets/category-hero.jpg",
  },
};

function isElectronicCategory(
  category: string,
): category is ElectronicCategory {
  return ELECTRONIC_CATEGORIES.includes(category as ElectronicCategory);
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  if (!isElectronicCategory(category)) {
    return {
      title: "Ангилал олдсонгүй",
    };
  }

  const information = categoryInformation[category];

  return {
    title: information.title,
    description: information.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!isElectronicCategory(category)) {
    notFound();
  }

  const products = await getProductsByCategory(category, 100);

  const information = categoryInformation[category];

  return (
    <main className="min-h-screen bg-white">
      <section
        className="relative min-h-[430px] overflow-hidden bg-neutral-900 sm:min-h-[520px]"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.74) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.15) 100%), url('${information.image}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="mx-auto flex min-h-[430px] max-w-[1600px] flex-col justify-end px-5 pb-12 pt-28 text-white sm:min-h-[520px] sm:px-8 sm:pb-16 lg:px-12">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-white/65">
            <Link href="/" className="transition hover:text-white">
              Нүүр
            </Link>

            <span>/</span>

            <span>Ангилал</span>

            <span>/</span>

            <span className="text-white">{information.title}</span>
          </nav>

          <p className="mt-10 text-xs font-bold uppercase tracking-[0.24em] text-white/60">
            Бүтээгдэхүүний ангилал
          </p>

          <h1 className="mt-4 max-w-[850px] text-5xl font-black tracking-[-0.07em] sm:text-7xl lg:text-[90px]">
            {information.title}
          </h1>

          <p className="mt-5 max-w-[600px] text-base leading-7 text-white/75 sm:text-lg">
            {information.description}
          </p>
        </div>
      </section>

      <CategoryProducts products={products} activeCategory={category} />
    </main>
  );
}
