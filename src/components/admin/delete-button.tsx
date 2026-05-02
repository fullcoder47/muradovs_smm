"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteResource } from "@/app/admin/actions";
import type { ResourceKey } from "@/lib/admin-config";

export function DeleteButton({ resource, id }: { resource: ResourceKey; id: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      disabled={pending}
      onClick={() => {
        if (confirm("Rostdan o'chirasizmi?")) {
          startTransition(() => deleteResource(resource, id));
        }
      }}
      className="inline-flex items-center gap-2 rounded-md border border-red-400/30 px-3 py-2 text-sm text-red-200 disabled:opacity-50"
    >
      <Trash2 size={15} /> O'chirish
    </button>
  );
}
