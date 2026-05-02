"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#050505]">
      <AdminSidebar />
      <main className="p-4 lg:ml-72 lg:p-8">{children}</main>
    </div>
  );
}
