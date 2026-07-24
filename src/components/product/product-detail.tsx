"use client";

import { useState } from "react";

import ProductGallery from "./product-gallery";
import type { Product } from "@/lib/products";
import RelatedProducts from "./related-products";
type ProductDetailProps = {
  product: Product;
  relatedProducts: Product[];
};

type ProductColor = {
  name: string;
  value: string;
};

const colors: ProductColor[] = [
  {
    name: "Модон бор",
    value: "#A76443",
  },
  {
    name: "Шөнийн хар",
    value: "#242424",
  },
  {
    name: "Элсэн шар",
    value: "#D8D0C3",
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("mn-MN", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="h-4 w-4 fill-current"
    >
      <path d="M10 1.7l2.45 4.97 5.49.8-3.97 3.87.94 5.47L10 14.23l-4.91 2.58.94-5.47L2.06 7.47l5.49-.8L10 1.7z" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
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
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M3 4h2l2.2 10.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 7H6M10 20a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm9 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProductDetail({
  product,
  relatedProducts,
}: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(colors[0]);

  const [quantity, setQuantity] = useState(1);

  const stock = Math.max(product.stock ?? 0, 0);

  const rating = product.rating ?? 0;

  const finalTotal = product.price * quantity;

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function increaseQuantity() {
    setQuantity((current) => {
      const maximumQuantity = stock > 0 ? stock : 1;

      return Math.min(maximumQuantity, current + 1);
    });
  }

  function handleAddToCart() {
    if (stock === 0) {
      return;
    }

    console.log("Сагсанд нэмэх", {
      productId: product.id,
      title: product.title,
      quantity,
      selectedColor: selectedColor.name,
      total: finalTotal,
    });
  }

  function handleBuyNow() {
    if (stock === 0) {
      return;
    }

    console.log("Одоо авах", {
      productId: product.id,
      title: product.title,
      quantity,
      selectedColor: selectedColor.name,
      total: finalTotal,
    });
  }

  return (
    <>
      <main className="min-h-screen bg-white text-neutral-950">
        <div className="mx-auto max-w-[1600px] px-4 py-4 lg:px-5 lg:py-6">
          <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1.65fr)_minmax(380px,0.95fr)]">
            <ProductGallery
              title={product.title}
              thumbnail={product.thumbnail}
              images={product.images}
            />

            <aside className="xl:sticky xl:top-28">
              <div className="px-1">
                <p className="text-base text-neutral-600">
                  {product.brand ?? product.category}
                </p>

                <h1 className="mt-2 text-4xl font-black tracking-[-0.045em] sm:text-5xl">
                  {product.title}
                </h1>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-2xl font-medium">
                    {formatPrice(product.price)}
                  </p>

                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-500">
                      {Array.from({
                        length: 5,
                      }).map((_, index) => (
                        <StarIcon key={index} />
                      ))}
                    </div>

                    <span className="text-sm text-neutral-700">
                      {rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                <p className="mt-7 text-[17px] leading-7 text-neutral-700">
                  {product.description}
                </p>

                <div className="mt-7">
                  <p className="text-lg">
                    Өнгө:{" "}
                    <span className="font-medium">{selectedColor.name}</span>
                  </p>

                  <div className="mt-3 flex flex-wrap gap-3">
                    {colors.map((color) => {
                      const isSelected = selectedColor.name === color.name;

                      return (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          aria-label={`${color.name} өнгийг сонгох`}
                          aria-pressed={isSelected}
                          title={color.name}
                          className={`flex h-12 w-12 items-center justify-center rounded-lg border bg-white transition ${
                            isSelected
                              ? "border-red-400 ring-1 ring-red-400"
                              : "border-neutral-200 hover:border-neutral-500"
                          }`}
                        >
                          <span
                            className="h-7 w-7 rounded-full border border-black/10"
                            style={{
                              backgroundColor: color.value,
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <section className="mt-6 rounded-[22px] border border-neutral-200 bg-white p-5">
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <p className="text-sm text-neutral-500">Үлдэгдэл</p>

                    <p
                      className={`mt-1 font-medium ${
                        stock > 0 ? "text-emerald-700" : "text-red-600"
                      }`}
                    >
                      {stock > 0 ? `${stock} ширхэг бэлэн` : "Бараа дууссан"}
                    </p>
                  </div>

                  <div className="flex items-center rounded-full border border-neutral-300 p-1">
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

                    <span className="w-10 text-center font-semibold">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={increaseQuantity}
                      disabled={stock === 0 || quantity >= stock}
                      aria-label="Тоо ширхэг нэмэх"
                      title="Нэмэх"
                      className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <PlusIcon />
                    </button>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-neutral-200 pt-5 text-sm text-neutral-600">
                  <span>Бүтээгдэхүүн × {quantity}</span>

                  <span>{formatPrice(finalTotal)}</span>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={stock === 0}
                  className="mt-5 flex w-full items-center justify-between rounded-full bg-neutral-950 px-6 py-4 font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
                >
                  <span className="flex items-center gap-2">
                    <CartIcon />

                    {stock > 0 ? "Сагсанд нэмэх" : "Бараа дууссан"}
                  </span>

                  <span>{formatPrice(finalTotal)}</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={stock === 0}
                  className="mt-3 w-full rounded-full border border-neutral-950 px-6 py-4 font-semibold text-neutral-950 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:border-neutral-300 disabled:text-neutral-400"
                >
                  Одоо авах
                </button>
              </section>

              <section className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[#f7f7f7] p-4">
                  <p className="text-xs uppercase tracking-wide text-neutral-500">
                    Ангилал
                  </p>

                  <p className="mt-1 font-medium capitalize">
                    {product.category}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f7f7f7] p-4">
                  <p className="text-xs uppercase tracking-wide text-neutral-500">
                    Бүтээгдэхүүний ID
                  </p>

                  <p className="mt-1 font-medium">#{product.id}</p>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </main>
      <RelatedProducts products={relatedProducts} />
    </>
  );
}
