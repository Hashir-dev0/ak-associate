"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, PhoneCall, ChevronRight } from "lucide-react";
import { companyData } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { name: "HOME", href: "/" },
  { name: "ABOUT US", href: "/about" },
  { name: "SERVICES", href: "/services" },
  { name: "PROJECTS", href: "/projects" },
  { name: "CONTACT US", href: "/contact" },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200/80"
          : "bg-white py-4 border-b border-slate-100"
      }`}
    >
      <Container className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-12 w-48 sm:w-56 transition-transform duration-300 group-hover:scale-[1.02]">
            <Image
              src={companyData.logo}
              alt={companyData.name}
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative font-display font-bold text-sm tracking-wider uppercase transition-colors duration-200 py-1 ${
                  isActive
                    ? "text-brand-500 font-extrabold"
                    : "text-navy-900 hover:text-brand-500"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 rounded-full animate-in fade-in duration-300" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Button
            href="/contact"
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <PhoneCall className="w-4 h-4 mr-1.5" />
            GET A QUOTE
          </Button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-navy-900 hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-sm"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[73px] bg-white border-b border-slate-200 shadow-xl p-6 transition-all duration-300 z-50">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center justify-between font-display font-bold text-base tracking-wider py-2.5 px-3 rounded-sm ${
                    isActive
                      ? "bg-brand-50 text-brand-500"
                      : "text-navy-900 hover:bg-slate-50 hover:text-brand-500"
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              );
            })}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <Button href="/contact" variant="primary" size="md" className="w-full">
                GET A FREE QUOTE
              </Button>
              <a
                href={companyData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-sm hover:bg-emerald-100 transition-colors"
              >
                Chat on WhatsApp (+92 321 3844024)
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
