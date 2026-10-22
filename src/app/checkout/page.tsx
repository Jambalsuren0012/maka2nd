"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";

import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const { items, itemCount, totalPrice, updateQuantity, removeItem } = useCart();
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(
      "Захиалга илгээх систем одоогоор холбогдоогүй байна. Таны мэдээлэл хадгалагдаагүй.",
    );
  }

  return (
    <main className="min-h-[70vh] bg-[#fafaf9] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-neutral-500">
          <Link href="/" className="transition hover:text-neutral-950">
            Нүүр
          </Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-950">Захиалга</span>
        </nav>

        <div className="mb-9">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Maka · Захиалга
          </p>
          <h1 className="text-3xl font-bold tracking-[-0.06em] text-neutral-950 sm:text-4xl">
            Захиалгаа баталгаажуулах
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500">
            Хүргэлтийн мэдээллээ оруулаад захиалгын мэдээллээ шалгана уу.
          </p>
        </div>

        {items.length === 0 ? (
          <section className="rounded-[28px] border border-neutral-200 bg-white px-6 py-16 text-center sm:py-20">
            <h2 className="text-2xl font-bold tracking-[-0.04em]">
              Таны сагс хоосон байна
            </h2>
            <p className="mt-3 text-sm text-neutral-500">
              Захиалга үүсгэхийн тулд эхлээд сагсандаа бараа нэмнэ үү.
            </p>
            <Link
              href="/"
              className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-neutral-950 px-7 text-sm font-semibold !text-white transition hover:bg-neutral-700"
            >
              Дэлгүүр үзэх
            </Link>
          </section>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-8"
          >
            <div className="space-y-6">
              <section className="rounded-[24px] border border-neutral-200 bg-white p-5 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950 text-sm font-semibold text-white">
                    1
                  </span>
                  <div>
                    <h2 className="text-lg font-bold">Холбоо барих мэдээлэл</h2>
                    <p className="mt-1 text-xs text-neutral-500">
                      Захиалгын явцыг энэ мэдээллээр холбоо барьж мэдэгдэнэ.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium sm:col-span-2">
                    Овог, нэр
                    <input
                      autoComplete="name"
                      required
                      name="name"
                      placeholder="Таны овог, нэр"
                      className="mt-2 h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
                    />
                  </label>
                  <label className="block text-sm font-medium">
                    Утасны дугаар
                    <input
                      autoComplete="tel"
                      inputMode="tel"
                      required
                      name="phone"
                      type="tel"
                      placeholder="Жишээ: 9911 2233"
                      className="mt-2 h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
                    />
                  </label>
                  <label className="block text-sm font-medium">
                    И-мэйл <span className="font-normal text-neutral-400">(заавал биш)</span>
                    <input
                      autoComplete="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      className="mt-2 h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
                    />
                  </label>
                </div>
              </section>

              <section className="rounded-[24px] border border-neutral-200 bg-white p-5 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950 text-sm font-semibold text-white">
                    2
                  </span>
                  <div>
                    <h2 className="text-lg font-bold">Хүргэлтийн хаяг</h2>
                    <p className="mt-1 text-xs text-neutral-500">
                      Хүргэлт хийх газрын дэлгэрэнгүй хаягийг бичнэ үү.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium">
                    Аймаг / хот
                    <input
                      autoComplete="address-level1"
                      required
                      name="city"
                      placeholder="Жишээ: Улаанбаатар"
                      className="mt-2 h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
                    />
                  </label>
                  <label className="block text-sm font-medium">
                    Дүүрэг / сум
                    <input
                      autoComplete="address-level2"
                      required
                      name="district"
                      placeholder="Дүүрэг эсвэл сум"
                      className="mt-2 h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
                    />
                  </label>
                  <label className="block text-sm font-medium sm:col-span-2">
                    Дэлгэрэнгүй хаяг
                    <textarea
                      autoComplete="street-address"
                      required
                      name="address"
                      rows={3}
                      placeholder="Хороо, байр, орц, давхар, тоот..."
                      className="mt-2 w-full resize-y rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
                    />
                  </label>
                  <label className="block text-sm font-medium sm:col-span-2">
                    Захиалгын тэмдэглэл{" "}
                    <span className="font-normal text-neutral-400">(заавал биш)</span>
                    <textarea
                      name="note"
                      rows={2}
                      placeholder="Хүргэлттэй холбоотой нэмэлт хүсэлт..."
                      className="mt-2 w-full resize-y rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
                    />
                  </label>
                </div>
              </section>

              <section className="rounded-[24px] border border-neutral-200 bg-white p-5 sm:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950 text-sm font-semibold text-white">
                    3
                  </span>
                  <div>
                    <h2 className="text-lg font-bold">Нэмэлт мэдээлэл</h2>
                    <p className="mt-1 text-xs text-neutral-500">
                      Хүргэлттэй холбоотой нэмэлт хүсэлт байвал сонгоно уу.
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 rounded-2xl border border-neutral-100 bg-[#fafaf9] p-4 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      name="deliveryNotes"
                      value="child"
                      className="h-4 w-4 accent-neutral-950"
                    />
                    Нялх хүүхэдтэй
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      name="deliveryNotes"
                      value="call-before-delivery"
                      className="h-4 w-4 accent-neutral-950"
                    />
                    Хүргэхийн өмнө заавал залгах
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      name="deliveryNotes"
                      value="evening-delivery"
                      className="h-4 w-4 accent-neutral-950"
                    />
                    Зөвхөн оройн цагаар хүргэх
                  </label>
                </div>
              </section>
            </div>

            <aside className="rounded-[24px] border border-neutral-200 bg-white p-5 sm:p-7 lg:sticky lg:top-24">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-5">
                <h2 className="text-lg font-bold">Таны захиалга</h2>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold">
                  {itemCount} бараа
                </span>
              </div>

              <div className="max-h-[360px] space-y-4 overflow-y-auto py-5">
                {items.map(({ product, quantity }) => (
                  <article key={product.id} className="flex gap-3">
                    <Link
                      href={`/products/${product.id}`}
                      className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-xl bg-neutral-100"
                    >
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        sizes="76px"
                        className="object-contain p-2"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                      <div>
                        <p className="line-clamp-2 text-sm font-semibold leading-5">
                          {product.title}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          {formatPrice(product.price)} / ширхэг
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(product.id, quantity - 1)
                            }
                            aria-label={`${product.title}: тоо ширхэг хасах`}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 transition hover:border-neutral-950"
                          >
                            −
                          </button>
                          <span>{quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                product.id,
                                Math.min(product.stock, quantity + 1),
                              )
                            }
                            disabled={quantity >= product.stock}
                            aria-label={`${product.title}: тоо ширхэг нэмэх`}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 transition hover:border-neutral-950 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-bold">
                          {formatPrice(product.price * quantity)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      aria-label={`${product.title} сагснаас устгах`}
                      className="self-start px-1 text-xs text-neutral-400 transition hover:text-red-600"
                    >
                      Устгах
                    </button>
                  </article>
                ))}
              </div>

              <div className="space-y-3 border-t border-neutral-100 pt-5 text-sm">
                <div className="flex justify-between text-neutral-500">
                  <span>Барааны дүн</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Хүргэлт</span>
                  <span>Захиалга баталгаажуулахад тооцно</span>
                </div>
                <div className="flex items-center justify-between border-t border-neutral-100 pt-4 text-base font-bold text-neutral-950">
                  <span>Нийт дүн</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>

              {notice && (
                <p
                  role="alert"
                  className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900"
                >
                  {notice}
                </p>
              )}

              <button
                type="submit"
                className="mt-6 flex h-14 w-full items-center justify-center rounded-full bg-neutral-950 px-6 text-sm font-semibold !text-white transition hover:bg-neutral-700"
              >
                Захиалга баталгаажуулах
              </button>
              <p className="mt-3 text-center text-[11px] leading-5 text-neutral-500">
                Захиалга илгээх систем одоогоор холбогдоогүй.
              </p>
              <Link
                href="/"
                className="mt-4 block text-center text-xs font-semibold text-neutral-500 underline underline-offset-4 transition hover:text-neutral-950"
              >
                Дэлгүүр рүү буцах
              </Link>
            </aside>
          </form>
        )}
      </div>
    </main>
  );
}
