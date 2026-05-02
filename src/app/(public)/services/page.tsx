import type { Metadata } from "next";
import { ServiceCard } from "@/components/public/cards";
import { LeadForm } from "@/components/public/lead-form";
import { Section } from "@/components/public/section";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Xizmatlar",
  description: "Muradovs_.smm xizmatlari: SMM strategiya, kontent production, target reklama va to'liq boshqaruv.",
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });

  return (
    <>
      <Section eyebrow="Xizmatlar" title="SMM o'sish uchun kerakli barcha yo'nalishlar" description="Har bir xizmat biznes maqsadingiz, auditoriyangiz va sotuv jarayoningizga moslab quriladi.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => <ServiceCard key={service.id} {...service} />)}
        </div>
      </Section>
      <Section className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-black">Qaysi xizmat mosligini bilmayapsizmi?</h2>
          <p className="mt-4 leading-7 text-slate-400">Ariza qoldiring, profil va biznes holatingizga qarab eng to'g'ri paketni tavsiya qilamiz.</p>
        </div>
        <LeadForm />
      </Section>
    </>
  );
}
