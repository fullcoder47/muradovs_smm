import type { Metadata } from "next";
import { ServiceCard } from "@/components/public/cards";
import { LeadForm } from "@/components/public/lead-form";
import { Section } from "@/components/public/section";
import { t } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { getServices, localizeService } from "@/lib/public-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Xizmatlar",
  description: "Muradovs_.smm xizmatlari: SMM strategiya, kontent production, target reklama va to'liq boshqaruv.",
};

export default async function ServicesPage() {
  const locale = await getLocale();
  const services = await Promise.all((await getServices()).map((item) => localizeService(item, locale)));

  return (
    <>
      <Section eyebrow={t(locale, "services")} title={t(locale, "servicesTitle")} description={t(locale, "heroText")}>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => <ServiceCard key={service.id} {...service} />)}
        </div>
      </Section>
      <Section className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-black">{t(locale, "contactTitle")}</h2>
          <p className="mt-4 leading-7 text-slate-400">{t(locale, "contactText")}</p>
        </div>
        <LeadForm />
      </Section>
    </>
  );
}
