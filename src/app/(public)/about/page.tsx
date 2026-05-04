import type { Metadata } from "next";
import { Section } from "@/components/public/section";
import { getLocale } from "@/lib/i18n-server";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Biz haqimizda",
  description: "Muradovs_.smm agentligi haqida.",
};

export default async function AboutPage() {
  const locale = await getLocale();

  return (
    <Section eyebrow={t(locale, "about")} title={locale === "ru" ? "SMM на стыке креатива и performance" : locale === "en" ? "SMM at the intersection of creative and performance" : "SMMni ijod va performance orasidagi joyda quramiz"} description={locale === "ru" ? "Muradovs_.smm понимает реальные цели бизнеса и помогает бренду выглядеть премиально и уверенно в социальных сетях." : locale === "en" ? "Muradovs_.smm understands real business goals and helps brands look premium and trusted on social media." : "Muradovs_.smm biznesning real savdo maqsadlarini tushunib, uni ijtimoiy tarmoqlarda premium va ishonchli ko'rinishga olib chiqadigan agentlik."}>
      <div className="grid gap-5 md:grid-cols-3">
        {[
          ["01", "Tahlil", "Bozor, raqobatchi va auditoriyani ko'rib, strategiya tuzamiz."],
          ["02", "Production", "Kontent, dizayn, copy va reels formatlarini ishlab chiqamiz."],
          ["03", "Growth", "Reklama va analytics orqali natijani optimizatsiya qilamiz."],
        ].map(([num, title, text]) => (
          <article key={num} className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-black text-blue-300">{num}</p>
            <h2 className="mt-4 text-xl font-bold">{title}</h2>
            <p className="mt-3 leading-7 text-slate-400">{text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
