"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, PhoneCall } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Who is AK Associates in Pakistan?",
    answer:
      "AK Associates Engineers & Contractors is a premier civil engineering, construction, and general contracting firm established in 2013 in Karachi, Pakistan. Directed by Principal Engineer Rashid Ali and certified under Category C3 by the Pakistan Engineering Council (PEC), we specialize in turnkey industrial, commercial, and residential projects.",
  },
  {
    question: "What engineering and construction services does AK Associates provide?",
    answer:
      "We offer full-lifecycle contracting services across Karachi and Sindh: Pre-Engineered Building (PEB) steel warehouses, industrial factories, commercial multi-story plazas, luxury residential bungalows, MEP installations, structural rehabilitation, and transparent Bill of Quantities (BOQ) cost estimation.",
  },
  {
    question: "Is AK Associates officially registered with the Pakistan Engineering Council (PEC)?",
    answer:
      "Yes. AK Associates is certified under PEC Category C-3, validating our technical team, safety protocols, machinery assets, and compliance with national engineering codes.",
  },
  {
    question: "Where is AK Associates located in Karachi?",
    answer:
      "Our corporate and operations office is located at R-110 Block A, Gulshan-e-Millat, Korangi, Karachi, Pakistan. We actively supervise construction sites across Korangi Industrial Area, SITE, Port Qasim, Clifton, DHA, and Bahria Town Karachi.",
  },
  {
    question: "Who leads AK Associates Engineers & Contractors?",
    answer:
      "The firm is led by Managing Director & Principal Engineer Rashid Ali, bringing over 13 years of hands-on structural engineering, site management, and project delivery experience in Pakistan.",
  },
  {
    question: "How do I request a construction quote or schedule a site inspection?",
    answer:
      "You can submit your architectural drawings or inquiry through our contact form, or directly call/WhatsApp Rashid Ali at 0321-3844024 to receive a detailed, itemized BOQ estimation with material specifications.",
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 lg:py-24 bg-surface-50 border-t border-slate-200" id="faq">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 border border-brand-200 text-brand-600 text-xs font-display font-bold uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-brand-500" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold uppercase text-navy-950 tracking-tight">
            Everything You Need To Know About AK Associates
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Verified answers about our Pakistan Engineering Council certification, construction expertise, and project consultations in Karachi.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-sm shadow-xs transition-colors overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-base sm:text-lg text-navy-950 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center bg-white border border-slate-200 rounded-sm p-6 sm:p-8 max-w-2xl mx-auto shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-display font-bold uppercase text-navy-950 text-base">
              Have a Specific Construction Query?
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Speak directly with Principal Engineer Rashid Ali for technical guidance.
            </p>
          </div>
          <Button href="/contact" variant="primary" size="sm">
            <PhoneCall className="w-4 h-4 mr-2" />
            Discuss Your Project
          </Button>
        </div>
      </Container>
    </section>
  );
};
