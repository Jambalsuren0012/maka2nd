import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getProducts } from "@/lib/products";
import type { Product } from "@/lib/products";
import { STATIONERY_CATEGORIES } from "@/lib/products";

export const metadata: Metadata = {
  title: "Ангилал",
  description: "Maka бичиг хэргийн дэлгүүрийн бүх ангилал.",
};

type CategoryCard = {
  title: string;
  description: string;
  href: string;
  category: string;
};

type ServiceItem = {
  title: string;
  description: string;
  icon: "support" | "delivery" | "share" | "secure";
};

const categoryCards: CategoryCard[] = STATIONERY_CATEGORIES.map((category) => ({
  title: category.title,
  description: category.description,
  href: `/category/${category.slug}`,
  category: category.slug,
}));

const serviceItems: ServiceItem[] = [
  {
    title: "Хэрэглэгчийн үйлчилгээ",
    description: "Манай үйлчилгээний баг танд туслахад бэлэн.",
    icon: "support",
  },
  {
    title: "Шуурхай хүргэлт",
    description: "Захиалгыг хурдан шуурхай хүргэнэ.",
    icon: "delivery",
  },
  {
    title: "Найздаа санал болгох",
    description: "Таалагдсан бүтээгдэхүүнээ бусадтай хуваалцаарай.",
    icon: "share",
  },
  {
    title: "Аюулгүй төлбөр",
    description: "Таны төлбөр аюулгүйгээр боловсруулагдана.",
    icon: "secure",
  },
];

function findCategoryProduct(products: Product[], category: string) {
  return products.find((product) => product.category === category);
}

function getProductImage(product: Product | undefined) {
  return product?.thumbnail ?? product?.images?.[0] ?? "/placeholder.png";
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="m9 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceIcon({ type }: { type: ServiceItem["icon"] }) {
  if (type === "delivery") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <path
          d="M3 6h11v10H3V6Zm11 4h4l3 3v3h-7v-6Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        <circle
          cx="7"
          cy="18"
          r="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <circle
          cx="18"
          cy="18"
          r="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (type === "share") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <circle
          cx="18"
          cy="5"
          r="2.3"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <circle
          cx="6"
          cy="12"
          r="2.3"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <circle
          cx="18"
          cy="19"
          r="2.3"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <path
          d="m8 11 7.7-4.5M8 13l7.7 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "secure") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <rect
          x="5"
          y="10"
          width="14"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <path
          d="M8 10V7a4 4 0 0 1 8 0v3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />

      <path
        d="M9.5 9a2.7 2.7 0 1 1 4.4 2.1c-1 .8-1.9 1.3-1.9 2.7M12 17h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default async function CategoryIndexPage() {
  const products = await getProducts(100);

  const categories = categoryCards.map((category) => {
    const product = findCategoryProduct(products, category.category);

    return {
      ...category,
      image: getProductImage(product),
      productTitle: product?.title,
    };
  });

  const featuredProducts = categories
    .map((category) => findCategoryProduct(products, category.category))
    .filter((product): product is Product => Boolean(product));

  const allProductsImage =
    featuredProducts[0]?.images?.[0] ??
    featuredProducts[0]?.thumbnail ??
    products[0]?.images?.[0] ??
    products[0]?.thumbnail ??
    "/placeholder.png";

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <section className="mx-auto max-w-[1600px] px-5 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:px-12">
        <nav className="flex items-center gap-2 text-sm text-neutral-500">
          <Link href="/" className="transition hover:text-neutral-950">
            Нүүр
          </Link>

          <span>/</span>

          <span className="text-neutral-950">Ангилал</span>
        </nav>

        <div className="mt-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-400">
              Бүтээгдэхүүний сонголт
            </p>

            <h1 className="mt-4 text-5xl font-black tracking-[-0.07em] sm:text-6xl lg:text-[78px]">
              Ангилал
            </h1>
          </div>

          <p className="max-w-[520px] text-base leading-7 text-neutral-600">
            Манай дэлгүүрийн бүтээгдэхүүнүүдийг ангиллаар нь үзэж, өөрт тохирох
            бичиг хэргийн хэрэгслээ сонгоорой.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/"
            className="group relative overflow-hidden rounded-[22px] bg-neutral-950 text-white"
          >
            <div className="relative aspect-[0.94/1] overflow-hidden">
              <Image
                src={allProductsImage}
                alt="Бүх бүтээгдэхүүн"
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-contain p-7 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/45" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
                  Maka
                </p>

                <h2 className="mt-2 text-[20px] font-bold tracking-[-0.04em]">
                  Бүх бүтээгдэхүүн
                </h2>

                <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/70">
                  Манай бүх бүтээгдэхүүнтэй танилцаарай.
                </p>
              </div>

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-neutral-950 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-105">
                <ArrowIcon />
              </span>
            </div>
          </Link>

          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group relative overflow-hidden rounded-[22px] bg-[#f6f6f4] text-neutral-950"
            >
              <div className="relative aspect-[0.94/1] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-7 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/5 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-white via-white/95 to-transparent p-5 pt-20">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                    {category.productTitle ?? category.category}
                  </p>

                  <h2 className="mt-2 text-[18px] font-bold tracking-[-0.04em]">
                    {category.title}
                  </h2>

                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-500">
                    {category.description}
                  </p>
                </div>

                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm transition-all duration-300 group-hover:translate-x-1 group-hover:scale-105 group-hover:bg-neutral-950 group-hover:text-white">
                  <ArrowIcon />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
          {serviceItems.map((item, index) => (
            <div
              key={item.title}
              className={`flex min-h-[150px] items-center gap-4 py-7 sm:px-5 lg:px-7 ${
                index > 0
                  ? "border-t border-neutral-200 sm:border-l sm:border-t-0"
                  : ""
              }`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-950">
                <ServiceIcon type={item.icon} />
              </span>

              <div>
                <h3 className="text-sm font-bold tracking-[-0.02em]">
                  {item.title}
                </h3>

                <p className="mt-1 max-w-[240px] text-xs leading-5 text-neutral-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
