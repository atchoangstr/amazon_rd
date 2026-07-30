import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  return (
    <div className="sticky top-0 z-40 -mx-6 border-b border-line bg-paper/85 px-6 py-4 backdrop-blur-md dark:border-line-dark dark:bg-paper-dark/85 lg:-mx-10 lg:px-10">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search by name, code, or category…"
            className="w-full rounded-xl2 border border-line bg-surface py-2.5 pl-10 pr-9 text-[14px] text-ink placeholder:text-ink-faint focus:border-cobalt-500 focus:outline-none focus:ring-4 focus:ring-cobalt-100 dark:border-line-dark dark:bg-surface-dark dark:text-ink-dark dark:focus:ring-cobalt-500/20"
          />
          {value && (
            <button
              onClick={() => onChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink dark:hover:text-ink-dark"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {value && (
          <p className="hidden shrink-0 text-[13px] text-ink-dim dark:text-ink-faint sm:block">
            {resultCount} {resultCount === 1 ? "result" : "results"}
          </p>
        )}
      </div>
    </div>
  );
}
