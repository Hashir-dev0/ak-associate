"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Info, Save, CheckCircle, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MediaPickerModal } from "@/components/admin/MediaPickerModal";
import { AboutData } from "@/lib/db";

export default function AdminAboutPage() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<"primary" | "secondary">("primary");

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await fetch("/api/admin/about");
      const data = await res.json();
      if (data.about) {
        setAbout(data.about);
      }
    } catch (e) {
      console.error("Failed to load about data", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!about) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(about),
      });

      if (res.ok) {
        setSavedMessage(true);
        setTimeout(() => setSavedMessage(false), 3000);
      }
    } catch (err) {
      console.error("Failed to save about data", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !about) {
    return (
      <div className="py-20 text-center text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-500" />
        <span>Loading About Section settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-display font-bold uppercase tracking-widest text-brand-500 block">
            ABOUT & HERITAGE CMS
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-navy-900">
            About Section Manager
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Update company story paragraphs, experience badges, mission, vision, and layered image assets.
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
          <span className="font-semibold">About section updated successfully! Live website will immediately display changes.</span>
        </div>
      )}

      {/* Editor Form */}
      <form onSubmit={handleSave} className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="font-display font-bold uppercase text-navy-900 text-base mb-4 border-b pb-2">
            Headlines & Company Story
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                Eyebrow Text
              </label>
              <input
                type="text"
                value={about.eyebrow}
                onChange={(e) => setAbout({ ...about, eyebrow: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                Main Heading
              </label>
              <input
                type="text"
                value={about.heading}
                onChange={(e) => setAbout({ ...about, heading: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
              Company Introduction (Paragraph 1)
            </label>
            <textarea
              rows={3}
              value={about.storyP1}
              onChange={(e) => setAbout({ ...about, storyP1: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm resize-none"
            />
          </div>

          <div className="mt-4">
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
              Company Standards & PEC (Paragraph 2)
            </label>
            <textarea
              rows={3}
              value={about.storyP2}
              onChange={(e) => setAbout({ ...about, storyP2: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm resize-none"
            />
          </div>
        </div>

        <div>
          <h3 className="font-display font-bold uppercase text-navy-900 text-base mb-4 border-b pb-2">
            Layered Image Composition
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Primary Image */}
            <div className="p-4 bg-surface-100 rounded-sm border border-slate-200 space-y-3">
              <span className="text-xs font-display font-bold uppercase text-navy-900 block">
                Primary Main Image
              </span>
              <div className="relative h-32 rounded-sm overflow-hidden bg-slate-900">
                <Image src={about.primaryImage} alt="Primary About Image" fill className="object-cover" />
              </div>
              <Button
                type="button"
                onClick={() => {
                  setPickerTarget("primary");
                  setPickerOpen(true);
                }}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <ImageIcon className="w-3.5 h-3.5 mr-1.5" />
                Change Primary Image
              </Button>
            </div>

            {/* Secondary Image */}
            <div className="p-4 bg-surface-100 rounded-sm border border-slate-200 space-y-3">
              <span className="text-xs font-display font-bold uppercase text-navy-900 block">
                Secondary Overlapping Image
              </span>
              <div className="relative h-32 rounded-sm overflow-hidden bg-slate-900">
                <Image src={about.secondaryImage} alt="Secondary About Image" fill className="object-cover" />
              </div>
              <Button
                type="button"
                onClick={() => {
                  setPickerTarget("secondary");
                  setPickerOpen(true);
                }}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <ImageIcon className="w-3.5 h-3.5 mr-1.5" />
                Change Secondary Image
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-display font-bold uppercase text-navy-900 text-base mb-4 border-b pb-2">
            Mission & Vision
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                Company Mission Statement
              </label>
              <textarea
                rows={3}
                value={about.mission}
                onChange={(e) => setAbout({ ...about, mission: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                Company Vision Statement
              </label>
              <textarea
                rows={3}
                value={about.vision}
                onChange={(e) => setAbout({ ...about, vision: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm resize-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <Button type="submit" disabled={saving} variant="primary" size="md">
            {saving ? "Saving Changes..." : "Save About Settings"}
          </Button>
        </div>
      </form>

      {/* Media Picker */}
      <MediaPickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(url) => {
          if (pickerTarget === "primary") {
            setAbout({ ...about, primaryImage: url });
          } else {
            setAbout({ ...about, secondaryImage: url });
          }
        }}
        title={pickerTarget === "primary" ? "Choose Primary About Image" : "Choose Secondary Overlapping Image"}
      />
    </div>
  );
}
