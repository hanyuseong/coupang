"use client";

import { SearchBar } from "./search-bar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchCurrentMember } from "@/lib/member-api";
import { Member } from "@/lib/types";

type SiteHeaderProps = {
  suggestionKeywords: string[];
  recommendedKeywords?: string[];
  cartCount: number;
  initialIsLoggedIn?: boolean;
  initialUserName?: string;
};

export function SiteHeader({
  suggestionKeywords,
  recommendedKeywords = [],
  cartCount,
  initialIsLoggedIn = false,
  initialUserName = "",
}: SiteHeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [userName, setUserName] = useState(initialUserName);

  useEffect(() => {
    const loadUser = async () => {
      const member = await fetchCurrentMember();
      if (member) {
        setIsLoggedIn(true);
        setUserName(member.name);
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    };
    loadUser();
  }, []);

  return (
    <header className="w-full border-b border-white/40 bg-gradient-to-r from-coupang-blue via-coupang-blue to-coupang-navy pb-6 pt-4 text-white shadow-floating">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-coupang-blue">
                WOW
              </span>
              <p className="text-xs text-white/80">새벽 7시 도착 · 로켓배송 전용관</p>
            </div>
            <Link href="/" className="text-3xl font-extrabold tracking-tight hover:opacity-90">
              Coupang Style
            </Link>
          </div>

          <div className="hidden flex-col items-end gap-2 text-sm font-medium lg:flex">
            {/* 로그인 상태 표시 영역 */}
            <div className="text-sm text-white/90">
              {isLoggedIn ? (
                <span className="font-medium">{userName}님 환영합니다.</span>
              ) : (
                <Link href="/login" className="hover:underline">
                  로그인 해주세요
                </Link>
              )}
            </div>

            {/* 네비게이션 메뉴 */}
            <div className="flex items-center gap-6">
              <Link href="/login" className="flex flex-col items-center gap-1 text-white/80">
                <span className="rounded-lg bg-white/15 px-2 py-1 text-[10px]">주문</span>
                <span>마이쿠팡</span>
              </Link>
              <button className="flex flex-col items-center gap-1 text-white/80">
                <span className="rounded-lg bg-white/15 px-2 py-1 text-[10px]">혜택</span>
                <span>이벤트</span>
              </button>
              <Link
                href="/cart"
                className="relative flex flex-col items-center gap-1 text-white"
              >
                <span className="rounded-lg bg-white/15 px-2 py-1 text-[10px]">장바구니</span>
                <span>Cart</span>
                <span className="absolute -right-2 -top-2 rounded-full bg-coupang-red px-2 text-xs font-bold">
                  {cartCount}
                </span>
              </Link>
            </div>
          </div>
        </div>

        <SearchBar suggestions={suggestionKeywords} />

        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
          {recommendedKeywords.map((keyword) => (
            <Link
              key={keyword}
              href={`/search?keyword=${encodeURIComponent(keyword)}`}
              className="rounded-full border border-white/30 px-3 py-1 text-white/90 transition hover:bg-white/10"
            >
              #{keyword}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
