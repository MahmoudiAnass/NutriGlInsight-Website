import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { HeartPulseIcon, ShieldIcon, TargetIcon, SparkleIcon, MailIcon } from "@/components/icons";

const valueIcons = [TargetIcon, HeartPulseIcon, ShieldIcon, SparkleIcon];

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = isLocale(params.lang) ? params.lang : i18n.defaultLocale;
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.about.title,
    description: dict.meta.about.description,
    alternates: { canonical: `/${lang}/about` },
  };
}

export default async function AboutPage({ params }: { params: { lang: string } }) {
  const lang: Locale = isLocale(params.lang) ? params.lang : i18n.defaultLocale;
  const dict = await getDictionary(lang);
  const a = dict.about;

  return (
    <>
      <Section>
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">{a.eyebrow}</span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {a.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{a.intro}</p>
        </Reveal>
      </Section>

      <Section className="bg-[rgb(var(--card))]">
        <div className="mx-auto max-w-3xl">
          <SectionHeader title={a.storyTitle} align="start" />
          <div className="mt-6 flex flex-col gap-5">
            {a.story.map((para, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-lg leading-relaxed text-muted">{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader title={a.valuesTitle} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {a.values.map((value, i) => {
            const Icon = valueIcons[i];
            return (
              <Reveal key={i} delay={i * 0.08} className="card flex flex-col gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-500 dark:bg-brand-900/40">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-display text-lg font-semibold">{value.title}</h3>
                <p className="text-sm text-muted">{value.body}</p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section className="bg-[rgb(var(--card))]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="grid h-14 w-14 place-items-center mx-auto rounded-2xl bg-accent/10 text-accent">
            <MailIcon className="h-7 w-7" />
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">{a.contactTitle}</h2>
          <p className="mt-3 text-muted">{a.contactBody}</p>
          <a
            href="mailto:contact@nutriglinsight.com"
            className="btn-primary mt-6"
          >
            {a.contactCta}
          </a>
          <p className="mt-4">
            <Link
              href={`/${lang}/contact`}
              className="text-sm text-brand-600 dark:text-brand-300 link-underline"
            >
              {dict.nav.contact}
            </Link>
          </p>
        </Reveal>
      </Section>
    </>
  );
}
