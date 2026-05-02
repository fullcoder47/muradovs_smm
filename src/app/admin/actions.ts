"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { resources, type ResourceKey } from "@/lib/admin-config";

function delegateFor(resource: ResourceKey) {
  return prisma[resources[resource].delegate as keyof typeof prisma] as unknown as {
    create: (args: { data: Record<string, unknown> }) => Promise<unknown>;
    update: (args: { where: { id: string }; data: Record<string, unknown> }) => Promise<unknown>;
    delete: (args: { where: { id: string } }) => Promise<unknown>;
  };
}

export async function saveResource(resource: ResourceKey, id: string | undefined, formData: FormData) {
  const config = resources[resource];
  const raw = Object.fromEntries(formData);

  for (const field of config.fields) {
    if (field.type === "checkbox") {
      raw[field.name] = formData.has(field.name) ? "true" : "false";
    }
  }

  const parsed = config.schema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, message: "Forma ma'lumotlarini tekshiring." };
  }

  const data = config.transform(parsed.data as Record<string, unknown>);
  const delegate = delegateFor(resource);

  if (id) {
    await delegate.update({ where: { id }, data });
  } else {
    await delegate.create({ data });
  }

  revalidatePath(`/admin/${resource}`);
  revalidatePath("/");
  return { ok: true, message: "Saqlandi." };
}

export async function deleteResource(resource: ResourceKey, id: string) {
  await delegateFor(resource).delete({ where: { id } });
  revalidatePath(`/admin/${resource}`);
  revalidatePath("/");
}

export async function updateLeadStatus(id: string, status: "NEW" | "CONTACTED" | "IN_PROGRESS" | "CLOSED") {
  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/admin/leads");
}
