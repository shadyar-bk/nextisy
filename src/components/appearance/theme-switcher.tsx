"use client";

import { LaptopPhoneSyncIcon, Moon02Icon, Sun01Icon } from "@hugeicons/core-free-icons";
import { useTheme } from "@wrksz/themes/client";
import { useTranslations } from "next-intl";

import { isThemePreference } from "@/components/appearance/theme";
import type { ThemePreference } from "@/components/appearance/theme";
import { Icon } from "@/components/icons/icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const THEME_OPTIONS = [
  { icon: Sun01Icon, value: "light" },
  { icon: Moon02Icon, value: "dark" },
  { icon: LaptopPhoneSyncIcon, value: "system" },
] as const;

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme<Exclude<ThemePreference, "system">>();
  const t = useTranslations("ThemeSwitcher");
  const selectedTheme = theme ?? "system";
  const selectedIcon =
    THEME_OPTIONS.find((option) => option.value === selectedTheme)?.icon ?? LaptopPhoneSyncIcon;

  function handleThemeChange(value: string) {
    if (isThemePreference(value)) {
      setTheme(value);
    }
  }

  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      <span>{t("label")}:</span>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              aria-label={t("ariaLabel")}
              size="icon"
              type="button"
              variant="outline"
            />
          }
        >
          <Icon icon={selectedIcon} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuRadioGroup
            onValueChange={handleThemeChange}
            value={selectedTheme}
          >
            {THEME_OPTIONS.map((option) => (
              <DropdownMenuRadioItem
                closeOnClick
                key={option.value}
                value={option.value}
              >
                <Icon icon={option.icon} />
                {t(option.value)}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
