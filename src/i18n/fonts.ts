import { Geist, Noto_Kufi_Arabic } from "next/font/google";

export const geist = Geist({
  adjustFontFallback: false,
  subsets: ["latin"],
  variable: "--font-geist",
});

export const notoKufiArabic = Noto_Kufi_Arabic({
  adjustFontFallback: false,
  subsets: ["arabic"],
  variable: "--font-noto-kufi-arabic",
});
