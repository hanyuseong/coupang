import {
  fallbackCart,
  fallbackCategories,
  fallbackOrders,
  fallbackProducts,
  fallbackReviews,
} from "./fallback-data";
import { ApiResponse, Cart, Category, Order, Product, Review, Promotion } from "./types";

import { AppStore } from "./store";

const API_BASE_URL =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080"
    : "";

export let appStore: AppStore | null = null;
export const injectStore = (store: AppStore) => {
  appStore = store;
};

function getCartSessionId(): string {
  if (typeof window === "undefined") return "";
  let sessionId = localStorage.getItem("cart_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("cart_session_id", sessionId);
  }
  return sessionId;
}

async function safeRequest<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    };

    if (typeof window !== "undefined") {
      const token = appStore?.getState().auth.accessToken;
      if (token) {
        (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
      }

      const sessionId = getCartSessionId();
      if (sessionId) {
        (headers as Record<string, string>)["X-Cart-Session-Id"] = sessionId;
      }
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      cache: "no-store",
      headers,
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

export async function fetchPromotion(id: number): Promise<Promotion | null> {
  const payload = await safeRequest<ApiResponse<Promotion>>(`/api/promotions/${id}`);
  return payload?.data ?? null;
}

export async function fetchCategories(): Promise<Category[]> {
  const payload = await safeRequest<ApiResponse<Category[]>>("/api/categories");
  return payload?.data && Array.isArray(payload.data)
    ? payload.data
    : fallbackCategories;
}

export async function fetchRecommendedKeywords(): Promise<string[]> {
  const payload = await safeRequest<ApiResponse<string[]>>("/api/keywords/recommended");
  return payload?.data ?? ["로켓배송", "로켓프레시", "한스비즈", "골드박스", "와우할인", "여행/티켓"];
}

export async function fetchLightningDeals(): Promise<Product[]> {
  const payload = await safeRequest<ApiResponse<Product[]>>("/api/lightning-deals");
  return payload?.data ?? [];
}

export async function fetchRecentReviews(): Promise<Review[]> {
  const payload = await safeRequest<ApiResponse<Review[]>>("/api/reviews/recent");
  return payload?.data ?? [];
}

export async function fetchCart(): Promise<Cart> {
  const payload = await safeRequest<ApiResponse<Cart>>("/api/cart");
  return payload?.data ?? fallbackCart;
}

export async function addCartItem(
  productId: number,
  quantity = 1,
  optionStockId?: number,
): Promise<boolean> {
  const body = {
    productId,
    quantity,
    ...(optionStockId ? { optionStockId } : {}),
  };

  const payload = await safeRequest<ApiResponse<string>>("/api/cart", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return payload?.success ?? false;
}

export async function removeCartItem(cartItemId: number): Promise<boolean> {
  const payload = await safeRequest<ApiResponse<string>>(`/api/cart/${cartItemId}`, {
    method: "DELETE",
  });
  if (payload?.success) {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cart-updated"));
    }
    return true;
  }
  return false;
}

export async function updateCartItemQuantity(
  cartItemId: number,
  quantity: number
): Promise<boolean> {
  const payload = await safeRequest<ApiResponse<string>>(`/api/cart/${cartItemId}`, {
    method: "PUT",
    body: JSON.stringify({ quantity }),
  });
  if (payload?.success) {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cart-updated"));
    }
    return true;
  }
  return false;
}

export async function createOrder(orderData: {
  items: Array<{
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  deliveryFee: number;
}): Promise<{ success: boolean; orderId?: number }> {
  try {
    const payload = await safeRequest<ApiResponse<{ orderId: number }>>("/api/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });

    if (payload?.success && payload.data) {
      return { success: true, orderId: payload.data.orderId };
    }
    return { success: false };
  } catch (error) {
    console.error("Failed to create order:", error);
    return { success: false };
  }
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

export async function fetchAllReviews(): Promise<Review[]> {
  const payload = await safeRequest<ApiResponse<Review[]>>("/api/reviews/all");
  return payload?.data && Array.isArray(payload.data)
    ? payload.data
    : fallbackReviews;
}
export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export async function login(email: string, password: string): Promise<AuthResponse | null> {
  // Call Next.js Route Handler to set HttpOnly cookie
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return null;
  }

  const result = await response.json();
  return result.success ? result.data : null;
}

export type SignupRequest = {
  email: string;
  password: string;
  name: string;
  phone: string;
};

export async function signup(request: SignupRequest): Promise<boolean> {
  const payload = await safeRequest<ApiResponse<string>>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(request),
  });
  return payload?.success ?? false;
}
