"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Award, HardHat } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroData } from "@/lib/db";

interface HeroProps {
  data?: HeroData;
  companyInfo?: {
    name: string;
    yearsOfExperience: string;
    pecCategory: string;
  };
}

export const Hero: React.FC<HeroProps> = ({ data, companyInfo }) => {
  const badge = data?.badge || "PEC Category C3 Registered Engineering Firm";
  const headline = data?.headline || "Civil Engineering &";
  const highlightText = data?.highlightText || "General Contracting";
  const subtitle =
    data?.subtitle ||
    "AK Associates provides residential bungalow construction, commercial building development, and industrial warehouse engineering across Karachi and Pakistan with certified standards and direct on-site supervision.";
  const primaryCtaText = data?.primaryCtaText || "REQUEST A QUOTATION";
  const primaryCtaLink = data?.primaryCtaLink || "/contact";
  const secondaryCtaText = data?.secondaryCtaText || "VIEW COMPLETED PROJECTS";
  const secondaryCtaLink = data?.secondaryCtaLink || "/projects";
  const backgroundImage = data?.backgroundImage || "/assets/images/ak-headquarters-hero.png";
  const pecCategory = companyInfo?.pecCategory || "PEC - C3";
  const years = companyInfo?.yearsOfExperience || "13+";

  return (
    <section className="relative min-h-[560px] lg:min-h-[620px] flex items-center bg-navy-950 text-white overflow-hidden">
      {/* Hero Background Architectural Image with subtle gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="AK Associates Construction & Engineering"
          fill
          priority
          className="object-cover object-right-top sm:object-right md:object-center filter brightness-90 contrast-105"
        />
        {/* Layered dark gradients for maximum text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/80 md:via-navy-950/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-navy-950/30" />
      </div>

      <Container className="relative z-10 py-16 lg:py-24">
        <div className="max-w-2xl">
          {/* Eyebrow / Secondary text */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-brand-500/20 border border-brand-400/40 text-brand-300 text-xs font-display font-bold uppercase tracking-widest mb-6">
            <HardHat className="w-3.5 h-3.5 text-brand-400" />
            <span>{badge}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold uppercase tracking-tight text-white leading-tight mb-5">
            {headline} <br />
            <span className="text-brand-400">{highlightText}</span>
          </h1>

          {/* Subtitle / Company summary */}
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-8 max-w-xl">
            {subtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              href={primaryCtaLink}
              variant="primary"
              size="lg"
              className="shadow-lg"
            >
              <span>{primaryCtaText}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <Button
              href={secondaryCtaLink}
              variant="outline-white"
              size="lg"
            >
              {secondaryCtaText}
            </Button>
          </div>

          {/* Trust badges footer in hero */}
          <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs uppercase tracking-wider text-slate-300 font-display">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-400 shrink-0" />
              <span>{pecCategory} Registered</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-400 shrink-0" />
              <span>Est. 2013 ({years} Experience)</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <span className="w-2 h-2 rounded-full bg-brand-400 shrink-0"></span>
              <span>Korangi, Karachi Office</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
