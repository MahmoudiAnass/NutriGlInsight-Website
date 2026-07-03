import type { Metadata } from "next";
import { isLocale, i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { MailIcon, GlobeIcon, BellIcon } from "@/components/icons";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = isLocale(params.lang) ? params.lang : i18n.defaultLocale;
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
    alternates: { canonical: `/${lang}/contact` },
  };
}

export default async function ContactPage({ params }: { params: { lang: string } }) {
  const lang: Locale = isLocale(params.lang) ? params.lang : i18n.defaultLocale;
  const dict = await getDictionary(lang);
  const c = dict.contact;

  const cards = [
    { icon: MailIcon, title: c.emailTitle, value: c.emailValue, href: "mailto:contact@nutriglinsight.com", ltr: true },
    { icon: GlobeIcon, title: c.websiteTitle, value: c.websiteValue, href: "https://nutriglinsight.com", ltr: true },
    { icon: BellIcon, title: c.responseTitle, value: c.responseValue, href: undefined, ltr: false },
  ];

  return (
    <div className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{c.eyebrow}</span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {c.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{c.intro}</p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            {cards.map((card, i) => {
              const Icon = card.icon;
              const inner = (
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-900/40">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                      {card.title}
                    </h2>
                    <p className={`mt-1 font-medium ${card.ltr ? "keep-ltr" : ""}`}>{card.value}</p>
                  </div>
                </div>
              );
              return (
                <Reveal key={i} delay={i * 0.08} className="card">
                  {card.href ? (
                    <a href={card.href} className="block">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <ContactForm form={c.form} />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
