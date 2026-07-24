"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type MouseEvent } from "react";

import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  categoryLabel?: string;
};

function getProductImages(product: Product) {
  const values = [product.thumbnail, ...(product.images ?? [])];

  const images = Array.from(
    new Set(
      values.filter(
        (image): image is string =>
          typeof image === "string" && image.trim().length > 0,
      ),
    ),
  );

  return images.length > 0 ? images.slice(0, 5) : ["/placeholder.png"];
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M2.8 12s3.4-6 9.2-6 9.2 6 9.2 6-3.4 6-9.2 6-9.2-6-9.2-6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.6" />
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

function DriverIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="h-6 w-6">
      <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.3" />

      <circle cx="16" cy="16" r="6.5" stroke="currentColor" strokeWidth="1.3" />

      <circle cx="16" cy="16" r="2.3" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function WaterIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="h-6 w-6">
      <path
        d="M16 4c4.7 6 8 10.2 8 15a8 8 0 1 1-16 0c0-4.8 3.3-9 8-15Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />

      <path
        d="M12 20.5c.8 2 2.2 3 4.4 3.1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="h-6 w-6">
      <path d="M10 6h12v3H10V6Z" stroke="currentColor" strokeWidth="1.3" />

      <rect
        x="8"
        y="9"
        width="16"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.3"
      />

      <path
        d="m17.5 12-5 7h4l-2 5 5.5-7.5h-4l1.5-4.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProductCard({
  product,
  categoryLabel,
}: ProductCardProps) {
  const { addItem } = useCart();

  const images = useMemo(() => getProductImages(product), [product]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const [quickViewImageIndex, setQuickViewImageIndex] = useState(0);

  const [quantity, setQuantity] = useState(1);

  const stock = Math.max(product.stock ?? 0, 0);

  const driverSize = `${6 + (product.id % 5)}.${product.id % 10}mm`;

  const protection = product.id % 2 === 0 ? "IP54" : "IP57";

  const batteryHours = 6 + (product.id % 16);

  function handleImageMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (images.length <= 1) {
      return;
    }

    const target = event.target as HTMLElement;

    if (target.closest('[data-product-control="true"]')) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    const position = event.clientX - rect.left;

    const percentage = Math.min(Math.max(position / rect.width, 0), 0.9999);

    const nextIndex = Math.floor(percentage * images.length);

    setActiveImageIndex(nextIndex);
  }

  function openQuickView(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    setQuickViewImageIndex(activeImageIndex);

    setQuantity(1);
    setQuickViewOpen(true);
  }

  function closeQuickView() {
    setQuickViewOpen(false);
  }

  function handleCardAddToCart(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (stock <= 0) {
      return;
    }

    addItem(product, 1);
  }

  function handleQuickViewAddToCart() {
    if (stock <= 0) {
      return;
    }

    closeQuickView();

    window.setTimeout(() => {
      addItem(product, quantity);
    }, 150);
  }

  function showPreviousImage() {
    setQuickViewImageIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  }

  function showNextImage() {
    setQuickViewImageIndex((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  }

  useEffect(() => {
    if (!quickViewOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeQuickView();
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [quickViewOpen, images.length]);

  return (
    <>
      <article className="best-product-card group flex h-full flex-col overflow-hidden rounded-[18px] border border-neutral-200 bg-white">
        <div
          onMouseMove={handleImageMouseMove}
          onMouseLeave={() => setActiveImageIndex(0)}
          className="relative aspect-square overflow-hidden bg-[#f7f7f7]"
        >
          <Link
            href={`/products/${product.id}`}
            aria-label={product.title}
            className="absolute inset-0 z-0"
          >
            {images.map((image, index) => (
              <Image
                key={`${image}-${index}`}
                src={image}
                alt={`${product.title} зураг ${index + 1}`}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1280px) 45vw, 24vw"
                draggable={false}
                className={`pointer-events-none select-none object-contain p-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  activeImageIndex === index
                    ? "scale-100 opacity-100"
                    : "scale-[1.035] opacity-0"
                }`}
              />
            ))}
          </Link>

          <span className="pointer-events-none absolute left-4 top-4 z-20 rounded-full bg-[#397d0b] px-4 py-2 text-[11px] font-semibold text-white">
            Шинэ
          </span>

          <button
            type="button"
            data-product-control="true"
            onClick={openQuickView}
            aria-label={`${product.title} хурдан харах`}
            title="Хурдан харах"
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white text-neutral-950 shadow-sm transition duration-300 hover:scale-105 hover:bg-neutral-950 hover:text-white"
          >
            <EyeIcon />
          </button>

          <button
            type="button"
            data-product-control="true"
            onClick={handleCardAddToCart}
            disabled={stock <= 0}
            className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2 translate-y-4 whitespace-nowrap rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white opacity-0 shadow-lg transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-400 group-hover:translate-y-0 group-hover:opacity-100"
          >
            {stock > 0 ? "Сагсанд нэмэх" : "Бараа дууссан"}
          </button>

          {images.length > 1 && (
            <div
              data-product-control="true"
              className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2"
            >
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-product-control="true"
                  aria-label={`${index + 1}-р зураг`}
                  onMouseEnter={() => setActiveImageIndex(index)}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    setActiveImageIndex(index);
                  }}
                  className="flex h-5 w-5 items-center justify-center rounded-full"
                >
                  <span
                    className={`block rounded-full bg-neutral-950 transition-all duration-300 ${
                      activeImageIndex === index
                        ? "h-2.5 w-2.5"
                        : "h-1.5 w-1.5 opacity-30"
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-500">
            {product.brand ?? categoryLabel ?? product.category}
          </p>

          <div className="mt-2 flex items-start justify-between gap-3">
            <Link href={`/products/${product.id}`} className="min-w-0">
              <h3 className="line-clamp-1 text-[18px] font-bold tracking-[-0.035em] text-neutral-950 transition hover:opacity-60">
                {product.title}
              </h3>
            </Link>

            <span className="shrink-0 text-[14px] font-semibold text-neutral-950">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="text-amber-500">★</span>

            <span className="font-medium">
              {(product.rating ?? 0).toFixed(1)}
            </span>

            <span className="text-neutral-400">·</span>

            <span className={stock > 0 ? "text-emerald-700" : "text-red-600"}>
              {stock > 0 ? `${stock} ширхэг бэлэн` : "Бараа дууссан"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 border-t border-neutral-200 bg-white">
          <div className="flex min-h-[64px] items-center gap-2 border-r border-neutral-200 px-3">
            <span className="shrink-0 text-neutral-500">
              <DriverIcon />
            </span>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold">{driverSize}</p>

              <p className="truncate text-[9px] text-neutral-500">Драйвер</p>
            </div>
          </div>

          <div className="flex min-h-[64px] items-center gap-2 border-r border-neutral-200 px-3">
            <span className="shrink-0 text-neutral-500">
              <WaterIcon />
            </span>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold">{protection}</p>

              <p className="truncate text-[9px] text-neutral-500">Хамгаалалт</p>
            </div>
          </div>

          <div className="flex min-h-[64px] items-center gap-2 px-3">
            <span className="shrink-0 text-neutral-500">
              <BatteryIcon />
            </span>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold">{batteryHours} цаг</p>

              <p className="truncate text-[9px] text-neutral-500">Батарей</p>
            </div>
          </div>
        </div>
      </article>

      {quickViewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${product.title} хурдан харах`}
          onClick={closeQuickView}
          className="fixed inset-0 z-[250] bg-black/35 p-3 backdrop-blur-[2px] sm:p-5"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="best-quick-view relative mx-auto grid h-full max-w-[1500px] overflow-hidden rounded-[26px] bg-white shadow-2xl lg:grid-cols-[minmax(0,1.35fr)_minmax(380px,0.65fr)]"
          >
            <button
              type="button"
              onClick={closeQuickView}
              aria-label="Хурдан харах цонхыг хаах"
              className="absolute right-6 top-6 z-[260] flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950 text-white transition hover:scale-105 hover:bg-neutral-700"
            >
              <CloseIcon />
            </button>

            <div className="relative min-h-[430px] overflow-hidden bg-[#f7f7f7]">
              {images.map((image, index) => (
                <Image
                  key={`${image}-${index}`}
                  src={image}
                  alt={`${product.title} зураг ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  draggable={false}
                  className={`pointer-events-none select-none object-contain p-10 transition-all duration-700 sm:p-16 ${
                    quickViewImageIndex === index
                      ? "scale-100 opacity-100"
                      : "scale-[1.05] opacity-0"
                  }`}
                />
              ))}

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    aria-label="Өмнөх зураг"
                    className="absolute left-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-neutral-950 hover:text-white"
                  >
                    <ArrowLeftIcon />
                  </button>

                  <button
                    type="button"
                    onClick={showNextImage}
                    aria-label="Дараагийн зураг"
                    className="absolute right-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-neutral-950 hover:text-white"
                  >
                    <ArrowRightIcon />
                  </button>

                  <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3 rounded-full bg-white/90 px-4 py-3 backdrop-blur">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setQuickViewImageIndex(index)}
                        aria-label={`${index + 1}-р зураг`}
                        className={`rounded-full bg-neutral-950 transition-all ${
                          quickViewImageIndex === index
                            ? "h-2.5 w-2.5"
                            : "h-2 w-2 opacity-30"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="overflow-y-auto px-7 py-16 sm:px-12 lg:px-14">
              <p className="text-sm text-neutral-600">
                {product.brand ?? product.category}
              </p>

              <h2 className="mt-2 text-4xl font-bold tracking-[-0.055em] lg:text-5xl">
                {product.title}
              </h2>

              <div className="mt-4 flex items-center justify-between gap-5">
                <p className="text-2xl font-semibold">
                  {formatPrice(product.price)}
                </p>

                <div className="flex items-center gap-2 text-sm">
                  <span className="text-amber-500">★</span>

                  <span>{(product.rating ?? 0).toFixed(1)}</span>
                </div>
              </div>

              <p className="mt-7 text-[16px] leading-7 text-neutral-600">
                {product.description}
              </p>

              <div className="mt-7">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">
                    Зургийн сонголт{" "}
                    <span className="font-normal text-neutral-500">
                      {quickViewImageIndex + 1}
                    </span>
                  </p>

                  <span className="text-xs text-neutral-500">
                    {quickViewImageIndex + 1}/{images.length}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-3">
                  {images.map((image, index) => (
                    <button
                      key={`${image}-thumb`}
                      type="button"
                      onClick={() => setQuickViewImageIndex(index)}
                      className={`relative h-14 w-14 overflow-hidden rounded-xl border bg-neutral-50 transition ${
                        quickViewImageIndex === index
                          ? "border-neutral-950 ring-1 ring-neutral-950"
                          : "border-neutral-200 hover:border-neutral-500"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${index + 1}-р сонголт`}
                        fill
                        sizes="56px"
                        className="object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-7">
                <div className="flex items-center justify-between text-sm">
                  <span
                    className={stock > 0 ? "text-neutral-700" : "text-red-600"}
                  >
                    {stock > 0 ? `${stock} ширхэг бэлэн` : "Бараа дууссан"}
                  </span>

                  {stock > 0 && (
                    <span className="text-emerald-700">Бэлэн байгаа</span>
                  )}
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-neutral-200">
                  <div
                    className={`h-full rounded-full ${
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

              <div className="mt-8 flex gap-3">
                <div className="flex shrink-0 items-center rounded-full border border-neutral-300 p-1">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((current) => Math.max(1, current - 1))
                    }
                    disabled={quantity <= 1}
                    aria-label="Тоо ширхэг хасах"
                    className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-neutral-100 disabled:opacity-30"
                  >
                    <MinusIcon />
                  </button>

                  <span className="w-10 text-center font-semibold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((current) =>
                        Math.min(stock > 0 ? stock : 1, current + 1),
                      )
                    }
                    disabled={stock === 0 || quantity >= stock}
                    aria-label="Тоо ширхэг нэмэх"
                    className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-neutral-100 disabled:opacity-30"
                  >
                    <PlusIcon />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleQuickViewAddToCart}
                  disabled={stock === 0}
                  className="flex h-[52px] flex-1 items-center justify-between rounded-full bg-neutral-950 px-6 font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
                >
                  <span>{stock > 0 ? "Сагсанд нэмэх" : "Бараа дууссан"}</span>

                  {stock > 0 && (
                    <span>{formatPrice(product.price * quantity)}</span>
                  )}
                </button>
              </div>

              <Link
                href={`/products/${product.id}`}
                onClick={closeQuickView}
                className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold underline underline-offset-4 transition hover:opacity-55"
              >
                Дэлгэрэнгүй харах
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
