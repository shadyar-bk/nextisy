import { ThemeProvider } from "@wrksz/themes/next";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";

import { applicationName, applicationUrl } from "@/app/site-metadata";
import { APPLIED_THEMES } from "@/components/appearance/theme";
import { DirectionProvider } from "@/components/ui/direction";
import { DrawerIndent, DrawerIndentBackground, DrawerProvider } from "@/components/ui/drawer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { geist, notoKufiArabic } from "@/i18n/fonts";
import { getLocaleDirection } from "@/i18n/locale";
import { routing } from "@/i18n/routing";
import { NavigationProgressProvider } from "@/integrations/bprogress/navigation-progress-provider";
import { cn } from "@/lib/utils";

import "@/app/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");

  return {
    applicationName,
    description: t("description"),
    metadataBase: applicationUrl,
    robots: {
      follow: true,
      googleBot: {
        follow: true,
        index: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
      index: true,
    },
    title: {
      default: t("title"),
      template: `%s | ${applicationName}`,
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  const direction = getLocaleDirection(locale);

  return (
    <html
      className={cn("font-sans", geist.variable, notoKufiArabic.variable)}
      data-scroll-behavior="smooth"
      dir={direction}
      lang={locale}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          defaultTheme="system"
          disableTransitionOnChange="background-color 0s, border-color 0s, color 0s, fill 0s, stroke 0s"
          storage="localStorage"
          themes={APPLIED_THEMES}
        >
          <DirectionProvider direction={direction}>
            <NextIntlClientProvider>
              <DrawerProvider>
                <DrawerIndentBackground />
                <DrawerIndent>
                  <TooltipProvider>
                    <NavigationProgressProvider direction={direction}>
                      {children}
                    </NavigationProgressProvider>
                  </TooltipProvider>
                </DrawerIndent>
              </DrawerProvider>
            </NextIntlClientProvider>
          </DirectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
