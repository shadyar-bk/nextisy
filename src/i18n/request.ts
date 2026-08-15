import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locale as getRootLocale } from "next/root-params";

import { messagesByLocale } from "@/i18n/messages";
import { routing } from "@/i18n/routing";

export default getRequestConfig(async () => {
  const locale = await getRootLocale();

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return {
    locale,
    messages: messagesByLocale[locale],
  };
});
