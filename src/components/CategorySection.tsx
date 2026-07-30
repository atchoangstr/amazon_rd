import type { Material } from "../types/material";
import { MaterialCard } from "./MaterialCard";

interface CategorySectionProps {
  title: string;
  eyebrow: string;
  materials: Material[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
}

export function CategorySection({
  title,
  eyebrow,
  materials,
  selectedIds,
  onToggle,
}: CategorySectionProps) {
  if (materials.length === 0) return null;

  return (
    <section id={title} className="scroll-mt-28">
      <div className="mb-5 flex items-baseline gap-3">
        <h2 className="font-display text-[26px] font-medium text-ink dark:text-ink-dark">
          {title}
        </h2>
        <span className="font-mono text-[12px] text-ink-faint">
          {eyebrow} · {materials.length}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {materials.map((material) => (
          <MaterialCard
            key={material.id}
            material={material}
            selected={selectedIds.has(material.id)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </section>
  );
}
