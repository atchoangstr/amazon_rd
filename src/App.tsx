import { useEffect, useMemo, useState } from "react";
import rawMaterials from "./data/materials.json";
import { CATEGORY_ORDER, type Material } from "./types/material";
import { Sidebar } from "./components/Sidebar";
import { SearchBar } from "./components/SearchBar";
import { CategorySection } from "./components/CategorySection";
import { SummaryPanel } from "./components/SummaryPanel";
import { MobileSummaryDrawer } from "./components/MobileSummaryDrawer";
import { EmptyState, SkeletonGrid } from "./components/StatusStates";

const materials = rawMaterials as Material[];

const CATEGORY_EYEBROW: Record<string, string> = {
  "Blank Products": "Ornaments & Chimes",
  "Key Rings & Charms": "Hardware",
  Cards: "Paper Goods",
  "Gift Boxes": "Packaging",
};

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return materials;
    return materials.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.code.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
    );
  }, [query]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const cat of CATEGORY_ORDER) c[cat] = materials.filter((m) => m.category === cat).length;
    return c;
  }, []);

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectedMaterials = useMemo(
    () => materials.filter((m) => selectedIds.has(m.id)),
    [selectedIds]
  );

  return (
    <div className="flex min-h-screen bg-paper dark:bg-paper-dark">
      <Sidebar
        counts={counts}
        darkMode={darkMode}
        onToggleDarkMode={setDarkMode}
        totalMaterials={materials.length}
      />

      <main className="flex-1 px-6 pb-16 lg:px-10">
        <SearchBar value={query} onChange={setQuery} resultCount={filtered.length} />

        <div className="mt-8">
          {loading ? (
            <SkeletonGrid />
          ) : filtered.length === 0 ? (
            <EmptyState query={query} />
          ) : (
            <div className="space-y-14">
              {CATEGORY_ORDER.map((category) => (
                <CategorySection
                  key={category}
                  title={category}
                  eyebrow={CATEGORY_EYEBROW[category]}
                  materials={filtered.filter((m) => m.category === category)}
                  selectedIds={selectedIds}
                  onToggle={toggle}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <aside className="sticky top-0 hidden h-screen w-[300px] shrink-0 border-l border-line bg-paper px-5 py-6 dark:border-line-dark dark:bg-paper-dark lg:block">
        <SummaryPanel
          selected={selectedMaterials}
          onRemove={toggle}
          onClear={() => setSelectedIds(new Set())}
        />
      </aside>

      <MobileSummaryDrawer
        selected={selectedMaterials}
        onRemove={toggle}
        onClear={() => setSelectedIds(new Set())}
      />
    </div>
  );
}
