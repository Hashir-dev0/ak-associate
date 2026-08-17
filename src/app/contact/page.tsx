import React from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";
import { getCompanyData } from "@/lib/db";
import { Container } from "@/components/ui/Container";
import { EnquiryForm } from "@/components/home/EnquiryForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact Us & Project Quotation — Karachi Office",
  description: "Get in touch with Rashid Ali and the engineering team at AK Associates Engineers & Contractors. Office in Korangi, Karachi. Call 0321-3844024.",
};

export default function ContactPage() {
  const company = getCompanyData();

  return (
    <>
      {/* Contact Banner */}
      <section className="relative py-20 lg:py-28 bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/site-upscaled/3.jpeg"
            alt="Contact AK Associates"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <Container className="relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-display font-bold uppercase tracking-widest mb-4">
            <span>GET IN TOUCH</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold uppercase tracking-tight text-white mb-4">
            Let&apos;s Build Together
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Speak directly with Managing Director {company.contactPerson} to discuss your project scope, engineering consultation, or request an itemized BOQ estimation.
          </p>
        </Container>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-surface-100">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone */}
            <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm flex flex-col items-start justify-between">
              <div className="w-12 h-12 rounded-sm bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-500 mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-display uppercase tracking-wider text-slate-400 block font-semibold">
                  Call & WhatsApp
                </span>
                <a
                  href={`tel:${company.phone}`}
                  className="text-base font-bold text-navy-900 hover:text-brand-600 transition-colors block mt-1"
                >
                  {company.displayPhone}
                </a>
                <span className="text-xs text-slate-500 mt-1 block">
                  Contact: {company.contactPerson}
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm flex flex-col items-start justify-between">
              <div className="w-12 h-12 rounded-sm bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-500 mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-display uppercase tracking-wider text-slate-400 block font-semibold">
                  Official Email
                </span>
                <a
                  href={`mailto:${company.email}`}
                  className="text-sm font-bold text-navy-900 hover:text-brand-600 transition-colors block mt-1"
                >
                  {company.email}
                </a>
                <span className="text-xs text-slate-500 mt-1 block">
                  Turnaround: &lt; 24 business hours
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm flex flex-col items-start justify-between">
              <div className="w-12 h-12 rounded-sm bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-500 mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-display uppercase tracking-wider text-slate-400 block font-semibold">
                  Head Office
                </span>
                <p className="text-xs text-navy-900 font-semibold leading-snug mt-1">
                  {company.address}
                </p>
                <span className="text-xs text-slate-500 mt-1 block">
                  Mailing: {company.mailingAddress}
                </span>
              </div>
            </div>

            {/* Working Hours & PEC */}
            <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm flex flex-col items-start justify-between">
              <div className="w-12 h-12 rounded-sm bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-500 mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-display uppercase tracking-wider text-slate-400 block font-semibold">
                  Working Hours
                </span>
                <p className="text-xs text-navy-900 font-semibold mt-1">
                  {company.businessHours}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-brand-600 font-semibold mt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{company.pecCategory} Registered</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <EnquiryForm />

      {/* Google Map Section */}
      <section className="py-12 bg-white">
        <Container>
          <div className="rounded-sm overflow-hidden border border-slate-200 shadow-md">
            <iframe
              src={company.googleMapsEmbedUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AK Associates Office Map Location"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
