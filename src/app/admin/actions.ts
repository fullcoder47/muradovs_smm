"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { resources, type ResourceKey } from "@/lib/admin-config";
import { deleteLocalRecord, saveLocalRecord } from "@/lib/local-store";

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

  try {
    if (id) {
      await delegate.update({ where: { id }, data });
    } else {
      await delegate.create({ data });
    }
  } catch {
    await saveLocalRecord(resource, id, data);
    revalidatePath(`/admin/${resource}`);
    revalidatePath("/");
    return {
      ok: true,
      message: "Local demo storagega saqlandi. PostgreSQL ulanganda Prisma orqali saqlanadi.",
    };
  }

  revalidatePath(`/admin/${resource}`);
  revalidatePath("/");
  return { ok: true, message: "Saqlandi." };
}

export async function deleteResource(resource: ResourceKey, id: string) {
  try {
    await delegateFor(resource).delete({ where: { id } });
  } catch {
    await deleteLocalRecord(resource, id);
    revalidatePath(`/admin/${resource}`);
    revalidatePath("/");
    return;
  }
  revalidatePath(`/admin/${resource}`);
  revalidatePath("/");
}

export async function updateLeadStatus(id: string, status: "NEW" | "CONTACTED" | "IN_PROGRESS" | "CLOSED") {
  try {
    await prisma.lead.update({ where: { id }, data: { status } });
  } catch {
    return;
  }
  revalidatePath("/admin/leads");
}
