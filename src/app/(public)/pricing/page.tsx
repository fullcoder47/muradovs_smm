import type { Metadata } from "next";
import { PricingCard } from "@/components/public/cards";
import { Section } from "@/components/public/section";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Narxlar",
  description: "Muradovs_.smm SMM xizmatlari uchun paketlar va narxlar.",
};

export default async function PricingPage() {
  const packages = await prisma.pricingPackage.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });

  return (
    <Section eyebrow="Narxlar" title="O'sish bosqichingizga mos paket tanlang" description="Har bir paket oyma-oy tahlil, reporting va strategik optimizatsiya bilan yuritiladi.">
      <div className="grid gap-5 lg:grid-cols-3">
        {packages.map((item) => <PricingCard key={item.id} {...item} />)}
      </div>
    </Section>
  );
}
