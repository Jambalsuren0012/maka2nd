"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/lib/products";

type FeaturedProductProps = {
  product: Product;
};

type SlideDirection = 1 | -1;

const IMAGE_TRANSITION_DURATION = 720;

const colorNames = [
  "Үүлэн цагаан",
  "Элсэн алтлаг",
  "Шөнийн хар",
  "Далайн цэнхэр",
  "Ойн ногоон",
];

const accessories = [
  {
    id: 1,
    name: "Пастел наадаг цаасны багц",
    price: 6500,
  },
  {
    id: 2,
    name: "Өнгөт гелэн үзгийн багц",
    price: 9800,
  },
  {
    id: 3,
    name: "Зургийн харандааны сет",
    price: 19800,
  },
];

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M15 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="1.8"
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
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M5 12h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`h-4 w-4 transition-transform duration-500 ${
        open ? "rotate-180" : ""
      }`}
    >
      <path
        d="m5 7.5 5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <circle cx="18" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.6" />

      <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" />

      <circle cx="18" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.6" />

      <path
        d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FeaturedBadge() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-1 top-1 z-30 h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 sm:h-[200px] sm:w-[200px]"
    >
      {/* Эргэдэг текст */}
      <svg
        viewBox="0 0 200 200"
        className="featured-badge-rotate absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <path
            id="featured-product-circle"
            d="
              M100,100
              m-72,0
              a72,72 0 1,1 144,0
              a72,72 0 1,1 -144,0
            "
          />
        </defs>

        <text
          fill="currentColor"
          className="text-neutral-950"
          style={{
            fontSize: "18px",
            fontWeight: 600,
            letterSpacing: "5px",
          }}
        >
          <textPath
            href="#featured-product-circle"
            startOffset="50%"
            textAnchor="middle"
            textLength="420"
            lengthAdjust="spacing"
          >
            ОНЦЛОХ • БҮТЭЭГДЭХҮҮН •
          </textPath>
        </text>
      </svg>

      {/* Голын хөдөлгөөнгүй дүрс */}
      <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_6px_25px_rgba(0,0,0,0.14)]">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="h-7 w-7 text-neutral-950"
        >
          <path
            d="M10.5 15.5V8.8a2 2 0 0 1 4 0v5.5-7.1a2 2 0 0 1 4 0v7.1-5.6a2 2 0 0 1 4 0v7.1-3.8a2 2 0 0 1 4 0v7.4c0 5.2-3.8 9.1-9.1 9.1h-1.2c-3.1 0-5.8-1.5-7.5-4l-3.2-4.7a2.2 2.2 0 0 1 3.4-2.7l1.6 1.4Z"
            fill="white"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function getProductImages(product: Product) {
  const values = [product.thumbnail, ...(product.images ?? [])];

  const uniqueImages = Array.from(
    new Set(
      values.filter(
        (image): image is string =>
          typeof image === "string" && image.trim().length > 0,
      ),
    ),
  );

  return uniqueImages.length > 0
    ? uniqueImages.slice(0, 7)
    : ["/placeholder.png"];
}

export default function FeaturedProduct({ product }: FeaturedProductProps) {
  const { addItem } = useCart();

  const animationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const animatingRef = useRef(false);

  const images = useMemo(() => getProductImages(product), [product]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [previousImageIndex, setPreviousImageIndex] = useState<number | null>(
    null,
  );

  const [slideDirection, setSlideDirection] = useState<SlideDirection>(1);

  const [accessoriesOpen, setAccessoriesOpen] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const selectedColor = colorNames[activeImageIndex % colorNames.length];

  const stock = Math.max(product.stock ?? 0, 0);

  const maximumQuantity = stock > 0 ? stock : 1;

  const reviewCount = 12 + (product.id % 45);

  function changeImage(nextIndex: number, direction: SlideDirection) {
    if (nextIndex === activeImageIndex || animatingRef.current) {
      return;
    }

    animatingRef.current = true;

    setPreviousImageIndex(activeImageIndex);

    setSlideDirection(direction);
    setActiveImageIndex(nextIndex);

    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }

    animationTimerRef.current = setTimeout(() => {
      setPreviousImageIndex(null);
      animatingRef.current = false;
    }, IMAGE_TRANSITION_DURATION);
  }

  function showPreviousImage() {
    const nextIndex =
      activeImageIndex === 0 ? images.length - 1 : activeImageIndex - 1;

    changeImage(nextIndex, -1);
  }

  function showNextImage() {
    const nextIndex =
      activeImageIndex === images.length - 1 ? 0 : activeImageIndex + 1;

    changeImage(nextIndex, 1);
  }

  function selectImage(index: number) {
    if (index === activeImageIndex) {
      return;
    }

    const direction: SlideDirection = index > activeImageIndex ? 1 : -1;

    changeImage(index, direction);
  }

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function increaseQuantity() {
    setQuantity((current) => Math.min(maximumQuantity, current + 1));
  }

  function handleAddToCart() {
    if (stock <= 0) {
      return;
    }

    addItem(product, quantity);
  }

  useEffect(() => {
    return () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, []);

  return (
    <section className="overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(390px,0.65fr)] xl:gap-14">
          {/* Зургийн хэсэг */}
          <div className="grid min-w-0 gap-4 md:grid-cols-[86px_minmax(0,1fr)]">
            {/* Жижиг зургууд */}
            <div className="order-2 flex gap-3 overflow-x-auto pb-1 md:order-1 md:max-h-[680px] md:flex-col md:overflow-y-auto md:overflow-x-hidden md:pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {images.map((image, index) => {
                const active = index === activeImageIndex;

                return (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => selectImage(index)}
                    aria-label={`Бүтээгдэхүүний ${index + 1}-р зургийг харах`}
                    className={`relative h-[82px] w-[82px] shrink-0 overflow-hidden rounded-2xl border-2 bg-[#f6f6f4] transition-all duration-500 ${
                      active
                        ? "border-neutral-950 opacity-100 shadow-sm"
                        : "border-transparent opacity-55 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} бүтээгдэхүүний ${
                        index + 1
                      }-р жижиг зураг`}
                      fill
                      sizes="82px"
                      draggable={false}
                      className={`object-contain p-2 transition-transform duration-500 ${
                        active ? "scale-100" : "scale-90"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Үндсэн зураг */}
            <div className="order-1 md:order-2">
              <div className="relative">
                <FeaturedBadge />

                <div className="group relative aspect-[1/1.02] min-h-[440px] overflow-hidden rounded-[26px] bg-[#f6f6f4] sm:min-h-[580px] lg:min-h-[650px]">
                  {previousImageIndex !== null && (
                    <div
                      className={`absolute inset-0 ${
                        slideDirection === 1
                          ? "featured-image-leave-left"
                          : "featured-image-leave-right"
                      }`}
                    >
                      <Image
                        src={images[previousImageIndex]}
                        alt={`${product.title} өмнөх зураг`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        draggable={false}
                        className="pointer-events-none select-none object-contain p-8 sm:p-12 lg:p-16"
                      />
                    </div>
                  )}

                  <div
                    key={`featured-active-${activeImageIndex}`}
                    className={`absolute inset-0 ${
                      previousImageIndex === null
                        ? ""
                        : slideDirection === 1
                          ? "featured-image-enter-right"
                          : "featured-image-enter-left"
                    }`}
                  >
                    <Image
                      src={images[activeImageIndex]}
                      alt={`${product.title} бүтээгдэхүүний ${
                        activeImageIndex + 1
                      }-р зураг`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      draggable={false}
                      className="pointer-events-none select-none object-contain p-8 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] sm:p-12 lg:p-16"
                    />
                  </div>

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={showPreviousImage}
                        aria-label="Өмнөх зураг"
                        title="Өмнөх зураг"
                        className="absolute left-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-black/5 bg-white text-neutral-950 opacity-0 shadow-md transition-all duration-500 hover:scale-105 hover:bg-neutral-950 hover:text-white group-hover:opacity-100"
                      >
                        <ArrowLeftIcon />
                      </button>

                      <button
                        type="button"
                        onClick={showNextImage}
                        aria-label="Дараагийн зураг"
                        title="Дараагийн зураг"
                        className="absolute right-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-black/5 bg-white text-neutral-950 opacity-0 shadow-md transition-all duration-500 hover:scale-105 hover:bg-neutral-950 hover:text-white group-hover:opacity-100"
                      >
                        <ArrowRightIcon />
                      </button>
                    </>
                  )}

                  {images.length > 1 && (
                    <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => selectImage(index)}
                          aria-label={`${index + 1}-р зургийг харах`}
                          className="flex h-4 w-4 items-center justify-center rounded-full"
                        >
                          <span
                            className={`block rounded-full bg-neutral-950 transition-all duration-300 ${
                              activeImageIndex === index
                                ? "h-2.5 w-2.5"
                                : "h-1.5 w-1.5 opacity-25"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Бүтээгдэхүүний мэдээлэл */}
          <aside className="lg:sticky lg:top-28">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-500">
                {product.brand ?? product.category}
              </p>

              <p className="text-xl font-bold text-neutral-950">
                {formatPrice(product.price)}
              </p>
            </div>

            <h3 className="mt-4 text-4xl font-black tracking-[-0.06em] text-neutral-950 sm:text-5xl">
              {product.title}
            </h3>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="flex text-amber-500">
                {Array.from({
                  length: 5,
                }).map((_, index) => (
                  <span key={index} className="text-sm">
                    ★
                  </span>
                ))}
              </div>

              <span className="text-sm font-semibold text-neutral-900">
                {(product.rating ?? 0).toFixed(1)}
              </span>

              <span className="text-sm text-neutral-400">
                {reviewCount} үнэлгээ
              </span>
            </div>

            <p className="mt-6 text-[15px] leading-7 text-neutral-600">
              {product.description}
            </p>

            {/* Өнгөний сонголт */}
            <div className="mt-8">
              <p className="text-sm text-neutral-700">
                Өнгө:{" "}
                <span className="font-semibold text-neutral-950">
                  {selectedColor}
                </span>
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                {images.slice(0, 5).map((image, index) => {
                  const active = index === activeImageIndex;

                  const colorName = colorNames[index % colorNames.length];

                  return (
                    <button
                      key={`${image}-color`}
                      type="button"
                      onClick={() => selectImage(index)}
                      aria-label={`${colorName} өнгийг сонгох`}
                      title={colorName}
                      className={`relative h-16 w-16 overflow-hidden rounded-2xl border bg-[#f6f6f4] transition-all duration-300 ${
                        active
                          ? "border-neutral-950 ring-1 ring-neutral-950"
                          : "border-neutral-200 hover:border-neutral-500"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${colorName} өнгөний сонголт`}
                        fill
                        sizes="64px"
                        draggable={false}
                        className="object-contain p-2"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Нэмэлт хэрэгслүүд */}
            <div className="mt-8 overflow-hidden rounded-2xl bg-[#f6f6f4]">
              <button
                type="button"
                onClick={() => setAccessoriesOpen((current) => !current)}
                aria-expanded={accessoriesOpen}
                className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-neutral-950"
              >
                <span>Нэмэлт хэрэгслүүд</span>

                <ChevronDownIcon open={accessoriesOpen} />
              </button>

              <div
                className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  accessoriesOpen
                    ? "max-h-[320px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-2 border-t border-neutral-200 p-3">
                  {accessories.map((accessory) => (
                    <div
                      key={accessory.id}
                      className="flex items-center justify-between gap-4 rounded-xl bg-white px-4 py-3 text-sm"
                    >
                      <span className="font-medium text-neutral-900">
                        {accessory.name}
                      </span>

                      <span className="shrink-0 text-neutral-500">
                        {formatPrice(accessory.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Үлдэгдэл */}
            <div className="mt-7">
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="text-neutral-600">
                  {stock > 0
                    ? `Ердөө ${stock} ширхэг үлдсэн байна`
                    : "Одоогоор худалдаанд байхгүй"}
                </span>

                <span
                  className={
                    stock > 0
                      ? "font-semibold text-emerald-700"
                      : "font-semibold text-red-600"
                  }
                >
                  {stock > 0 ? "Бэлэн байгаа" : "Бараа дууссан"}
                </span>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-neutral-200">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    stock > 0 ? "bg-neutral-950" : "bg-red-500"
                  }`}
                  style={{
                    width:
                      stock > 0
                        ? `${Math.max(8, Math.min(stock, 100))}%`
                        : "100%",
                  }}
                />
              </div>
            </div>

            {/* Тоо ширхэг */}
            <div className="mt-7 flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-neutral-900">
                Тоо ширхэг
              </span>

              <div className="flex items-center rounded-full border border-neutral-300 bg-white p-1">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  aria-label="Тоо ширхэг хасах"
                  title="Хасах"
                  className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <MinusIcon />
                </button>

                <span className="w-11 text-center text-sm font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={stock === 0 || quantity >= maximumQuantity}
                  aria-label="Тоо ширхэг нэмэх"
                  title="Нэмэх"
                  className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <PlusIcon />
                </button>
              </div>
            </div>

            {/* Сагсанд нэмэх */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={stock === 0}
              className="mt-6 flex h-15 w-full items-center justify-between rounded-full bg-neutral-950 px-7 font-semibold text-white transition-all duration-300 hover:scale-[1.01] hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
            >
              <span>{stock > 0 ? "Сагсанд нэмэх" : "Бараа дууссан"}</span>

              {stock > 0 && (
                <span>{formatPrice(product.price * quantity)}</span>
              )}
            </button>

            {/* Агуулахаас авах */}
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-neutral-200 px-4 py-4">
              <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-pink-500" />

              <div className="min-w-0 flex-1">
                <p className="text-xs leading-5 text-neutral-600">
                  Үндсэн агуулахаас биеэр ирж авах боломжтой.
                </p>

                <p className="mt-1 text-[11px] text-neutral-400">
                  Ихэвчлэн 24 цагийн дотор бэлэн болно
                </p>
              </div>

              <button
                type="button"
                className="shrink-0 text-[11px] font-semibold underline underline-offset-4"
              >
                Боломжийг шалгах
              </button>
            </div>

            {/* Хуваалцах */}
            <div className="mt-6 flex items-center justify-between gap-4 border-t border-neutral-200 pt-5">
              <div className="flex items-center gap-2">
                <span className="mr-2 text-xs text-neutral-500">
                  Хуваалцах:
                </span>

                {["f", "𝕏", "p", "in"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-label={`${item} платформ дээр хуваалцах`}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition hover:bg-neutral-100"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="flex items-center gap-2 text-xs font-medium text-neutral-700"
              >
                <ShareIcon />
                Илгээх
              </button>
            </div>

            <Link
              href={`/products/${product.id}`}
              className="mt-6 flex items-center justify-center gap-2 rounded-full border border-neutral-300 py-4 text-sm font-semibold transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
            >
              Бүтээгдэхүүний дэлгэрэнгүй
              <ArrowRightIcon />
            </Link>
          </aside>
        </div>
      </div>

      <style jsx global>{`
        .featured-image-enter-right {
          animation: featured-enter-right ${IMAGE_TRANSITION_DURATION}ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .featured-image-enter-left {
          animation: featured-enter-left ${IMAGE_TRANSITION_DURATION}ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .featured-image-leave-left {
          animation: featured-leave-left ${IMAGE_TRANSITION_DURATION}ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .featured-image-leave-right {
          animation: featured-leave-right ${IMAGE_TRANSITION_DURATION}ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .featured-badge-rotate {
          animation: featured-badge-spin 12s linear infinite;
          transform-box: fill-box;
          transform-origin: center;
          will-change: transform;
        }

        @keyframes featured-enter-right {
          from {
            opacity: 0;
            transform: translate3d(18%, 0, 0) scale(0.97);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes featured-enter-left {
          from {
            opacity: 0;
            transform: translate3d(-18%, 0, 0) scale(0.97);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes featured-leave-left {
          from {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }

          to {
            opacity: 0;
            transform: translate3d(-18%, 0, 0) scale(0.97);
          }
        }

        @keyframes featured-leave-right {
          from {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }

          to {
            opacity: 0;
            transform: translate3d(18%, 0, 0) scale(0.97);
          }
        }

        @keyframes featured-badge-spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .featured-image-enter-right,
          .featured-image-enter-left,
          .featured-image-leave-left,
          .featured-image-leave-right {
            animation-duration: 1ms !important;
          }

          .featured-badge-rotate {
            animation-play-state: paused !important;
          }
        }
      `}</style>
    </section>
  );
}
