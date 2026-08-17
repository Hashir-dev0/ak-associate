"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Save, CheckCircle, Image as ImageIcon, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MediaPickerModal } from "@/components/admin/MediaPickerModal";
import { HeroData } from "@/lib/db";

export default function AdminHeroPage() {
  const [hero, setHero] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const res = await fetch("/api/admin/hero");
      const data = await res.json();
      if (data.hero) {
        setHero(data.hero);
      }
    } catch (e) {
      console.error("Failed to load hero data", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hero) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hero),
      });

      if (res.ok) {
        setSavedMessage(true);
        setTimeout(() => setSavedMessage(false), 3000);
      }
    } catch (err) {
      console.error("Failed to save hero data", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !hero) {
    return (
      <div className="py-20 text-center text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-500" />
        <span>Loading Hero CMS settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-display font-bold uppercase tracking-widest text-brand-500 block">
            HOMEPAGE CMS
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-navy-900">
            Hero Section Manager
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Modify the homepage hero headline, subtitle, background image, and call-to-action buttons.
          </p>
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          variant="primary"
          size="md"
          className="shrink-0"
        >
          {saving ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Save className="w-4 h-4 mr-1.5" />}
          <span>{saving ? "Saving..." : "Save Changes"}</span>
        </Button>
      </div>

      {savedMessage && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-sm text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">Hero section updated successfully! Live website will immediately display changes.</span>
        </div>
      )}

      {/* Live Preview Card */}
      <div className="bg-navy-950 text-white rounded-sm overflow-hidden border border-slate-800 shadow-xl relative min-h-[300px] flex items-center p-8">
        <div className="absolute inset-0 z-0">
          <Image
            src={hero.backgroundImage}
            alt="Hero Background Preview"
            fill
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-xl space-y-4">
          <span className="px-2.5 py-1 bg-brand-500/20 text-brand-300 text-[10px] font-display font-bold uppercase tracking-wider rounded border border-brand-500/30">
            {hero.badge || "Hero Badge"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold uppercase leading-none">
            {hero.headline} <span className="text-brand-400">{hero.highlightText}</span>
          </h2>
          <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
            {hero.subtitle}
          </p>
          <div className="flex items-center gap-3 pt-2">
            <span className="bg-brand-500 text-white text-xs font-display font-bold uppercase px-4 py-2 rounded-sm shadow">
              {hero.primaryCtaText}
            </span>
            <span className="border border-white/40 text-white text-xs font-display font-bold uppercase px-4 py-2 rounded-sm">
              {hero.secondaryCtaText}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="absolute top-4 right-4 bg-navy-900/90 hover:bg-brand-500 text-white text-xs font-display font-bold uppercase px-3 py-1.5 rounded-sm border border-slate-700 flex items-center gap-1.5 transition-colors z-20 shadow"
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Change Background Image</span>
        </button>
      </div>

      {/* Editor Form */}
      <form onSubmit={handleSave} className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="font-display font-bold uppercase text-navy-900 text-base mb-4 border-b pb-2">
            Headlines & Text Copy
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                Eyebrow Badge Text
              </label>
              <input
                type="text"
                value={hero.badge}
                onChange={(e) => setHero({ ...hero, badge: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                Highlighted Headline Accent
              </label>
              <input
                type="text"
                value={hero.highlightText}
                onChange={(e) => setHero({ ...hero, highlightText: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
              Primary Headline
            </label>
            <input
              type="text"
              value={hero.headline}
              onChange={(e) => setHero({ ...hero, headline: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
            />
          </div>

          <div className="mt-4">
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
              Hero Paragraph / Subtitle
            </label>
            <textarea
              rows={3}
              value={hero.subtitle}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm resize-none"
            />
          </div>
        </div>

        <div>
          <h3 className="font-display font-bold uppercase text-navy-900 text-base mb-4 border-b pb-2">
            Call To Action (CTA) Buttons
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 bg-surface-100 rounded-sm border border-slate-200 space-y-3">
              <span className="text-xs font-display font-bold uppercase text-brand-600 block">
                Primary CTA Button
              </span>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Button Text</label>
                <input
                  type="text"
                  value={hero.primaryCtaText}
                  onChange={(e) => setHero({ ...hero, primaryCtaText: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-sm text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Link</label>
                <input
                  type="text"
                  value={hero.primaryCtaLink}
                  onChange={(e) => setHero({ ...hero, primaryCtaLink: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-sm text-sm"
                />
              </div>
            </div>

            <div className="p-4 bg-surface-100 rounded-sm border border-slate-200 space-y-3">
              <span className="text-xs font-display font-bold uppercase text-navy-900 block">
                Secondary CTA Button
              </span>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Button Text</label>
                <input
                  type="text"
                  value={hero.secondaryCtaText}
                  onChange={(e) => setHero({ ...hero, secondaryCtaText: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-sm text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Link</label>
                <input
                  type="text"
                  value={hero.secondaryCtaLink}
                  onChange={(e) => setHero({ ...hero, secondaryCtaLink: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-sm text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-display font-bold uppercase text-navy-900 text-base mb-4 border-b pb-2">
            Background Image Selection
          </h3>

          <div className="flex items-center gap-4">
            <div className="relative h-20 w-32 rounded-sm overflow-hidden bg-slate-900 border border-slate-300 shrink-0">
              <Image src={hero.backgroundImage} alt="Current Hero Background" fill className="object-cover" />
            </div>
            <div className="flex-1 truncate">
              <span className="text-xs text-slate-500 block truncate">Current Image URL: {hero.backgroundImage}</span>
              <Button
                type="button"
                onClick={() => setPickerOpen(true)}
                variant="outline"
                size="sm"
                className="mt-1"
              >
                <ImageIcon className="w-3.5 h-3.5 mr-1.5" />
                Select / Upload Different Image
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <Button type="submit" disabled={saving} variant="primary" size="md">
            {saving ? "Saving Changes..." : "Save All Hero Changes"}
          </Button>
        </div>
      </form>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(url) => setHero({ ...hero, backgroundImage: url })}
        title="Choose Hero Background Image"
      />
    </div>
  );
}
