import { getProducts, STATIONERY_CATEGORIES } from "@/lib/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search")?.trim().toLocaleLowerCase();
  const requestedLimit = Number(searchParams.get("limit"));
  const limit =
    Number.isFinite(requestedLimit) && requestedLimit > 0
      ? Math.floor(requestedLimit)
      : 100;

  let products = await getProducts(100);

  if (category) {
    products = products.filter((product) => product.category === category);
  }

  if (search) {
    products = products.filter((product) =>
      `${product.title} ${product.description} ${product.brand ?? ""}`
        .toLocaleLowerCase()
        .includes(search),
    );
  }

  return Response.json({
    products: products.slice(0, limit),
    total: products.length,
    limit,
    categories: STATIONERY_CATEGORIES,
  });
}
