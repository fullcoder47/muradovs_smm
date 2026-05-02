import { LeadStatusForm } from "@/components/admin/lead-status-form";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-3xl font-black">Leads</h1>
      <p className="mt-2 text-slate-400">Saytdan kelgan arizalarni boshqaring.</p>
      <div className="mt-8 overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-white/[0.04] text-slate-400">
            <tr>
              <th className="p-4">Ism</th><th>Telefon</th><th>Telegram</th><th>Biznes</th><th>Xizmat</th><th>Status</th><th>Sana</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t border-white/10">
                <td className="p-4 font-semibold">{lead.name}</td>
                <td>{lead.phone}</td>
                <td>{lead.telegram}</td>
                <td>{lead.businessType}</td>
                <td>{lead.serviceType}</td>
                <td><LeadStatusForm id={lead.id} status={lead.status} /></td>
                <td>{lead.createdAt.toLocaleDateString("uz-UZ")}</td>
              </tr>
            ))}
            {leads.length === 0 && <tr><td colSpan={7} className="p-8 text-center text-slate-500">Hali lead yo'q.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
