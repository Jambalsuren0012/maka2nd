"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useCart } from "@/context/cart-context";

function formatPrice(price: number) {
  return new Intl.NumberFormat("mn-MN", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
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

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-7 w-7">
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

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
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

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    itemCount,
    totalPrice,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  const [noteOpen, setNoteOpen] = useState(false);

  const [orderNote, setOrderNote] = useState("");

  useEffect(() => {
    if (!isCartOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeCart();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeCart, isCartOpen]);

  return (
    <>
      {/* Арын бүдэг давхарга */}
      <button
        type="button"
        aria-label="Сагсыг хаах"
        onClick={closeCart}
        className={`fixed inset-0 z-[190] bg-black/35 backdrop-blur-[1px] transition-opacity duration-500 ${
          isCartOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Сагсны хажуу самбар */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Худалдан авалтын сагс"
        className={`fixed bottom-0 right-0 top-0 z-[200] flex w-full max-w-[540px] flex-col bg-white shadow-[-25px_0_80px_rgba(0,0,0,0.16)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Толгой хэсэг */}
        <header className="flex h-[88px] shrink-0 items-center justify-between border-b border-neutral-100 px-5 sm:px-7">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-[-0.045em] text-neutral-950">
              Таны сагс
            </h2>

            <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-neutral-950 px-2 text-xs font-bold text-white">
              {itemCount}
            </span>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Сагсыг хаах"
            title="Хаах"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-950 text-white transition duration-300 hover:scale-105 hover:bg-neutral-700"
          >
            <CloseIcon />
          </button>
        </header>

        {items.length === 0 ? (
          /* Хоосон сагс */
          <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-7 py-12 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 text-neutral-950">
              <CartIcon />
            </div>

            <h3 className="mt-7 text-3xl font-bold tracking-[-0.05em] text-neutral-950">
              Таны сагс хоосон байна
            </h3>

            <p className="mt-3 max-w-[330px] text-sm leading-6 text-neutral-500">
              Манай онцлох бүтээгдэхүүнүүдтэй танилцаж, таалагдсан бараагаа
              сагсандаа нэмээрэй.
            </p>

            <Link
              href="/"
              onClick={closeCart}
              className="mt-8 inline-flex h-14 items-center justify-center gap-3 rounded-full bg-neutral-950 px-8 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:bg-neutral-700"
            >
              Худалдан авалт эхлүүлэх
              <ArrowRightIcon />
            </Link>

            <div className="mt-10 w-full max-w-[370px] space-y-3">
              {[
                {
                  title: "Толгойтой чихэвч",
                  href: "/collections/headphones",
                },
                {
                  title: "Жижиг чихэвч",
                  href: "/collections/earphones",
                },
                {
                  title: "Чанга яригч",
                  href: "/collections/speakers",
                },
              ].map((collection) => (
                <Link
                  key={collection.href}
                  href={collection.href}
                  onClick={closeCart}
                  className="flex items-center justify-between rounded-2xl bg-neutral-100 px-5 py-4 text-sm font-semibold transition hover:bg-neutral-200"
                >
                  {collection.title}

                  <ArrowRightIcon />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Сагсны бараанууд */}
            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
              <div className="space-y-4">
                {items.map(({ product, quantity }) => {
                  const maximumQuantity = Math.max(
                    product.stock ?? quantity,
                    1,
                  );

                  return (
                    <article
                      key={product.id}
                      className="grid grid-cols-[105px_minmax(0,1fr)] gap-4 rounded-[20px] border border-neutral-200 bg-white p-3"
                    >
                      <Link
                        href={`/products/${product.id}`}
                        onClick={closeCart}
                        className="relative aspect-square overflow-hidden rounded-[15px] bg-[#f7f7f7]"
                      >
                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          fill
                          sizes="105px"
                          className="object-contain p-2 transition duration-500 hover:scale-105"
                        />
                      </Link>

                      <div className="flex min-w-0 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-500">
                              {product.brand ?? product.category}
                            </p>

                            <Link
                              href={`/products/${product.id}`}
                              onClick={closeCart}
                              className="mt-1 block"
                            >
                              <h3 className="line-clamp-2 text-[16px] font-bold leading-5 tracking-[-0.025em] text-neutral-950 transition hover:opacity-60">
                                {product.title}
                              </h3>
                            </Link>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(product.id)}
                            aria-label={`${product.title} бүтээгдэхүүнийг сагснаас устгах`}
                            title="Устгах"
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-500 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <TrashIcon />
                          </button>
                        </div>

                        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                          <div className="flex items-center rounded-full border border-neutral-300 p-0.5">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(product.id, quantity - 1)
                              }
                              aria-label="Тоо ширхэг хасах"
                              title="Хасах"
                              className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-neutral-100"
                            >
                              <MinusIcon />
                            </button>

                            <span className="w-8 text-center text-sm font-semibold">
                              {quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  product.id,
                                  Math.min(maximumQuantity, quantity + 1),
                                )
                              }
                              disabled={quantity >= maximumQuantity}
                              aria-label="Тоо ширхэг нэмэх"
                              title="Нэмэх"
                              className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              <PlusIcon />
                            </button>
                          </div>

                          <div className="text-right">
                            {quantity > 1 && (
                              <p className="text-[11px] text-neutral-400">
                                Нэг бүр нь {formatPrice(product.price)}
                              </p>
                            )}

                            <p className="text-[15px] font-bold text-neutral-950">
                              {formatPrice(product.price * quantity)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={clearCart}
                className="mt-5 text-sm font-medium text-neutral-500 underline decoration-neutral-300 underline-offset-4 transition hover:text-red-600"
              >
                Сагсыг цэвэрлэх
              </button>
            </div>

            {/* Доод хэсэг */}
            <footer className="shrink-0 border-t border-neutral-200 bg-white px-5 pb-6 pt-5 sm:px-7">
              <button
                type="button"
                onClick={() => setNoteOpen((current) => !current)}
                className="flex w-full items-center justify-between text-sm font-semibold"
              >
                <span>Захиалгын тэмдэглэл нэмэх</span>

                <span
                  className={`text-xl transition-transform duration-300 ${
                    noteOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  noteOpen ? "mt-4 max-h-32 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <textarea
                  value={orderNote}
                  onChange={(event) => setOrderNote(event.target.value)}
                  placeholder="Захиалгатай холбоотой нэмэлт хүсэлтээ бичнэ үү..."
                  className="min-h-24 w-full resize-none rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:bg-white"
                />
              </div>

              <div className="mt-5 space-y-3 border-t border-neutral-100 pt-5">
                <div className="flex items-center justify-between text-sm text-neutral-500">
                  <span>Нийт барааны тоо</span>

                  <span>{itemCount}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">Завсрын дүн</span>

                  <span className="text-xl font-bold">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <p className="text-xs leading-5 text-neutral-500">
                  Татвар болон хүргэлтийн төлбөрийг захиалга баталгаажуулах үед
                  тооцно.
                </p>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="mt-5 flex h-16 w-full items-center justify-between rounded-full bg-neutral-950 px-7 font-semibold text-white transition duration-300 hover:bg-neutral-700"
              >
                <span>Төлбөр төлөх</span>

                <span>{formatPrice(totalPrice)}</span>
              </Link>

              <Link
                href="/cart"
                onClick={closeCart}
                className="mt-3 flex h-12 w-full items-center justify-center text-sm font-semibold underline underline-offset-4 transition hover:opacity-55"
              >
                Сагсаа харах
              </Link>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
