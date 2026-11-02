import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  badge?: string;
  title?: string;
  subtitle?: string;
}

export function Section({
  id,
  className,
  containerClassName,
  children,
  badge,
  title,
  subtitle,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-16 md:py-24 lg:py-28 overflow-hidden",
        className
      )}
    >
      <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", containerClassName)}>
        {(badge || title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            {badge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-widest uppercase bg-[#1B2A43] text-[#DDB65E] border border-[#DDB65E]/30 mb-4 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DDB65E] animate-pulse" />
                {badge}
              </div>
            )}
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F5F1E8] font-heading">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-base sm:text-lg text-[#A5B0C2] leading-relaxed max-w-2xl mx-auto font-sans">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
