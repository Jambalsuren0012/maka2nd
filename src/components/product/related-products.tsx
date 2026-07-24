"use client";

import { useRef } from "react";

import type { Swiper as SwiperInstance } from "swiper";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import ProductCard from "@/components/product/product-card";
import type { Product } from "@/lib/products";

type RelatedProductsProps = {
  products: Product[];
};

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M15 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="m9 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden bg-white pb-20 pt-12 sm:pb-24 sm:pt-16">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-6">
          <h2 className="max-w-[900px] text-4xl font-black tracking-[-0.065em] text-neutral-950 sm:text-5xl lg:text-[64px]">
            Төстэй бүтээгдэхүүн
          </h2>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev(700)}
              aria-label="Өмнөх бүтээгдэхүүнүүд"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 text-neutral-400 transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white sm:h-14 sm:w-14"
            >
              <ArrowLeftIcon />
            </button>

            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext(700)}
              aria-label="Дараагийн бүтээгдэхүүнүүд"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-950 text-neutral-950 transition hover:bg-neutral-950 hover:text-white sm:h-14 sm:w-14"
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>

        <div className="mt-10">
          <Swiper
            modules={[A11y]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            speed={700}
            grabCursor
            spaceBetween={18}
            slidesPerView={1.08}
            breakpoints={{
              560: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              900: {
                slidesPerView: 3,
                spaceBetween: 18,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            className="related-products-swiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="h-auto">
                <ProductCard
                  product={product}
                  categoryLabel={product.brand ?? product.category}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .related-products-swiper {
          overflow: visible;
          padding-bottom: 18px;
        }

        .related-products-swiper .swiper-wrapper {
          align-items: stretch;
          transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1) !important;
        }

        .related-products-swiper .swiper-slide {
          height: auto;
        }
      `}</style>
    </section>
  );
}
