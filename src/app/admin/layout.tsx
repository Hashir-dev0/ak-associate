"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { ShieldCheck, Menu } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Render clean layout without sidebar on login page
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-navy-950">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-navy-950 text-white p-4 flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-brand-400" />
          <span className="font-display font-bold uppercase text-sm tracking-wider">
            AK CMS Admin
          </span>
        </div>
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded bg-navy-900 text-slate-200"
          aria-label="Open Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Admin Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
