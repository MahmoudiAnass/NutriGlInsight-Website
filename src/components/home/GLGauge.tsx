"use client";

import { motion, useReducedMotion } from "framer-motion";

type GaugeLabels = {
  label: string;
  low: string;
  medium: string;
  high: string;
  caption: string;
};

// Semi-circular instrument gauge (180deg -> 0deg).
const cx = 130;
const cy = 122;
const r = 96;
const circumference = Math.PI * r;

// Needle target ~20% into the scale — a healthy "low" reading.
const value = 0.2;
const angle = 180 - value * 180;
const rad = (angle * Math.PI) / 180;
const needleLen = r - 22;
const needleX = cx + Math.cos(rad) * needleLen;
const needleY = cy - Math.sin(rad) * needleLen;

// Tick marks around the arc for an instrument feel.
const ticks = Array.from({ length: 11 }, (_, i) => {
  const a = (Math.PI * i) / 10; // 0..PI (left -> right)
  const major = i % 5 === 0;
  const inner = r + 11;
  const outer = r + (major ? 21 : 16);
  return {
    x1: cx - Math.cos(a) * inner,
    y1: cy - Math.sin(a) * inner,
    x2: cx - Math.cos(a) * outer,
    y2: cy - Math.sin(a) * outer,
    major,
  };
});

export function GLGauge({ labels }: { labels: GaugeLabels }) {
  const reduce = useReducedMotion();

  const segments = [
    {
      label: labels.low,
      range: "\u2264 10",
      icon: "fa-leaf",
      wrap: "ring-2 ring-gl-low/40 bg-gl-low/[0.06]",
      dot: "bg-gl-low/15 text-gl-low",
      text: "text-gl-low",
    },
    {
      label: labels.medium,
      range: "11\u201319",
      icon: "fa-gauge-high",
      wrap: "border border-[rgb(var(--border))] bg-[rgb(var(--background))]",
      dot: "bg-gl-medium/15 text-gl-medium",
      text: "text-[rgb(var(--foreground))]",
    },
    {
      label: labels.high,
      range: "20 +",
      icon: "fa-fire-flame-curved",
      wrap: "border border-[rgb(var(--border))] bg-[rgb(var(--background))]",
      dot: "bg-gl-high/15 text-gl-high",
      text: "text-[rgb(var(--foreground))]",
    },
  ];

  return (
    <figure className="flex w-full flex-col items-center gap-6">
      <div className="relative w-full max-w-[300px]">
        <svg
          viewBox="0 0 260 152"
          className="w-full"
          role="img"
          aria-label={`${labels.label}: 8, ${labels.low}`}
        >
          <defs>
            <linearGradient id="glGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34C759" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>

          {/* Tick marks */}
          {ticks.map((t, i) => (
            <line
              key={i}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke="rgb(var(--border))"
              strokeWidth={t.major ? 2.5 : 1.5}
              strokeLinecap="round"
              opacity={t.major ? 0.9 : 0.55}
            />
          ))}

          {/* Track */}
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="rgb(var(--border))"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Animated colored arc */}
          <motion.path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="url(#glGradient)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: reduce ? 0 : circumference }}
            whileInView={{ strokeDashoffset: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 1.6, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 4px 10px rgba(52,199,89,0.25))" }}
          />

          {/* Needle */}
          <motion.line
            x1={cx}
            y1={cy}
            x2={needleX}
            y2={needleY}
            stroke="rgb(var(--foreground))"
            strokeWidth="4.5"
            strokeLinecap="round"
            initial={{ rotate: reduce ? 0 : -90 }}
            whileInView={{ rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 1.2, delay: 0.4, ease: "backOut" }}
            style={{ originX: `${cx}px`, originY: `${cy}px` }}
          />
          <circle cx={cx} cy={cy} r="10" fill="rgb(var(--foreground))" />
          <circle cx={cx} cy={cy} r="4" fill="rgb(var(--card))" />
        </svg>

        {/* Center readout */}
        <div className="pointer-events-none absolute inset-x-0 top-[46%] flex -translate-y-1/2 flex-col items-center gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
            {labels.label}
          </span>
          <span className="tabnum font-display text-[44px] font-extrabold leading-none text-gl-low">
            8
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gl-low/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-gl-low">
            <i className="fa-solid fa-leaf text-[10px]" aria-hidden />
            {labels.low}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="grid w-full grid-cols-3 gap-2.5">
        {segments.map((s, i) => (
          <div
            key={i}
            className={`flex flex-col items-center gap-1.5 rounded-2xl px-2 py-3 text-center transition-colors ${s.wrap}`}
          >
            <span className={`grid h-9 w-9 place-items-center rounded-full ${s.dot}`}>
              <i className={`fa-solid ${s.icon} text-[15px]`} aria-hidden />
            </span>
            <span className={`text-[13px] font-bold leading-none ${s.text}`}>{s.label}</span>
            <span className="tabnum text-[11px] font-medium text-muted">{s.range}</span>
          </div>
        ))}
      </div>

      <figcaption className="flex items-center gap-2 text-center text-xs text-muted">
        <i className="fa-solid fa-wave-square text-brand-500" aria-hidden />
        {labels.caption}
      </figcaption>
    </figure>
  );
}
