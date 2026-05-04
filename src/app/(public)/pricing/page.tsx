import type { Metadata } from "next";
import { PricingCard } from "@/components/public/cards";
import { Section } from "@/components/public/section";
import { t } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { getPricingPackages, localizePricing } from "@/lib/public-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Narxlar",
  description: "Muradovs_.smm SMM xizmatlari uchun paketlar va narxlar.",
};

export default async function PricingPage() {
  const locale = await getLocale();
  const packages = await Promise.all((await getPricingPackages()).map((item) => localizePricing(item, locale)));

  return (
    <Section eyebrow={t(locale, "pricing")} title={t(locale, "pricingTitle")} description={t(locale, "benefitsTitle")}>
      <div className="grid gap-5 lg:grid-cols-3">
        {packages.map((item) => <PricingCard key={item.id} {...item} />)}
      </div>
    </Section>
  );
}
