"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  HardHat, 
  Compass, 
  Hammer, 
  Layout, 
  Truck, 
  ClipboardCheck, 
  Building2, 
  Wrench, 
  ShieldCheck,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ServiceItem } from "@/data/services";

const ICON_OPTIONS = [
  { name: "HardHat", icon: HardHat, label: "Hard Hat / Civil" },
  { name: "Compass", icon: Compass, label: "Compass / Design" },
  { name: "Hammer", icon: Hammer, label: "Hammer / Remodel" },
  { name: "Layout", icon: Layout, label: "Layout / Interior" },
  { name: "Truck", icon: Truck, label: "Truck / Site Prep" },
  { name: "ClipboardCheck", icon: ClipboardCheck, label: "Clipboard / Consult" },
  { name: "Building2", icon: Building2, label: "Building / Commercial" },
  { name: "Wrench", icon: Wrench, label: "Wrench / Maintenance" },
  { name: "ShieldCheck", icon: ShieldCheck, label: "Shield / Safety" },
];

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    iconName: "HardHat",
    featured: false,
    capabilitiesStr: "",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      if (data.services) {
        setServices(data.services);
      }
    } catch (e) {
      console.error("Failed to load services", e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      title: "",
      shortDescription: "",
      fullDescription: "",
      iconName: "HardHat",
      featured: false,
      capabilitiesStr: "Turnkey Civil Construction\nStructural Planning & Execution\nPEC Standard Supervision",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (svc: ServiceItem) => {
    setEditingService(svc);
    setFormData({
      title: svc.title,
      shortDescription: svc.shortDescription,
      fullDescription: svc.fullDescription,
      iconName: svc.iconName,
      featured: !!svc.featured,
      capabilitiesStr: svc.capabilities.join("\n"),
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const res = await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setServices(services.filter((s) => s.id !== id));
        showNotification("Service deleted successfully.");
      }
    } catch (e) {
      console.error("Error deleting service", e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const capabilities = formData.capabilitiesStr
      .split("\n")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    const payload = {
      title: formData.title,
      shortDescription: formData.shortDescription,
      fullDescription: formData.fullDescription,
      iconName: formData.iconName,
      featured: formData.featured,
      capabilities,
    };

    try {
      if (editingService) {
        const res = await fetch("/api/admin/services", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingService.id, ...payload }),
        });
        const data = await res.json();
        if (res.ok) {
          setServices(services.map((s) => (s.id === editingService.id ? data.service : s)));
          showNotification("Service updated successfully.");
        }
      } else {
        const res = await fetch("/api/admin/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (res.ok) {
          setServices([...services, data.service]);
          showNotification("New service created successfully.");
        }
      }
      setModalOpen(false);
    } catch (e) {
      console.error("Error saving service", e);
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
            SERVICES CMS
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-navy-900">
            Manage Engineering Services ({services.length})
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Add or update construction services, modify icons, rewrite capabilities, or adjust featured status.
          </p>
        </div>

        <Button onClick={handleOpenAdd} variant="primary" size="md">
          <Plus className="w-4 h-4 mr-1.5" />
          Add Service
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
          <span>Loading services list...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-sm bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-500">
                    {/* Dynamic Icon */}
                    <HardHat className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                    Icon: {svc.iconName}
                  </span>
                </div>

                <h3 className="font-display font-bold uppercase text-navy-900 text-lg mb-2">
                  {svc.title}
                </h3>
                <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed mb-4">
                  {svc.shortDescription}
                </p>

                <div className="space-y-1 mb-4">
                  {svc.capabilities.slice(0, 3).map((c, idx) => (
                    <div key={idx} className="text-[11px] text-slate-500 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-brand-500"></span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">#{svc.slug}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(svc)}
                    className="p-1.5 text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(svc.id)}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors"
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
        title={editingService ? `Edit: ${editingService.title}` : "Add New Engineering Service"}
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
              Service Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. New Construction"
              className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
              Select Line Icon *
            </label>
            <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto p-1 border border-slate-200 rounded-sm bg-surface-100">
              {ICON_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = formData.iconName === opt.name;
                return (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setFormData({ ...formData, iconName: opt.name })}
                    className={`p-2 rounded-sm border flex items-center gap-2 text-left transition-all ${
                      isSelected
                        ? "bg-brand-500 text-white border-brand-500 shadow"
                        : "bg-white text-navy-900 border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="text-[11px] truncate font-medium">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
              Homepage Short Summary *
            </label>
            <textarea
              required
              rows={2}
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Brief summary for 3-column service cards on the homepage..."
              className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
              Dedicated Page In-Depth Description *
            </label>
            <textarea
              required
              rows={3}
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              placeholder="Detailed technical description for /services page..."
              className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
              Key Capabilities (One per line)
            </label>
            <textarea
              rows={3}
              value={formData.capabilitiesStr}
              onChange={(e) => setFormData({ ...formData, capabilitiesStr: e.target.value })}
              placeholder="Residential Bungalows&#10;Commercial Plazas&#10;Industrial Plants"
              className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm font-mono"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <Button type="button" onClick={() => setModalOpen(false)} variant="ghost" size="sm">
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Service
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
