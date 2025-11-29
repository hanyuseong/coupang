import { Product } from "./types";

const currencyFormatter = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
  maximumFractionDigits: 0,
});

export const formatCurrency = (value: number | undefined) => {
  if (typeof value !== "number") return "-";
  return currencyFormatter.format(value);
};

export const formatDateLabel = (value: string | undefined) => {
  if (!value) return "";
  const date = new Date(value);
  return `${date.getMonth() + 1}.${date.getDate()} ${["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
    }`;
};

export const calcDiscountPercent = (price?: number, discount?: number) => {
  if (!price || !discount || price <= discount) return null;
  return Math.round(((price - discount) / price) * 100);
};

export const splitProducts = (products: Product[]) => {
  const highlighted = products[0];
  const featured = products;
  const express = products.filter((p) => p.deliveryType?.includes("ROCKET"));
  const discounted = [...products]
    .filter((p) => p.discountPrice && p.price)
    .sort(
      (a, b) =>
        (calcDiscountPercent(b.price, b.discountPrice) ?? 0) -
        (calcDiscountPercent(a.price, a.discountPrice) ?? 0),
    )
    .slice(0, 8);

  return { highlighted, featured, express, discounted };
};

export const getImageUrl = (path: string | undefined | null, productId?: number) => {
  if (!path) return productId ? `/images/${productId}.png` : "/images/placeholder.png";
  if (path.startsWith("http")) return path;

  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;

  // If path already starts with "images/", append to base URL directly
  if (cleanPath.startsWith("images/")) {
    return `http://localhost:8080/${cleanPath}`;
  }

  // Otherwise, add "images/" prefix
  return `http://localhost:8080/images/${cleanPath}`;
};
