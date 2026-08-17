import React from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { TestimonialItem } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="relative p-8 rounded-sm bg-white border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Top: 5-Star Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Testimonial Quote */}
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed italic mb-8 relative z-10">
          &ldquo;{testimonial.content}&rdquo;
        </p>
      </div>

      {/* Client Info */}
      <div className="flex items-center gap-4 pt-4 border-t border-slate-100 relative z-10">
        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-brand-500">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-display font-bold uppercase text-navy-900 text-base leading-tight">
            {testimonial.name}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            {testimonial.role}, <span className="text-brand-600 font-medium">{testimonial.company}</span>
          </p>
        </div>
      </div>

      {/* Decorative Quote mark in lower right matching design.md */}
      <Quote className="absolute -bottom-2 -right-2 w-20 h-20 text-brand-500/10 -rotate-12 pointer-events-none group-hover:text-brand-500/20 transition-colors" />
    </div>
  );
};
