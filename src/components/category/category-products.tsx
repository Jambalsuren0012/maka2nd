"use client";

import { useMemo, useRef, useState } from "react";

import ProductCard from "@/components/product/product-card";
import type { Product } from "@/lib/products";

type CategoryProductsProps = {
  products: Product[];
  title: string;
  description?: string;
  categoryLabel?: string;
};

const ITEMS_PER_PAGE = 12;

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="m15 6-6 6 6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
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

function getPageNumbers(
  currentPage: number,
  totalPages: number,
): Array<number | "..."> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

export default function CategoryProducts({
  products,
  title,
  description,
  categoryLabel,
}: CategoryProductsProps) {
  const productsSectionRef = useRef<HTMLElement>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE));

  /*
   * Бүтээгдэхүүний тоо багасах үед
   * currentPage нийт хуудаснаас хэтэрсэн
   * байж болох тул render хийхдээ зөв утга ашиглана.
   */
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

  const visibleProducts = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;

    const endIndex = startIndex + ITEMS_PER_PAGE;

    return products.slice(startIndex, endIndex);
  }, [products, safeCurrentPage]);

  const pageNumbers = useMemo(
    () => getPageNumbers(safeCurrentPage, totalPages),
    [safeCurrentPage, totalPages],
  );

  const firstVisibleItem =
    products.length === 0 ? 0 : (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1;

  const lastVisibleItem = Math.min(
    safeCurrentPage * ITEMS_PER_PAGE,
    products.length,
  );

  function scrollToProducts() {
    const section = productsSectionRef.current;

    if (!section) {
      return;
    }

    const headerOffset = 110;

    const sectionTop =
      section.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });
  }

  function changePage(page: number) {
    const nextPage = Math.min(Math.max(page, 1), totalPages);

    if (nextPage === safeCurrentPage) {
      return;
    }

    setCurrentPage(nextPage);

    window.requestAnimationFrame(() => {
      scrollToProducts();
    });
  }

  return (
    <section ref={productsSectionRef} className="bg-neutral-50">
      <div className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        {/* CATEGORY HEADER */}
        <div className="flex flex-col gap-6 border-b border-neutral-200 pb-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-400">
              Бүтээгдэхүүний ангилал
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-[-0.055em] text-neutral-950 sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            {description && (
              <p className="mt-4 max-w-[680px] text-[15px] leading-7 text-neutral-600 sm:text-base">
                {description}
              </p>
            )}
          </div>

          <p className="shrink-0 text-sm text-neutral-500">
            Нийт{" "}
            <span className="font-bold text-neutral-950">
              {products.length}
            </span>{" "}
            бүтээгдэхүүн
          </p>
        </div>

        {/* RESULT INFORMATION */}
        {products.length > 0 && (
          <div className="flex flex-col gap-2 py-7 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              {firstVisibleItem}–{lastVisibleItem} бүтээгдэхүүн харуулж байна
            </p>

            {totalPages > 1 && (
              <p>
                {safeCurrentPage} / {totalPages} хуудас
              </p>
            )}
          </div>
        )}

        {/* PRODUCT GRID */}
        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categoryLabel={
                  categoryLabel ?? product.brand ?? product.category
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[360px] items-center justify-center rounded-[24px] border border-dashed border-neutral-300 bg-white px-6 text-center">
            <div>
              <h2 className="text-2xl font-bold tracking-[-0.04em] text-neutral-950">
                Бүтээгдэхүүн олдсонгүй
              </h2>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Энэ ангилалд одоогоор бүтээгдэхүүн байхгүй байна.
              </p>
            </div>
          </div>
        )}

        {/* PAGINATION */}
        {/* PAGINATION */}
        {totalPages > 1 && (
          <nav
            aria-label="Бүтээгдэхүүний хуудас"
            className="mt-14 flex items-center justify-center border-t border-neutral-200 pt-10 sm:mt-16"
          >
            <div className="flex items-center gap-6">
              {/* PREVIOUS */}
              {safeCurrentPage > 1 && (
                <button
                  type="button"
                  onClick={() => changePage(safeCurrentPage - 1)}
                  aria-label="Өмнөх хуудас"
                  className="group flex items-center gap-2 text-[16px] font-medium text-neutral-900 transition-colors hover:text-neutral-500"
                >
                  <ChevronLeftIcon />

                  <span className="hidden sm:inline">Өмнөх</span>
                </button>
              )}

              {/* PAGE NUMBERS */}
              <div className="flex items-center gap-2">
                {pageNumbers.map((page, index) => {
                  if (page === "...") {
                    return (
                      <span
                        key={`dots-${index}`}
                        className="flex h-12 min-w-8 items-center justify-center text-[16px] text-neutral-400"
                      >
                        …
                      </span>
                    );
                  }

                  const active = safeCurrentPage === page;

                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => changePage(page)}
                      aria-current={active ? "page" : undefined}
                      aria-label={`${page}-р хуудас`}
                      className={`flex h-12 min-w-12 items-center justify-center rounded-full px-3 text-[16px] font-medium transition-all duration-300 ${
                        active
                          ? "bg-neutral-950 text-white"
                          : "bg-transparent text-neutral-900 hover:bg-neutral-100"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              {/* NEXT */}
              {safeCurrentPage < totalPages && (
                <button
                  type="button"
                  onClick={() => changePage(safeCurrentPage + 1)}
                  aria-label="Дараагийн хуудас"
                  className="group flex items-center gap-2 text-[16px] font-medium text-neutral-900 transition-colors hover:text-neutral-500"
                >
                  <span>Next</span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ChevronRightIcon />
                  </span>
                </button>
              )}
            </div>
          </nav>
        )}
      </div>
    </section>
  );
}
