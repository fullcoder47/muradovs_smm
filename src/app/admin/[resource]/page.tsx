import Link from "next/link";
import { notFound } from "next/navigation";
import { Edit3, Plus } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";
import { prisma } from "@/lib/prisma";
import { resources, type ResourceKey } from "@/lib/admin-config";

export const dynamic = "force-dynamic";

function isResource(value: string): value is ResourceKey {
  return value in resources;
}

function getDelegate(resource: ResourceKey) {
  return prisma[resources[resource].delegate as keyof typeof prisma] as unknown as {
    findMany: (args: { orderBy: { createdAt: "desc" } }) => Promise<Record<string, unknown>[]>;
  };
}

function cellValue(value: unknown) {
  if (typeof value === "boolean") return value ? "Ha" : "Yo'q";
  if (value instanceof Date) return value.toLocaleDateString("uz-UZ");
  if (Array.isArray(value)) return value.join(", ");
  return String(value ?? "");
}

export default async function ResourceListPage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource: rawResource } = await params;
  if (!isResource(rawResource)) notFound();
  const resource = rawResource;
  const config = resources[resource];
  const items = await getDelegate(resource).findMany({ orderBy: { createdAt: "desc" } }).catch(() => []);

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-black">{config.label}</h1>
          <p className="mt-2 text-slate-400">{config.listTitle}</p>
        </div>
        <Link href={`/admin/${resource}/new`} className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-5 py-3 font-black text-white">
          <Plus size={18} /> Yangi qo'shish
        </Link>
      </div>
      <div className="mt-8 overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-white/[0.04] text-slate-400">
            <tr>
              {config.columns.map((column) => <th key={column} className="p-4">{column}</th>)}
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id as string} className="border-t border-white/10">
                {config.columns.map((column) => <td key={column} className="p-4">{cellValue(item[column])}</td>)}
                <td className="p-4">
                  <div className="flex gap-2">
                    <Link href={`/admin/${resource}/${item.id}`} className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2">
                      <Edit3 size={15} /> Edit
                    </Link>
                    <DeleteButton resource={resource} id={item.id as string} />
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={config.columns.length + 1} className="p-8 text-center text-slate-500">Ma'lumot yo'q.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
