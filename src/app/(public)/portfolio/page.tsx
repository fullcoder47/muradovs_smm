import type { Metadata } from "next";
import { PortfolioCard } from "@/components/public/cards";
import { Section } from "@/components/public/section";
import { getPortfolioItems } from "@/lib/public-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio va case studies",
  description: "Muradovs_.smm tomonidan bajarilgan SMM case studies va natijalar.",
};

export default async function PortfolioPage() {
  const items = await getPortfolioItems();

  return (
    <Section eyebrow="Portfolio" title="Case studies" description="Biz ishlagan loyihalarda chiroyli dizayn bilan birga aniq biznes ko'rsatkichlariga e'tibor beramiz.">
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item) => <PortfolioCard key={item.id} {...item} />)}
      </div>
    </Section>
  );
}
