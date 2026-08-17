import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  dark?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
  className,
}) => {
  const alignments = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={cn("flex flex-col max-w-3xl mb-12 lg:mb-16", alignments[align], className)}>
      {eyebrow && (
        <div className="flex items-center gap-2 mb-2.5">
          <span className="h-0.5 w-6 bg-brand-500 rounded-full inline-block"></span>
          <span className="text-xs sm:text-sm font-display font-bold uppercase tracking-widest text-brand-500">
            {eyebrow}
          </span>
          <span className="h-0.5 w-6 bg-brand-500 rounded-full inline-block"></span>
        </div>
      )}
      <h2
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight leading-tight",
          dark ? "text-white" : "text-navy-900"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed",
            dark ? "text-slate-300" : "text-slate-600"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
