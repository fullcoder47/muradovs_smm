import Link from "next/link";
import { notFound } from "next/navigation";
import { ResourceForm } from "@/components/admin/resource-form";
import { resources, type ResourceKey } from "@/lib/admin-config";

function isResource(value: string): value is ResourceKey {
  return value in resources;
}

export default async function NewResourcePage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource: rawResource } = await params;
  if (!isResource(rawResource)) notFound();
  const config = resources[rawResource];

  return (
    <div className="max-w-3xl">
      <Link href={`/admin/${rawResource}`} className="text-sm text-slate-400">← Orqaga</Link>
      <h1 className="mt-4 text-3xl font-black">Yangi: {config.label}</h1>
      <div className="mt-8">
        <ResourceForm resource={rawResource} config={config} />
      </div>
    </div>
  );
}
