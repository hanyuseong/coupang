import { Member } from "./types";
import { appStore } from "./api";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export async function fetchCurrentMember(): Promise<Member | null> {
    try {
        // Get token from Redux store
        const token = appStore?.getState().auth.accessToken;

        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}/api/members/me`, {
            cache: "no-store",
            headers,
        });

        if (!response.ok) {
            return null;
        }

        const result = (await response.json()) as {
            success: boolean;
            data: Member | null;
        };
        return result?.data ?? null;
    } catch (error) {
        console.warn("Failed to fetch current member", error);
        return null;
    }
}

export function logout(): void {
    if (typeof window !== "undefined") {
        // Clear tokens from localStorage (just in case)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // Redirect to home page
        window.location.href = "/";
    }
}
