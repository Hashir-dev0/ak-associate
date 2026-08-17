import React from "react";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { companyData } from "@/data/company";
import { Container } from "@/components/ui/Container";

export const TopBar: React.FC = () => {
  return (
    <div className="bg-navy-950 text-slate-300 text-xs border-b border-slate-800/80 py-2 hidden md:block">
      <Container className="flex items-center justify-between">
        {/* Left side: Contact info */}
        <div className="flex items-center gap-6">
          <a
            href={`tel:${companyData.phone}`}
            className="flex items-center gap-2 hover:text-brand-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-brand-400" />
            <span className="tracking-wide">{companyData.displayPhone}</span>
            <span className="text-slate-500 font-normal">({companyData.contactPerson})</span>
          </a>

          <a
            href={`mailto:${companyData.email}`}
            className="flex items-center gap-2 hover:text-brand-400 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-brand-400" />
            <span>{companyData.email}</span>
          </a>

          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-brand-400" />
            <span>{companyData.businessHours}</span>
          </div>
        </div>

        {/* Right side: License & Location */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-brand-400" />
            <span>{companyData.city}, {companyData.country}</span>
          </div>
          <span className="text-slate-700">|</span>
          <span className="bg-brand-500/10 border border-brand-500/30 text-brand-400 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wider">
            {companyData.pecCategory}
          </span>
        </div>
      </Container>
    </div>
  );
};
