import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Material } from "../types/material";
import { cn, formatCurrency } from "../lib/utils";
import { Checkbox } from "./ui/Checkbox";
import { HoverPopup } from "./HoverPopup";

interface MaterialCardProps {
  material: Material;
  selected: boolean;
  onToggle: (id: string) => void;
}

export function MaterialCard({ material, selected, onToggle }: MaterialCardProps) {
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.button
        type="button"
        onClick={() => onToggle(material.id)}
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        className={cn(
          "group relative w-full rounded-xl2 border bg-surface p-3 text-left shadow-card transition-shadow duration-200 hover:shadow-card-hover dark:bg-surface-dark",
          selected
            ? "border-cobalt-500 bg-cobalt-50/60 dark:bg-cobalt-500/10"
            : "border-line dark:border-line-dark"
        )}
      >
        <div className="relative aspect-square overflow-hidden rounded-xl bg-line/40 dark:bg-line-dark/40">
          {!loaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-line to-line/40 dark:from-line-dark dark:to-line-dark/40" />
          )}
          <img
            src={material.image}
            alt={material.name}
            onLoad={() => setLoaded(true)}
            className={cn(
              "h-full w-full object-cover transition-opacity duration-300",
              loaded ? "opacity-100" : "opacity-0"
            )}
            loading="lazy"
          />

          <div className="absolute left-2.5 top-2.5">
            <Checkbox
              checked={selected}
              onChange={() => onToggle(material.id)}
              aria-label={`Select ${material.name}`}
            />
          </div>

          <div className="absolute right-2.5 top-2.5 rounded-full bg-ink/85 px-2.5 py-1 font-mono text-[11px] font-medium text-white backdrop-blur-sm dark:bg-white/90 dark:text-ink">
            {formatCurrency(material.price)}
          </div>
        </div>

        <div className="mt-3 flex items-start justify-between gap-2 px-0.5">
          <div className="min-w-0">
            <p className="truncate text-[14px] font-medium leading-tight text-ink dark:text-ink-dark">
              {material.name}
            </p>
            <p className="mt-0.5 truncate text-[12px] text-ink-dim dark:text-ink-faint">
              {material.color}
            </p>
          </div>
          <p className="shrink-0 font-mono text-[11px] text-ink-faint">{material.code}</p>
        </div>
      </motion.button>

      <AnimatePresence>
        {hovered && <HoverPopup material={material} />}
      </AnimatePresence>
    </div>
  );
}
