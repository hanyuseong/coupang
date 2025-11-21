import {
  fallbackCart,
  fallbackCategories,
  fallbackOrders,
  fallbackProducts,
  fallbackReviews,
} from "./fallback-data";
import { ApiResponse, Cart, Category, Order, Product, Review } from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

async function safeRequest<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
    });

    if (!response.ok) {
      console.warn(`API request failed: ${path} (${response.status})`);
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    if (typeof error === "object" && error && "digest" in error) {
      const digest = (error as { digest?: string }).digest;
      if (digest === "DYNAMIC_SERVER_USAGE") {
        throw error;
      }
    }
    console.warn(`API request error for ${path}`, error);
    return null;
  }
}

type PaginationParams = {
  page?: number;
  size?: number;
  sort?: string[];
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  keyword?: string;
};

type PageResponse<T> = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: T[];
  number: number;
};

export async function fetchProducts(
  { page = 0, size = 12, sort, categoryId, minPrice, maxPrice, keyword }: PaginationParams = {},
): Promise<Product[]> {
  const searchParams = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  if (categoryId !== undefined) searchParams.append("categoryId", String(categoryId));
  if (minPrice !== undefined) searchParams.append("minPrice", String(minPrice));
  if (maxPrice !== undefined) searchParams.append("maxPrice", String(maxPrice));
  if (keyword) searchParams.append("keyword", keyword);

  sort?.forEach((value) => searchParams.append("sort", value));

  const payload = await safeRequest<ApiResponse<PageResponse<Product>>>(
    `/api/products?${searchParams.toString()}`,
  );

  if (payload?.data && Array.isArray(payload.data.content)) {
    return payload.data.content;
  }

  return fallbackProducts;
}

export async function fetchProduct(productId: number): Promise<Product | null> {
  if (!productId) return null;
  const payload = await safeRequest<ApiResponse<Product>>(
    `/api/products/${productId}`,
  );
  return payload?.data ?? null;
}

export async function fetchCategories(): Promise<Category[]> {
  const payload = await safeRequest<ApiResponse<Category[]>>("/api/categories");
  return payload?.data && Array.isArray(payload.data)
    ? payload.data
    : fallbackCategories;
}

export async function fetchCart(): Promise<Cart> {
  const payload = await safeRequest<ApiResponse<Cart>>("/api/cart");
  return payload?.data ?? fallbackCart;
}

export async function fetchOrders(): Promise<Order[]> {
  const payload = await safeRequest<ApiResponse<Order[]>>("/api/orders");
  return payload?.data && Array.isArray(payload.data)
    ? payload.data
    : fallbackOrders;
}

export async function fetchReviews(
  productId: number | undefined,
): Promise<Review[]> {
  if (!productId) {
    return fallbackReviews;
  }

  const payload = await safeRequest<ApiResponse<Review[]>>(
    `/api/reviews/${productId}`,
  );

  return payload?.data && Array.isArray(payload.data)
    ? payload.data
    : fallbackReviews;
}
