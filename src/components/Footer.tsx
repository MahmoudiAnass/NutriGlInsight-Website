import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { LeafIcon, MailIcon } from "@/components/icons";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const base = `/${lang}`;
  const year = new Date().getFullYear();

  const columns = [
    {
      title: dict.footer.product,
      links: [
        { href: `${base}#features`, label: dict.footer.features },
        { href: `${base}#download`, label: dict.footer.download },
      ],
    },
    {
      title: dict.footer.company,
      links: [
        { href: `${base}/about`, label: dict.footer.about },
        { href: `${base}/contact`, label: dict.footer.contact },
      ],
    },
    {
      title: dict.footer.legal,
      links: [
        { href: `${base}/privacy`, label: dict.footer.privacy },
        { href: `${base}/delete-data`, label: dict.footer.deleteData },
      ],
    },
  ];

  return (
    <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--card))]">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Link href={base} className="inline-flex items-center gap-2 font-display text-lg font-bold">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-white">
                <LeafIcon className="h-5 w-5" />
              </span>
              <span>
                NutriGL <span className="text-brand-500">Insight</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted">{dict.footer.tagline}</p>
            <a
              href="mailto:contact@nutriglinsight.com"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-300 link-underline"
            >
              <MailIcon className="h-4 w-4" />
              <span className="keep-ltr">contact@nutriglinsight.com</span>
            </a>
            <StoreBadges dict={dict} className="mt-2" />
          </div>

          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-muted hover:text-brand-500">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[rgb(var(--border))] pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">
            © {year} OUSHEN. {dict.footer.rights} · {dict.footer.builtBy}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted">{dict.footer.language}:</span>
            <LanguageSwitcher lang={lang} label={dict.common.selectLanguage} />
          </div>
        </div>
      </div>
    </footer>
  );
}
