"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit3, Newspaper, CheckCircle2, Loader2, Image as ImageIcon, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { MediaPickerModal } from "@/components/admin/MediaPickerModal";
import { NewsItem } from "@/data/news";

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Civil Engineering",
    readTime: "5 min read",
    excerpt: "",
    image: "/assets/images/site-upscaled/3.jpeg",
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/admin/news");
      const data = await res.json();
      if (data.news) {
        setNews(data.news);
      }
    } catch (e) {
      console.error("Failed to load news", e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingNews(null);
    setFormData({
      title: "",
      category: "Civil Engineering",
      readTime: "5 min read",
      excerpt: "",
      image: "/assets/images/site-upscaled/3.jpeg",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item: NewsItem) => {
    setEditingNews(item);
    setFormData({
      title: item.title,
      category: item.category,
      readTime: item.readTime,
      excerpt: item.excerpt,
      image: item.image,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      const res = await fetch(`/api/admin/news?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setNews(news.filter((n) => n.id !== id));
        showNotification("Article deleted successfully.");
      }
    } catch (e) {
      console.error("Error deleting article", e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingNews) {
        const res = await fetch("/api/admin/news", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingNews.id, ...formData }),
        });
        const data = await res.json();
        if (res.ok) {
          setNews(news.map((n) => (n.id === editingNews.id ? data.news : n)));
          showNotification("Article updated successfully.");
        }
      } else {
        const res = await fetch("/api/admin/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          setNews([data.news, ...news]);
          showNotification("New article published successfully.");
        }
      }
      setModalOpen(false);
    } catch (e) {
      console.error("Error saving article", e);
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
            BLOG & INSIGHTS CMS
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-navy-900">
            News & Articles ({news.length})
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Publish engineering updates, contracting guides, architectural trends, and industry insights.
          </p>
        </div>

        <Button onClick={handleOpenAdd} variant="primary" size="md">
          <Plus className="w-4 h-4 mr-1.5" />
          Create Article
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
          <span>Loading articles...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-900">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                  <span className="absolute top-3 left-3 bg-brand-500 text-white text-[10px] font-display font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                    {item.date.day} {item.date.month}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-navy-950/80 text-white text-[10px] px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-display font-bold uppercase text-navy-900 text-base leading-snug mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-surface-100">
                <span className="text-[11px] text-slate-500">{item.readTime}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 text-slate-600 hover:text-brand-600 rounded transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
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
        title={editingNews ? `Edit: ${editingNews.title}` : "Create New Article"}
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
              Article Headline *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Modern Structural Engineering Trends in Karachi"
              className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. Civil Engineering"
                className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                Estimated Read Time
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                placeholder="e.g. 5 min read"
                className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm"
              />
            </div>
          </div>

          {/* Featured image */}
          <div>
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
              Cover Image
            </label>
            <div className="flex items-center gap-3 p-2 bg-surface-100 border border-slate-200 rounded-sm">
              <div className="relative w-16 h-10 rounded-sm overflow-hidden shrink-0 border border-slate-300 bg-slate-900">
                <Image src={formData.image} alt="Article thumbnail" fill className="object-cover" />
              </div>
              <div className="flex-1 truncate text-xs text-slate-500 truncate">
                {formData.image}
              </div>
              <Button
                type="button"
                onClick={() => setPickerOpen(true)}
                variant="outline"
                size="sm"
              >
                Change Cover
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
              Article Summary / Excerpt *
            </label>
            <textarea
              required
              rows={4}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Summary of the article for homepage cards..."
              className="w-full px-3.5 py-2 border border-slate-300 rounded-sm text-sm resize-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <Button type="button" onClick={() => setModalOpen(false)} variant="ghost" size="sm">
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Publish Article
            </Button>
          </div>
        </form>
      </Modal>

      {/* Media Picker */}
      <MediaPickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(url) => setFormData({ ...formData, image: url })}
        title="Select Article Cover Image"
      />
    </div>
  );
}
