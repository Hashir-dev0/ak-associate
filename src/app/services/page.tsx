import React from "react";
import Image from "next/image";
import { 
  HardHat, 
  Compass, 
  Hammer, 
  Layout, 
  Truck, 
  ClipboardCheck, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall 
} from "lucide-react";
import { getServicesData, getCompanyData } from "@/lib/db";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Services & Capabilities — Civil Engineering & General Contracting",
  description: "Comprehensive construction and engineering services by AK Associates: New Construction, Design-Build, Remodeling, Interior Design, Site Improvements, and Construction Consulting.",
};

const serviceImages: Record<string, string> = {
  "new-construction": "/assets/images/site-upscaled/1.jpeg",
  "design-build": "/assets/images/site-upscaled/2.jpeg",
  "remodel-renovations": "/assets/images/extracted/SITE PICTURES_page_3.png",
  "interior-design": "/assets/images/extracted/SITE PICTURES_page_1.png",
  "site-improvements": "/assets/images/site-upscaled/8.jpeg",
  "construction-consult": "/assets/images/site-upscaled/3.jpeg",
};

const iconMap: Record<string, React.ReactNode> = {
  HardHat: <HardHat className="w-8 h-8" />,
  Compass: <Compass className="w-8 h-8" />,
  Hammer: <Hammer className="w-8 h-8" />,
  Layout: <Layout className="w-8 h-8" />,
  Truck: <Truck className="w-8 h-8" />,
  ClipboardCheck: <ClipboardCheck className="w-8 h-8" />,
};

export default function ServicesPage() {
  const services = getServicesData();
  const company = getCompanyData();

  return (
    <>
      {/* Subpage Header */}
      <section className="relative py-20 lg:py-28 bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/site-upscaled/4.jpeg"
            alt="AK Associates Construction Services"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <Container className="relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-display font-bold uppercase tracking-widest mb-4">
            <span>ENGINEERING & CONTRACTING</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold uppercase tracking-tight text-white mb-4">
            Our Services & Capabilities
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            High-grade construction solutions for residential bungalows, commercial complexes, and industrial infrastructure with certified {company.pecCategory} standards.
          </p>
        </Container>
      </section>

      {/* Services List Detail */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <div className="space-y-20 lg:space-y-28">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              const imgPath = serviceImages[service.slug] || "/assets/images/site-upscaled/1.jpeg";

              return (
                <div
                  key={service.id}
                  id={service.slug}
                  className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
                >
                  {/* Image Column */}
                  <div
                    className={`lg:col-span-6 relative ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="relative h-[340px] sm:h-[420px] w-full rounded-sm overflow-hidden shadow-xl border-4 border-slate-100">
                      <Image
                        src={imgPath}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -top-4 -left-4 w-20 h-20 border-t-4 border-l-4 border-brand-500 rounded-tl-sm pointer-events-none -z-10" />
                  </div>

                  {/* Content Column */}
                  <div
                    className={`lg:col-span-6 space-y-6 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-sm bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-500 shrink-0">
                        {iconMap[service.iconName] || <HardHat className="w-8 h-8" />}
                      </div>
                      <span className="text-xs font-display font-bold uppercase tracking-widest text-brand-500">
                        Service 0{index + 1}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold uppercase text-navy-900 leading-tight">
                      {service.title}
                    </h2>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {service.fullDescription}
                    </p>

                    {/* Capabilities checklist */}
                    <div className="space-y-2.5 pt-2">
                      <h4 className="font-display font-bold uppercase text-navy-900 text-xs tracking-wider">
                        Key Capabilities & Deliverables:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.capabilities.map((cap, cIdx) => (
                          <div
                            key={cIdx}
                            className="flex items-center gap-2 text-xs text-slate-700 font-medium"
                          >
                            <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <Button
                        href={`/contact?service=${encodeURIComponent(service.title)}`}
                        variant="primary"
                        size="sm"
                      >
                        Request Quote for {service.title}
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Button>
                      <a
                        href={company.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-700"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Instant WhatsApp Inquiry</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Engineering Process Banner */}
      <section className="py-20 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />
        <Container className="relative z-10 text-center">
          <div className="max-w-3xl mx-auto mb-12">
            <span className="text-xs font-display font-bold uppercase tracking-widest text-brand-400 block mb-2">
              OUR METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold uppercase text-white">
              The AK Associates Engineering Process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-sm bg-navy-900/80 border border-slate-800 text-left">
              <span className="font-display font-extrabold text-3xl text-brand-400 block mb-2">
                01
              </span>
              <h3 className="font-display font-bold uppercase text-white text-base mb-2">
                Site Audit & BOQ
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Initial topographic survey, soil analysis, architectural review, and itemized bill of quantities.
              </p>
            </div>

            <div className="p-6 rounded-sm bg-navy-900/80 border border-slate-800 text-left">
              <span className="font-display font-extrabold text-3xl text-brand-400 block mb-2">
                02
              </span>
              <h3 className="font-display font-bold uppercase text-white text-base mb-2">
                Structural Design
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                PEC-compliant CAD drawings, structural modeling, MEP routing, and material specification.
              </p>
            </div>

            <div className="p-6 rounded-sm bg-navy-900/80 border border-slate-800 text-left">
              <span className="font-display font-extrabold text-3xl text-brand-400 block mb-2">
                03
              </span>
              <h3 className="font-display font-bold uppercase text-white text-base mb-2">
                Precision Execution
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                On-site engineering supervision, concrete cube testing, steel placement, and milestone tracking.
              </p>
            </div>

            <div className="p-6 rounded-sm bg-navy-900/80 border border-slate-800 text-left">
              <span className="font-display font-extrabold text-3xl text-brand-400 block mb-2">
                04
              </span>
              <h3 className="font-display font-bold uppercase text-white text-base mb-2">
                Turnkey Handover
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rigorous quality inspection, MEP commissioning, post-completion warranty, and final client sign-off.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
