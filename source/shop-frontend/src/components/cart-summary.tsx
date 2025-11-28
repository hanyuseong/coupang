import Link from "next/link";
import { Cart } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

type CartSummaryProps = {
  cart: Cart;
};

export function CartSummary({ cart }: CartSummaryProps) {
  const items = cart.cartItems ?? [];
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount =
    cart.totalAmount ??
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cart.deliveryFee ?? 0;

  return (
    <section className="rounded-3xl bg-gradient-to-br from-white via-white to-coupang-gray p-5 shadow-floating">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-coupang-blue">장바구니</p>
          <h2 className="text-xl font-bold">오늘 담은 상품 {itemCount}개</h2>
          <p className="text-sm text-slate-500">
            로켓배송 상품은 오후 11시 이전 결제 시 내일 새벽 도착
          </p>
        </div>
        <Link
          href="/cart"
          className="text-sm font-semibold text-coupang-blue hover:underline"
        >
          전체 보기 →
        </Link>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {items.slice(0, 4).map((item) => (
          <div
            key={item.cartItemId}
            className="rounded-2xl border border-slate-100 bg-white px-4 py-3"
          >
            <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
              <p className="line-clamp-1">{item.productName}</p>
              <span className="text-xs text-slate-400">
                수량 {item.quantity}개
              </span>
            </div>
            <p className="text-lg font-bold text-coupang-blue">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-700">
        <span>상품금액 {formatCurrency(totalAmount)}</span>
        <span className="text-slate-400">+</span>
        <span>배송비 {formatCurrency(deliveryFee)}</span>
        <span className="text-slate-400">=</span>
        <span className="text-xl font-extrabold text-coupang-blue">
          결제예상 {formatCurrency(totalAmount + deliveryFee)}
        </span>
      </div>
    </section>
  );
}
