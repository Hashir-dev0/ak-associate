import React from "react";
import { ShieldCheck, Award, UserCheck, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { companyData } from "@/data/company";

export const CredentialsSection: React.FC = () => {
  const credentials = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-500" />,
      title: `${companyData.pecCategory} Registered Firm`,
      subtitle: "Pakistan Engineering Council",
      description: "Officially licensed and certified by PEC for civil engineering, general contracting, and infrastructure works.",
    },
    {
      icon: <Award className="w-6 h-6 text-brand-500" />,
      title: `${companyData.yearsOfExperience} Industry Experience`,
      subtitle: `Established ${companyData.yearEstablished}`,
      description: "Over a decade of hands-on structural construction across residential, commercial, and industrial sectors in Karachi.",
    },
    {
      icon: <UserCheck className="w-6 h-6 text-brand-500" />,
      title: "Direct Engineering Supervision",
      subtitle: `Led by ${companyData.contactPerson}`,
      description: "Hands-on project management and quality verification on every site by our Managing Director and qualified site engineers.",
    },
    {
      icon: <MapPin className="w-6 h-6 text-brand-500" />,
      title: "Permanent Karachi Base",
      subtitle: "Korangi, Karachi Office",
      description: "Centrally based in Karachi with deep knowledge of local ground conditions, supply chains, and municipal building codes.",
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-surface-100 border-y border-slate-200">
      <Container>
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-0.5 w-6 bg-brand-500 rounded-full inline-block"></span>
            <span className="text-xs font-display font-bold uppercase tracking-widest text-brand-500">
              COMPANY CREDENTIALS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold uppercase text-navy-900 leading-tight">
            Verified Credentials & Official Registrations
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.map((cred, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-sm border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-sm bg-brand-50 border border-brand-100 flex items-center justify-center mb-4">
                  {cred.icon}
                </div>
                <h3 className="font-display font-bold uppercase text-navy-900 text-base mb-1">
                  {cred.title}
                </h3>
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider block mb-3">
                  {cred.subtitle}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {cred.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
