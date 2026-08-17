"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, X, Check, Image as ImageIcon, Loader2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string) => void;
  title?: string;
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  title = "Select or Upload Image",
}) => {
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen]);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      if (data.media) {
        setMediaList(data.media);
      }
    } catch (err) {
      console.error("Failed to load media", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setUploadError(data.error || "Upload failed");
      } else {
        setMediaList([data.media, ...mediaList]);
        setSelectedUrl(data.media.url);
      }
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload");
    } finally {
      setUploading(false);
    }
  };

  const handleConfirm = () => {
    if (selectedUrl) {
      onSelect(selectedUrl);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="4xl">
      <div className="space-y-6">
        {/* Upload Action Area */}
        <div className="p-6 border-2 border-dashed border-slate-300 hover:border-brand-500 rounded-sm bg-surface-100 text-center transition-colors">
          <label className="cursor-pointer flex flex-col items-center justify-center">
            {uploading ? (
              <div className="flex items-center gap-2 text-brand-600 font-semibold text-sm">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Uploading and validating image...</span>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 text-brand-500 mb-2" />
                <span className="text-xs font-display font-bold uppercase tracking-wider text-navy-900">
                  Upload New Image from Computer
                </span>
                <span className="text-[11px] text-slate-500 mt-1">
                  Supported formats: JPG, PNG, WebP, SVG (Max 8MB)
                </span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={handleFileUpload}
            />
          </label>

          {uploadError && (
            <div className="mt-3 text-xs text-rose-600 font-semibold">
              {uploadError}
            </div>
          )}
        </div>

        {/* Media Library Grid */}
        <div>
          <h4 className="text-xs font-display font-bold uppercase tracking-wider text-navy-900 mb-3">
            Or Choose From Existing Media Library ({mediaList.length})
          </h4>

          {loading ? (
            <div className="py-12 text-center text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
              <span>Loading media assets...</span>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-72 overflow-y-auto p-1">
              {mediaList.map((item) => {
                const isSelected = selectedUrl === item.url;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedUrl(item.url)}
                    className={`group relative aspect-video rounded-sm overflow-hidden border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-brand-500 ring-2 ring-brand-400 shadow-md scale-95"
                        : "border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    <Image
                      src={item.url}
                      alt={item.filename || "Media asset"}
                      fill
                      className="object-cover"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-brand-500/30 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center shadow">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 truncate max-w-sm">
            {selectedUrl ? `Selected: ${selectedUrl}` : "Please select or upload an image"}
          </div>

          <div className="flex items-center gap-3">
            <Button type="button" onClick={onClose} variant="ghost" size="sm">
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={!selectedUrl}
              variant="primary"
              size="sm"
            >
              Use Selected Image
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
