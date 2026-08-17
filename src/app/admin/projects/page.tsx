"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Image as ImageIcon, 
  CheckCircle2, 
  MapPin, 
  Layers,
  X,
  Loader2,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { MediaPickerModal } from "@/components/admin/MediaPickerModal";
import { ProjectItem } from "@/data/projects";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<"main" | "gallery">("main");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Residential" as const,
    location: "Karachi",
    area: "",
    year: "2024",
    description: "",
    image: "/assets/images/site-upscaled/1.jpeg",
    gallery: [] as string[],
    scope: ["Turnkey Civil Execution", "Structural Detailing"],
    featured: true,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (data.projects) {
        setProjects(data.projects);
      }
    } catch (e) {
      console.error("Failed to load projects", e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      category: "Residential",
      location: "DHA Phase 8, Karachi",
      area: "1,000 Sq. Yards",
      year: "2024",
      description: "",
      image: "/assets/images/site-upscaled/1.jpeg",
      gallery: ["/assets/images/site-upscaled/1.jpeg"],
      scope: ["Turnkey Civil Construction", "Structural Concrete Framework"],
      featured: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (p: ProjectItem) => {
    setEditingProject(p);
    setFormData({
      title: p.title,
      category: p.category as any,
      location: p.location,
      area: p.area || "",
      year: p.year || "2024",
      description: p.description,
      image: p.image,
      gallery: p.gallery || [p.image],
      scope: p.scope || ["Civil Engineering"],
      featured: p.featured,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
        showNotification("Project deleted successfully.");
      }
    } catch (e) {
      console.error("Error deleting project", e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingProject) {
        const res = await fetch("/api/admin/projects", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingProject.id, ...formData }),
        });
        const data = await res.json();
        if (res.ok) {
          setProjects(projects.map((p) => (p.id === editingProject.id ? data.project : p)));
          showNotification("Project updated successfully.");
        }
      } else {
        const res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          setProjects([data.project, ...projects]);
          showNotification("New project published successfully.");
        }
      }
      setModalOpen(false);
    } catch (e) {
      console.error("Error saving project", e);
    }
  };

  const showNotification = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleAddGalleryImage = (url: string) => {
    if (!formData.gallery.includes(url)) {
      setFormData({ ...formData, gallery: [...formData.gallery, url] });
    }
  };

  const handleRemoveGalleryImage = (url: string) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.filter((g) => g !== url),
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-sm border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs font-display font-bold uppercase tracking-widest text-brand-500 block">
            PORTFOLIO CMS
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-navy-900">
            Manage Projects ({projects.length})
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Add new completed construction projects, upload architectural images, edit details, or toggle featured status.
          </p>
        </div>

        <Button onClick={handleOpenAdd} variant="primary" size="md">
          <Plus className="w-4 h-4 mr-1.5" />
          Add New Project
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
          <span>Loading project records...</span>
        </div>
      ) : (
        /* Projects List Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-navy-950/80 backdrop-blur-sm text-brand-300 text-[10px] font-display font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm border border-brand-500/30">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="absolute top-3 right-3 bg-brand-500 text-white text-[10px] font-display font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm shadow">
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-500" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="font-display font-bold uppercase text-navy-900 text-base leading-snug mb-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-surface-100">
                <span className="text-[11px] text-slate-500 font-medium">
                  {project.area || "Turnkey"} • {project.gallery?.length || 1} Images
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(project)}
                    className="p-1.5 text-slate-600 hover:text-brand-600 hover:bg-white rounded transition-colors"
                    title="Edit Project"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(project.id)}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Project Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProject ? `Edit: ${editingProject.title}` : "Add New Construction Project"}
        maxWidth="4xl"
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Modern Residential Bungalow DHA"
              className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as any })
                }
                className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
                <option value="Interior">Interior</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                Location (Karachi Area) *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. DHA Phase 8, Karachi"
                className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                Plot / Covered Area
              </label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                placeholder="e.g. 1,000 Sq. Yards"
                className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
              />
            </div>
          </div>

          {/* Main Primary Image */}
          <div>
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-2">
              Main Thumbnail Image *
            </label>
            <div className="flex items-center gap-4 p-3 bg-surface-100 border border-slate-200 rounded-sm">
              <div className="relative h-20 w-32 rounded-sm overflow-hidden bg-slate-900 shrink-0">
                <Image src={formData.image} alt="Main project thumbnail" fill className="object-cover" />
              </div>
              <div className="flex-1 truncate">
                <span className="text-xs text-slate-500 block truncate">{formData.image}</span>
                <Button
                  type="button"
                  onClick={() => {
                    setPickerTarget("main");
                    setPickerOpen(true);
                  }}
                  variant="outline"
                  size="sm"
                  className="mt-1"
                >
                  <ImageIcon className="w-3.5 h-3.5 mr-1.5" />
                  Select / Upload Main Image
                </Button>
              </div>
            </div>
          </div>

          {/* Multiple Gallery Images */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700">
                Project Gallery (Multiple Images for Modal)
              </label>
              <Button
                type="button"
                onClick={() => {
                  setPickerTarget("gallery");
                  setPickerOpen(true);
                }}
                variant="ghost"
                size="sm"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Add Image to Gallery
              </Button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 p-3 bg-surface-100 border border-slate-200 rounded-sm min-h-[90px] items-center">
              {formData.gallery.map((img, idx) => (
                <div key={idx} className="relative aspect-video rounded-sm overflow-hidden border border-slate-300 group">
                  <Image src={img} alt={`Gallery item ${idx}`} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveGalleryImage(img)}
                    className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove image"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {formData.gallery.length === 0 && (
                <div className="col-span-full text-center text-xs text-slate-400">
                  No additional gallery images added yet.
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
              Project Description & Structural Specifications *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed engineering scope, foundation type, finishing materials..."
              className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm resize-none"
            />
          </div>

          {/* Featured checkbox */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="featured-proj"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="rounded text-brand-500 focus:ring-brand-500"
            />
            <label htmlFor="featured-proj" className="text-xs font-bold text-navy-900 cursor-pointer">
              Feature this project on the Homepage Gallery
            </label>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <Button type="button" onClick={() => setModalOpen(false)} variant="ghost" size="sm">
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Project Record
            </Button>
          </div>
        </form>
      </Modal>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(url) => {
          if (pickerTarget === "main") {
            setFormData({ ...formData, image: url });
          } else {
            handleAddGalleryImage(url);
          }
        }}
        title={pickerTarget === "main" ? "Select Project Thumbnail" : "Add Image to Project Gallery"}
      />
    </div>
  );
}
