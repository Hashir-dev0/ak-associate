"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  FolderKanban,
  Wrench,
  Info,
  Star,
  Newspaper,
  Building,
  Image as ImageIcon,
  MessageSquare,
  LogOut,
  ExternalLink,
  ShieldCheck,
  X
} from "lucide-react";
import { companyData } from "@/data/company";

export const ADMIN_NAV_ITEMS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Hero Section", href: "/admin/hero", icon: Sparkles },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Services", href: "/admin/services", icon: Wrench },
  { name: "About Section", href: "/admin/about", icon: Info },
  { name: "Testimonials", href: "/admin/testimonials", icon: Star },
  { name: "News / Articles", href: "/admin/news", icon: Newspaper },
  { name: "Company Profile", href: "/admin/company", icon: Building },
  { name: "Media Library", href: "/admin/media", icon: ImageIcon },
  { name: "Inquiries Inbox", href: "/admin/messages", icon: MessageSquare },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      router.push("/admin/login");
    }
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-navy-950/70 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy-950 text-white flex flex-col justify-between p-5 transition-transform duration-300 md:translate-x-0 md:static md:inset-auto shrink-0 border-r border-slate-800 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="bg-white/95 p-2 rounded inline-block mb-2">
                <div className="relative h-8 w-36">
                  <Image
                    src={companyData.logo}
                    alt={companyData.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-display font-bold uppercase tracking-widest text-brand-400">
                <ShieldCheck className="w-3 h-3" />
                <span>Admin CMS Portal</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="md:hidden p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
            {ADMIN_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2 rounded-sm font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-brand-500 text-white shadow-md shadow-brand-500/25"
                      : "text-slate-300 hover:bg-navy-900 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Info & Footer */}
          <div className="pt-4 mt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center gap-3 px-1">
              <div className="w-8 h-8 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-400 flex items-center justify-center font-bold text-xs">
                RA
              </div>
              <div className="truncate">
                <div className="font-display font-bold uppercase text-xs text-white truncate">
                  Rashid Ali
                </div>
                <div className="text-[10px] text-slate-400 truncate">Administrator</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <Link
                href="/"
                target="_blank"
                className="text-slate-400 hover:text-brand-400 flex items-center gap-1 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Site</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors font-medium"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
