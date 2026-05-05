"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { resources, type ResourceKey } from "@/lib/admin-config";
import { deleteLocalRecord, localStoreEnabled, saveLocalRecord } from "@/lib/local-store";

function delegateFor(resource: ResourceKey) {
  return prisma[resources[resource].delegate as keyof typeof prisma] as unknown as {
    create: (args: { data: Record<string, unknown> }) => Promise<unknown>;
    update: (args: { where: { id: string }; data: Record<string, unknown> }) => Promise<unknown>;
    delete: (args: { where: { id: string } }) => Promise<unknown>;
  };
}

async function findBySlug(resource: ResourceKey, slug: string) {
  if (resource === "services") return prisma.service.findUnique({ where: { slug }, select: { id: true } });
  if (resource === "portfolio") return prisma.portfolio.findUnique({ where: { slug }, select: { id: true } });
  if (resource === "pricing") return prisma.pricingPackage.findUnique({ where: { slug }, select: { id: true } });
  if (resource === "blog") return prisma.blogPost.findUnique({ where: { slug }, select: { id: true } });
  return null;
}

async function makeUniqueSlug(resource: ResourceKey, slug: string, currentId?: string) {
  if (!["services", "portfolio", "pricing", "blog"].includes(resource)) return slug;

  let candidate = slug;
  let counter = 2;

  while (true) {
    const existing = await findBySlug(resource, candidate);
    if (!existing || existing.id === currentId) return candidate;
    candidate = `${slug}-${counter}`;
    counter += 1;
  }
}

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/portfolio");
  revalidatePath("/pricing");
  revalidatePath("/blog");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/sitemap.xml");
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

  const data = config.transform(parsed.data as Record<string, unknown>) as Record<string, unknown>;
  const delegate = delegateFor(resource);

  try {
    if (typeof data.slug === "string") {
      data.slug = await makeUniqueSlug(resource, data.slug, id);
    }

    if (resource === "settings" && !id && typeof data.key === "string") {
      await prisma.siteSetting.upsert({
        where: { key: data.key },
        update: {
          value: String(data.value ?? ""),
          group: String(data.group ?? "general"),
        },
        create: {
          key: data.key,
          value: String(data.value ?? ""),
          group: String(data.group ?? "general"),
        },
      });
      revalidatePath(`/admin/${resource}`);
      revalidatePublic();
      return { ok: true, message: "Sozlama saqlandi." };
    }

    if (id) {
      await delegate.update({ where: { id }, data });
    } else {
      await delegate.create({ data });
    }
  } catch (error) {
    if (localStoreEnabled()) {
      await saveLocalRecord(resource, id, data);
      revalidatePath(`/admin/${resource}`);
      revalidatePublic();
      return {
        ok: true,
        message: "Local demo storagega saqlandi. PostgreSQL ulanganda Prisma orqali saqlanadi.",
      };
    }

    const message = error instanceof Error ? error.message : "Noma'lum database xatosi";
    return { ok: false, message: `Saqlanmadi: ${message}` };
  }

  revalidatePath(`/admin/${resource}`);
  revalidatePublic();
  return { ok: true, message: "Saqlandi." };
}

export async function deleteResource(resource: ResourceKey, id: string) {
  try {
    await delegateFor(resource).delete({ where: { id } });
  } catch {
    if (localStoreEnabled()) {
      await deleteLocalRecord(resource, id);
      revalidatePath(`/admin/${resource}`);
      revalidatePublic();
    }
    return;
  }
  revalidatePath(`/admin/${resource}`);
  revalidatePublic();
}

export async function updateLeadStatus(id: string, status: "NEW" | "CONTACTED" | "IN_PROGRESS" | "CLOSED") {
  try {
    await prisma.lead.update({ where: { id }, data: { status } });
  } catch {
    return;
  }
  revalidatePath("/admin/leads");
}
