import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";

import { applicationName } from "@/app/site-metadata";
import { getLocaleDirection } from "@/i18n/locale";
import { messagesByLocale } from "@/i18n/messages";
import { routing } from "@/i18n/routing";

const arabicFonts = googleFonts([{ name: "Noto Kufi Arabic", weight: [400, 700] }]);
const sansSerif = "Geist";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale: requestedLocale } = await params;
  const locale = routing.locales.find((candidate) => candidate === requestedLocale);

  if (!locale) {
    return new Response("Not found", { status: 404 });
  }

  const { description, title } = messagesByLocale[locale].Metadata;
  const isRtl = getLocaleDirection(locale) === "rtl";

  return new ImageResponse(
    <div
      lang={locale}
      tw="flex h-full w-full flex-col justify-between bg-[#0a0a0a] px-20 py-[72px] text-[#fafafa]"
      style={{
        direction: isRtl ? "rtl" : "ltr",
        fontFamily: isRtl ? "Noto Kufi Arabic" : sansSerif,
      }}
    >
      <div
        tw="flex items-center gap-6"
        style={{ direction: "ltr", fontFamily: sansSerif }}
      >
        <div tw="flex h-[72px] w-[72px] items-center justify-center rounded-[18px] bg-[#fafafa] text-[44px] font-bold text-[#0a0a0a]">
          <svg
            aria-hidden="true"
            height="48"
            viewBox="0 0 64 64"
            width="48"
          >
            <path
              d="M10 56V8h12l24 31V8h12v48H46L22 25v31z"
              fill="#0a0a0a"
            />
          </svg>
        </div>
        <div tw="text-[34px] font-bold">{applicationName}</div>
      </div>

      <div tw="flex flex-col gap-7">
        <div tw="text-[68px] font-bold leading-[1.2]">{title}</div>
        <div tw="text-[30px] leading-[1.5] text-[#a3a3a3]">{description}</div>
      </div>

      <div
        tw="text-2xl tracking-[0.08em] text-[#737373]"
        style={{ direction: "ltr", fontFamily: sansSerif }}
      >
        {locale}
      </div>
    </div>,
    {
      fonts: isRtl ? arabicFonts : undefined,
      headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" },
      height: 630,
      lang: locale,
      width: 1200,
    }
  );
}
