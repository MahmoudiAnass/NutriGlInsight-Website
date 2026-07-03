import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Reveal } from "@/components/ui/Reveal";
import { ShieldIcon } from "@/components/icons";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = isLocale(params.lang) ? params.lang : i18n.defaultLocale;
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.privacy.title,
    description: dict.meta.privacy.description,
    alternates: { canonical: `/${lang}/privacy` },
  };
}

export default async function PrivacyPage({ params }: { params: { lang: string } }) {
  const lang: Locale = isLocale(params.lang) ? params.lang : i18n.defaultLocale;
  const dict = await getDictionary(lang);
  const p = dict.privacy;

  return (
    <div className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <span className="eyebrow">{p.eyebrow}</span>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {p.title}
        </h1>
        <p className="mt-3 text-sm text-muted">{p.lastUpdated}</p>
        <p className="mt-6 text-lg leading-relaxed text-muted">{p.intro}</p>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent/5 p-4 text-sm">
          <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <p>{p.legalNote}</p>
        </div>

        {/* Table of contents */}
        <nav aria-label={p.tocTitle} className="mt-10 rounded-2xl border border-[rgb(var(--border))] p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">{p.tocTitle}</h2>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2">
            {p.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sm text-brand-600 hover:underline dark:text-brand-300"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="mt-12 flex flex-col gap-12">
          {p.sections.map((section) => (
            <Reveal key={section.id} as="section" id={section.id} className="scroll-mt-24">
              <h2 className="font-display text-2xl font-bold tracking-tight">{section.title}</h2>
              <div className="mt-4 flex flex-col gap-4">
                {section.paragraphs.map((para, i) => (
                  <p key={i} className="leading-relaxed text-muted">
                    {para}
                  </p>
                ))}
                {section.id === "your-rights" ? (
                  <Link href={`/${lang}/delete-data`} className="btn-secondary w-fit">
                    {dict.nav.deleteData}
                  </Link>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
