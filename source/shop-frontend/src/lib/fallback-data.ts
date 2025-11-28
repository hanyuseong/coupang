import { Cart, Category, Order, Product, Review } from "./types";

export const fallbackProducts: Product[] = [
  {
    productId: 1001,
    name: "로켓프레시 제주 노지 감귤 3kg",
    brand: "쿠팡프레시",
    price: 18900,
    discountPrice: 14900,
    rating: 4.8,
    reviewCount: 1250,
    thumbnail:
      "https://images.unsplash.com/photo-1437750769465-301382cdf094?auto=format&fit=crop&w=600&q=80",
    deliveryType: "ROCKET_FRESH",
  },
  {
    productId: 1002,
    name: "아이폰 16 프로 맥스 256GB",
    brand: "Apple",
    price: 1990000,
    discountPrice: 1899000,
    rating: 4.9,
    reviewCount: 812,
    thumbnail:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    deliveryType: "ROCKET",
  },
  {
    productId: 1003,
    name: "삼성 비스포크 제트 봇 AI 로봇청소기",
    brand: "Samsung",
    price: 1489000,
    discountPrice: 1199000,
    rating: 4.7,
    reviewCount: 421,
    thumbnail:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
    deliveryType: "ROCKET",
  },
  {
    productId: 1004,
    name: "LG 올레드 C4 65인치",
    brand: "LG",
    price: 2790000,
    discountPrice: 2390000,
    rating: 4.85,
    reviewCount: 367,
    thumbnail:
      "https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=600&q=80",
    deliveryType: "ROCKET",
  },
  {
    productId: 1005,
    name: "쿠팡 와우 에코백",
    brand: "쿠팡",
    price: 12900,
    discountPrice: 8900,
    rating: 4.6,
    reviewCount: 542,
    thumbnail:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    deliveryType: "ROCKET",
  },
  {
    productId: 1006,
    name: "브리타 막시트라 플러스 정수기 세트",
    brand: "BRITA",
    price: 79000,
    discountPrice: 64900,
    rating: 4.75,
    reviewCount: 1888,
    thumbnail:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80",
    deliveryType: "ROCKET",
  },
];

export const fallbackCategories: Category[] = [
  { categoryId: 1, name: "로켓배송", depth: 1 },
  { categoryId: 2, name: "로켓프레시", depth: 1 },
  { categoryId: 3, name: "쿠팡비즈", depth: 1 },
  { categoryId: 4, name: "가전디지털", depth: 1 },
  { categoryId: 5, name: "패션의류", depth: 1 },
  { categoryId: 6, name: "뷰티", depth: 1 },
  { categoryId: 7, name: "생활주방", depth: 1 },
  { categoryId: 8, name: "출산유아동", depth: 1 },
  { categoryId: 9, name: "스포츠레저", depth: 1 },
  { categoryId: 10, name: "도서문구", depth: 1 },
];

export const fallbackCart: Cart = {
  cartItems: [],
  totalAmount: 0,
  deliveryFee: 0,
};

export const fallbackReviews: Review[] = [
  {
    reviewId: 1,
    productId: 1001,
    memberId: 100,
    rating: 5,
    content: "로켓프레시로 새벽에 도착해서 바로 먹었어요. 당도 최고!",
    createdAt: new Date().toISOString(),
  },
  {
    reviewId: 2,
    productId: 1002,
    memberId: 101,
    rating: 4,
    content:
      "주문 다음 날 바로 받았습니다. 쿠팡에서 사니 사후관리도 편한 듯 해요.",
    createdAt: new Date().toISOString(),
  },
  {
    reviewId: 3,
    productId: 1003,
    memberId: 102,
    rating: 5,
    content: "청소 스케줄 관리가 편해서 집안일 시간이 확 줄었어요.",
    createdAt: new Date().toISOString(),
  },
];

export const fallbackOrders: Order[] = [
  {
    orderId: 5001,
    totalAmount: 89200,
    deliveryFee: 0,
    createdAt: new Date().toISOString(),
    items: [
      {
        orderItemId: 1,
        productId: 1001,
        productName: "제주 노지 감귤 3kg",
        quantity: 1,
        price: 14900,
      },
      {
        orderItemId: 2,
        productId: 1006,
        productName: "브리타 정수기 세트",
        quantity: 1,
        price: 64900,
      },
    ],
  },
];
