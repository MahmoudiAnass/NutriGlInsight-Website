"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { LeafIcon, MenuIcon, CloseIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Navbar({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const base = `/${lang}`;
  const links = [
    { href: `${base}#features`, label: dict.nav.features },
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/privacy`, label: dict.nav.privacy },
    { href: `${base}/delete-data`, label: dict.nav.deleteData },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[rgb(var(--border))] bg-[rgb(var(--background))]/80 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href={base}
          className="inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-white">
            <LeafIcon className="h-5 w-5" />
          </span>
          <span>
            NutriGL <span className="text-brand-500">Insight</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-brand-500"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher lang={lang} label={dict.common.selectLanguage} />
          </div>
          <ThemeToggle label={dict.common.toggleTheme} />
          <Link href={`${base}#download`} className="btn-primary hidden md:inline-flex">
            {dict.nav.download}
          </Link>
          <button
            type="button"
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--border))] surface lg:hidden"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[rgb(var(--border))] bg-[rgb(var(--background))] lg:hidden">
          <ul className="container-page flex flex-col gap-1 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-medium hover:bg-brand-50 dark:hover:bg-brand-900/30"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 flex items-center justify-between gap-3 px-2">
              <LanguageSwitcher lang={lang} label={dict.common.selectLanguage} />
              <Link
                href={`${base}#download`}
                onClick={() => setOpen(false)}
                className="btn-primary flex-1 justify-center"
              >
                {dict.nav.download}
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
