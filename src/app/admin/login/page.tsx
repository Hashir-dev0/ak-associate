"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, ShieldCheck, ArrowRight, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { companyData } from "@/data/company";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid login credentials");
      } else {
        router.push(redirectUrl);
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
      {error && (
        <div className="bg-rose-50 border border-rose-200 p-3 rounded-sm text-xs text-rose-600 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1.5">
          Admin Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@ak-associates.com"
            autoComplete="email"
            className="w-full pl-10 pr-4 py-2.5 bg-surface-100 border border-slate-300 rounded-sm text-sm text-navy-900 focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1.5">
          Security Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Lock className="w-4 h-4" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter security password"
            autoComplete="current-password"
            className="w-full pl-10 pr-10 py-2.5 bg-surface-100 border border-slate-300 rounded-sm text-sm text-navy-900 focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-display font-bold uppercase tracking-wider py-3 px-4 rounded-sm shadow-md hover:shadow-brand-glow transition-all duration-300 flex items-center justify-center gap-2 text-sm cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>AUTHENTICATING...</span>
            </>
          ) : (
            <>
              <span>SIGN IN TO DASHBOARD</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        {/* Logo */}
        <div className="bg-white/95 p-4 rounded inline-block shadow-2xl mb-6">
          <div className="relative h-12 w-48 mx-auto">
            <Image
              src={companyData.logo}
              alt={companyData.name}
              fill
              className="object-contain"
            />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-white tracking-wide">
          Admin CMS Portal
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Authorized Engineering Personnel & Content Management
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-sm shadow-2xl border border-slate-200 text-navy-900">
          <Suspense fallback={<div className="py-8 text-center text-xs text-slate-400">Loading authentication form...</div>}>
            <LoginForm />
          </Suspense>

          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
              <span>Secure Session Cookie Protected</span>
            </div>
            <a href="/" className="hover:text-brand-600 transition-colors">
              Return to Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
