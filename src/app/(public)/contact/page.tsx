import type { Metadata } from "next";
import { LeadForm } from "@/components/public/lead-form";
import { Section } from "@/components/public/section";

export const metadata: Metadata = {
  title: "Aloqa",
  description: "Muradovs_.smm bilan bog'lanish va SMM konsultatsiya olish.",
};

export default function ContactPage() {
  return (
    <Section eyebrow="Aloqa" title="Bepul audit uchun ariza qoldiring" description="Biz profilingiz, kontentingiz va reklama imkoniyatlarini ko'rib chiqib, keyingi aniq qadamlarni tavsiya qilamiz.">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
          <p className="font-bold">Muradovs_.smm</p>
          <p className="mt-4 text-slate-400">Telegram: @muradovs_smm</p>
          <p className="mt-2 text-slate-400">Instagram: @muradovs_.smm</p>
          <p className="mt-2 text-slate-400">Telefon: +998 90 000 00 00</p>
        </div>
        <LeadForm />
      </div>
    </Section>
  );
}
