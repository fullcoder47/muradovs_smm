"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createLead } from "@/app/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="w-full rounded-full bg-blue-500 px-6 py-4 font-black text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Yuborilmoqda..." : "Ariza yuborish"}
    </button>
  );
}

export function LeadForm() {
  const [state, action] = useActionState(createLead, { ok: false, message: "" });

  return (
    <form action={action} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          Ism
          <input name="name" required className="rounded-md border border-white/10 bg-black px-4 py-3 outline-none focus:border-blue-400" />
        </label>
        <label className="grid gap-2 text-sm">
          Telefon
          <input name="phone" required className="rounded-md border border-white/10 bg-black px-4 py-3 outline-none focus:border-blue-400" />
        </label>
        <label className="grid gap-2 text-sm">
          Telegram
          <input name="telegram" className="rounded-md border border-white/10 bg-black px-4 py-3 outline-none focus:border-blue-400" />
        </label>
        <label className="grid gap-2 text-sm">
          Biznes turi
          <input name="businessType" required className="rounded-md border border-white/10 bg-black px-4 py-3 outline-none focus:border-blue-400" />
        </label>
        <label className="grid gap-2 text-sm sm:col-span-2">
          Xizmat turi
          <select name="serviceType" required className="rounded-md border border-white/10 bg-black px-4 py-3 outline-none focus:border-blue-400">
            <option value="SMM strategiya">SMM strategiya</option>
            <option value="Kontent production">Kontent production</option>
            <option value="Target reklama">Target reklama</option>
            <option value="To'liq boshqaruv">To'liq boshqaruv</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm sm:col-span-2">
          Xabar
          <textarea name="message" rows={5} className="rounded-md border border-white/10 bg-black px-4 py-3 outline-none focus:border-blue-400" />
        </label>
      </div>
      <div className="mt-5">
        <SubmitButton />
      </div>
      {state.message && (
        <p className={`mt-4 text-sm ${state.ok ? "text-emerald-300" : "text-red-300"}`}>{state.message}</p>
      )}
    </form>
  );
}
