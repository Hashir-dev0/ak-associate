"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectItem } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "./ProjectCard";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";

interface ProjectsGalleryProps {
  projects?: ProjectItem[];
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ projects: propProjects }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const projects = propProjects || [];
  // Take top featured projects, or fallback to first 3
  const featured = projects.filter((p) => p.featured);
  const displayProjects = (featured.length >= 3 ? featured : projects).slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-navy-950 text-white relative overflow-hidden">
      {/* Blueprint grid background texture */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-40 pointer-events-none" />

      <Container className="relative z-10">
        {/* Top Header Row with View All Link matching design.md */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-0.5 w-6 bg-brand-500 rounded-full inline-block"></span>
              <span className="text-xs sm:text-sm font-display font-bold uppercase tracking-widest text-brand-400">
                OUR PROJECTS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-white leading-tight">
              RECENTLY COMPLETED WORKS
            </h2>
          </div>

          <div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-brand-400 hover:text-brand-300 pb-1 border-b-2 border-brand-500 transition-colors group"
            >
              <span>VIEW ALL PROJECTS</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 3 Large Project Cards in Horizontal Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </Container>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
