import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Backend Login API Call
        const backendResponse = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!backendResponse.ok) {
            return NextResponse.json(
                { success: false, message: "Login failed" },
                { status: backendResponse.status }
            );
        }

        const data = await backendResponse.json();

        if (data.success && data.data.accessToken) {
            const { accessToken, refreshToken } = data.data;

            // Set HttpOnly Cookie
            cookies().set("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                path: "/",
                sameSite: "lax",
                // maxAge: 60 * 60, // 1 hour (Optional: match token expiration)
            });

            // Refresh token is already set by backend if it does? 
            // Actually backend sets refreshToken on response? 
            // Wait, the backend code `OAuth2AuthenticationSuccessHandler` sets refreshToken cookie.
            // But for normal login `/api/auth/login`, usually it returns JSON.
            // If backend returns refreshToken in JSON, we can set it here too if we want.
            // For now, let's stick to accessToken for server fetching.

            return NextResponse.json({ success: true, data: { accessToken, refreshToken } });
        }

        return NextResponse.json({ success: false, message: "Invalid response" }, { status: 400 });
    } catch (error) {
        console.error("Login route error:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
