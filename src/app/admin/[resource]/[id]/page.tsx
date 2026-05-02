import Link from "next/link";
import { notFound } from "next/navigation";
import { ResourceForm } from "@/components/admin/resource-form";
import { prisma } from "@/lib/prisma";
import { resources, type ResourceKey } from "@/lib/admin-config";

export const dynamic = "force-dynamic";

function isResource(value: string): value is ResourceKey {
  return value in resources;
}

function getDelegate(resource: ResourceKey) {
  return prisma[resources[resource].delegate as keyof typeof prisma] as unknown as {
    findUnique: (args: { where: { id: string } }) => Promise<Record<string, unknown> | null>;
  };
}

export default async function EditResourcePage({ params }: { params: Promise<{ resource: string; id: string }> }) {
  const { resource: rawResource, id } = await params;
  if (!isResource(rawResource)) notFound();

  const item = await getDelegate(rawResource).findUnique({ where: { id } });
  if (!item) notFound();

  const config = resources[rawResource];

  return (
    <div className="max-w-3xl">
      <Link href={`/admin/${rawResource}`} className="text-sm text-slate-400">← Orqaga</Link>
      <h1 className="mt-4 text-3xl font-black">Edit: {config.label}</h1>
      <div className="mt-8">
        <ResourceForm resource={rawResource} config={config} item={item} />
      </div>
    </div>
  );
}
