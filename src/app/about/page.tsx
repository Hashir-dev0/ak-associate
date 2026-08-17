import React from "react";
import Image from "next/image";
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Target, 
  Eye, 
  PhoneCall 
} from "lucide-react";
import { getAboutData, getCompanyData } from "@/lib/db";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Us — Engineering Heritage & PEC C3 Certification",
  description: "Learn about AK Associates Engineers & Contractors, established in 2013 in Karachi, Pakistan. PEC C3 licensed general contracting and civil engineering firm led by Rashid Ali.",
};

export default function AboutPage() {
  const about = getAboutData();
  const company = getCompanyData();

  return (
    <>
      {/* Subpage Hero Header */}
      <section className="relative py-20 lg:py-28 bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />
        <div className="absolute inset-0 z-0">
          <Image
            src={about.primaryImage || "/assets/images/site-upscaled/3.jpeg"}
            alt="About AK Associates"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <Container className="relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-display font-bold uppercase tracking-widest mb-4">
            <span>ABOUT OUR COMPANY</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold uppercase tracking-tight text-white mb-4">
            Engineering & Contracting Heritage
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Delivering structural durability, quality construction, and turnkey contracting in Karachi and across Pakistan since {company.yearEstablished}.
          </p>
        </Container>
      </section>

      {/* Heritage & Introduction */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Images */}
            <div className="lg:col-span-6 relative">
              <div className="relative h-[380px] sm:h-[460px] w-full rounded-sm overflow-hidden shadow-2xl border-4 border-slate-100">
                <Image
                  src={about.primaryImage}
                  alt="AK Associates Quality Construction"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute -bottom-8 -right-4 sm:-bottom-8 sm:-right-8 w-48 sm:w-56 p-4 sm:p-5 rounded-sm bg-navy-950 text-white shadow-2xl border-l-4 border-brand-500">
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-brand-400">
                  {company.pecCategory}
                </div>
                <div className="text-[11px] font-display uppercase tracking-widest text-slate-300 mt-1">
                  Pakistan Engineering Council Certified
                </div>
              </div>
            </div>

            {/* Right: Text Story */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-6 bg-brand-500 rounded-full inline-block"></span>
                <span className="text-xs sm:text-sm font-display font-bold uppercase tracking-widest text-brand-500">
                  {about.eyebrow}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-display font-extrabold uppercase text-navy-900 leading-tight">
                {about.heading}
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {about.storyP1}
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {about.storyP2}
              </p>

              {/* PEC Certificate Box */}
              <div className="p-6 rounded-sm bg-surface-100 border border-slate-200 space-y-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-brand-500 shrink-0" />
                  <div>
                    <h4 className="font-display font-bold uppercase text-navy-900 text-sm">
                      Official Registration Details
                    </h4>
                    <p className="text-xs text-slate-500">
                      {about.pecDetails}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Head Office: {company.address} | Place of Registration: {company.city}, {company.country}.
                </p>
              </div>

              <div>
                <Button href="/contact" variant="primary" size="md">
                  <PhoneCall className="w-4 h-4 mr-2" />
                  Connect with {company.contactPerson}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission, Vision & Core Values */}
      <section className="py-20 bg-cube-pattern">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-md">
              <div className="w-12 h-12 rounded-sm bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-500 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold uppercase text-navy-900 mb-3">
                Our Mission
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {about.mission}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-md">
              <div className="w-12 h-12 rounded-sm bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-500 mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold uppercase text-navy-900 mb-3">
                Our Vision
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {about.vision}
              </p>
            </div>

            {/* Values */}
            <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-md">
              <div className="w-12 h-12 rounded-sm bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-500 mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold uppercase text-navy-900 mb-3">
                Our Core Values
              </h3>
              <ul className="space-y-2 text-slate-600 text-xs sm:text-sm">
                {about.coreValues.map((val, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                    <span>{val}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership & Engineering Expertise */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="h-0.5 w-6 bg-brand-500 rounded-full inline-block"></span>
              <span className="text-xs sm:text-sm font-display font-bold uppercase tracking-widest text-brand-500">
                COMPANY LEADERSHIP
              </span>
              <span className="h-0.5 w-6 bg-brand-500 rounded-full inline-block"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold uppercase text-navy-900">
              Direct Engineering Leadership
            </h2>
          </div>

          <div className="max-w-4xl mx-auto bg-navy-950 text-white rounded-sm overflow-hidden shadow-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-5 relative min-h-[300px] bg-slate-900">
              <Image
                src={about.secondaryImage || "/assets/images/site-upscaled/2.jpeg"}
                alt="Rashid Ali - AK Associates"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
            </div>

            <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
              <div className="inline-block bg-brand-500/20 text-brand-400 text-xs font-display font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm w-max mb-3 border border-brand-500/30">
                Principal Executive
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-white">
                {company.contactPerson}
              </h3>
              <p className="text-brand-300 text-xs font-medium uppercase tracking-wider mb-4">
                Managing Director & Chief Engineer
              </p>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                With comprehensive industry tenure across civil infrastructure, residential architecture, and industrial development in Karachi, Rashid Ali directs all project planning, structural compliance, and client relationships with hands-on dedication.
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-300 font-display">
                <a
                  href={`tel:${company.phone}`}
                  className="hover:text-brand-400 font-bold transition-colors"
                >
                  Direct: {company.displayPhone}
                </a>
                <span>•</span>
                <a
                  href={`mailto:${company.email}`}
                  className="hover:text-brand-400 transition-colors"
                >
                  {company.email}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
