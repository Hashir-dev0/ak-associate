"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, Trash2, Copy, Check, Image as ImageIcon, Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MediaItem } from "@/lib/db";

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      if (data.media) {
        setMedia(data.media);
      }
    } catch (e) {
      console.error("Failed to load media assets", e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadError(null);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/admin/media", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) {
          setUploadError(data.error || `Failed to upload ${file.name}`);
        } else {
          setMedia((prev) => [data.media, ...prev]);
        }
      } catch (err: any) {
        setUploadError(err.message || "Upload error");
      }
    }

    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media item?")) return;

    try {
      const res = await fetch(`/api/admin/media?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMedia(media.filter((m) => m.id !== id));
      }
    } catch (e) {
      console.error("Failed to delete media", e);
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-display font-bold uppercase tracking-widest text-brand-500 block">
            FILE ASSETS CMS
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-navy-900">
            Media Library ({media.length})
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Upload, inspect, copy URLs, or manage images for the entire website.
          </p>
        </div>

        <label className="cursor-pointer inline-flex items-center justify-center font-display font-semibold uppercase tracking-wider text-xs px-4 py-2.5 rounded-sm bg-brand-500 hover:bg-brand-600 text-white shadow transition-colors">
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-1.5" />
              <span>Upload Image</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={uploading}
            onChange={handleUpload}
          />
        </label>
      </div>

      {uploadError && (
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-sm text-xs text-rose-700 font-medium">
          {uploadError}
        </div>
      )}

      {/* Media Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-500" />
          <span>Loading media assets...</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-slate-900 overflow-hidden">
                <Image
                  src={item.url}
                  alt={item.filename}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-3">
                <p className="text-xs font-semibold text-navy-900 truncate" title={item.filename}>
                  {item.filename}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {formatFileSize(item.size)} • {item.mime.split("/")[1]?.toUpperCase() || "IMG"}
                </p>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(item.url, item.id)}
                    className="inline-flex items-center gap-1 text-[11px] text-slate-600 hover:text-brand-600 font-medium transition-colors"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Delete image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
