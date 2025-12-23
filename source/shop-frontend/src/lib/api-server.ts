import { cookies } from "next/headers";
import { Cart, ApiResponse } from "./types";
import { fallbackCart } from "./fallback-data";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

async function safeServerRequest<T>(path: string, init?: RequestInit): Promise<T | null> {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("accessToken")?.value;

        const headers: HeadersInit = {
            "Content-Type": "application/json",
            ...(init?.headers || {}),
        };

        if (token) {
            (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}${path}`, {
            ...init,
            cache: "no-store",
            headers,
        });

        if (!response.ok) {
            // console.warn(`API request failed: ${path} (${response.status})`);
            return null;
        }

        return (await response.json()) as T;
    } catch (error) {
        console.warn(`API request error for ${path}`, error);
        return null;
    }
}

export async function fetchCartServer(): Promise<Cart> {
    const payload = await safeServerRequest<ApiResponse<Cart>>("/api/cart");
    return payload?.data ?? fallbackCart;
}

export async function fetchRecommendedKeywordsServer(): Promise<string[]> {
    const payload = await safeServerRequest<ApiResponse<string[]>>("/api/keywords/recommended");
    return payload?.data ?? ["로켓배송", "로켓프레시", "한스비즈", "골드박스", "와우할인", "여행/티켓"];
}
