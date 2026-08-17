"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { CheckCircle, ShieldCheck, Building, Loader2, Save, Lock, AlertCircle } from "lucide-react";
import { CompanyProfile } from "@/data/company";

export default function AdminCompanyPage() {
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSuccess, setPwSuccess] = useState("");
  const [pwError, setPwError] = useState("");

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError("");
    setPwSuccess("");

    if (newPassword.length < 8) {
      setPwError("New password must be at least 8 characters long");
      return;
    }

    setPwLoading(true);
    try {
      const res = await fetch("/api/admin/auth/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        setPwError(data.error || "Failed to update password");
      } else {
        setPwSuccess("Password successfully updated! Keep your new credentials safe.");
        setCurrentPassword("");
        setNewPassword("");
        setTimeout(() => setPwSuccess(""), 5000);
      }
    } catch (err: any) {
      setPwError(err.message || "Failed to update password");
    } finally {
      setPwLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const res = await fetch("/api/admin/company");
      const data = await res.json();
      if (data.company) {
        setCompany(data.company);
      }
    } catch (e) {
      console.error("Failed to load company data", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/company", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(company),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (e) {
      console.error("Failed to save company data", e);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !company) {
    return (
      <div className="py-20 text-center text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-500" />
        <span>Loading company settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
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

        <Button onClick={handleSave} disabled={saving} variant="primary" size="md">
          {saving ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Save className="w-4 h-4 mr-1.5" />}
          <span>{saving ? "Saving..." : "Save Changes"}</span>
        </Button>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-sm text-xs text-emerald-700 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span className="font-semibold">Company profile and contact settings successfully updated!</span>
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
          <Button type="submit" disabled={saving} variant="primary" size="md">
            {saving ? "Saving..." : "Save Company Settings"}
          </Button>
        </div>
      </form>

      {/* Admin Security & Password Change */}
      <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="font-display font-bold uppercase text-navy-900 text-base mb-1 flex items-center gap-2 border-b pb-2">
            <Lock className="w-4 h-4 text-brand-500" />
            Admin Security & Password
          </h3>
          <p className="text-slate-500 text-xs mt-1">
            Update your master CMS password for secure administrator dashboard access.
          </p>
        </div>

        {pwSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-sm text-xs text-emerald-700 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span className="font-semibold">{pwSuccess}</span>
          </div>
        )}

        {pwError && (
          <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-sm text-xs text-rose-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{pwError}</span>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                New Password (Min 8 chars)
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new strong password"
                className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" disabled={pwLoading} variant="outline" size="md">
              {pwLoading ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Lock className="w-4 h-4 mr-1.5" />}
              <span>{pwLoading ? "Updating Password..." : "Update Admin Password"}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
