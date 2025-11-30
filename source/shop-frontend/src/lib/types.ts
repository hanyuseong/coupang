export interface Product {
  productId: number;
  name: string;
  price: number;
  discountPrice?: number;
  brand?: string;
  description?: string;
  thumbnail?: string;
  rating?: number;
  reviewCount?: number;
  deliveryType?: string;
  images?: string[];
}

export interface Category {
  categoryId: number;
  name: string;
  depth?: number;
  parentId?: number;
}

export interface CartItem {
  cartItemId: number;
  productId: number;
  productName: string;
  optionStockId?: number;
  quantity: number;
  price: number;
  createdAt?: string;
}

export interface Cart {
  cartItems: CartItem[];
  totalAmount: number;
  deliveryFee: number;
}

export interface Review {
  reviewId: number;
  productId: number;
  memberId?: number;
  rating: number;
  content: string;
  createdAt?: string;
}

export interface OrderItem {
  orderItemId: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  discountPrice?: number;
}

export interface Order {
  orderId: number;
  memberId?: number;
  items: OrderItem[];
  totalAmount: number;
  deliveryFee?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Member {
  memberId: number;
  email: string;
  name: string;
  phone?: string;
  status?: string;
}

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
};

export interface Promotion {
  id: number;
  title: string;
  description: string;
  bannerImage: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}
