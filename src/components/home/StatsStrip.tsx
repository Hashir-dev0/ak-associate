"use client";

import React, { useEffect, useState, useRef } from "react";
import { Building2, Users, Award, Wrench, ShieldCheck, CheckCircle2 } from "lucide-react";
import { statsData, StatItem } from "@/data/stats";
import { Container } from "@/components/ui/Container";

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-white opacity-90" />,
  Users: <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white opacity-90" />,
  Award: <Award className="w-8 h-8 sm:w-10 sm:h-10 text-white opacity-90" />,
  Wrench: <Wrench className="w-8 h-8 sm:w-10 sm:h-10 text-white opacity-90" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-white opacity-90" />,
  CheckCircle2: <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-white opacity-90" />,
};

const AnimatedNumber: React.FC<{ target: number }> = ({ target }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 1500;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return <span ref={elementRef}>{count.toLocaleString()}</span>;
};

export const StatsStrip: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-brand-600 via-brand-500 to-brand-700 text-white py-12 lg:py-16 shadow-xl relative overflow-hidden">
      {/* Subtle decorative geometric overlay */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-10 pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-3 transform transition-transform group-hover:scale-110 duration-300">
                {iconMap[stat.iconName]}
              </div>

              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight leading-none text-white drop-shadow-sm">
                <AnimatedNumber target={stat.value} />
                <span className="text-brand-200">{stat.suffix}</span>
              </div>

              <div className="text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-slate-100 mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
