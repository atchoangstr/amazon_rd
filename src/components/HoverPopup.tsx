import { motion } from "framer-motion";
import type { Material } from "../types/material";
import { formatCurrency, formatWeight } from "../lib/utils";

const swatchColor = (color: string) => {
  const map: Record<string, string> = {
    gold: "#C9A24B",
    silver: "#C6C9CE",
    black: "#26262A",
    white: "#F3F2EE",
    clear: "#DCE8EA",
    ivory: "#F1EADB",
    bronze: "#8C5A34",
    "rose gold": "#E3A79A",
  };
  const key = color.toLowerCase();
  const found = Object.keys(map).find((k) => key.includes(k));
  return found ? map[found] : "#B9BCC4";
};

export function HoverPopup({ material }: { material: Material }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      className="glass pointer-events-none absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 rounded-xl2 border border-white/60 p-4 shadow-popup dark:border-white/10"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] tracking-wide text-ink-dim dark:text-ink-faint">
            {material.code}
          </p>
          <h4 className="font-display text-lg leading-snug text-ink dark:text-ink-dark">
            {material.name}
          </h4>
        </div>
        <span
          className="mt-1 h-4 w-4 shrink-0 rounded-full border border-black/10"
          style={{ backgroundColor: swatchColor(material.color) }}
        />
      </div>

      <p className="mt-2 text-[13px] leading-relaxed text-ink-dim dark:text-ink-faint">
        {material.description}
      </p>

      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-line/70 pt-3 text-[13px] dark:border-line-dark/70">
        <SpecRow label="Category" value={material.category} />
        <SpecRow label="Color" value={material.color} />
        <SpecRow label="Size" value={material.size} />
        <SpecRow label="Weight" value={formatWeight(material.weight)} />
        <SpecRow label="Cost" value={formatCurrency(material.price)} accent />
      </div>
    </motion.div>
  );
}

function SpecRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-ink-faint">{label}</p>
      <p
        className={
          accent
            ? "font-mono font-medium text-kiln-600 dark:text-kiln-400"
            : "font-medium text-ink dark:text-ink-dark"
        }
      >
        {value}
      </p>
    </div>
  );
}
