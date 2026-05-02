"use client";

import { useTransition } from "react";
import { updateLeadStatus } from "@/app/admin/actions";

const statuses = ["NEW", "CONTACTED", "IN_PROGRESS", "CLOSED"] as const;

export function LeadStatusForm({ id, status }: { id: string; status: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(event) => startTransition(() => updateLeadStatus(id, event.target.value as (typeof statuses)[number]))}
      className="rounded-md border border-white/10 bg-black px-3 py-2 text-sm"
    >
      {statuses.map((item) => (
        <option key={item} value={item}>{item}</option>
      ))}
    </select>
  );
}
