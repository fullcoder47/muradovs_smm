"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validations";

export async function createLead(_: { ok: boolean; message: string }, formData: FormData) {
  const parsed = leadSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { ok: false, message: "Ma'lumotlarni tekshirib qayta yuboring." };
  }

  await prisma.lead.create({ data: parsed.data });
  revalidatePath("/admin/leads");

  return { ok: true, message: "Rahmat! Arizangiz qabul qilindi. Tez orada bog'lanamiz." };
}
