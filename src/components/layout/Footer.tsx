"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { companyData } from "@/data/company";
import { servicesData } from "@/data/services";
import { Container } from "@/components/ui/Container";

export const Footer: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-navy-950 text-white relative overflow-hidden border-t border-slate-800">
      {/* Blueprint background grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />

      {/* Top Contact Bar */}
      <div className="relative z-10 border-b border-slate-800/80 bg-navy-900/60 py-8">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Phone Item */}
            <div className="flex items-center gap-4 p-4 rounded-sm bg-navy-950/40 border border-slate-800/60">
              <div className="w-12 h-12 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 block font-display font-medium">
                  Give Us A Call
                </span>
                <a
                  href={`tel:${companyData.phone}`}
                  className="text-base font-bold text-white hover:text-brand-400 transition-colors"
                >
                  {companyData.displayPhone}
                </a>
              </div>
            </div>

            {/* Email Item */}
            <div className="flex items-center gap-4 p-4 rounded-sm bg-navy-950/40 border border-slate-800/60">
              <div className="w-12 h-12 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 block font-display font-medium">
                  Send An Email
                </span>
                <a
                  href={`mailto:${companyData.email}`}
                  className="text-base font-bold text-white hover:text-brand-400 transition-colors"
                >
                  {companyData.email}
                </a>
              </div>
            </div>

            {/* Location Item */}
            <div className="flex items-center gap-4 p-4 rounded-sm bg-navy-950/40 border border-slate-800/60">
              <div className="w-12 h-12 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 block font-display font-medium">
                  Office Location
                </span>
                <p className="text-sm font-semibold text-white">
                  {companyData.address}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Column 1: Company Logo & Info */}
            <div className="space-y-4">
              <div className="bg-white/95 p-3 rounded inline-block">
                <div className="relative h-12 w-48">
                  <Image
                    src={companyData.logo}
                    alt={companyData.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                AK Associates Engineers & Contractors is a premier Pakistan construction firm specializing in residential bungalows, multi-story commercial buildings, warehouses, and heavy engineering works.
              </p>
              <div className="flex items-center gap-2 text-xs text-brand-400 font-semibold uppercase tracking-wider pt-2">
                <ShieldCheck className="w-4 h-4" />
                <span>PEC License Category: {companyData.pecCategory}</span>
              </div>
            </div>

            {/* Column 2: Useful Links */}
            <div>
              <h3 className="font-display font-bold uppercase text-base text-white tracking-wider mb-5 flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-500 rounded-sm"></span>
                Useful Links
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li>
                  <Link href="/" className="hover:text-brand-400 flex items-center gap-2 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-brand-400 flex items-center gap-2 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-brand-400 flex items-center gap-2 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    Services & Capabilities
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-brand-400 flex items-center gap-2 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    Project Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-brand-400 flex items-center gap-2 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    Contact & Quotation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Our Services */}
            <div>
              <h3 className="font-display font-bold uppercase text-base text-white tracking-wider mb-5 flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-500 rounded-sm"></span>
                Our Services
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-300">
                {servicesData.map((svc) => (
                  <li key={svc.id}>
                    <Link
                      href={`/services#${svc.slug}`}
                      className="hover:text-brand-400 flex items-center gap-2 transition-colors"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      {svc.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Newsletter & WhatsApp */}
            <div>
              <h3 className="font-display font-bold uppercase text-base text-white tracking-wider mb-5 flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-500 rounded-sm"></span>
                Project Consultation
              </h3>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Connect directly with Rashid Ali for engineering consultation or quotation.
              </p>

              {subscribed ? (
                <div className="bg-brand-500/10 border border-brand-500/30 p-3 rounded text-sm text-brand-300 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>Thank you! We will get in touch shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex flex-col gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-3.5 py-2.5 rounded-sm bg-navy-900 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-brand-500"
                  />
                  <button
                    type="submit"
                    className="bg-brand-500 hover:bg-brand-600 text-white py-2 px-4 rounded-sm text-xs font-display font-bold uppercase tracking-wider transition-colors"
                  >
                    Subscribe & Inquire
                  </button>
                </form>
              )}

              <div className="mt-4">
                <a
                  href={companyData.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>Direct WhatsApp: {companyData.displayPhone}</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="relative z-10 border-t border-slate-800/80 bg-navy-950 py-6 text-xs text-slate-400">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            &copy; {new Date().getFullYear()} {companyData.name}. Registered in Karachi, Pakistan (Est. {companyData.yearEstablished}). All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">
              PEC: {companyData.pecCategory}
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
};
