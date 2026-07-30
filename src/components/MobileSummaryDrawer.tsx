import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, X } from "lucide-react";
import type { Material } from "../types/material";
import { formatCurrency } from "../lib/utils";
import { SummaryPanel } from "./SummaryPanel";

interface MobileSummaryDrawerProps {
  selected: Material[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function MobileSummaryDrawer({ selected, onRemove, onClear }: MobileSummaryDrawerProps) {
  const [open, setOpen] = useState(false);
  const totalCost = selected.reduce((sum, m) => sum + m.price, 0);

  return (
    <div className="lg:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[75vh] rounded-t-[24px] border-t border-line bg-paper px-5 pb-6 pt-4 shadow-popup dark:border-line-dark dark:bg-paper-dark"
          >
            <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-line dark:bg-line-dark" />
            <button
              onClick={() => setOpen(false)}
              className="absolute right-5 top-4 text-ink-faint"
              aria-label="Close summary"
            >
              <X className="h-5 w-5" />
            </button>
            <SummaryPanel selected={selected} onRemove={onRemove} onClear={onClear} />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(true)}
        className="fixed inset-x-4 bottom-4 z-30 flex items-center justify-between rounded-xl2 bg-ink px-5 py-3.5 shadow-popup dark:bg-cobalt-500"
      >
        <span className="flex items-center gap-2 text-[13px] font-medium text-white">
          <ChevronUp className="h-4 w-4" />
          {selected.length} selected
        </span>
        <span className="font-display text-[17px] text-white">{formatCurrency(totalCost)}</span>
      </button>
    </div>
  );
}
