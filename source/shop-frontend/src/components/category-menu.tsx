import { Category } from "@/lib/types";

type CategoryMenuProps = {
  categories: Category[];
};

export function CategoryMenu({ categories }: CategoryMenuProps) {
  return (
    <section className="rounded-3xl bg-white p-4 shadow-floating">
      <div className="flex flex-wrap gap-3">
        {categories.slice(0, 12).map((category) => (
          <button
            key={category.categoryId}
            className="flex flex-1 min-w-[140px] items-center gap-3 rounded-2xl border border-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:border-coupang-blue/30 hover:bg-slate-50"
            type="button"
          >
            <div className="flex size-11 items-center justify-center rounded-2xl bg-coupang-gray text-coupang-blue">
              {category.name.slice(0, 2)}
            </div>
            <div>
              <p>{category.name}</p>
              <p className="text-xs text-slate-400">
                {category.depth === 1 ? "메인 카테고리" : "세부 카테고리"}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
