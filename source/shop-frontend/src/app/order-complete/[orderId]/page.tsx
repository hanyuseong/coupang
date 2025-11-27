"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function OrderCompletePage() {
    const params = useParams();
    const router = useRouter();
    const orderId = params.orderId as string;
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        // 5초 후 홈으로 자동 이동
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push("/");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* 성공 애니메이션 */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
                    {/* 체크 마크 아이콘 */}
                    <div className="mb-6 flex justify-center">
                        <div className="relative">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                                <svg
                                    className="w-12 h-12 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            {/* 반짝이는 효과 */}
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-400 rounded-full animate-ping opacity-75 animation-delay-300"></div>
                        </div>
                    </div>

                    {/* 메시지 */}
                    <h1 className="text-3xl font-extrabold text-slate-800 mb-3">
                        결제 완료!
                    </h1>
                    <p className="text-lg text-slate-600 mb-2">
                        주문이 성공적으로 완료되었습니다.
                    </p>
                    <p className="text-sm text-slate-500 mb-6">
                        주문번호: <span className="font-mono font-semibold text-coupang-blue">#{orderId}</span>
                    </p>

                    {/* 주문 정보 안내 */}
                    <div className="bg-blue-50 rounded-xl p-4 mb-6">
                        <div className="flex items-start gap-3">
                            <svg
                                className="w-6 h-6 text-coupang-blue flex-shrink-0 mt-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <div className="text-left">
                                <p className="text-sm font-semibold text-slate-700 mb-1">
                                    이것은 Mockup 결제입니다
                                </p>
                                <p className="text-xs text-slate-600">
                                    실제 결제가 진행되지 않았으며, 주문 데이터만 저장되었습니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 자동 이동 안내 */}
                    <div className="mb-6">
                        <p className="text-sm text-slate-500">
                            {countdown}초 후 자동으로 홈으로 이동합니다...
                        </p>
                        <div className="mt-3 w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-coupang-blue h-full transition-all duration-1000 ease-linear"
                                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* 버튼들 */}
                    <div className="space-y-3">
                        <Link
                            href="/orders"
                            className="block w-full py-3 px-6 bg-coupang-blue text-white font-bold rounded-lg hover:bg-coupang-navy transition shadow-md"
                        >
                            주문 내역 확인
                        </Link>
                        <Link
                            href="/"
                            className="block w-full py-3 px-6 bg-white text-coupang-blue font-semibold rounded-lg border-2 border-coupang-blue hover:bg-blue-50 transition"
                        >
                            쇼핑 계속하기
                        </Link>
                    </div>
                </div>

                {/* 추가 정보 카드 */}
                <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                    <h2 className="text-lg font-bold text-slate-800 mb-3">다음 단계</h2>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">✓</span>
                            <span>주문 확인 이메일이 발송됩니다</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">✓</span>
                            <span>상품 준비 후 배송이 시작됩니다</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">✓</span>
                            <span>배송 현황은 주문 내역에서 확인하세요</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
