"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProjectItem } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/home/ProjectCard";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";

const CATEGORIES = ["ALL", "RESIDENTIAL", "COMMERCIAL", "INDUSTRIAL", "INTERIOR"] as const;

interface ProjectsClientProps {
  initialProjects: ProjectItem[];
}

export const ProjectsClient: React.FC<ProjectsClientProps> = ({ initialProjects }) => {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = initialProjects.filter((project) => {
    if (activeCategory === "ALL") return true;
    return project.category.toUpperCase() === activeCategory;
  });

  return (
    <>
      {/* Header Banner */}
      <section className="relative py-20 lg:py-28 bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/site-upscaled/1.jpeg"
            alt="AK Associates Projects Gallery"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <Container className="relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-display font-bold uppercase tracking-widest mb-4">
            <span>PORTFOLIO GALLERY</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold uppercase tracking-tight text-white mb-4">
            Our Completed Projects
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Explore our architectural portfolio spanning modern residential bungalows, corporate towers, and heavy industrial facilities across Pakistan.
          </p>
        </Container>
      </section>

      {/* Filter Tabs & Gallery */}
      <section className="py-16 lg:py-24 bg-white min-h-[600px]">
        <Container>
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 lg:mb-16">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-sm font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "bg-brand-500 text-white shadow-md shadow-brand-500/20"
                      : "bg-surface-100 text-navy-900 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(p) => setSelectedProject(p)}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              No projects found in this category.
            </div>
          )}
        </Container>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};
