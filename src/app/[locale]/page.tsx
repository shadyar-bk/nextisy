/* oxlint-disable react/no-danger -- Next.js recommends a native script for JSON-LD; the serialized payload is sanitized below. */

import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { applicationName, applicationUrl, localizedHomePaths } from "@/app/site-metadata";
import { ThemeSwitcher } from "@/components/appearance/theme-switcher";
import { LocaleSwitcher } from "@/components/locale/locale-switcher";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("Metadata")]);
  const description = t("description");
  const title = t("title");
  const socialImage = new URL(`/og/${locale}`, applicationUrl);
  const openGraphLocale = locale.replace("-", "_");

  return {
    alternates: {
      canonical: localizedHomePaths[locale],
    },
    openGraph: {
      alternateLocale: routing.locales.flatMap((alternateLocale) =>
        alternateLocale === locale ? [] : [alternateLocale.replace("-", "_")]
      ),
      description,
      images: [{ alt: title, height: 630, type: "image/png", url: socialImage, width: 1200 }],
      locale: openGraphLocale,
      siteName: applicationName,
      title,
      type: "website",
      url: localizedHomePaths[locale],
    },
    twitter: {
      card: "summary_large_image",
      description,
      images: [{ alt: title, url: socialImage }],
      title,
    },
  };
}

export default async function Home() {
  const [locale, metadata, t] = await Promise.all([
    getLocale(),
    getTranslations("Metadata"),
    getTranslations("Home"),
  ]);
  const route = getPathname({ href: "/", locale });
  const jsonLd =
    locale === routing.defaultLocale
      ? {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: applicationName,
          url: applicationUrl.href,
        }
      : undefined;

  return (
    <main className="grid min-h-svh place-items-center px-6 py-16">
      {jsonLd ? (
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replaceAll("<", "\\u003c"),
          }}
          type="application/ld+json"
        />
      ) : null}
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <p className="text-sm font-medium text-muted-foreground">{t("eyebrow")}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {metadata("title")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground">
          {metadata("description")}
        </p>
        <code
          className="mt-5 rounded-full border bg-muted/50 px-3 py-1.5 font-mono text-xs text-muted-foreground"
          dir="ltr"
        >
          {t("route", { route })}
        </code>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </main>
  );
}
