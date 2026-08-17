"use client";

import React, { useState } from "react";
import { ServiceItem } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "./ServiceCard";

interface ServicesGridProps {
  services?: ServiceItem[];
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ services: propServices }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>("1");
  const services = propServices || [];

  return (
    <section className="py-20 lg:py-28 bg-cube-pattern relative">
      <Container>
        {/* Section Heading */}
        <SectionHeading
          eyebrow="OUR SERVICES"
          title="CONSTRUCTION & ENGINEERING SERVICES"
          subtitle="Civil contracting, structural engineering, and turnkey construction for residential bungalows, commercial buildings, and industrial facilities in Karachi."
        />

        {/* 3-Column Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              onMouseEnter={() => setActiveServiceId(service.id)}
            >
              <ServiceCard
                service={service}
                isFeatured={activeServiceId === service.id}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
