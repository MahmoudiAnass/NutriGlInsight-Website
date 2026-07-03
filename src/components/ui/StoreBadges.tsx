import type { Dictionary } from "@/i18n/get-dictionary";

// Replace with your real Google Play listing URL.
const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.oushen.nutriglinsight";

function PlayLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path d="M3.6 2.2 13.4 12 3.6 21.8c-.35-.2-.6-.6-.6-1.1V3.3c0-.5.25-.9.6-1.1z" fill="#00D0FF" />
      <path d="M16.5 8.9 13.4 12l3.1 3.1 3.3-1.9c.8-.46.8-1.4 0-1.86L16.5 8.9z" fill="#FFCE00" />
      <path d="M3.6 2.2c.15-.08.33-.12.5-.12.24 0 .48.07.7.2l11.7 6.62L13.4 12 3.6 2.2z" fill="#00F076" />
      <path d="M13.4 12l3.1 3.1-11.7 6.62c-.22.13-.46.2-.7.2-.17 0-.35-.04-.5-.12L13.4 12z" fill="#FF3945" />
    </svg>
  );
}

export function StoreBadges({
  dict,
  className = "",
}: {
  dict: Dictionary;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${dict.common.getItOn} ${dict.common.googlePlay}`}
        className="keep-ltr inline-flex items-center gap-3 rounded-xl border border-white/10 bg-ink px-5 py-2.5 text-white shadow-soft transition-transform hover:-translate-y-0.5"
      >
        <PlayLogo />
        <span className="flex flex-col leading-tight">
          <span className="text-[10px] uppercase tracking-wide opacity-80">
            {dict.common.getItOn}
          </span>
          <span className="text-lg font-semibold">{dict.common.googlePlay}</span>
        </span>
      </a>
    </div>
  );
}
