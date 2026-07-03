import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { isLocale, i18n } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { GLGauge } from "@/components/home/GLGauge";
import { PhoneMockup, ScreenPlaceholder } from "@/components/home/PhoneMockup";
import {
  SearchIcon,
  CameraIcon,
  BarcodeIcon,
  TrendIcon,
  SwapIcon,
  TargetIcon,
  FlameIcon,
  MedalIcon,
  BellIcon,
  UsersIcon,
  HeartPulseIcon,
  BoltIcon,
  DumbbellIcon,
  SparkleIcon,
  SyncIcon,
  ShieldIcon,
  CheckIcon,
  LeafIcon,
} from "@/components/icons";

const logIcons = [SearchIcon, CameraIcon, BarcodeIcon];
const insightIcons = [TrendIcon, SwapIcon, TargetIcon];
const motivationIcons = [FlameIcon, MedalIcon, BellIcon, UsersIcon];
const whoForIcons = [HeartPulseIcon, BoltIcon, DumbbellIcon, SparkleIcon];

export default async function HomePage({ params }: { params: { lang: string } }) {
  const lang: Locale = isLocale(params.lang) ? params.lang : i18n.defaultLocale;
  const dict = await getDictionary(lang);
  const h = dict.home;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nutriglinsight.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "NutriGL Insight",
    operatingSystem: "iOS, Android",
    applicationCategory: "HealthApplication",
    description: dict.meta.home.description,
    url: `${siteUrl}/${lang}`,
    author: { "@type": "Person", name: "Anass Mahmoudi" },
    publisher: { "@type": "Organization", name: "OUSHEN" },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    inLanguage: ["en", "ar", "fr", "es"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(249,115,22,0.12), transparent 70%)",
          }}
        />
        <div className="container-page grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-6">
            <span className="eyebrow w-fit">
              <LeafIcon className="h-3.5 w-3.5" />
              {h.hero.eyebrow}
            </span>
            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {h.hero.title}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted">{h.hero.subtitle}</p>
            <div id="download" className="scroll-mt-24">
              <StoreBadges dict={dict} />
            </div>
            <p className="flex items-center gap-2 text-sm text-muted">
              <CheckIcon className="h-4 w-4 text-brand-500" />
              {h.hero.trustLine}
            </p>
          </Reveal>

          <Reveal delay={0.15} className="relative">
            <div className="relative grid place-items-center gap-6">
              <div className="card w-full max-w-sm">
                <GLGauge
                  labels={{
                    label: h.hero.gaugeLabel,
                    low: h.hero.gaugeLow,
                    medium: h.hero.gaugeMedium,
                    high: h.hero.gaugeHigh,
                    caption: h.hero.gaugeCaption,
                  }}
                />
              </div>
              <div className="absolute -bottom-6 end-0 hidden sm:block">
                <PhoneMockup className="max-w-[170px]" label={dict.common.screenshotAlt}>
                  <ScreenPlaceholder label={dict.common.placeholder} />
                </PhoneMockup>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Problem / Solution */}
      <Section id="features" className="bg-[rgb(var(--card))]">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">{h.problem.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {h.problem.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{h.problem.body}</p>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { v: h.problem.statOneValue, l: h.problem.statOneLabel },
            { v: h.problem.statTwoValue, l: h.problem.statTwoLabel },
            { v: h.problem.statThreeValue, l: h.problem.statThreeLabel },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.1} className="card text-center">
              <div className="tabnum font-display text-4xl font-bold text-brand-500">{s.v}</div>
              <div className="mt-1 text-sm text-muted">{s.l}</div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Three ways to log */}
      <Section>
        <SectionHeader eyebrow={h.waysToLog.eyebrow} title={h.waysToLog.title} subtitle={h.waysToLog.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {h.waysToLog.items.map((item, i) => {
            const Icon = logIcons[i];
            return (
              <Reveal key={i} delay={i * 0.1} className="card flex flex-col gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-500 dark:bg-brand-900/40">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                <p className="text-muted">{item.body}</p>
                <div className="mt-auto pt-2">
                  <div className="h-24 rounded-2xl bg-gradient-to-br from-brand-50 to-paper dark:from-brand-900/30 dark:to-transparent" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Food breakdown */}
      <Section className="bg-[rgb(var(--card))]">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeader
              eyebrow={h.foodBreakdown.eyebrow}
              title={h.foodBreakdown.title}
              subtitle={h.foodBreakdown.subtitle}
              align="start"
            />
          </Reveal>
          <Reveal delay={0.15} className="card">
            <div className="mb-4 flex items-center justify-between rounded-2xl bg-gl-low/10 p-4">
              <span className="text-sm font-semibold uppercase tracking-wide text-muted">
                {h.foodBreakdown.glLabel}
              </span>
              <span className="tabnum font-display text-2xl font-bold text-gl-low">
                {h.foodBreakdown.glValue}
              </span>
            </div>
            <dl className="grid grid-cols-2 gap-3">
              {h.foodBreakdown.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-[rgb(var(--border))] px-4 py-3"
                >
                  <dt className="text-sm text-muted">{item.label}</dt>
                  <dd className="tabnum font-semibold keep-ltr">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* Insight features */}
      <Section>
        <SectionHeader eyebrow={h.insights.eyebrow} title={h.insights.title} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {h.insights.items.map((item, i) => {
            const Icon = insightIcons[i];
            return (
              <Reveal key={i} delay={i * 0.1} className="card flex flex-col gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                <p className="text-muted">{item.body}</p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Motivation */}
      <Section className="bg-[rgb(var(--card))]">
        <SectionHeader eyebrow={h.motivation.eyebrow} title={h.motivation.title} subtitle={h.motivation.subtitle} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {h.motivation.items.map((item, i) => {
            const Icon = motivationIcons[i];
            return (
              <Reveal key={i} delay={i * 0.08} className="card flex flex-col gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-900/40">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted">{item.body}</p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Sync + privacy */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-6">
            <span className="eyebrow w-fit">
              <SyncIcon className="h-3.5 w-3.5" />
              {h.sync.eyebrow}
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{h.sync.title}</h2>
            <p className="text-lg leading-relaxed text-muted">{h.sync.body}</p>
            <ul className="flex flex-col gap-3">
              {[h.sync.pointOne, h.sync.pointTwo, h.sync.pointThree].map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-500">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15} className="relative grid place-items-center">
            <div className="card grid w-full max-w-sm place-items-center gap-4 py-10">
              <span className="grid h-20 w-20 place-items-center rounded-3xl bg-brand-500/10 text-brand-500">
                <ShieldIcon className="h-10 w-10" />
              </span>
              <PhoneMockup className="max-w-[180px]" label={dict.common.screenshotAlt}>
                <ScreenPlaceholder label={dict.common.placeholder} />
              </PhoneMockup>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Who it's for */}
      <Section className="bg-[rgb(var(--card))]">
        <SectionHeader eyebrow={h.whoFor.eyebrow} title={h.whoFor.title} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {h.whoFor.items.map((item, i) => {
            const Icon = whoForIcons[i];
            return (
              <Reveal key={i} delay={i * 0.08} className="card flex flex-col gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted">{item.body}</p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Final CTA */}
      <Section>
        <Reveal className="relative overflow-hidden rounded-3xl bg-brand-500 px-6 py-16 text-center text-white sm:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(50% 60% at 100% 0%, rgba(245,158,11,0.6), transparent 60%)",
            }}
          />
          <h2 className="relative font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {h.finalCta.title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/90">{h.finalCta.subtitle}</p>
          <div className="relative mt-8 flex justify-center">
            <StoreBadges dict={dict} className="justify-center" />
          </div>
          <p className="relative mt-6 text-sm text-white/80">{h.finalCta.trustLine}</p>
        </Reveal>
      </Section>
    </>
  );
}
