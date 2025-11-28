"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signup } from "@/lib/api";

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        phone: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await signup(formData);
            if (response) {
                router.push("/login?registered=true");
            } else {
                setError("회원가입 중 오류가 발생했습니다.");
            }
        } catch (err) {
            setError("회원가입 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <Link href="/" className="text-3xl font-extrabold tracking-tight text-coupang-blue">
                        Hans
                    </Link>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                        회원가입
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                이메일 주소
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="relative block w-full rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-coupang-blue sm:text-sm sm:leading-6"
                                placeholder="이메일 주소"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                비밀번호
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                minLength={8}
                                value={formData.password}
                                onChange={handleChange}
                                className="relative block w-full rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-coupang-blue sm:text-sm sm:leading-6"
                                placeholder="비밀번호 (최소 8자)"
                            />
                        </div>
                        <div>
                            <label htmlFor="name" className="sr-only">
                                이름
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="relative block w-full rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-coupang-blue sm:text-sm sm:leading-6"
                                placeholder="이름"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="sr-only">
                                전화번호
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                autoComplete="tel"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="relative block w-full rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-coupang-blue sm:text-sm sm:leading-6"
                                placeholder="전화번호"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-center text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full justify-center rounded-md bg-coupang-blue px-3 py-3 text-sm font-semibold text-white hover:bg-coupang-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coupang-blue disabled:opacity-50"
                        >
                            {loading ? "회원가입 중..." : "회원가입"}
                        </button>
                    </div>

                    <div className="text-center text-sm">
                        <span className="text-gray-600">이미 계정이 있으신가요? </span>
                        <Link href="/login" className="font-semibold text-coupang-blue hover:text-coupang-navy">
                            로그인
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
