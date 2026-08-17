import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "dark" | "outline" | "outline-white" | "white" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-display font-semibold uppercase tracking-wider transition-all duration-300 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98]";

  const variants = {
    primary:
      "bg-brand-500 hover:bg-brand-600 text-white shadow-md hover:shadow-brand-glow focus:ring-brand-500",
    dark:
      "bg-navy-900 hover:bg-navy-800 text-white shadow-md focus:ring-navy-900 border border-slate-700/50",
    outline:
      "border-2 border-brand-500 text-brand-600 hover:bg-brand-500 hover:text-white focus:ring-brand-500",
    "outline-white":
      "border-2 border-white text-white hover:bg-white hover:text-navy-900 focus:ring-white",
    white:
      "bg-white hover:bg-surface-100 text-navy-900 shadow-md hover:shadow-lg focus:ring-brand-500",
    ghost:
      "text-slate-700 hover:text-brand-600 hover:bg-brand-50 focus:ring-brand-500",
  };

  const sizes = {
    sm: "text-xs px-3.5 py-2 rounded-sm gap-1.5",
    md: "text-sm px-5 py-2.5 rounded-sm gap-2",
    lg: "text-base px-7 py-3.5 rounded-sm gap-2.5",
  };

  const combinedClasses = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} target={target} rel={rel} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
