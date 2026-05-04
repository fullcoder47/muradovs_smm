"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

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
    <motion.form
      onSubmit={submit}
      className="w-full max-w-md rounded-lg border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-blue-500/10"
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
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
      <motion.button disabled={loading} className="mt-6 w-full rounded-full bg-blue-500 px-4 py-3 font-black text-white disabled:opacity-60" whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.98 }}>
        {loading ? "Kirilmoqda..." : "Kirish"}
      </motion.button>
      {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
    </motion.form>
  );
}
