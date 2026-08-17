import React from "react";
import { getProjectsData } from "@/lib/db";
import { ProjectsClient } from "@/components/projects/ProjectsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Completed Projects — Architectural & Construction Portfolio",
  description: "Browse the engineering portfolio of AK Associates. Explore luxury bungalows in DHA, industrial warehouses in Korangi, and commercial plazas across Karachi, Pakistan.",
};

export default function ProjectsPage() {
  const projects = getProjectsData();
  return <ProjectsClient initialProjects={projects} />;
}
