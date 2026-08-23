"use client";

import { Alert02Icon, Home01Icon, RefreshIcon } from "@hugeicons/core-free-icons";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { Icon } from "@/components/icons/icon";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Link } from "@/i18n/navigation";

interface ErrorPageProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function ErrorPage({ error, retry }: ErrorPageProps) {
  const t = useTranslations("ErrorPage");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      aria-labelledby="route-error-heading"
      className="grid flex-1 place-items-center p-6"
    >
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Icon
              icon={Alert02Icon}
              size={20}
            />
          </EmptyMedia>
          <p className="text-sm font-medium text-muted-foreground">{t("eyebrow")}</p>
          <EmptyTitle>
            <h1 id="route-error-heading">{t("title")}</h1>
          </EmptyTitle>
          <EmptyDescription aria-live="polite">{t("description")}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row flex-wrap justify-center">
          <Button
            onClick={retry}
            type="button"
          >
            <Icon
              data-icon="inline-start"
              icon={RefreshIcon}
            />
            {t("retry")}
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/" />}
            variant="outline"
          >
            <Icon
              data-icon="inline-start"
              icon={Home01Icon}
            />
            {t("home")}
          </Button>
        </EmptyContent>
      </Empty>
    </main>
  );
}
