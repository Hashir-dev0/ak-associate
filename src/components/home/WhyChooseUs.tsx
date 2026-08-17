import React from "react";
import { CheckCircle2, ShieldCheck, Clock, FileText, Wrench, Building } from "lucide-react";
import { Container } from "@/components/ui/Container";

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-brand-500 shrink-0" />,
      title: "PEC C3 Registered Engineering",
      description: "All structural designs, concrete mix formulations, and reinforcement details strictly comply with Pakistan Engineering Council codes.",
    },
    {
      icon: <Building className="w-5 h-5 text-brand-500 shrink-0" />,
      title: "Direct Engineering Supervision",
      description: "Continuous on-site inspection and direct technical leadership by Principal Engineer Rashid Ali throughout every construction phase.",
    },
    {
      icon: <FileText className="w-5 h-5 text-brand-500 shrink-0" />,
      title: "Transparent BOQ & Specifications",
      description: "Detailed, itemized bill of quantities with clear brand specifications for steel, cement, electrical, and plumbing materials.",
    },
    {
      icon: <Wrench className="w-5 h-5 text-brand-500 shrink-0" />,
      title: "Turnkey Contracting Accountability",
      description: "Complete end-to-end execution from ground excavation to final MEP commissioning under a single, responsible contractor.",
    },
    {
      icon: <Clock className="w-5 h-5 text-brand-500 shrink-0" />,
      title: "Milestone-Based Scheduling",
      description: "Structured project phases with clear milestone deliverables, keeping project progress on schedule and within agreed budgets.",
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />,
      title: "Karachi Field Experience",
      description: "Over a decade of practical knowledge in Karachi subsoil conditions, anti-termite treatments, and corrosion-resistant coastal construction.",
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-white border-b border-slate-200">
      <Container>
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-0.5 w-6 bg-brand-500 rounded-full inline-block"></span>
            <span className="text-xs font-display font-bold uppercase tracking-widest text-brand-500">
              WHY CHOOSE US
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold uppercase text-navy-900 leading-tight">
            Practical Engineering & Reliable Project Execution
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3">
            Our contracting approach is built on structural safety, clear client communication, and reliable on-site supervision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="p-6 rounded-sm bg-surface-100 border border-slate-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-sm bg-white border border-slate-200 flex items-center justify-center mb-4">
                  {reason.icon}
                </div>
                <h3 className="font-display font-bold uppercase text-navy-900 text-base mb-2">
                  {reason.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
