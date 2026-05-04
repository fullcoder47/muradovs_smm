"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CheckCircle2, ImageIcon, Loader2, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { upload as uploadBlob } from "@vercel/blob/client";
import { saveResource } from "@/app/admin/actions";
import { type ClientResourceConfig, type ResourceKey } from "@/lib/admin-config";

type FormValues = Record<string, string | number | boolean>;

function normalizeValue(value: unknown) {
  if (Array.isArray(value)) return value.join("\n");
  if (value instanceof Date) return value.toISOString();
  if (value === null || value === undefined) return "";
  return value as string | number | boolean;
}

function imageTypeFromName(file: File) {
  if (file.type) return file;

  const ext = file.name.toLowerCase().split(".").pop();
  const map: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    svg: "image/svg+xml",
    avif: "image/avif",
    heic: "image/heic",
    heif: "image/heif",
    bmp: "image/bmp",
    tif: "image/tiff",
    tiff: "image/tiff",
    ico: "image/x-icon",
  };

  const type = ext ? map[ext] : undefined;
  return type ? new File([file], file.name, { type }) : file;
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
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      config.fields
        .filter((field) => field.type === "image")
        .map((field) => [field.name, String(item?.[field.name] ?? "")])
        .filter(([, value]) => value),
    ),
  );
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
    setUploadError("");
    setUploadingField(fieldName);
    try {
      const normalizedFile = imageTypeFromName(file);
      let url = "";

      try {
        const blob = await uploadBlob(`muradovs-smm/${normalizedFile.name}`, normalizedFile, {
          access: "public",
          handleUploadUrl: "/api/upload/blob",
        });
        url = blob.url;
      } catch {
        const form = new FormData();
        form.append("file", normalizedFile);
        const response = await fetch("/api/upload", { method: "POST", body: form });
        const data = await response.json();
        if (!response.ok || !data.url) {
          throw new Error(data.error ?? "Upload amalga oshmadi");
        }
        url = data.url;
      }

      setValue(fieldName, url, { shouldDirty: true, shouldValidate: true });
      setImagePreviews((current) => ({ ...current, [fieldName]: url }));
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload amalga oshmadi");
    } finally {
      setUploadingField(null);
    }
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
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-5 rounded-lg border border-white/10 bg-white/[0.04] p-5"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {config.fields.map((field, index) => {
        if (field.type === "checkbox") {
          return (
            <motion.label
              key={field.name}
              className="flex items-center gap-3 rounded-md border border-white/10 bg-black/40 p-3 text-sm"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.025 }}
            >
              <input type="checkbox" {...register(field.name)} className="h-4 w-4" />
              {field.label}
            </motion.label>
          );
        }

        if (field.type === "textarea") {
          return (
            <motion.label key={field.name} className="grid gap-2 text-sm" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.025 }}>
              {field.label}
              <textarea rows={field.name === "content" ? 10 : 4} required={field.required} {...register(field.name)} className="rounded-md border border-white/10 bg-black px-4 py-3 outline-none focus:border-blue-400" />
              {field.hint && <span className="text-xs text-slate-500">{field.hint}</span>}
            </motion.label>
          );
        }

        if (field.type === "image") {
          return (
            <motion.div key={field.name} className="grid gap-2 text-sm" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.025 }}>
              <span>{field.label}</span>
              <div className="flex flex-col gap-3 rounded-md border border-white/10 bg-black p-3 sm:flex-row sm:items-center">
                <input {...register(field.name)} placeholder="/uploads/image.png" className="min-w-0 flex-1 bg-transparent outline-none" />
                <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-4 py-2 font-bold text-black transition hover:bg-blue-100">
                  {uploadingField === field.name ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                  {uploadingField === field.name ? "Yuklanmoqda" : "Yuklash"}
                  <input
                    type="file"
                    accept="image/*,.jpg,.jpeg,.png,.webp,.gif,.svg,.avif,.heic,.heif,.bmp,.tif,.tiff,.ico"
                    className="hidden"
                    disabled={uploadingField === field.name}
                    onChange={(event) => upload(field.name, event.target.files?.[0])}
                  />
                </label>
              </div>
              {imagePreviews[field.name] ? (
                <div className="overflow-hidden rounded-md border border-white/10 bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreviews[field.name]} alt="Preview" className="h-48 w-full object-cover" />
                </div>
              ) : (
                <div className="flex h-24 items-center justify-center rounded-md border border-dashed border-white/15 text-slate-500">
                  <ImageIcon size={22} />
                </div>
              )}
              {uploadError && <p className="text-sm text-red-300">{uploadError}</p>}
            </motion.div>
          );
        }

        return (
          <motion.label key={field.name} className="grid gap-2 text-sm" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.025 }}>
            {field.label}
            <input type={field.type} required={field.required} {...register(field.name)} className="rounded-md border border-white/10 bg-black px-4 py-3 outline-none focus:border-blue-400" />
            {field.hint && <span className="text-xs text-slate-500">{field.hint}</span>}
          </motion.label>
        );
      })}

      <motion.button
        disabled={pending}
        className="rounded-full bg-blue-500 px-5 py-3 font-black text-white disabled:opacity-60"
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
      >
        {pending ? "Saqlanmoqda..." : "Saqlash"}
      </motion.button>
      {message && (
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sm text-emerald-300">
          <CheckCircle2 size={16} /> {message}
        </motion.p>
      )}
    </motion.form>
  );
}
