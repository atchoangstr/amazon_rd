import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PackageCheck, X } from "lucide-react";
import type { Material } from "../types/material";
import { AnimatedNumber } from "./ui/AnimatedNumber";
import { formatCurrency, formatWeight } from "../lib/utils";

interface SummaryPanelProps {
  selected: Material[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function SummaryPanel({ selected, onRemove, onClear }: SummaryPanelProps) {
  const totalCost = selected.reduce((sum, m) => sum + m.price, 0);
  const totalWeight = selected.reduce((sum, m) => sum + m.weight, 0);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-[19px] text-ink dark:text-ink-dark">Summary</h3>
        {selected.length > 0 && (
          <button
            onClick={onClear}
            className="text-[12px] font-medium text-ink-faint hover:text-cobalt-600"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="mt-4 flex-1 overflow-y-auto scrollbar-none">
        {selected.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2.5 rounded-xl2 border border-dashed border-line py-10 text-center dark:border-line-dark">
            <PackageCheck className="h-6 w-6 text-ink-faint" />
            <p className="max-w-[160px] text-[12.5px] leading-relaxed text-ink-faint">
              Select materials to build a cost estimate.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-1.5">
            <AnimatePresence initial={false}>
              {selected.map((m) => (
                <motion.li
                  key={m.id}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.18 }}
                  className="group flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 hover:bg-surface dark:hover:bg-surface-dark"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cobalt-500" />
                    <span className="truncate text-[13px] font-medium text-ink dark:text-ink-dark">
                      {m.name}
                      <span className="ml-1 text-ink-faint">· {m.color}</span>
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="font-mono text-[12px] text-ink-dim dark:text-ink-faint">
                      {formatCurrency(m.price)}
                    </span>
                    <button
                      onClick={() => onRemove(m.id)}
                      className="text-ink-faint opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
                      aria-label={`Remove ${m.name}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>

      <div className="mt-5 space-y-3 border-t border-line pt-4 dark:border-line-dark">
        <Row label="Total Items">
          <AnimatedNumber value={selected.length} className="font-mono text-[14px] font-medium" />
        </Row>
        <Row label="Material Cost">
          <AnimatedNumber
            value={totalCost}
            formatter={formatCurrency}
            className="font-mono text-[14px] font-medium"
          />
        </Row>
        <Row label="Total Weight">
          <AnimatedNumber
            value={totalWeight}
            formatter={(v) => formatWeight(Math.round(v))}
            className="font-mono text-[14px] font-medium"
          />
        </Row>

        <div className="mt-2 rounded-xl2 bg-ink px-4 py-3.5 dark:bg-cobalt-500">
          <p className="text-[11px] uppercase tracking-wider text-white/60">
            Estimated Product Cost
          </p>
          <AnimatedNumber
            value={totalCost}
            formatter={formatCurrency}
            className="font-display text-[26px] text-white"
          />
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px] text-ink-dim dark:text-ink-faint">{label}</span>
      {children}
    </div>
  );
}
