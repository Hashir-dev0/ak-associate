import React from "react";
import Image from "next/image";
import { Users, Award, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AboutData } from "@/lib/db";
import { CompanyProfile } from "@/data/company";

interface AboutPreviewProps {
  about?: AboutData;
  company?: CompanyProfile;
}

export const AboutPreview: React.FC<AboutPreviewProps> = ({ about, company }) => {
  const eyebrow = about?.eyebrow || "ABOUT AK ASSOCIATES";
  const heading = about?.heading || "EXPERIENCED ENGINEERING & CONSTRUCTION CONTRACTORS";
  const storyP1 =
    about?.storyP1 ||
    "Established in 2013 in Karachi, Pakistan, AK Associates Engineers & Contractors provides turnkey civil construction, structural engineering, and general contracting services.";
  const storyP2 =
    about?.storyP2 ||
    "Certified under PEC License Category C3 by the Pakistan Engineering Council and directed by Principal Engineer Rashid Ali, we emphasize structural durability, accurate cost estimation, quality material compliance, and timely milestone handover.";
  const yearsNumber = about?.yearsBadgeNumber || company?.yearsOfExperience || "13+";
  const yearsText = about?.yearsBadgeText || "Years of Experience";
  const primaryImg = about?.primaryImage || "/assets/images/site-upscaled/2.jpeg";
  const secondaryImg = about?.secondaryImage || "/assets/images/site-upscaled/1.jpeg";

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Side: Layered Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Primary Image */}
              <div className="relative h-[360px] sm:h-[420px] w-full rounded-sm overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src={primaryImg}
                  alt="AK Associates Architectural Execution"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Smaller Overlapping Image */}
              <div className="absolute -bottom-8 -right-4 sm:-bottom-10 sm:-right-8 w-1/2 h-[200px] sm:h-[240px] rounded-sm overflow-hidden shadow-2xl border-4 border-white hidden sm:block">
                <Image
                  src={secondaryImg}
                  alt="Luxury Villa Finishing by AK Associates"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Geometric Accent Border */}
              <div className="absolute -top-4 -left-4 w-28 h-28 border-t-4 border-l-4 border-brand-500 rounded-tl-sm pointer-events-none -z-10" />

              {/* Experience Badge */}
              <div className="absolute top-6 right-6 bg-navy-950 text-white p-4 sm:p-5 rounded-sm shadow-2xl border-l-4 border-brand-500 z-10">
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-brand-400 leading-none">
                  {yearsNumber}
                </div>
                <div className="text-[10px] sm:text-xs font-display uppercase tracking-widest text-slate-300 mt-1 whitespace-pre-line">
                  {yearsText}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-0.5 w-6 bg-brand-500 rounded-full inline-block"></span>
              <span className="text-xs sm:text-sm font-display font-bold uppercase tracking-widest text-brand-500">
                {eyebrow}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase text-navy-900 leading-tight mb-6">
              {heading}
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              {storyP1}
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              {storyP2}
            </p>

            {/* Two Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 pt-4 border-t border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-sm bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-brand-500" />
                </div>
                <div>
                  <h4 className="font-display font-bold uppercase text-navy-900 text-sm tracking-wide">
                    Direct Site Supervision
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Personal oversight by Rashid Ali with hands-on quality control and PEC structural compliance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-sm bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-brand-500" />
                </div>
                <div>
                  <h4 className="font-display font-bold uppercase text-navy-900 text-sm tracking-wide">
                    Turnkey Engineering
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Rigorous material testing, transparent milestone estimates, and guaranteed on-time handover.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div>
              <Button href="/about" variant="primary" size="md">
                <span>LEARN MORE ABOUT US</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
