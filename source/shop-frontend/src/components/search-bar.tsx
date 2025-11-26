"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type SearchBarProps = {
  suggestions: string[];
};

export function SearchBar({ suggestions }: SearchBarProps) {
  const [keyword, setKeyword] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    setIsExpanded(false);
    if (keyword.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const matches = useMemo(() => {
    if (!keyword) return suggestions.slice(0, 5);
    return suggestions
      .filter((name) => name.toLowerCase().includes(keyword.toLowerCase()))
      .slice(0, 5);
  }, [keyword, suggestions]);

  return (
    <div className="relative w-full max-w-2xl">
      <div className="flex items-center rounded-full border border-coupang-blue/30 bg-white shadow-sm focus-within:border-coupang-blue focus-within:ring-2 focus-within:ring-coupang-blue/30">
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsExpanded(true)}
          onBlur={() => setTimeout(() => setIsExpanded(false), 200)}
          className="flex-1 rounded-l-full border-0 bg-transparent px-5 py-3 text-sm text-black outline-none placeholder:text-slate-400"
          placeholder="검색어를 입력하세요 (예: 로켓프레시, 생활가전, 와우할인)"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="mr-1 flex size-11 items-center justify-center rounded-full bg-coupang-blue text-white transition hover:bg-coupang-navy"
          aria-label="검색"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="size-5"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m16.5 16.5 4 4" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {isExpanded && matches.length > 0 && (
        <div className="absolute left-0 right-0 top-[110%] rounded-2xl border border-slate-100 bg-white p-3 shadow-xl">
          <p className="px-3 pb-2 text-xs font-semibold text-slate-400">
            실시간 인기 검색어
          </p>
          <ul className="space-y-1 text-sm font-medium text-slate-700">
            {matches.map((term, index) => (
              <li
                key={`${term}-${index}`}
                className="flex items-center justify-between rounded-xl px-3 py-1 hover:bg-slate-50"
              >
                <span className="text-coupang-blue">{String(index + 1).padStart(2, "0")}</span>
                <span className="flex-1 px-2">{term}</span>
                <span className="text-xs text-slate-400">급상승</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
