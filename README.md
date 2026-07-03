# NutriGL Insight — Website

Marketing + compliance website for **NutriGL Insight**, a nutrition tracker built around **glycemic load**.

- **Publisher:** OUSHEN · **Developer:** Anass Mahmoudi
- **Contact:** contact@nutriglinsight.com

Built with **Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion**, **next-themes**, and **Resend**.

## Features

- Responsive, mobile-first, accessible (WCAG 2.1 AA: semantic HTML, focus states, skip link, `prefers-reduced-motion`).
- Light / dark mode with automatic system preference.
- **i18n** in English, Arabic, French, Spanish with **full RTL** for Arabic (`dir="rtl"`, mirrored layout via logical properties).
- SEO: per-page metadata, Open Graph + Twitter cards, `sitemap.xml`, `robots.txt`, JSON-LD `SoftwareApplication` on the homepage, favicon + OG image.
- Animated hero glycemic-load gauge and scroll-reveal micro-interactions.
- **Delete My Data** self-serve form wired to a serverless API route that emails requests via Resend.

## Pages

| Route | Description |
| --- | --- |
| `/[lang]` | Home / landing |
| `/[lang]/about` | About OUSHEN / Anass Mahmoudi |
| `/[lang]/privacy` | Privacy Policy (with table of contents) |
| `/[lang]/delete-data` | Delete My Data request form ⭐ |
| `/[lang]/contact` | Contact |

`[lang]` is one of `en`, `ar`, `fr`, `es`. Visiting `/` redirects to the best language via middleware.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

### Environment variables

See [.env.example](.env.example):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key for sending deletion-request emails. If unset, requests are logged server-side and the form still returns success (dev-friendly). |
| `DELETE_REQUEST_FROM` | Verified Resend sender, e.g. `NutriGL Insight <no-reply@nutriglinsight.com>`. |
| `DELETE_REQUEST_TO` | Recipient inbox (defaults to `contact@nutriglinsight.com`). |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used for metadata, sitemap, and OG tags. |

## Delete My Data flow

1. User submits the form on `/[lang]/delete-data` (email required, Support/Device ID recommended, confirmation checkbox, honeypot anti-spam).
2. `POST /api/delete-request` validates with Zod, drops honeypot hits, and emails the request to `contact@nutriglinsight.com` via Resend.
3. Users can also email directly with subject **"Data Deletion Request"** — stated on the page.

The page is reachable without an account (store reviewers check this). To hide it from search engines, set `robots: { index: false }` in [src/app/[lang]/delete-data/page.tsx](src/app/%5Blang%5D/delete-data/page.tsx).

## Editing content / translations

All copy lives in JSON dictionaries under [src/i18n/dictionaries](src/i18n/dictionaries) — one file per language (`en`, `ar`, `fr`, `es`). `en.json` is the canonical shape; keep keys in sync across languages.

## Build & deploy

```bash
npm run build
npm run start
```

Deploys cleanly to **Vercel** or **Netlify**. Set the environment variables in your host's dashboard.

## Notes

- The Privacy Policy is a **template** and should be reviewed by a legal professional before publishing (noted on the page).
- Store badges, app screenshots, and the OG/favicon art are tasteful **placeholders** — replace `public/og-image.svg`, `public/favicon.svg`, the phone mockups, and the store badge links in [src/components/ui/StoreBadges.tsx](src/components/ui/StoreBadges.tsx) with real assets and URLs.
- Translations of long-form legal text should be reviewed by a native speaker before publishing.
