"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit3, Star, CheckCircle2, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { MediaPickerModal } from "@/components/admin/MediaPickerModal";
import { TestimonialItem } from "@/data/testimonials";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "Client",
    company: "DHA Project",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    content: "",
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      if (data.testimonials) {
        setTestimonials(data.testimonials);
      }
    } catch (e) {
      console.error("Failed to load testimonials", e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingTestimonial(null);
    setFormData({
      name: "",
      role: "Client",
      company: "Karachi Commercial Project",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      content: "",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item: TestimonialItem) => {
    setEditingTestimonial(item);
    setFormData({
      name: item.name,
      role: item.role,
      company: item.company,
      avatar: item.avatar,
      rating: item.rating,
      content: item.content,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setTestimonials(testimonials.filter((t) => t.id !== id));
        showNotification("Testimonial deleted successfully.");
      }
    } catch (e) {
      console.error("Error deleting testimonial", e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingTestimonial) {
        const res = await fetch("/api/admin/testimonials", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingTestimonial.id, ...formData }),
        });
        const data = await res.json();
        if (res.ok) {
          setTestimonials(
            testimonials.map((t) => (t.id === editingTestimonial.id ? data.testimonial : t))
          );
          showNotification("Testimonial updated successfully.");
        }
      } else {
        const res = await fetch("/api/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          setTestimonials([...testimonials, data.testimonial]);
          showNotification("New testimonial added successfully.");
        }
      }
      setModalOpen(false);
    } catch (e) {
      console.error("Error saving testimonial", e);
    }
  };

  const showNotification = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-sm border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs font-display font-bold uppercase tracking-widest text-brand-500 block">
            TESTIMONIALS CMS
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-navy-900">
            Manage Client Reviews ({testimonials.length})
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Add client reviews, assign 5-star ratings, upload client profile photos, and edit statements.
          </p>
        </div>

        <Button onClick={handleOpenAdd} variant="primary" size="md">
          <Plus className="w-4 h-4 mr-1.5" />
          Add Testimonial
        </Button>
      </div>

      {statusMessage && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-sm text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">{statusMessage}</span>
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-500" />
          <span>Loading testimonials...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic mb-6">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold uppercase text-navy-900 text-sm leading-tight">
                      {t.name}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(t)}
                    className="p-1.5 text-slate-600 hover:text-brand-600 rounded transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(t.id)}
                    className="p-1.5 text-rose-500 hover:text-rose-700 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingTestimonial ? `Edit Testimonial: ${editingTestimonial.name}` : "Add Client Testimonial"}
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                Client Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Tariq Mahmood"
                className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                Role / Title
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. Managing Director"
                className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                Company / Project
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Korangi Industrial Project"
                className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                Rating (1 - 5 Stars)
              </label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
              >
                <option value={5}>5 Stars ★★★★★</option>
                <option value={4}>4 Stars ★★★★☆</option>
                <option value={3}>3 Stars ★★★☆☆</option>
              </select>
            </div>
          </div>

          {/* Avatar image */}
          <div>
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
              Client Avatar Image
            </label>
            <div className="flex items-center gap-3 p-2 bg-surface-100 border border-slate-200 rounded-sm">
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-300">
                <Image src={formData.avatar} alt="Client avatar" fill className="object-cover" />
              </div>
              <div className="flex-1 truncate text-xs text-slate-500 truncate">
                {formData.avatar}
              </div>
              <Button
                type="button"
                onClick={() => setPickerOpen(true)}
                variant="outline"
                size="sm"
              >
                Change Avatar
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
              Testimonial Statement *
            </label>
            <textarea
              required
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="What did the client say about AK Associates' construction quality, timeline, and engineering..."
              className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm resize-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <Button type="button" onClick={() => setModalOpen(false)} variant="ghost" size="sm">
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Testimonial
            </Button>
          </div>
        </form>
      </Modal>

      {/* Media Picker */}
      <MediaPickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(url) => setFormData({ ...formData, avatar: url })}
        title="Select Client Profile Picture"
      />
    </div>
  );
}
