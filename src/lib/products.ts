export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  brand?: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];

  discountPercentage?: number;
  availabilityStatus?: string;
  warrantyInformation?: string;
  shippingInformation?: string;
};

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

const API_URL = "https://dummyjson.com";

const ELECTRONIC_CATEGORIES = [
  "smartphones",
  "laptops",
  "tablets",
  "mobile-accessories",
] as const;

type ElectronicCategory = (typeof ELECTRONIC_CATEGORIES)[number];

function isElectronicCategory(
  category: string,
): category is ElectronicCategory {
  return ELECTRONIC_CATEGORIES.includes(category as ElectronicCategory);
}

async function fetchCategoryProducts(
  category: ElectronicCategory,
): Promise<Product[]> {
  const response = await fetch(
    `${API_URL}/products/category/${category}?limit=0`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`${category} бүтээгдэхүүн татахад алдаа гарлаа`);
  }

  const data = (await response.json()) as ProductsResponse;

  return data.products;
}

function mixProductGroups(groups: Product[][]): Product[] {
  const result: Product[] = [];

  const maximumLength = Math.max(0, ...groups.map((group) => group.length));

  /*
    Category бүрээс ээлжилж нэг нэг бүтээгдэхүүн авна.

    smartphones
    laptops
    tablets
    mobile-accessories
    дараа нь дахин давтана.
  */
  for (let productIndex = 0; productIndex < maximumLength; productIndex += 1) {
    for (const group of groups) {
      const product = group[productIndex];

      if (product) {
        result.push(product);
      }
    }
  }

  return result;
}

export async function getProducts(limit = 24): Promise<Product[]> {
  try {
    const productGroups = await Promise.all(
      ELECTRONIC_CATEGORIES.map(fetchCategoryProducts),
    );

    const mixedProducts = mixProductGroups(productGroups);

    return mixedProducts.slice(0, Math.max(0, limit));
  } catch (error) {
    console.error("Electronic products fetch error:", error);

    return [];
  }
}

export async function getProductsByCategory(
  category: ElectronicCategory,
  limit = 24,
): Promise<Product[]> {
  try {
    const products = await fetchCategoryProducts(category);

    return products.slice(0, Math.max(0, limit));
  } catch (error) {
    console.error(
      `${category}  бүтээгдэхүүны ангилал татахад алдаа гарлаа:`,
      error,
    );

    return [];
  }
}
export async function getProduct(id: string | number): Promise<Product | null> {
  const productId = String(id).trim();

  if (!/^\d+$/.test(productId)) {
    return null;
  }

  const response = await fetch(`${API_URL}/products/${productId}`, {
    next: {
      revalidate: 3600,
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Product мэдээлэл татахад алдаа гарлаа");
  }

  const product = (await response.json()) as Product;

  /*
    URL-аар beauty эсвэл skin-care бүтээгдэхүүн
    шууд нээхийг хориглоно.
  */
  if (!isElectronicCategory(product.category)) {
    return null;
  }

  return product;
}

export { ELECTRONIC_CATEGORIES };

export type { ElectronicCategory };
