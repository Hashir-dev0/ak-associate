"use client";

import React from "react";
import { TestimonialItem } from "@/data/testimonials";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "./TestimonialCard";

interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials: propTestimonials,
}) => {
  const testimonials = propTestimonials || [];

  return (
    <section className="py-20 lg:py-28 bg-cube-pattern relative">
      <Container>
        <SectionHeading
          eyebrow="TESTIMONIALS"
          title="WHAT OUR CLIENT SAY"
          subtitle="Real client feedback from our residential villa owners, commercial developers, and industrial plant directors."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </Container>
    </section>
  );
};
