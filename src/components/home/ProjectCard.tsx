"use client";

import React from "react";
import Image from "next/image";
import { Plus, MapPin, Layers } from "lucide-react";
import { ProjectItem } from "@/data/projects";

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(project)}
      className="group relative h-[360px] sm:h-[420px] rounded-sm overflow-hidden cursor-pointer bg-navy-900 border border-slate-800 transition-all duration-500 shadow-xl"
    >
      {/* Background Image with Hover Zoom */}
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover object-center transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-75"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

      {/* Category Pill */}
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-navy-950/80 backdrop-blur-md border border-brand-500/30 text-brand-300 text-xs font-display font-semibold uppercase tracking-wider rounded-sm">
          <Layers className="w-3 h-3 text-brand-400" />
          {project.category}
        </span>
      </div>

      {/* Card Info Details */}
      <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex items-end justify-between gap-4">
        <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
            <span>{project.location}</span>
          </div>
          <h3 className="text-xl font-display font-bold uppercase text-white tracking-wide leading-tight group-hover:text-brand-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-slate-300 line-clamp-2 mt-2 max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-300 ease-out hidden sm:block">
            {project.description}
          </p>
        </div>

        {/* Small Red/Brand Square '+' Button in Lower Right matching design.md */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(project);
          }}
          className="w-10 h-10 rounded-sm bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-lg group-hover:rotate-90 transition-all duration-300 focus:outline-none"
          aria-label={`View details of ${project.title}`}
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
