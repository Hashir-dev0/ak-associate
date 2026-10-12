import React from "react";
import { getProjectsData } from "@/lib/db";
import { ProjectsClient } from "@/components/projects/ProjectsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Completed Construction Projects — AK Associates Portfolio Karachi",
  description: "Browse the engineering portfolio of AK Associates Engineers & Contractors. Explore luxury bungalows in DHA, industrial PEB warehouses in Korangi, and commercial plazas across Karachi, Pakistan.",
  alternates: {
    canonical: "https://akassociates.com.pk/projects",
  },
};

export default function ProjectsPage() {
  const projects = getProjectsData();
  return <ProjectsClient initialProjects={projects} />;
}
