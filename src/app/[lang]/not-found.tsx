import Link from "next/link";
import { i18n } from "@/i18n/config";

// Localized 404 rendered within the [lang] layout (inherits <html>/<body>).
export default function LangNotFound() {
  const lang = i18n.defaultLocale;
  return (
    <div className="container-page grid min-h-[60vh] place-items-center py-24 text-center">
      <div className="flex flex-col items-center gap-4">
        <p className="font-display text-6xl font-bold text-brand-500">404</p>
        <p className="text-lg text-muted">This page could not be found.</p>
        <Link href={`/${lang}`} className="btn-primary mt-2">
          Back to home
        </Link>
      </div>
    </div>
  );
}
