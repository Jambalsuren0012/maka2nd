"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type MouseEvent } from "react";

import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";
import type { ElectronicCategory, Product } from "@/lib/products";
import ProductCard from "../product/product-card";

type CategoryProductsProps = {
  products: Product[];
  activeCategory: ElectronicCategory;
};

type SortOption = "featured" | "price-low" | "price-high" | "rating" | "name";

const categoryTabs = [
  {
    label: "Ухаалаг утас",
    value: "smartphones",
    href: "/category/smartphones",
  },
  {
    label: "Зөөврийн компьютер",
    value: "laptops",
    href: "/category/laptops",
  },
  {
    label: "Таблет",
    value: "tablets",
    href: "/category/tablets",
  },
  {
    label: "Дагалдах хэрэгсэл",
    value: "mobile-accessories",
    href: "/category/mobile-accessories",
  },
] as const;

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M3 4h2.2l1.9 9.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20.5 7H6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="9.5" cy="19" r="1.2" fill="currentColor" />

      <circle cx="17.5" cy="19" r="1.2" fill="currentColor" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M4 7h16M7 12h10M10 17h4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
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

function PromoCard() {
  return (
    <article className="relative min-h-[470px] overflow-hidden rounded-[22px] bg-neutral-900 text-white">
      <Image
        src="/assets/category-promo.jpg"
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 25vw"
        className="object-cover opacity-65"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-7">
        <p className="text-xs uppercase tracking-[0.2em] text-white/60">
          Тусгай санал
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-[-0.055em]">
          Дагалдах хэрэгслээ хамтад нь сонгоорой
        </h2>

        <Link
          href="/category/mobile-accessories"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/35 px-5 py-3 text-sm font-semibold transition hover:bg-white hover:text-neutral-950"
        >
          Бүтээгдэхүүн харах
          <ArrowRightIcon />
        </Link>
      </div>
    </article>
  );
}

export default function CategoryProducts({
  products,
  activeCategory,
}: CategoryProductsProps) {
  const [filterOpen, setFilterOpen] = useState(false);

  const [sort, setSort] = useState<SortOption>("featured");

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const [inStockOnly, setInStockOnly] = useState(false);

  const maximumProductPrice = useMemo(() => {
    return Math.ceil(Math.max(0, ...products.map((product) => product.price)));
  }, [products]);

  const [maximumPrice, setMaximumPrice] = useState(maximumProductPrice);

  const brands = useMemo(() => {
    return Array.from(
      new Set(
        products
          .map((product) => product.brand)
          .filter((brand): brand is string => Boolean(brand)),
      ),
    ).sort();
  }, [products]);

  const visibleProducts = useMemo(() => {
    let result = products.filter((product) => {
      const brandMatches =
        selectedBrands.length === 0 ||
        (product.brand && selectedBrands.includes(product.brand));

      const stockMatches = !inStockOnly || product.stock > 0;

      const priceMatches = product.price <= maximumPrice;

      return brandMatches && stockMatches && priceMatches;
    });

    result = [...result];

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [inStockOnly, maximumPrice, products, selectedBrands, sort]);

  function toggleBrand(brand: string) {
    setSelectedBrands((current) =>
      current.includes(brand)
        ? current.filter((item) => item !== brand)
        : [...current, brand],
    );
  }

  function clearFilters() {
    setSelectedBrands([]);
    setInStockOnly(false);
    setMaximumPrice(maximumProductPrice);
  }

  return (
    <section className="bg-white">
      <div className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <div className="flex min-h-[82px] items-center gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => setFilterOpen(true)}
              className="flex shrink-0 items-center gap-2 rounded-full border border-neutral-300 px-5 py-3 text-sm font-semibold transition hover:border-neutral-950"
            >
              <FilterIcon />
              Шүүлтүүр
            </button>

            <nav className="flex shrink-0 items-center gap-7">
              {categoryTabs.map((tab) => {
                const active = tab.value === activeCategory;

                return (
                  <Link
                    key={tab.value}
                    href={tab.href}
                    className={`relative py-7 text-sm font-semibold transition ${
                      active
                        ? "text-neutral-950"
                        : "text-neutral-400 hover:text-neutral-950"
                    }`}
                  >
                    {tab.label}

                    {active && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-neutral-950" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="ml-auto flex shrink-0 items-center gap-4">
              <span className="text-xs text-neutral-400">
                {visibleProducts.length} бүтээгдэхүүн
              </span>

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
                className="h-11 rounded-full border border-neutral-300 bg-white px-5 text-sm font-semibold outline-none"
              >
                <option value="featured">Онцлох</option>

                <option value="price-low">Үнэ: багаас их</option>

                <option value="price-high">Үнэ: ихээс бага</option>

                <option value="rating">Өндөр үнэлгээтэй</option>

                <option value="name">Нэрээр</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[28px] bg-neutral-100 px-6 text-center">
            <h2 className="text-3xl font-black tracking-[-0.05em]">
              Бүтээгдэхүүн олдсонгүй
            </h2>

            <p className="mt-3 text-neutral-500">
              Сонгосон шүүлтүүрт тохирох бүтээгдэхүүн алга.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-7 rounded-full bg-neutral-950 px-7 py-4 font-semibold text-white"
            >
              Шүүлтүүр цэвэрлэх
            </button>
          </div>
        )}
      </div>

      <button
        type="button"
        aria-label="Шүүлтүүр хаах"
        onClick={() => setFilterOpen(false)}
        className={`fixed inset-0 z-[180] bg-black/35 transition-opacity ${
          filterOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Бүтээгдэхүүн шүүх"
        className={`fixed bottom-0 left-0 top-0 z-[190] flex w-full max-w-[420px] flex-col bg-white shadow-[20px_0_70px_rgba(0,0,0,0.18)] transition-transform duration-500 ${
          filterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <header className="flex h-20 items-center justify-between border-b border-neutral-200 px-6">
          <h2 className="text-xl font-bold">Шүүлтүүр</h2>

          <button
            type="button"
            onClick={() => setFilterOpen(false)}
            aria-label="Шүүлтүүр хаах"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950 text-white"
          >
            <CloseIcon />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-7">
          <section>
            <h3 className="font-bold">Брэнд</h3>

            <div className="mt-4 space-y-3">
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex cursor-pointer items-center justify-between"
                >
                  <span className="text-sm text-neutral-700">{brand}</span>

                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="h-4 w-4 accent-neutral-950"
                  />
                </label>
              ))}
            </div>
          </section>

          <section className="mt-8 border-t border-neutral-200 pt-7">
            <h3 className="font-bold">Үлдэгдэл</h3>

            <label className="mt-4 flex cursor-pointer items-center justify-between">
              <span className="text-sm text-neutral-700">
                Зөвхөн бэлэн бараа
              </span>

              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(event) => setInStockOnly(event.target.checked)}
                className="h-4 w-4 accent-neutral-950"
              />
            </label>
          </section>

          <section className="mt-8 border-t border-neutral-200 pt-7">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Үнэ</h3>

              <span className="text-sm font-semibold">
                {formatPrice(maximumPrice)}
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={maximumProductPrice}
              value={maximumPrice}
              onChange={(event) => setMaximumPrice(Number(event.target.value))}
              className="mt-5 w-full accent-neutral-950"
            />
          </section>
        </div>

        <footer className="border-t border-neutral-200 p-6">
          <button
            type="button"
            onClick={() => setFilterOpen(false)}
            className="flex h-14 w-full items-center justify-center rounded-full bg-neutral-950 font-semibold text-white"
          >
            {visibleProducts.length} үр дүн харах
          </button>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-3 h-11 w-full text-sm font-semibold underline underline-offset-4"
          >
            Шүүлтүүр цэвэрлэх
          </button>
        </footer>
      </aside>
    </section>
  );
}
