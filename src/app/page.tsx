import React from "react";
import { 
  getHeroData, 
  getServicesData, 
  getAboutData, 
  getProjectsData, 
  getCompanyData 
} from "@/lib/db";
import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { ProjectsGallery } from "@/components/home/ProjectsGallery";
import { CredentialsSection } from "@/components/home/CredentialsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { EnquiryForm } from "@/components/home/EnquiryForm";

// Force dynamic rendering so that any edit in CMS is immediately visible on the homepage
export const dynamic = "force-dynamic";

export default function HomePage() {
  const heroData = getHeroData();
  const services = getServicesData();
  const aboutData = getAboutData();
  const projects = getProjectsData();
  const company = getCompanyData();

  return (
    <>
      {/* 1. Hero Section */}
      <Hero data={heroData} companyInfo={company} />

      {/* 2. About the Company */}
      <AboutPreview about={aboutData} company={company} />

      {/* 3. Services & Capabilities */}
      <ServicesGrid services={services} />

      {/* 4. Projects / Completed Work */}
      <ProjectsGallery projects={projects} />

      {/* 5. Company Profile / Credentials */}
      <CredentialsSection />

      {/* 6. Why Choose Us (Factual Reasons) */}
      <WhyChooseUs />

      {/* 7. Contact / Project Inquiry */}
      <EnquiryForm />
    </>
  );
}
