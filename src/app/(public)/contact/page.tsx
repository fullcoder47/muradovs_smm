import type { Metadata } from "next";
import { LeadForm } from "@/components/public/lead-form";
import { Section } from "@/components/public/section";
import { t } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { getSettings } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Aloqa",
  description: "Muradovs_.smm bilan bog'lanish va SMM konsultatsiya olish.",
};

export default async function ContactPage() {
  const [locale, settings] = await Promise.all([getLocale(), getSettings()]);
  const siteName = settings.site_name ?? "Muradovs_.smm";
  const phone = settings.phone ?? "+998 90 000 00 00";
  const telegram = settings.telegram ?? "https://t.me/muradovs_smm";
  const instagram = settings.instagram ?? "https://instagram.com/muradovs_.smm";

  return (
    <Section eyebrow={t(locale, "contact")} title={t(locale, "contactPageTitle")} description={t(locale, "contactPageText")}>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
          <p className="font-bold">{siteName}</p>
          <p className="mt-4 text-slate-400">Telegram: {telegram}</p>
          <p className="mt-2 text-slate-400">Instagram: {instagram}</p>
          <p className="mt-2 text-slate-400">Telefon: {phone}</p>
        </div>
        <LeadForm />
      </div>
    </Section>
  );
}
