import type { ReactNode } from "react";

export function PhoneMockup({
  children,
  className = "",
  label,
}: {
  children?: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[280px] ${className}`}
      role="img"
      aria-label={label}
    >
      <div className="relative rounded-[2.5rem] border-[10px] border-ink bg-ink shadow-glow dark:border-neutral-800">
        {/* notch */}
        <div className="absolute left-1/2 top-0 z-10 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-ink dark:bg-neutral-800" />
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.9rem] bg-paper dark:bg-[#1F1F1F]">
          {children}
        </div>
      </div>
    </div>
  );
}

export function ScreenPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <div className="flex items-center justify-between">
        <div className="h-2.5 w-16 rounded-full bg-brand-200 dark:bg-brand-900" />
        <div className="h-6 w-6 rounded-full bg-accent/30" />
      </div>
      <div className="rounded-2xl bg-brand-50 p-3 dark:bg-brand-900/30">
        <div className="mb-2 h-2 w-20 rounded-full bg-brand-300 dark:bg-brand-700" />
        <div className="flex items-end gap-1.5">
          {[40, 65, 30, 80, 55, 70, 45].map((h, i) => (
            <div
              key={i}
              className="w-full rounded-t bg-gradient-to-t from-brand-400 to-brand-300"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>
      <div className="flex-1 space-y-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2 rounded-xl bg-[rgb(var(--card))] p-2 shadow-sm">
            <div className="h-8 w-8 rounded-lg bg-accent/20" />
            <div className="flex-1 space-y-1">
              <div className="h-2 w-2/3 rounded-full bg-[rgb(var(--border))]" />
              <div className="h-2 w-1/3 rounded-full bg-[rgb(var(--border))]" />
            </div>
            <div className="h-5 w-8 rounded-full bg-gl-low/20" />
          </div>
        ))}
      </div>
      <div className="mt-auto text-center text-[10px] uppercase tracking-wider text-muted">
        {label}
      </div>
    </div>
  );
}
