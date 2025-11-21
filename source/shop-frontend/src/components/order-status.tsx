import { Order } from "@/lib/types";
import { formatCurrency, formatDateLabel } from "@/lib/utils";

type OrderStatusProps = {
  orders: Order[];
};

const statusSteps = ["결제완료", "상품준비중", "배송중", "배송완료"];

export function OrderStatus({ orders }: OrderStatusProps) {
  if (!orders || orders.length === 0) return null;

  return (
    <section className="rounded-3xl bg-white p-5 shadow-floating">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-coupang-blue">주문현황</p>
          <h2 className="text-xl font-bold text-slate-900">최근 주문 추적</h2>
        </div>
        <button className="text-sm font-semibold text-coupang-blue">
          주문 상세보기 →
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {orders.slice(0, 2).map((order, orderIndex) => {
          const stepIndex = orderIndex % statusSteps.length;
          const items = order.items ?? [];
          const firstItem = items[0]?.productName ?? "주문상품";
          const extraCount = Math.max(0, items.length - 1);
          return (
            <article
              key={order.orderId}
              className="rounded-2xl border border-slate-100 p-4"
            >
              <div className="flex flex-wrap items-center justify-between text-sm font-semibold text-slate-700">
                <span>주문번호 #{order.orderId}</span>
                <span>{formatDateLabel(order.createdAt)}</span>
              </div>

              <p className="mt-2 text-lg font-bold text-slate-900">
                {firstItem}
                {extraCount > 0 ? ` 외 ${extraCount}건` : ""}
              </p>
              <p className="text-sm text-slate-500">
                결제금액 {formatCurrency(order.totalAmount ?? 0)}
              </p>

              <div className="mt-4 flex items-center gap-2">
                {statusSteps.map((step, idx) => (
                  <div key={step} className="flex items-center gap-2">
                    <div
                      className={`size-8 rounded-full border-2 text-xs font-bold ${
                        idx <= stepIndex
                          ? "border-coupang-blue bg-coupang-blue text-white"
                          : "border-slate-200 text-slate-400"
                      } flex items-center justify-center`}
                    >
                      {idx + 1}
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        idx <= stepIndex ? "text-coupang-blue" : "text-slate-400"
                      }`}
                    >
                      {step}
                    </span>
                    {idx < statusSteps.length - 1 && (
                      <div className="h-px w-6 bg-slate-200" />
                    )}
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
