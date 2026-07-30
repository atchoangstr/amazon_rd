import { Boxes, Gem, Layers, MailOpen, Moon, PackageSearch, Sun } from "lucide-react";
import { cn } from "../lib/utils";
import { Switch } from "./ui/Switch";

const NAV_ITEMS = [
  { label: "Blank Products", icon: Layers },
  { label: "Key Rings & Charms", icon: Gem },
  { label: "Cards", icon: MailOpen },
  { label: "Gift Boxes", icon: Boxes },
];

interface SidebarProps {
  counts: Record<string, number>;
  darkMode: boolean;
  onToggleDarkMode: (value: boolean) => void;
  totalMaterials: number;
}

export function Sidebar({ counts, darkMode, onToggleDarkMode, totalMaterials }: SidebarProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside className="hidden w-[248px] shrink-0 flex-col border-r border-line bg-paper px-5 py-6 dark:border-line-dark dark:bg-paper-dark lg:flex">
      <div className="flex items-center gap-2.5 px-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-paper dark:bg-cobalt-500">
          <PackageSearch className="h-4 w-4" />
        </div>
        <div>
          <p className="font-display text-[15px] leading-none text-ink dark:text-ink-dark">
            Material Library
          </p>
          <p className="mt-1 text-[11px] leading-none text-ink-faint">
            {totalMaterials} SKUs · POD Studio
          </p>
        </div>
      </div>

      <nav className="mt-8 flex flex-col gap-1">
        <p className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wider text-ink-faint">
          Categories
        </p>
        {NAV_ITEMS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => scrollTo(label)}
            className={cn(
              "group flex items-center justify-between rounded-lg px-3 py-2 text-left text-[13.5px] font-medium text-ink-dim transition-colors hover:bg-surface hover:text-ink dark:text-ink-faint dark:hover:bg-surface-dark dark:hover:text-ink-dark"
            )}
          >
            <span className="flex items-center gap-2.5">
              <Icon className="h-4 w-4 text-ink-faint group-hover:text-cobalt-500" />
              {label}
            </span>
            <span className="font-mono text-[11px] text-ink-faint">{counts[label] ?? 0}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto flex items-center justify-between rounded-xl2 border border-line bg-surface px-3.5 py-3 dark:border-line-dark dark:bg-surface-dark">
        <span className="flex items-center gap-2 text-[13px] font-medium text-ink dark:text-ink-dark">
          {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          {darkMode ? "Dark mode" : "Light mode"}
        </span>
        <Switch checked={darkMode} onChange={onToggleDarkMode} />
      </div>
    </aside>
  );
}
