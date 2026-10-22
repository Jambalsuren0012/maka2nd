import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetail from "@/components/product/product-detail";
import { getProduct, getProductsByCategory } from "@/lib/products";

type ProductDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProductDetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  const product = await getProduct(id).catch(() => null);

  if (!product) {
    return {
      title: "Бүтээгдэхүүн олдсонгүй",
    };
  }

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const product = await getProduct(id).catch(() => null);

  if (!product) {
    notFound();
  }

  const categoryProducts = await getProductsByCategory(product.category, 12);

  const relatedProducts = categoryProducts
    .filter((item) => item.id !== product.id)
    .slice(0, 10);

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
