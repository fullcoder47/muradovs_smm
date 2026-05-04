"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { localStoreEnabled, saveLocalLead } from "@/lib/local-store";
import { leadSchema } from "@/lib/validations";

export async function createLead(_: { ok: boolean; message: string }, formData: FormData) {
  const parsed = leadSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { ok: false, message: "Ma'lumotlarni tekshirib qayta yuboring." };
  }

  try {
    await prisma.lead.create({ data: parsed.data });
    revalidatePath("/admin/leads");
  } catch {
    if (!localStoreEnabled()) {
      return { ok: false, message: "Databasega ulanishda xatolik. Iltimos keyinroq urinib ko'ring." };
    }

    await saveLocalLead(parsed.data);
    return {
      ok: true,
      message: "Ariza local demo storagega saqlandi. PostgreSQL ulanganda DBga yoziladi.",
    };
  }

  return { ok: true, message: "Rahmat! Arizangiz qabul qilindi. Tez orada bog'lanamiz." };
}
