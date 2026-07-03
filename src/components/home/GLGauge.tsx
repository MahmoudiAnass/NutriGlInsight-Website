"use client";

import { motion, useReducedMotion } from "framer-motion";

type GaugeLabels = {
  label: string;
  low: string;
  medium: string;
  high: string;
  caption: string;
};

// Semi-circular gauge from 180deg to 0deg. Needle points to a "low" reading.
export function GLGauge({ labels }: { labels: GaugeLabels }) {
  const reduce = useReducedMotion();

  // Arc geometry
  const cx = 130;
  const cy = 130;
  const r = 100;
  const circumference = Math.PI * r; // half circle

  // Needle target ~ 22% into the scale (a healthy "low" reading)
  const value = 0.22;
  const angle = 180 - value * 180; // degrees
  const rad = (angle * Math.PI) / 180;
  const needleX = cx + Math.cos(rad) * (r - 18);
  const needleY = cy - Math.sin(rad) * (r - 18);

  return (
    <figure className="flex flex-col items-center gap-3">
      <svg
        viewBox="0 0 260 170"
        className="w-full max-w-[320px]"
        role="img"
        aria-label={`${labels.label}: ${labels.low}`}
      >
        <defs>
          <linearGradient id="glGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34C759" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
        </defs>

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
        />

        {/* Needle */}
        <motion.line
          x1={cx}
          y1={cy}
          x2={needleX}
          y2={needleY}
          stroke="rgb(var(--foreground))"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ rotate: reduce ? 0 : -90 }}
          whileInView={{ rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 1.2, delay: 0.4, ease: "backOut" }}
          style={{ originX: `${cx}px`, originY: `${cy}px` }}
        />
        <circle cx={cx} cy={cy} r="8" fill="rgb(var(--foreground))" />

        {/* Scale labels */}
        <text x={cx - r} y={cy + 24} textAnchor="middle" className="fill-gl-low text-[11px] font-semibold">
          {labels.low}
        </text>
        <text x={cx} y={cy - r - 6} textAnchor="middle" className="fill-gl-medium text-[11px] font-semibold">
          {labels.medium}
        </text>
        <text x={cx + r} y={cy + 24} textAnchor="middle" className="fill-gl-high text-[11px] font-semibold">
          {labels.high}
        </text>
      </svg>

      <div className="text-center">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted">
          {labels.label}
        </div>
        <div className="tabnum font-display text-3xl font-bold text-gl-low">8 · {labels.low}</div>
      </div>
      <figcaption className="text-center text-xs text-muted">{labels.caption}</figcaption>
    </figure>
  );
}
