import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle2, Rocket, ShieldCheck, Sparkles, Target } from "lucide-react";
import { PricingCard, PortfolioCard, ServiceCard, TestimonialCard } from "@/components/public/cards";
import { LeadForm } from "@/components/public/lead-form";
import { Section } from "@/components/public/section";
import { getHomeData, localizeFaq, localizePortfolio, localizePricing, localizeService, localizeTestimonial } from "@/lib/public-data";
import { t } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

const benefits = [
  { title: "Strategiya birinchi", text: "Kontentni chiroy uchun emas, sotuv va ishonch uchun rejalaymiz.", icon: Target },
  { title: "Premium visual", text: "Brendingizni bozorda qimmat ko'rinadigan vizual tizimga olib chiqamiz.", icon: Sparkles },
  { title: "Performance nazorat", text: "Lead, konversiya va reklama samaradorligini raqamlar bilan kuzatamiz.", icon: BarChart3 },
  { title: "Tizimli jarayon", text: "Kontent-kalendar, approval, reporting va optimizatsiya tartibli yuradi.", icon: ShieldCheck },
];

export default async function HomePage() {
  const [locale, homeData] = await Promise.all([getLocale(), getHomeData()]);
  const [services, portfolio, pricing, testimonials, faqs] = await Promise.all([
    Promise.all(homeData.services.map((item) => localizeService(item, locale))),
    Promise.all(homeData.portfolio.map((item) => localizePortfolio(item, locale))),
    Promise.all(homeData.pricing.map((item) => localizePricing(item, locale))),
    Promise.all(homeData.testimonials.map((item) => localizeTestimonial(item, locale))),
    Promise.all(homeData.faqs.map((item) => localizeFaq(item, locale))),
  ]);

  return (
    <div className="overflow-hidden">
      <section className="premium-grid relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,.28),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(245,158,11,.18),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-bold text-blue-200">
              {t(locale, "heroBadge")}
            </p>
            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              {t(locale, "heroTitle")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              {t(locale, "heroText")}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-black text-black transition hover:bg-blue-200">
                {t(locale, "freeAudit")} <ArrowRight size={18} />
              </Link>
              <Link href="/portfolio" className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 font-bold text-white transition hover:border-white/40">
                {t(locale, "seeResults")}
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.05] p-5 blue-glow">
            <div className="rounded-md bg-black p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-bold">@muradovs_.smm</span>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">{t(locale, "liveGrowth")}</span>
              </div>
              <div className="grid gap-4 py-6 sm:grid-cols-3">
                {["+240%", "3.1x", "-42%"].map((item, index) => (
                  <div key={item} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-2xl font-black text-blue-300">{item}</p>
                    <p className="mt-2 text-xs text-slate-500">{["Reach", "Lead", "CPA"][index]}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {["Kontent strategiya", "Reels production", "Target reklama"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-md bg-white/[0.04] p-3 text-sm text-slate-300">
                    <CheckCircle2 className="text-amber-300" size={18} /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow={t(locale, "benefitsEyebrow")} title={t(locale, "benefitsTitle")}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
              <item.icon className="text-blue-300" />
              <h3 className="mt-5 font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow={t(locale, "services")} title={t(locale, "servicesTitle")}>
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service) => <ServiceCard key={service.id} {...service} />)}
        </div>
      </Section>

      <Section eyebrow={t(locale, "portfolio")} title={t(locale, "portfolioTitle")}>
        <div className="grid gap-5 md:grid-cols-2">
          {portfolio.map((item) => <PortfolioCard key={item.id} {...item} />)}
        </div>
      </Section>

      <Section eyebrow={t(locale, "pricing")} title={t(locale, "pricingTitle")}>
        <div className="grid gap-5 lg:grid-cols-3">
          {pricing.map((item) => <PricingCard key={item.id} {...item} />)}
        </div>
      </Section>

      <Section eyebrow={t(locale, "testimonialsEyebrow")} title={t(locale, "testimonialsTitle")}>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => <TestimonialCard key={item.id} {...item} />)}
        </div>
      </Section>

      <Section eyebrow="FAQ" title={t(locale, "faqTitle")}>
        <div className="grid gap-3">
          {faqs.map((faq) => (
            <details key={faq.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <summary className="cursor-pointer font-bold">{faq.question}</summary>
              <p className="mt-4 leading-7 text-slate-400">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-300">{t(locale, "contact")}</p>
          <h2 className="text-3xl font-black sm:text-5xl">{t(locale, "contactTitle")}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            {t(locale, "contactText")}
          </p>
          <div className="mt-8 flex items-center gap-3 text-amber-300">
            <Rocket /> {t(locale, "contactResponse")}
          </div>
        </div>
        <LeadForm />
      </Section>
    </div>
  );
}
