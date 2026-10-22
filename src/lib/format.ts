export function formatPrice(price: number): string {
  const safePrice = Number.isFinite(price) ? price : 0;

  const isNegative = safePrice < 0;

  const fixedPrice = Math.abs(safePrice).toFixed(2);

  const [integerPart, decimalPart] = fixedPrice.split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `${isNegative ? "-" : ""}${formattedInteger}.${decimalPart} ₮`;
}
