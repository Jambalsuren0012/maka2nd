"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import type { Swiper as SwiperInstance } from "swiper";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

export type CategoryShowcaseItem = {
  key: string;
  title: string;
  description: string;
  href: string;
  image: string;
  count: number;
  featured?: boolean;
};

type CategoryShowcaseProps = {
  items: CategoryShowcaseItem[];
};

function ArrowRightIcon() {
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

function ArrowLeftIcon() {
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

export default function CategoryShowcase({ items }: CategoryShowcaseProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1920px]">
        <div className="mb-8 flex items-end justify-between gap-5 px-5 sm:px-8 lg:px-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Бүтээгдэхүүний сонголт
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-[-0.06em] text-neutral-950 sm:text-5xl">
              Ангиллаар үзэх
            </h2>
          </div>

          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev(700)}
              aria-label="Өмнөх ангилал"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
            >
              <ArrowLeftIcon />
            </button>

            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext(700)}
              aria-label="Дараагийн ангилал"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-950 text-neutral-950 transition hover:bg-neutral-950 hover:text-white"
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>

        <div className="pl-5 sm:pl-8 lg:pl-12">
          <Swiper
            modules={[A11y]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            speed={700}
            grabCursor
            spaceBetween={16}
            slidesPerView={1.12}
            breakpoints={{
              560: {
                slidesPerView: 2.1,
                spaceBetween: 18,
              },
              900: {
                slidesPerView: 3.1,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4.15,
                spaceBetween: 22,
              },
              1600: {
                slidesPerView: 4.35,
                spaceBetween: 22,
              },
            }}
            className="category-showcase-swiper"
          >
            {items.map((item) => (
              <SwiperSlide key={item.key} className="h-auto">
                <Link
                  href={item.href}
                  className={`category-showcase-card group relative block h-[500px] overflow-hidden rounded-[24px] ${
                    item.featured
                      ? "bg-neutral-950 text-white"
                      : "bg-[#f7f7f7] text-neutral-950"
                  }`}
                >
                  <div
                    className={
                      item.featured
                        ? "absolute inset-0"
                        : "absolute inset-x-0 top-0 h-[72%]"
                    }
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 560px) 90vw, (max-width: 900px) 45vw, 24vw"
                      className={
                        item.featured
                          ? "object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                          : "object-contain p-8 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      }
                    />

                    {item.featured && (
                      <>
                        <div className="absolute inset-0 bg-black/30" />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/5" />
                      </>
                    )}
                  </div>

                  {!item.featured && (
                    <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#f7f7f7] via-[#f7f7f7] to-transparent" />
                  )}

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 sm:p-7">
                    <div className="min-w-0">
                      <h3 className="flex items-start text-[28px] font-black tracking-[-0.055em]">
                        <span>{item.title}</span>

                        <sup
                          className={`ml-1 mt-1 text-[11px] font-semibold ${
                            item.featured ? "text-white/70" : "text-neutral-500"
                          }`}
                        >
                          {item.count}
                        </sup>
                      </h3>

                      <p
                        className={`mt-1 line-clamp-2 text-sm leading-5 ${
                          item.featured ? "text-white/80" : "text-neutral-600"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>

                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-500 group-hover:translate-x-1 ${
                        item.featured
                          ? "bg-white/10 text-white backdrop-blur hover:bg-white hover:text-neutral-950"
                          : "bg-white text-neutral-950 shadow-sm group-hover:bg-neutral-950 group-hover:text-white"
                      }`}
                    >
                      <ArrowRightIcon />
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .category-showcase-swiper {
          overflow: visible;
          padding-bottom: 10px;
          padding-right: 40px;
        }

        .category-showcase-swiper .swiper-wrapper {
          align-items: stretch;
          transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1) !important;
        }

        .category-showcase-swiper .swiper-slide {
          height: auto;
        }

        .category-showcase-card {
          animation: category-card-enter 700ms cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        @keyframes category-card-enter {
          from {
            opacity: 0;
            transform: translate3d(35px, 18px, 0);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @media (max-width: 640px) {
          .category-showcase-card {
            height: 440px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .category-showcase-card {
            animation-duration: 1ms !important;
          }

          .category-showcase-swiper .swiper-wrapper {
            transition-duration: 1ms !important;
          }
        }
      `}</style>
    </section>
  );
}
