import { Review } from "@/lib/types";

type ReviewHighlightProps = {
  reviews: Review[];
};

export function ReviewHighlight({ reviews }: ReviewHighlightProps) {
  if (!reviews.length) return null;

  return (
    <section className="rounded-3xl bg-white p-5 shadow-floating">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-coupang-blue">실시간 리뷰</p>
          <h2 className="text-xl font-bold">와우회원 생생후기</h2>
        </div>
        <button className="text-sm font-semibold text-coupang-blue">
          리뷰 더보기 →
        </button>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {reviews.slice(0, 3).map((review) => (
          <article
            key={review.reviewId}
            className="flex flex-col rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm"
          >
            <div className="flex items-center gap-1 text-coupang-blue">
              {"★".repeat(review.rating).padEnd(5, "☆")}
            </div>
            <p className="mt-2 line-clamp-3 text-slate-700">{review.content}</p>
            <div className="mt-auto pt-3 text-xs text-slate-400">
              {new Date(review.createdAt ?? Date.now()).toLocaleString("ko-KR", {
                month: "short",
                day: "numeric",
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
