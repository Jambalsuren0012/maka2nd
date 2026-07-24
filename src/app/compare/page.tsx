import type { Metadata } from "next";
import CompareProducts from "@/components/compare/compare-products";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Бүтээгдэхүүн харьцуулах",
  description:
    "Бүтээгдэхүүнүүдийн үнэ, үзүүлэлт болон бусад мэдээллийг харьцуулна.",
};

export default async function ComparePage() {
  const products = await getProducts(40);

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-neutral-200 bg-[#f6f6f3]">
        <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-400">
            Сонголт хийхэд тань тусалъя
          </p>

          <h1 className="mt-4 max-w-[1050px] text-5xl font-black tracking-[-0.07em] text-neutral-950 sm:text-6xl lg:text-[82px]">
            Бүтээгдэхүүн харьцуулах
          </h1>

          <p className="mt-6 max-w-[680px] text-base leading-7 text-neutral-600 sm:text-lg">
            Өөрт тохирох бүтээгдэхүүнээ сонгохын тулд үнэ, үнэлгээ, үлдэгдэл
            болон бусад мэдээллийг зэрэгцүүлэн харьцуулаарай.
          </p>
        </div>
      </section>

      <CompareProducts products={products} />
    </main>
  );
}
