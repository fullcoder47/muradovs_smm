"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import { saveResource } from "@/app/admin/actions";
import { type ClientResourceConfig, type ResourceKey } from "@/lib/admin-config";

type FormValues = Record<string, string | number | boolean>;

function normalizeValue(value: unknown) {
  if (Array.isArray(value)) return value.join("\n");
  if (value instanceof Date) return value.toISOString();
  if (value === null || value === undefined) return "";
  return value as string | number | boolean;
}

export function ResourceForm({
  resource,
  config,
  item,
}: {
  resource: ResourceKey;
  config: ClientResourceConfig;
  item?: Record<string, unknown>;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const { register, setValue, handleSubmit } = useForm<FormValues>({
    defaultValues: Object.fromEntries(
      config.fields.map((field) => [
        field.name,
        normalizeValue(item?.[field.name] ?? config.defaults?.[field.name] ?? (field.type === "checkbox" ? false : "")),
      ]),
    ),
  });

  async function upload(fieldName: string, file?: File) {
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    const response = await fetch("/api/upload", { method: "POST", body: form });
    const data = await response.json();
    if (data.url) setValue(fieldName, data.url);
  }

  function onSubmit(values: FormValues) {
    const formData = new FormData();
    for (const field of config.fields) {
      const value = values[field.name];
      if (field.type === "checkbox") {
        if (value) formData.set(field.name, "on");
      } else {
        formData.set(field.name, String(value ?? ""));
      }
    }

    startTransition(async () => {
      const result = await saveResource(resource, item?.id as string | undefined, formData);
      setMessage(result.message);
      if (result.ok) {
        router.push(`/admin/${resource}`);
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 rounded-lg border border-white/10 bg-white/[0.04] p-5">
      {config.fields.map((field) => {
        if (field.type === "checkbox") {
          return (
            <label key={field.name} className="flex items-center gap-3 rounded-md border border-white/10 bg-black/40 p-3 text-sm">
              <input type="checkbox" {...register(field.name)} className="h-4 w-4" />
              {field.label}
            </label>
          );
        }

        if (field.type === "textarea") {
          return (
            <label key={field.name} className="grid gap-2 text-sm">
              {field.label}
              <textarea rows={field.name === "content" ? 10 : 4} required={field.required} {...register(field.name)} className="rounded-md border border-white/10 bg-black px-4 py-3 outline-none focus:border-blue-400" />
              {field.hint && <span className="text-xs text-slate-500">{field.hint}</span>}
            </label>
          );
        }

        if (field.type === "image") {
          return (
            <div key={field.name} className="grid gap-2 text-sm">
              <span>{field.label}</span>
              <div className="flex flex-col gap-3 rounded-md border border-white/10 bg-black p-3 sm:flex-row sm:items-center">
                <input {...register(field.name)} placeholder="/uploads/image.png" className="min-w-0 flex-1 bg-transparent outline-none" />
                <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-4 py-2 font-bold text-black">
                  <Upload size={16} /> Yuklash
                  <input type="file" accept="image/*" className="hidden" onChange={(event) => upload(field.name, event.target.files?.[0])} />
                </label>
              </div>
            </div>
          );
        }

        return (
          <label key={field.name} className="grid gap-2 text-sm">
            {field.label}
            <input type={field.type} required={field.required} {...register(field.name)} className="rounded-md border border-white/10 bg-black px-4 py-3 outline-none focus:border-blue-400" />
            {field.hint && <span className="text-xs text-slate-500">{field.hint}</span>}
          </label>
        );
      })}

      <button disabled={pending} className="rounded-full bg-blue-500 px-5 py-3 font-black text-white disabled:opacity-60">
        {pending ? "Saqlanmoqda..." : "Saqlash"}
      </button>
      {message && <p className="text-sm text-slate-300">{message}</p>}
    </form>
  );
}
