import type { Metadata } from "next";
import { isLocale, i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Reveal } from "@/components/ui/Reveal";
import { DeleteDataForm } from "@/components/DeleteDataForm";
import { CheckIcon, ShieldIcon, MailIcon } from "@/components/icons";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = isLocale(params.lang) ? params.lang : i18n.defaultLocale;
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.deleteData.title,
    description: dict.meta.deleteData.description,
    alternates: { canonical: `/${lang}/delete-data` },
    // Reachable by store reviewers without an account; keep it indexable but
    // flip to noindex here if you prefer to hide it from search engines.
    robots: { index: true, follow: true },
  };
}

export default async function DeleteDataPage({ params }: { params: { lang: string } }) {
  const lang: Locale = isLocale(params.lang) ? params.lang : i18n.defaultLocale;
  const dict = await getDictionary(lang);
  const d = dict.deleteData;

  return (
    <div className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{d.eyebrow}</span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {d.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{d.intro}</p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Left: what gets deleted + warning + alt path */}
          <div className="flex flex-col gap-6">
            <Reveal className="card">
              <h2 className="font-display text-xl font-semibold">{d.whatTitle}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {d.whatItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-500">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="flex items-start gap-3 rounded-2xl border border-gl-high/40 bg-gl-high/5 p-5">
              <ShieldIcon className="mt-0.5 h-6 w-6 shrink-0 text-gl-high" />
              <div>
                <h3 className="font-semibold text-gl-high">{d.warningTitle}</h3>
                <p className="mt-1 text-sm text-muted">{d.warningBody}</p>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="card">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
                  <MailIcon className="h-5 w-5" />
                </span>
                <h3 className="font-semibold">{d.altTitle}</h3>
              </div>
              <p className="mt-3 text-sm text-muted">{d.altBody}</p>
              <a
                href="mailto:contact@nutriglinsight.com?subject=Data%20Deletion%20Request"
                className="mt-3 inline-block text-sm font-medium text-brand-600 dark:text-brand-300 link-underline keep-ltr"
              >
                contact@nutriglinsight.com
              </a>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.1}>
            <DeleteDataForm form={d.form} lang={lang} />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
