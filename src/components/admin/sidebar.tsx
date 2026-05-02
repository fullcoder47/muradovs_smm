"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { BarChart3, Briefcase, HelpCircle, Home, LogOut, MessageSquare, Newspaper, Package, Settings, Star, Tags } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/leads", label: "Leads", icon: MessageSquare },
  { href: "/admin/services", label: "Services", icon: Package },
  { href: "/admin/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/admin/pricing", label: "Pricing", icon: Tags },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/faqs", label: "FAQ", icon: HelpCircle },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-r border-white/10 bg-black/70 p-4 lg:fixed lg:inset-y-0 lg:left-0 lg:w-72">
      <div className="flex items-center justify-between">
        <Link href="/admin" className="text-xl font-black">Muradovs_.smm</Link>
        <Link href="/" className="rounded-md border border-white/10 p-2" aria-label="Sayt">
          <Home size={18} />
        </Link>
      </div>
      <nav className="mt-8 grid gap-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white",
                active && "bg-blue-500 text-white",
              )}
            >
              <link.icon size={18} /> {link.label}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="mt-8 flex w-full items-center gap-3 rounded-md border border-white/10 px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/10"
      >
        <LogOut size={18} /> Chiqish
      </button>
    </aside>
  );
}
