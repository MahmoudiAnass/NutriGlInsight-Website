import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Reveal } from "@/components/ui/Reveal";

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

const TOC = [
  { id: "overview", n: "01", icon: "fa-circle-info", title: "Overview" },
  { id: "information", n: "02", icon: "fa-database", title: "Information We Collect" },
  { id: "camera", n: "03", icon: "fa-camera", title: "How We Use Your Camera" },
  { id: "ai", n: "04", icon: "fa-microchip", title: "Artificial Intelligence" },
  { id: "third-party", n: "05", icon: "fa-plug", title: "Third-Party Services" },
  { id: "social", n: "06", icon: "fa-users", title: "Social Features" },
  { id: "device-data", n: "07", icon: "fa-mobile-screen", title: "Data Stored on Your Device" },
  { id: "cloud-sync", n: "08", icon: "fa-cloud-arrow-up", title: "Cloud Sync" },
  { id: "permissions", n: "09", icon: "fa-key", title: "Permissions" },
  { id: "your-rights", n: "10", icon: "fa-user-shield", title: "Your Rights & Opt-Out" },
  { id: "retention", n: "11", icon: "fa-clock-rotate-left", title: "Data Retention" },
  { id: "children", n: "12", icon: "fa-child-reaching", title: "Children\u2019s Privacy" },
  { id: "security", n: "13", icon: "fa-shield-halved", title: "Security" },
  { id: "changes", n: "14", icon: "fa-file-pen", title: "Changes to This Policy" },
  { id: "contact", n: "15", icon: "fa-envelope", title: "Contact" },
];

const THIRD_PARTY: { name: string; purpose: string; data: ReactNode }[] = [
  {
    name: "Google Play Services",
    purpose: "Platform services",
    data: (
      <a
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noreferrer"
        className="link-underline font-medium text-brand-600 dark:text-brand-300"
      >
        Privacy Policy
      </a>
    ),
  },
  { name: "Google Sign-In", purpose: "Optional account authentication", data: "Name, email, Google account ID" },
  { name: "Firebase Analytics", purpose: "Usage analytics (opt-in)", data: "App events, device ID" },
  { name: "Firebase Crashlytics", purpose: "Crash reporting", data: "Crash logs, stack traces" },
  { name: "Firebase Cloud Messaging", purpose: "Push notifications", data: "Device push token" },
  { name: "Google Play Billing", purpose: "In-app Premium subscription", data: "Purchase token" },
  {
    name: "Google Gemini AI",
    purpose: "Food analysis, photo recognition, Smart Swaps",
    data: "Food descriptions, meal photos (ephemeral)",
  },
  { name: "USDA FoodData Central", purpose: "Food name validation", data: "Food name only" },
  { name: "Open Food Facts", purpose: "Barcode product lookup", data: "Barcode number only" },
];

const PERMISSIONS: { perm: string; reason: string; icon: string }[] = [
  { perm: "Camera", reason: "Barcode scanning and AI photo meal recognition", icon: "fa-camera" },
  { perm: "Notifications", reason: "Meal reminders and nutrition alerts you enable", icon: "fa-bell" },
  { perm: "Exact Alarms", reason: "Scheduled meal reminders at times you set", icon: "fa-clock" },
  { perm: "Internet", reason: "Retrieve nutritional data, sync data, validate subscription", icon: "fa-globe" },
  { perm: "Boot Completed", reason: "Restore scheduled reminders after device restart", icon: "fa-power-off" },
  { perm: "Billing", reason: "Process in-app Premium subscription purchases", icon: "fa-credit-card" },
];

export default async function PrivacyPage({ params }: { params: { lang: string } }) {
  const lang: Locale = isLocale(params.lang) ? params.lang : i18n.defaultLocale;
  const dict = await getDictionary(lang);

  const deleteHref = `/${lang}/delete-data`;

  return (
    <div className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <span className="eyebrow">
          <i className="fa-solid fa-scale-balanced" aria-hidden /> Legal · Android app
        </span>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-lg text-muted">NutriGL Insight</p>

        {/* Meta chips */}
        <div className="mt-6 flex flex-wrap gap-2.5 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3.5 py-1.5">
            <i className="fa-solid fa-calendar-day text-brand-500" aria-hidden />
            <span className="font-medium">Effective July 3, 2026</span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3.5 py-1.5">
            <i className="fa-solid fa-code text-brand-500" aria-hidden />
            <span className="font-medium">Anass Mahmoudi (OUSHEN)</span>
          </span>
          <a
            href="mailto:contact@nutriglinsight.com"
            className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3.5 py-1.5 transition-colors hover:border-brand-400/50"
          >
            <i className="fa-solid fa-envelope text-brand-500" aria-hidden />
            <span className="font-medium">contact@nutriglinsight.com</span>
          </a>
        </div>

        {/* Table of contents */}
        <nav aria-label="Table of contents" className="mt-10 card">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted">
            <i className="fa-solid fa-list-ul text-brand-500" aria-hidden /> On this page
          </h2>
          <ol className="mt-4 grid gap-1.5 sm:grid-cols-2">
            {TOC.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="group flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-brand-500/[0.06]"
                >
                  <span className="tabnum text-xs font-semibold text-brand-500">{s.n}</span>
                  <span className="text-sm group-hover:text-brand-600 dark:group-hover:text-brand-300">
                    {s.title}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="mt-14 flex flex-col gap-14">
          {/* 01 Overview */}
          <Section id="overview" n="01" icon="fa-circle-info" title="Overview">
            <div className="flex items-start gap-3 rounded-2xl border border-brand-400/30 bg-brand-500/[0.06] p-5">
              <i className="fa-solid fa-shield-halved mt-0.5 shrink-0 text-brand-500" aria-hidden />
              <p className="text-muted">
                This Privacy Policy applies to the NutriGL Insight mobile application for Android (the
                &ldquo;Application&rdquo;), developed by Anass Mahmoudi operating under OUSHEN (the
                &ldquo;Service Provider&rdquo;), and provided as a Freemium service. By using the
                Application, you agree to the collection and use of information as described in this policy.
              </p>
            </div>
          </Section>

          {/* 02 Information We Collect */}
          <Section id="information" n="02" icon="fa-database" title="Information We Collect">
            <SubHeading icon="fa-hand-holding-heart">Information you provide</SubHeading>
            <InfoList
              items={[
                <>
                  <Lead>Google account details</Lead> if you choose to sign in with Google, we collect your
                  Google account name, email address, and a unique Google account identifier. Sign-in is
                  entirely optional; the Application is fully functional without it.
                </>,
                <>
                  <Lead>Health and nutrition data</Lead> during onboarding and normal use, you may provide
                  age, weight, height, gender, fitness goal, dietary preference, and activity level. This
                  information is used solely to calculate personalised daily nutrition targets (calories,
                  macros, glycemic load) and is synced to our servers only if you are signed in.
                </>,
                <>
                  <Lead>Meal and food logs</Lead> every food item, meal, and recipe you create is stored on
                  your device and optionally synced to our servers if cloud sync is enabled.
                </>,
                <>
                  <Lead>Marketing preference</Lead> if you opt in to product updates and tips, your email
                  address is registered with our backend for the purpose of sending occasional feature
                  updates and nutrition tips. You can withdraw consent at any time in Settings.
                </>,
              ]}
            />
            <SubHeading icon="fa-satellite-dish">Information collected automatically</SubHeading>
            <InfoList
              items={[
                <>
                  <Lead>Device identifier</Lead> a unique anonymous identifier (UUID) is generated at first
                  launch and stored in encrypted secure storage on your device. This identifier is sent with
                  every request to our servers to manage your account, usage limits, and subscription status.
                  It is also used to generate a cryptographic request signature (HMAC-SHA256) to protect API
                  requests against tampering.
                </>,
                <>
                  <Lead>Usage and analytics</Lead> if you opt in to analytics (disabled by default), Firebase
                  Analytics collects information about which features you use, screens you view, and events
                  such as food searches and meal saves. You can opt in or out at any time in Settings.
                </>,
                <>
                  <Lead>Crash reports</Lead> Firebase Crashlytics automatically collects crash logs and stack
                  traces in release builds to help us diagnose and fix bugs. This data does not include your
                  food logs or personal health data.
                </>,
              ]}
            />
          </Section>

          {/* 03 Camera */}
          <Section id="camera" n="03" icon="fa-camera" title="How We Use Your Camera">
            <p>The Application uses your camera for two distinct purposes:</p>
            <NumberedList
              items={[
                <>
                  <Lead>Barcode scanning</Lead> to identify packaged food products. The barcode number is
                  sent to the Open Food Facts API to retrieve the product name. No image is captured or
                  transmitted.
                </>,
                <>
                  <Lead>AI photo recognition</Lead> if you choose to use the &ldquo;Snap &amp; Log&rdquo;
                  feature, a photo of your meal is captured, encoded, and transmitted to our backend servers
                  where it is processed by Google Gemini AI to identify the dish and generate a nutritional
                  breakdown. The photo is processed ephemerally and is not stored beyond the duration of the
                  analysis request.
                </>,
              ]}
            />
            <p>
              Camera access is requested only when you choose to use these features and can be revoked at any
              time in your device settings.
            </p>
          </Section>

          {/* 04 AI */}
          <Section id="ai" n="04" icon="fa-microchip" title="Artificial Intelligence">
            <p>The Application uses Google Gemini AI via our backend servers to:</p>
            <InfoList
              items={[
                "Analyse food descriptions entered as text and return nutritional data (calories, protein, carbohydrates, fat, fibre, sugar, potassium, glycemic load).",
                "Identify dishes from photos you take and generate a full nutritional breakdown.",
                "Suggest lower-glycemic-load food alternatives (Smart Swaps).",
              ]}
            />
            <p>
              When you use these features, the relevant input (food name or photo) and your anonymous device
              identifier are sent to our servers and processed by the AI. No personal health information (age,
              weight, etc.) is included in AI analysis requests.
            </p>
          </Section>

          {/* 05 Third-Party Services */}
          <Section id="third-party" n="05" icon="fa-plug" title="Third-Party Services">
            <p>
              The Application uses the following third-party services, each governed by their own privacy
              policies:
            </p>
            <div className="overflow-hidden rounded-2xl border border-[rgb(var(--border))]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead>
                    <tr className="bg-brand-500/[0.06] text-xs uppercase tracking-wide text-muted">
                      <th className="px-4 py-3 font-semibold">Service</th>
                      <th className="px-4 py-3 font-semibold">Purpose</th>
                      <th className="px-4 py-3 font-semibold">Data sent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {THIRD_PARTY.map((row) => (
                      <tr
                        key={row.name}
                        className="border-t border-[rgb(var(--border))] align-top"
                      >
                        <td className="px-4 py-3 font-semibold text-[rgb(var(--foreground))]">{row.name}</td>
                        <td className="px-4 py-3 text-muted">{row.purpose}</td>
                        <td className="px-4 py-3 text-muted">{row.data}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Section>

          {/* 06 Social */}
          <Section id="social" n="06" icon="fa-users" title="Social Features">
            <p>
              If you choose to enable the optional social/leaderboard features (&ldquo;Momentum
              League&rdquo;), your chosen display name, streak data, and weekly nutrition progress scores are
              shared with friends you connect with and displayed on a leaderboard. Social features are
              entirely optional and can be disabled at any time in Settings.
            </p>
          </Section>

          {/* 07 Data Stored on Your Device */}
          <Section id="device-data" n="07" icon="fa-mobile-screen" title="Data Stored on Your Device">
            <p>
              The Application stores the following data locally in an encrypted application sandbox
              inaccessible to other apps:
            </p>
            <InfoList
              items={[
                "Food search history and nutritional data (for offline access)",
                "Saved meals, favourite meals, and recipe templates",
                "Daily nutrition goals and macro targets",
                "Notification preferences and reminder schedules",
                "Sign-in details (name, email) if signed in",
                "Anonymous device identifier",
                "Subscription status cache",
                "Analytics and marketing consent preferences",
              ]}
            />
          </Section>

          {/* 08 Cloud Sync */}
          <Section id="cloud-sync" n="08" icon="fa-cloud-arrow-up" title="Cloud Sync">
            <p>
              If you sign in with Google and enable cloud sync, your meals, recipes, goals, streak data, and
              profile are synced to our backend servers hosted on Heroku. All data is transmitted over HTTPS
              (TLS). You can delete all synced data at any time via <strong className="font-semibold text-[rgb(var(--foreground))]">Settings → Delete cloud data</strong> or by
              submitting a request at{" "}
              <Link href={deleteHref} className="link-underline font-medium text-brand-600 dark:text-brand-300">
                nutriglinsight.com/delete-data
              </Link>
              .
            </p>
            <Link href={deleteHref} className="btn-secondary w-fit">
              <i className="fa-solid fa-trash-can" aria-hidden /> {dict.nav.deleteData}
            </Link>
          </Section>

          {/* 09 Permissions */}
          <Section id="permissions" n="09" icon="fa-key" title="Permissions">
            <div className="grid gap-3 sm:grid-cols-2">
              {PERMISSIONS.map((perm) => (
                <div
                  key={perm.perm}
                  className="flex items-start gap-3 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-300">
                    <i className={`fa-solid ${perm.icon}`} aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-[rgb(var(--foreground))]">{perm.perm}</p>
                    <p className="mt-0.5 text-sm text-muted">{perm.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* 10 Your Rights & Opt-Out */}
          <Section id="your-rights" n="10" icon="fa-user-shield" title="Your Rights & Opt-Out Options">
            <InfoList
              items={[
                <>
                  <Lead>Analytics</Lead> disable in Settings → Product updates &amp; tips at any time.
                </>,
                <>
                  <Lead>Marketing emails</Lead> opt out in Settings → Product updates &amp; tips or via the
                  unsubscribe link in any email.
                </>,
                <>
                  <Lead>Notifications</Lead> disable in Settings or revoke permission in device settings.
                </>,
                <>
                  <Lead>Camera</Lead> deny or revoke in device settings at any time.
                </>,
                <>
                  <Lead>Cloud data deletion</Lead> use the in-app Delete cloud data option or submit a request
                  at nutriglinsight.com/delete-data.
                </>,
                <>
                  <Lead>Complete opt-out</Lead> uninstall the Application using the standard process for your
                  device.
                </>,
              ]}
            />
            <Link href={deleteHref} className="btn-secondary w-fit">
              <i className="fa-solid fa-trash-can" aria-hidden /> {dict.nav.deleteData}
            </Link>
          </Section>

          {/* 11 Data Retention */}
          <Section id="retention" n="11" icon="fa-clock-rotate-left" title="Data Retention">
            <p>
              We retain your data for as long as your account is active and for a reasonable period
              thereafter. Crash logs and analytics data are retained for up to 24 months. To request deletion
              of all data associated with your account, contact us at{" "}
              <a href="mailto:contact@nutriglinsight.com" className="link-underline font-medium text-brand-600 dark:text-brand-300">
                contact@nutriglinsight.com
              </a>{" "}
              or use the self-service form at{" "}
              <Link href={deleteHref} className="link-underline font-medium text-brand-600 dark:text-brand-300">
                nutriglinsight.com/delete-data
              </Link>
              . We will respond within 30 days.
            </p>
          </Section>

          {/* 12 Children's Privacy */}
          <Section id="children" n="12" icon="fa-child-reaching" title={"Children\u2019s Privacy"}>
            <p>
              The Application is not directed at children under 13. We do not knowingly collect personal
              information from children under 13. If you believe a child under 13 has provided us with
              personal information, please contact us at{" "}
              <a href="mailto:contact@nutriglinsight.com" className="link-underline font-medium text-brand-600 dark:text-brand-300">
                contact@nutriglinsight.com
              </a>{" "}
              and we will delete it promptly.
            </p>
          </Section>

          {/* 13 Security */}
          <Section id="security" n="13" icon="fa-shield-halved" title="Security">
            <p>
              All data transmitted between the Application and our servers is encrypted using HTTPS (TLS). The
              device identifier is stored in encrypted secure storage on your device. Request integrity is
              protected with HMAC-SHA256 signatures. No security system is impenetrable; we are committed to
              using industry-standard protections.
            </p>
          </Section>

          {/* 14 Changes */}
          <Section id="changes" n="14" icon="fa-file-pen" title="Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will notify you by updating the
              effective date at the top of this page. Continued use of the Application after changes
              constitutes acceptance of the updated policy.
            </p>
          </Section>

          {/* 15 Contact */}
          <Section id="contact" n="15" icon="fa-envelope" title="Contact">
            <p>For privacy questions, data deletion requests, or any concerns:</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <a
                href="mailto:contact@nutriglinsight.com"
                className="flex flex-col gap-2 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 transition-colors hover:border-brand-400/50"
              >
                <i className="fa-solid fa-envelope text-brand-500" aria-hidden />
                <span className="text-xs uppercase tracking-wide text-muted">Email</span>
                <span className="text-sm font-medium text-[rgb(var(--foreground))]">
                  contact@nutriglinsight.com
                </span>
              </a>
              <a
                href="https://nutriglinsight.com"
                className="flex flex-col gap-2 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 transition-colors hover:border-brand-400/50"
              >
                <i className="fa-solid fa-globe text-brand-500" aria-hidden />
                <span className="text-xs uppercase tracking-wide text-muted">Website</span>
                <span className="text-sm font-medium text-[rgb(var(--foreground))]">nutriglinsight.com</span>
              </a>
              <Link
                href={deleteHref}
                className="flex flex-col gap-2 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 transition-colors hover:border-brand-400/50"
              >
                <i className="fa-solid fa-trash-can text-brand-500" aria-hidden />
                <span className="text-xs uppercase tracking-wide text-muted">Data deletion</span>
                <span className="text-sm font-medium text-[rgb(var(--foreground))]">
                  nutriglinsight.com/delete-data
                </span>
              </Link>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  id,
  n,
  icon,
  title,
  children,
}: {
  id: string;
  n: string;
  icon: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Reveal as="section" id={id} className="scroll-mt-28">
      <div className="flex items-center gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-300">
          <i className={`fa-solid ${icon} text-lg`} aria-hidden />
        </span>
        <div>
          <span className="tabnum text-xs font-semibold text-brand-500">{n}</span>
          <h2 className="font-display text-2xl font-bold leading-tight tracking-tight">{title}</h2>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-4 leading-relaxed text-muted">{children}</div>
    </Reveal>
  );
}

function SubHeading({ icon, children }: { icon: string; children: ReactNode }) {
  return (
    <h3 className="mt-1 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[rgb(var(--foreground))]">
      <i className={`fa-solid ${icon} text-brand-500`} aria-hidden />
      {children}
    </h3>
  );
}

function Lead({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-[rgb(var(--foreground))]">{children}</strong>;
}

function InfoList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NumberedList({ items }: { items: ReactNode[] }) {
  return (
    <ol className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="tabnum grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/12 text-xs font-bold text-brand-600 dark:text-brand-300">
            {i + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}
