export const APPLIED_THEMES = ["light", "dark"] as const;

export type ThemePreference = (typeof APPLIED_THEMES)[number] | "system";

export function isThemePreference(value: string): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}
