import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { accessToken } = body;

        if (!accessToken) {
            return NextResponse.json({ success: false, message: "No token provided" }, { status: 400 });
        }

        // Set HttpOnly Cookie
        cookies().set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax",
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Set token route error:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
