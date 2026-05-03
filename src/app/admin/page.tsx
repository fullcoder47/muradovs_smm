import { BarChart3, Briefcase, MessageSquare, Newspaper, Package, Tags } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [leads, services, portfolio, pricing, posts] = await Promise.all([
    prisma.lead.count().catch(() => 0),
    prisma.service.count().catch(() => 0),
    prisma.portfolio.count().catch(() => 0),
    prisma.pricingPackage.count().catch(() => 0),
    prisma.blogPost.count().catch(() => 0),
  ]);

  const cards = [
    ["Leads", leads, MessageSquare],
    ["Services", services, Package],
    ["Portfolio", portfolio, Briefcase],
    ["Pricing", pricing, Tags],
    ["Blog posts", posts, Newspaper],
  ] as const;

  const latestLeads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }).catch(() => []);

  return (
    <div>
      <h1 className="text-3xl font-black">Dashboard</h1>
      <p className="mt-2 text-slate-400">Sayt kontenti, leadlar va asosiy statistikalar.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map(([label, value, Icon]) => (
          <article key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <Icon className="text-blue-300" />
            <p className="mt-5 text-3xl font-black">{value}</p>
            <p className="text-sm text-slate-400">{label}</p>
          </article>
        ))}
      </div>
      <section className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-4 flex items-center gap-2">
          <BarChart3 className="text-amber-300" />
          <h2 className="text-xl font-bold">Oxirgi leadlar</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr><th className="py-3">Ism</th><th>Telefon</th><th>Xizmat</th><th>Status</th></tr>
            </thead>
            <tbody>
              {latestLeads.map((lead) => (
                <tr key={lead.id} className="border-t border-white/10">
                  <td className="py-3">{lead.name}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.serviceType}</td>
                  <td>{lead.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
