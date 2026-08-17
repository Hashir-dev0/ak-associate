"use client";

import React from "react";
import Link from "next/link";
import { 
  HardHat, 
  Compass, 
  Hammer, 
  Layout, 
  Truck, 
  ClipboardCheck, 
  ArrowRight 
} from "lucide-react";
import { ServiceItem } from "@/data/services";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: ServiceItem;
  isFeatured?: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  HardHat: <HardHat className="w-8 h-8" />,
  Compass: <Compass className="w-8 h-8" />,
  Hammer: <Hammer className="w-8 h-8" />,
  Layout: <Layout className="w-8 h-8" />,
  Truck: <Truck className="w-8 h-8" />,
  ClipboardCheck: <ClipboardCheck className="w-8 h-8" />,
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isFeatured = false,
}) => {
  return (
    <div
      className={cn(
        "group relative p-8 rounded-sm transition-all duration-300 flex flex-col justify-between border",
        isFeatured
          ? "bg-brand-500 text-white border-brand-400 shadow-xl shadow-brand-500/20"
          : "bg-white text-navy-900 border-slate-200/80 hover:bg-brand-500 hover:text-white hover:border-brand-400 hover:shadow-xl hover:shadow-brand-500/20 shadow-sm"
      )}
    >
      <div>
        {/* Icon */}
        <div
          className={cn(
            "w-14 h-14 rounded-sm flex items-center justify-center mb-6 transition-colors duration-300",
            isFeatured
              ? "bg-white/15 text-white"
              : "bg-brand-50 text-brand-500 group-hover:bg-white/15 group-hover:text-white"
          )}
        >
          {iconMap[service.iconName] || <HardHat className="w-8 h-8" />}
        </div>

        {/* Title */}
        <h3 className="text-xl font-display font-bold uppercase tracking-tight mb-3">
          {service.title}
        </h3>

        {/* Description */}
        <p
          className={cn(
            "text-sm leading-relaxed mb-6 transition-colors duration-300",
            isFeatured
              ? "text-slate-100"
              : "text-slate-600 group-hover:text-slate-100"
          )}
        >
          {service.shortDescription}
        </p>

        {/* Bullet capabilities preview */}
        <ul className="space-y-1.5 mb-8">
          {service.capabilities.slice(0, 2).map((cap, idx) => (
            <li
              key={idx}
              className={cn(
                "text-xs flex items-center gap-2 transition-colors duration-300",
                isFeatured
                  ? "text-slate-200"
                  : "text-slate-500 group-hover:text-slate-200"
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75"></span>
              <span>{cap}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Action with Dark Square Arrow Button */}
      <div className="flex items-center justify-between pt-4 border-t border-current/10">
        <Link
          href={`/services#${service.slug}`}
          className="text-xs font-display font-bold uppercase tracking-wider flex items-center gap-2"
        >
          <span>Explore Details</span>
        </Link>
        <Link
          href={`/services#${service.slug}`}
          className={cn(
            "w-10 h-10 rounded-sm flex items-center justify-center transition-all duration-300 shrink-0",
            isFeatured
              ? "bg-navy-950 text-white group-hover:bg-navy-900"
              : "bg-navy-900 text-white group-hover:bg-navy-950 group-hover:translate-x-1"
          )}
          aria-label={`View details for ${service.title}`}
        >
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
};
