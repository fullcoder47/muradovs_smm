"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
      callbackUrl: params.get("callbackUrl") ?? "/admin",
    });
    setLoading(false);
    if (result?.error) {
      setError("Email yoki parol noto'g'ri.");
      return;
    }
    router.push(result?.url ?? "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="w-full max-w-md rounded-lg border border-white/10 bg-white/[0.04] p-7">
      <h1 className="text-2xl font-black">Admin login</h1>
      <p className="mt-2 text-sm text-slate-400">Kontentni boshqarish uchun tizimga kiring.</p>
      <label className="mt-6 grid gap-2 text-sm">
        Email
        <input name="email" type="email" required className="rounded-md border border-white/10 bg-black px-4 py-3 outline-none focus:border-blue-400" />
      </label>
      <label className="mt-4 grid gap-2 text-sm">
        Parol
        <input name="password" type="password" required className="rounded-md border border-white/10 bg-black px-4 py-3 outline-none focus:border-blue-400" />
      </label>
      <button disabled={loading} className="mt-6 w-full rounded-full bg-blue-500 px-4 py-3 font-black text-white disabled:opacity-60">
        {loading ? "Kirilmoqda..." : "Kirish"}
      </button>
      {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
    </form>
  );
}
