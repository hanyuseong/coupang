"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser, setAccessToken } from "@/lib/features/authSlice";
import { fetchCurrentMember } from "@/lib/member-api";

export default function OAuth2CallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = searchParams.get("accessToken");

        if (accessToken) {
            // 1. Save accessToken to Redux
            dispatch(setAccessToken(accessToken));

            // 1-1. Save accessToken to HttpOnly Cookie (via API route)
            fetch("/api/auth/set-token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ accessToken }),
            }).catch(console.error);

            // Clear any tokens in localStorage (cleanup)
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            // 2. Fetch current user info
            fetchCurrentMember().then((member) => {
                if (member) {
                    // 3. Update Redux store
                    dispatch(setUser(member));
                    // 4. Redirect to home
                    router.replace("/");
                } else {
                    // Failed to fetch member, redirect to login
                    console.error("Failed to fetch member info after OAuth login");
                    router.replace("/login?error=oauth_failed");
                }
            });
        } else {
            // No access token found
            console.error("No access token found in OAuth callback");
            router.replace("/login?error=no_token");
        }
    }, [router, searchParams, dispatch]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">로그인 처리 중...</h2>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            </div>
        </div>
    );
}
