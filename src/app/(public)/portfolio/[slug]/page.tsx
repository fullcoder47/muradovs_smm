import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/public/section";
import { getLocale } from "@/lib/i18n-server";
import { getPortfolioBySlug, localizePortfolio } from "@/lib/public-data";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioBySlug(slug);
  if (!item) return { title: "Case study" };
  return { title: item.title, description: item.summary };
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const sourceItem = await getPortfolioBySlug(slug);
  const item = sourceItem ? await localizePortfolio(sourceItem, locale) : null;
  if (!item || !item.isActive) notFound();

  return (
    <Section eyebrow={item.category} title={item.title} description={item.summary}>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-lg bg-[linear-gradient(135deg,#2563eb,#020617_55%,#f59e0b)]">
          {item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.imageUrl} alt={item.title} className="aspect-[16/10] w-full object-cover" />
          ) : (
            <div className="aspect-[16/10]" />
          )}
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Mijoz</p>
          <p className="mt-2 text-2xl font-black">{item.client}</p>
          {item.challenge && <p className="mt-6 leading-7 text-slate-400"><span className="font-bold text-white">Vazifa:</span> {item.challenge}</p>}
          {item.solution && <p className="mt-4 leading-7 text-slate-400"><span className="font-bold text-white">Yechim:</span> {item.solution}</p>}
          <div className="mt-6 space-y-3">
            {item.results.map((result) => (
              <div key={result} className="flex gap-3 text-slate-200">
                <CheckCircle2 className="text-amber-300" size={20} /> {result}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
