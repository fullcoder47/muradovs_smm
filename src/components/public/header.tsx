import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";

const nav = [
  ["Xizmatlar", "/services"],
  ["Portfolio", "/portfolio"],
  ["Narxlar", "/pricing"],
  ["Blog", "/blog"],
  ["Biz haqimizda", "/about"],
  ["Aloqa", "/contact"],
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-black tracking-tight">
          Muradovs_<span className="text-blue-400">.smm</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-slate-300 lg:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-white">
              {label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-blue-200 sm:flex"
        >
          Konsultatsiya <ArrowRight size={16} />
        </Link>
        <button className="rounded-full border border-white/15 p-2 text-slate-200 lg:hidden" aria-label="Menu">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}
