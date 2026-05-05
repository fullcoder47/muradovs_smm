"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

export function MobileMenu({
  nav,
  consultationLabel,
}: {
  nav: [string, string][];
  consultationLabel: string;
}) {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="rounded-full border border-white/15 p-2 text-slate-200 transition hover:border-blue-300 hover:text-white"
        aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full border-b border-white/10 bg-black/95 px-4 py-4 shadow-2xl shadow-black/40 backdrop-blur-xl sm:px-6">
          <nav className="mx-auto grid max-w-7xl gap-2">
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={close}
                className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-300/60 hover:bg-blue-400/10"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={close}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-blue-200"
            >
              {consultationLabel} <ArrowRight size={16} />
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
