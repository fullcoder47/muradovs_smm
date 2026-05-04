import type { Metadata } from "next";
import { PortfolioCard } from "@/components/public/cards";
import { Section } from "@/components/public/section";
import { t } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { getPortfolioItems, localizePortfolio } from "@/lib/public-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio va case studies",
  description: "Muradovs_.smm tomonidan bajarilgan SMM case studies va natijalar.",
};

export default async function PortfolioPage() {
  const locale = await getLocale();
  const items = await Promise.all((await getPortfolioItems()).map((item) => localizePortfolio(item, locale)));

  return (
    <Section eyebrow={t(locale, "portfolio")} title={t(locale, "portfolioTitle")} description={t(locale, "seeResults")}>
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item) => <PortfolioCard key={item.id} {...item} />)}
      </div>
    </Section>
  );
}
