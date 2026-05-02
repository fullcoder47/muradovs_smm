import type { Metadata } from "next";
import { Section } from "@/components/public/section";

export const metadata: Metadata = {
  title: "Biz haqimizda",
  description: "Muradovs_.smm agentligi haqida.",
};

export default function AboutPage() {
  return (
    <Section eyebrow="Biz haqimizda" title="SMMni ijod va performance orasidagi joyda quramiz" description="Muradovs_.smm biznesning real savdo maqsadlarini tushunib, uni ijtimoiy tarmoqlarda premium va ishonchli ko'rinishga olib chiqadigan agentlik.">
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
