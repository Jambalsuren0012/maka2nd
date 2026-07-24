"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ChangeEvent } from "react";

import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products";

type CompareProductsProps = {
  products: Product[];
};

type ComparisonRow = {
  label: string;
  getValue: (product: Product) => string;
};

const MAX_COMPARE_PRODUCTS = 3;

const comparisonRows: ComparisonRow[] = [
  {
    label: "Үнэ",
    getValue: (product) => formatPrice(product.price),
  },
  {
    label: "Үнэлгээ",
    getValue: (product) => `${(product.rating ?? 0).toFixed(1)} / 5`,
  },
  {
    label: "Үлдэгдэл",
    getValue: (product) =>
      product.stock > 0 ? `${product.stock} ширхэг` : "Бараа дууссан",
  },
  {
    label: "Брэнд",
    getValue: (product) => product.brand ?? "Тодорхойгүй",
  },
  {
    label: "Ангилал",
    getValue: (product) => product.category,
  },
  {
    label: "Хямдрал",
    getValue: (product) =>
      product.discountPercentage
        ? `${product.discountPercentage.toFixed(1)}%`
        : "Хямдралгүй",
  },
  {
    label: "Баталгаат хугацаа",
    getValue: (product) => product.warrantyInformation ?? "Мэдээлэл байхгүй",
  },
  {
    label: "Хүргэлт",
    getValue: (product) => product.shippingInformation ?? "Мэдээлэл байхгүй",
  },
  {
    label: "Төлөв",
    getValue: (product) =>
      product.availabilityStatus ??
      (product.stock > 0 ? "Бэлэн байгаа" : "Бараа дууссан"),
  },
];

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

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />

      <path
        d="m16 16 4 4"
        stroke="currentColor"
        strokeWidth="1.7"
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

function EmptyCompareCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex min-h-[440px] w-full flex-col items-center justify-center rounded-[24px] border border-dashed border-neutral-300 bg-neutral-50 px-6 text-center transition hover:border-neutral-950 hover:bg-neutral-100"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-neutral-950 shadow-sm transition group-hover:scale-105 group-hover:bg-neutral-950 group-hover:text-white">
        <PlusIcon />
      </span>

      <h2 className="mt-5 text-xl font-bold tracking-[-0.04em]">
        Бүтээгдэхүүн нэмэх
      </h2>

      <p className="mt-2 max-w-[240px] text-sm leading-6 text-neutral-500">
        Харьцуулах бүтээгдэхүүнээ эндээс сонгоно уу.
      </p>
    </button>
  );
}

function CompareProductCard({
  product,
  onRemove,
}: {
  product: Product;
  onRemove: () => void;
}) {
  const { addItem } = useCart();

  return (
    <article className="relative flex min-h-[440px] flex-col rounded-[24px] border border-neutral-200 bg-white p-4">
      <button
        type="button"
        onClick={onRemove}
        aria-label={`${product.title} бүтээгдэхүүнийг харьцуулалтаас хасах`}
        title="Харьцуулалтаас хасах"
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-950 shadow-sm transition hover:scale-105 hover:bg-neutral-950 hover:text-white"
      >
        <CloseIcon />
      </button>

      <Link
        href={`/products/${product.id}`}
        className="group relative aspect-square overflow-hidden rounded-[18px] bg-[#f7f7f7]"
      >
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 90vw, 30vw"
          className="object-contain p-7 transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
          {product.brand ?? product.category}
        </p>

        <Link href={`/products/${product.id}`} className="mt-2">
          <h2 className="line-clamp-2 text-xl font-bold leading-6 tracking-[-0.04em] transition hover:opacity-55">
            {product.title}
          </h2>
        </Link>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-lg font-bold">{formatPrice(product.price)}</p>

          <div className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-xs">
            <span className="text-amber-500">★</span>

            <span className="font-semibold">
              {(product.rating ?? 0).toFixed(1)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => addItem(product, 1)}
          disabled={product.stock <= 0}
          className="mt-auto flex h-12 w-full items-center justify-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          <CartIcon />

          {product.stock > 0 ? "Сагсанд нэмэх" : "Бараа дууссан"}
        </button>
      </div>
    </article>
  );
}

export default function CompareProducts({ products }: CompareProductsProps) {
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>(
    products.slice(0, 2).map((product) => product.id),
  );

  const [pickerOpen, setPickerOpen] = useState(false);

  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);

  const [search, setSearch] = useState("");

  const selectedProducts = useMemo(() => {
    return selectedProductIds
      .map((productId) => products.find((product) => product.id === productId))
      .filter((product): product is Product => Boolean(product));
  }, [products, selectedProductIds]);

  const availableProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const alreadySelected = selectedProductIds.includes(product.id);

      if (alreadySelected) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const searchableText = [
        product.title,
        product.brand,
        product.category,
        product.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedSearch);
    });
  }, [products, search, selectedProductIds]);

  function openProductPicker(index: number | null) {
    setReplaceIndex(index);
    setSearch("");
    setPickerOpen(true);
  }

  function closeProductPicker() {
    setPickerOpen(false);
    setReplaceIndex(null);
    setSearch("");
  }

  function selectProduct(productId: number) {
    if (replaceIndex !== null) {
      setSelectedProductIds((current) => {
        const next = [...current];

        next[replaceIndex] = productId;

        return next;
      });
    } else {
      setSelectedProductIds((current) => {
        if (current.length >= MAX_COMPARE_PRODUCTS) {
          return current;
        }

        return [...current, productId];
      });
    }

    closeProductPicker();
  }

  function removeProduct(index: number) {
    setSelectedProductIds((current) =>
      current.filter((_, itemIndex) => itemIndex !== index),
    );
  }

  function handleProductSelect(
    event: ChangeEvent<HTMLSelectElement>,
    index: number,
  ) {
    const productId = Number(event.target.value);

    if (!productId) {
      return;
    }

    setSelectedProductIds((current) => {
      const next = [...current];

      next[index] = productId;

      return next;
    });
  }

  const emptySlotCount = MAX_COMPARE_PRODUCTS - selectedProducts.length;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="flex flex-col gap-5 border-b border-neutral-200 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.045em]">
              Сонгосон бүтээгдэхүүнүүд
            </h2>

            <p className="mt-2 text-sm text-neutral-500">
              Хамгийн ихдээ {MAX_COMPARE_PRODUCTS} бүтээгдэхүүн харьцуулна.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openProductPicker(null)}
            disabled={selectedProducts.length >= MAX_COMPARE_PRODUCTS}
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
          >
            <PlusIcon />
            Бүтээгдэхүүн нэмэх
          </button>
        </div>

        <div className="mt-8 overflow-x-auto pb-3">
          <div className="grid min-w-[900px] grid-cols-[180px_repeat(3,minmax(230px,1fr))] gap-4">
            <div className="flex items-end pb-4">
              <p className="text-sm font-semibold text-neutral-500">
                Харьцуулах бүтээгдэхүүн
              </p>
            </div>

            {selectedProducts.map((product, index) => (
              <div key={product.id}>
                <div className="mb-3">
                  <select
                    value={product.id}
                    onChange={(event) => handleProductSelect(event, index)}
                    className="h-11 w-full rounded-full border border-neutral-300 bg-white px-4 text-sm font-medium outline-none transition focus:border-neutral-950"
                  >
                    <option value={product.id}>{product.title}</option>

                    {products
                      .filter(
                        (item) =>
                          item.id === product.id ||
                          !selectedProductIds.includes(item.id),
                      )
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.title}
                        </option>
                      ))}
                  </select>
                </div>

                <CompareProductCard
                  product={product}
                  onRemove={() => removeProduct(index)}
                />
              </div>
            ))}

            {Array.from({
              length: emptySlotCount,
            }).map((_, index) => (
              <div key={`empty-${index}`} className="pt-14">
                <EmptyCompareCard onClick={() => openProductPicker(null)} />
              </div>
            ))}
          </div>
        </div>

        {selectedProducts.length > 0 && (
          <div className="mt-14 overflow-x-auto">
            <div className="min-w-[900px] overflow-hidden rounded-[24px] border border-neutral-200">
              {comparisonRows.map((row, rowIndex) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-[180px_repeat(3,minmax(230px,1fr))] ${
                    rowIndex > 0 ? "border-t border-neutral-200" : ""
                  }`}
                >
                  <div className="flex min-h-[74px] items-center bg-neutral-100 px-5 text-sm font-bold">
                    {row.label}
                  </div>

                  {Array.from({
                    length: MAX_COMPARE_PRODUCTS,
                  }).map((_, columnIndex) => {
                    const product = selectedProducts[columnIndex];

                    return (
                      <div
                        key={`${row.label}-${columnIndex}`}
                        className="flex min-h-[74px] items-center border-l border-neutral-200 px-5 text-sm leading-6 text-neutral-700"
                      >
                        {product ? row.getValue(product) : "—"}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Бүтээгдэхүүн сонгох modal */}
      <button
        type="button"
        aria-label="Бүтээгдэхүүн сонгох цонхыг хаах"
        onClick={closeProductPicker}
        className={`fixed inset-0 z-[220] bg-black/40 backdrop-blur-[2px] transition-opacity duration-500 ${
          pickerOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Харьцуулах бүтээгдэхүүн сонгох"
        className={`fixed bottom-0 right-0 top-0 z-[230] flex w-full max-w-[560px] flex-col bg-white shadow-[-25px_0_80px_rgba(0,0,0,0.18)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          pickerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex min-h-[88px] items-center justify-between border-b border-neutral-200 px-6 sm:px-8">
          <div>
            <h2 className="text-xl font-bold tracking-[-0.04em]">
              Бүтээгдэхүүн сонгох
            </h2>

            <p className="mt-1 text-xs text-neutral-500">
              Харьцуулах бараагаа сонгоно уу.
            </p>
          </div>

          <button
            type="button"
            onClick={closeProductPicker}
            aria-label="Хаах"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-950 text-white transition hover:scale-105 hover:bg-neutral-700"
          >
            <CloseIcon />
          </button>
        </header>

        <div className="border-b border-neutral-200 p-5 sm:px-8">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
              <SearchIcon />
            </span>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Бүтээгдэхүүн хайх..."
              className="h-13 w-full rounded-full border border-neutral-300 bg-neutral-50 pl-12 pr-5 text-sm outline-none transition focus:border-neutral-950 focus:bg-white"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-8">
          {availableProducts.length > 0 ? (
            <div className="space-y-3">
              {availableProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => selectProduct(product.id)}
                  className="group grid w-full grid-cols-[86px_minmax(0,1fr)_auto] items-center gap-4 rounded-[18px] border border-neutral-200 p-3 text-left transition hover:border-neutral-950"
                >
                  <span className="relative aspect-square overflow-hidden rounded-[13px] bg-[#f7f7f7]">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      sizes="86px"
                      className="object-contain p-2 transition duration-500 group-hover:scale-105"
                    />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                      {product.brand ?? product.category}
                    </span>

                    <span className="mt-1 line-clamp-2 block text-sm font-bold leading-5">
                      {product.title}
                    </span>

                    <span className="mt-1 block text-xs text-neutral-500">
                      {formatPrice(product.price)}
                    </span>
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 transition group-hover:bg-neutral-950 group-hover:text-white">
                    <ArrowRightIcon />
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
              <h3 className="text-xl font-bold">Бүтээгдэхүүн олдсонгүй</h3>

              <p className="mt-2 text-sm text-neutral-500">
                Өөр түлхүүр үгээр дахин хайна уу.
              </p>
            </div>
          )}
        </div>
      </aside>
    </section>
  );
}
