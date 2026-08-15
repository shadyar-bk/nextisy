import { FileNotFoundIcon, Home01Icon } from "@hugeicons/core-free-icons";
import { getTranslations } from "next-intl/server";

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

export default async function NotFound() {
  const t = await getTranslations("NotFoundPage");

  return (
    <main className="grid flex-1 place-items-center p-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Icon
              icon={FileNotFoundIcon}
              size={20}
            />
          </EmptyMedia>
          <p className="text-sm font-medium text-muted-foreground">{t("eyebrow")}</p>
          <EmptyTitle>
            <h1>{t("title")}</h1>
          </EmptyTitle>
          <EmptyDescription>{t("description")}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button
            nativeButton={false}
            render={<Link href="/" />}
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
