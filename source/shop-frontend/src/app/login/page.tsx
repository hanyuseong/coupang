"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/lib/features/authSlice";
import { login } from "@/lib/api";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(email, password);
      if (response && response.accessToken) {
        // Dispatch to Redux
        dispatch(setAccessToken(response.accessToken));

        // Ensure localStorage is clean
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
        router.refresh();
      } else {
        setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (err) {
      setError("로그인 중 오류가 발생했습니다.");
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
            로그인
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                이메일 주소
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full rounded-t-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-coupang-blue sm:text-sm sm:leading-6"
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
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full rounded-b-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-coupang-blue sm:text-sm sm:leading-6"
                placeholder="비밀번호"
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
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-50 px-2 text-gray-500">또는 소셜 로그인</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <a
              href="http://localhost:8080/oauth2/authorization/google"
              className="flex w-full items-center justify-center rounded-md bg-white border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google 로그인
            </a>

            <a
              href="http://localhost:8080/oauth2/authorization/naver"
              className="flex w-full items-center justify-center rounded-md bg-[#03C75A] px-3 py-2 text-sm font-medium text-white hover:bg-[#02b351]"
            >
              <span className="font-bold mr-2">N</span> Naver 로그인
            </a>

            <a
              href="http://localhost:8080/oauth2/authorization/kakao"
              className="flex w-full items-center justify-center rounded-md bg-[#FEE500] px-3 py-2 text-sm font-medium text-[#000000] hover:bg-[#E6CF00]"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C5.9 3 1 6.9 1 11.8c0 2.9 1.7 5.5 4.5 7.1-.2.8-1.5 5.4-1.5 5.7 0 0-.1.2.1.2.1 0 .2 0 .2-.1 3.5-2.4 5-3.4 5.2-3.5.5.1 1 .1 1.5.1 6.1 0 11-3.9 11-8.8C23 6.9 18.1 3 12 3z" />
              </svg>
              Kakao 로그인
            </a>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-600">계정이 없으신가요? </span>
            <Link href="/signup" className="font-semibold text-coupang-blue hover:text-coupang-navy">
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
