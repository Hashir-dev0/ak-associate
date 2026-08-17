"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Calendar, CheckCircle, ArrowRight, Layers, PhoneCall } from "lucide-react";
import { ProjectItem } from "@/data/projects";
import { companyData } from "@/data/company";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  if (!project) return null;

  const currentImage = selectedImg || project.image;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setSelectedImg(null);
        onClose();
      }}
      title={project.title}
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Main High-Res Image */}
        <div className="relative h-72 sm:h-96 w-full rounded-sm overflow-hidden bg-slate-900 border border-slate-200">
          <Image
            src={currentImage}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 left-4 bg-navy-950/80 backdrop-blur-md text-brand-300 text-xs font-display font-bold uppercase tracking-wider px-3 py-1 rounded-sm border border-brand-500/30">
            {project.category}
          </div>
        </div>

        {/* Thumbnail Gallery if multiple */}
        {project.gallery && project.gallery.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {project.gallery.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImg(img)}
                className={`relative w-20 h-14 rounded-sm overflow-hidden shrink-0 border-2 transition-all ${
                  currentImage === img
                    ? "border-brand-500 shadow-md scale-105"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img} alt={`${project.title} ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Project Meta Information */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-sm bg-surface-100 border border-slate-200 text-xs">
          <div>
            <span className="text-slate-400 font-display uppercase tracking-wider block">Location</span>
            <span className="font-semibold text-navy-900 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-brand-500" />
              {project.location}
            </span>
          </div>

          <div>
            <span className="text-slate-400 font-display uppercase tracking-wider block">Scope / Scale</span>
            <span className="font-semibold text-navy-900 flex items-center gap-1 mt-0.5">
              <Layers className="w-3.5 h-3.5 text-brand-500" />
              {project.area || "Turnkey Project"}
            </span>
          </div>

          <div>
            <span className="text-slate-400 font-display uppercase tracking-wider block">Timeline / Status</span>
            <span className="font-semibold text-navy-900 flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-brand-500" />
              {project.year || "Completed"}
            </span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="font-display font-bold uppercase text-navy-900 text-sm tracking-wide mb-2">
            Project Overview & Engineering
          </h4>
          <p className="text-slate-600 text-sm leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Scope of Work */}
        <div>
          <h4 className="font-display font-bold uppercase text-navy-900 text-sm tracking-wide mb-3">
            Scope & Technical Deliverables
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.scope.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle className="w-4 h-4 text-brand-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Certified by <strong className="text-navy-900">{companyData.name}</strong> ({companyData.pecCategory})
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              href={`https://wa.me/923213844024?text=Hello%20AK%20Associates,%20I%20am%20interested%20in%20a%20project%20similar%20to%20${encodeURIComponent(project.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-initial"
            >
              <PhoneCall className="w-4 h-4 mr-1.5" />
              Inquire via WhatsApp
            </Button>
            <Button
              href="/contact"
              variant="primary"
              size="sm"
              className="flex-1 sm:flex-initial"
              onClick={onClose}
            >
              Request Quote
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
