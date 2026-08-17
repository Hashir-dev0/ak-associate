"use client";

import React, { useState } from "react";
import { companyData as initialCompany } from "@/data/company";
import { Button } from "@/components/ui/Button";
import { CheckCircle, ShieldCheck, Building } from "lucide-react";

export default function AdminSettingsPage() {
  const [company, setCompany] = useState(initialCompany);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm">
        <span className="text-xs font-display font-bold uppercase tracking-widest text-brand-500 block">
          SITE CONFIGURATION
        </span>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-navy-900">
          Company Settings & Credentials
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Update the verified company profile details, contact numbers, and PEC licensing info.
        </p>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-sm text-xs text-emerald-700 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>Company profile and contact settings successfully updated!</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="font-display font-bold uppercase text-navy-900 text-base mb-4 flex items-center gap-2 border-b pb-2">
            <Building className="w-4 h-4 text-brand-500" />
            General Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                Company Legal Name
              </label>
              <input
                type="text"
                value={company.name}
                onChange={(e) => setCompany({ ...company, name: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                Contact Person / MD
              </label>
              <input
                type="text"
                value={company.contactPerson}
                onChange={(e) => setCompany({ ...company, contactPerson: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-display font-bold uppercase text-navy-900 text-base mb-4 flex items-center gap-2 border-b pb-2">
            <ShieldCheck className="w-4 h-4 text-brand-500" />
            Licensing & Certification
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                PEC License Category
              </label>
              <input
                type="text"
                value={company.pecCategory}
                onChange={(e) => setCompany({ ...company, pecCategory: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm font-bold text-brand-600"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                Year of Registration
              </label>
              <input
                type="number"
                value={company.yearEstablished}
                onChange={(e) =>
                  setCompany({ ...company, yearEstablished: parseInt(e.target.value) || 2013 })
                }
                className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                Place of Registration
              </label>
              <input
                type="text"
                value={`${company.city}, ${company.country}`}
                readOnly
                className="w-full px-3.5 py-2 border border-slate-200 bg-slate-50 text-slate-500 rounded-sm text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-display font-bold uppercase text-navy-900 text-base mb-4 border-b pb-2">
            Official Contact Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                Telephone / WhatsApp
              </label>
              <input
                type="text"
                value={company.displayPhone}
                onChange={(e) => setCompany({ ...company, displayPhone: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={company.email}
                onChange={(e) => setCompany({ ...company, email: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
              Company Physical Address
            </label>
            <input
              type="text"
              value={company.address}
              onChange={(e) => setCompany({ ...company, address: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
            />
          </div>

          <div className="mt-4">
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
              Mailing Address
            </label>
            <input
              type="text"
              value={company.mailingAddress}
              onChange={(e) => setCompany({ ...company, mailingAddress: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <Button type="submit" variant="primary" size="md">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
