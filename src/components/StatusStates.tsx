import { SearchX } from "lucide-react";

export function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl2 border border-dashed border-line py-24 text-center dark:border-line-dark">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface dark:bg-surface-dark">
        <SearchX className="h-5 w-5 text-ink-faint" />
      </div>
      <div>
        <p className="font-display text-[18px] text-ink dark:text-ink-dark">No materials found</p>
        <p className="mt-1 text-[13px] text-ink-faint">
          Nothing matches "{query}". Try a name, code, or category.
        </p>
      </div>
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div className="space-y-12">
      {[0, 1].map((section) => (
        <div key={section}>
          <div className="mb-5 h-6 w-40 animate-pulse rounded bg-line dark:bg-line-dark" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl2 border border-line bg-surface p-3 dark:border-line-dark dark:bg-surface-dark"
              >
                <div className="aspect-square animate-pulse rounded-xl bg-line dark:bg-line-dark" />
                <div className="mt-3 h-3.5 w-3/4 animate-pulse rounded bg-line dark:bg-line-dark" />
                <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-line dark:bg-line-dark" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
