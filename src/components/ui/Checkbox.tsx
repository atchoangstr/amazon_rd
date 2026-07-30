import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  "aria-label"?: string;
}

export function Checkbox({ checked, onChange, className, ...rest }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      className={cn(
        "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all duration-200",
        checked
          ? "border-cobalt-500 bg-cobalt-500 shadow-[0_0_0_4px_rgba(76,86,232,0.14)]"
          : "border-line bg-white/90 hover:border-ink-faint dark:border-line-dark dark:bg-surface-dark",
        className
      )}
      {...rest}
    >
      <Check
        className={cn(
          "h-3.5 w-3.5 text-white transition-all duration-200",
          checked ? "scale-100 opacity-100" : "scale-50 opacity-0"
        )}
        strokeWidth={3}
      />
    </button>
  );
}
