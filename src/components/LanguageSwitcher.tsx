"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n, localeNames, type Locale } from "@/i18n/config";
import { GlobeIcon, CheckIcon } from "@/components/icons";

export function LanguageSwitcher({
  lang,
  label,
}: {
  lang: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointer(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, []);

  function hrefFor(locale: Locale) {
    const segments = (pathname || `/${lang}`).split("/");
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-[rgb(var(--border))] surface px-3 text-sm font-medium text-muted transition-colors hover:text-brand-500"
      >
        <GlobeIcon className="h-5 w-5" />
        <span className="hidden sm:inline">{localeNames[lang]}</span>
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-[rgb(var(--border))] surface p-1 shadow-soft"
        >
          {i18n.locales.map((locale) => (
            <li key={locale} role="option" aria-selected={locale === lang}>
              <Link
                href={hrefFor(locale)}
                hrefLang={locale}
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm hover:bg-brand-50 dark:hover:bg-brand-900/30"
              >
                <span>{localeNames[locale]}</span>
                {locale === lang ? <CheckIcon className="h-4 w-4 text-brand-500" /> : null}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
