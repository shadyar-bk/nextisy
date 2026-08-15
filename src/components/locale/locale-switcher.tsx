"use client";

import { LanguageCircleIcon } from "@hugeicons/core-free-icons";
import { hasLocale, useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

import { Icon } from "@/components/icons/icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { localeOptions } from "@/i18n/locale";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("LocaleSwitcher");
  const [isPending, startTransition] = useTransition();

  function handleLocaleChange(nextLocale: string) {
    if (!hasLocale(routing.locales, nextLocale) || nextLocale === locale) {
      return;
    }

    startTransition(() => {
      router.replace(`${pathname}${window.location.search}`, { locale: nextLocale });
    });
  }

  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      <span>{t("label")}:</span>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              aria-busy={isPending}
              aria-label={t("ariaLabel")}
              disabled={isPending}
              size="icon"
              type="button"
              variant="outline"
            />
          }
        >
          <Icon icon={LanguageCircleIcon} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuRadioGroup
            onValueChange={handleLocaleChange}
            value={locale}
          >
            {localeOptions.map((option) => (
              <DropdownMenuRadioItem
                closeOnClick
                key={option.locale}
                value={option.locale}
              >
                <span
                  dir={option.direction}
                  lang={option.locale}
                >
                  {option.label}
                </span>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
