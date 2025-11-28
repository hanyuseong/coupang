import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "한스 스타일 상점 | Shop Frontend",
  description:
    "한스 감성의 UI로 상품 탐색, 장바구니, 주문 현황을 한 눈에 확인할 수 있는 Next.js 쇼핑몰 프론트엔드",
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSans.variable} font-sans`}>{children}</body>
    </html>
  );
}
