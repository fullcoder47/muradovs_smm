import Link from "next/link";
import { ArrowUpRight, Check, Star } from "lucide-react";

export function ServiceCard({ title, description, features }: { title: string; description: string; features: string[] }) {
  return (
    <article className="group rounded-lg border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-blue-400/50 hover:bg-white/[0.07]">
      <div className="mb-5 h-12 w-12 rounded-lg bg-blue-500/15 ring-1 ring-blue-400/30" />
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
      <ul className="mt-5 space-y-2 text-sm text-slate-300">
        {features.slice(0, 3).map((feature) => (
          <li key={feature} className="flex gap-2">
            <Check className="mt-0.5 text-blue-300" size={16} /> {feature}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function PortfolioCard({ title, summary, slug, results }: { title: string; summary: string; slug: string; results: string[] }) {
  return (
    <Link href={`/portfolio/${slug}`} className="group block rounded-lg border border-white/10 bg-slate-950 p-6 transition hover:border-amber-300/50">
      <div className="mb-6 aspect-[16/10] rounded-md bg-[linear-gradient(135deg,#1d4ed8,#0f172a_55%,#f59e0b)] opacity-90" />
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <ArrowUpRight className="shrink-0 text-slate-400 transition group-hover:text-amber-300" size={20} />
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-400">{summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {results.slice(0, 3).map((result) => (
          <span key={result} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
            {result}
          </span>
        ))}
      </div>
    </Link>
  );
}

export function PricingCard({ name, price, description, features, isPopular }: { name: string; price: string; description: string; features: string[]; isPopular: boolean }) {
  return (
    <article className={`rounded-lg border p-6 ${isPopular ? "border-blue-400 bg-blue-500/10 blue-glow" : "border-white/10 bg-white/[0.04]"}`}>
      {isPopular && <span className="rounded-full bg-blue-400 px-3 py-1 text-xs font-bold text-black">Eng ommabop</span>}
      <h3 className="mt-5 text-2xl font-black">{name}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
      <p className="mt-6 text-4xl font-black">{price}</p>
      <ul className="mt-6 space-y-3 text-sm text-slate-300">
        {features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <Check className="mt-0.5 text-amber-300" size={16} /> {feature}
          </li>
        ))}
      </ul>
      <Link href="/contact" className="mt-7 flex w-full items-center justify-center rounded-full bg-white px-4 py-3 font-bold text-black transition hover:bg-amber-200">
        Boshlash
      </Link>
    </article>
  );
}

export function TestimonialCard({ name, role, content, rating }: { name: string; role: string; content: string; rating: number }) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
      <div className="flex gap-1 text-amber-300">
        {Array.from({ length: rating }).map((_, index) => (
          <Star key={index} size={16} fill="currentColor" />
        ))}
      </div>
      <p className="mt-5 leading-7 text-slate-300">"{content}"</p>
      <p className="mt-6 font-bold">{name}</p>
      <p className="text-sm text-slate-500">{role}</p>
    </article>
  );
}
