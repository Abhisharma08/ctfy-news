import React from "react";
import { Feature } from "@/types";
import { Table, Cpu, Crosshair, ShieldAlert, HeartHandshake, Zap, LucideIcon } from "lucide-react";

interface FeatureCardProps {
  feature: Feature;
}

const iconMap: Record<string, LucideIcon> = {
  TableCells: Table,
  Cpu: Cpu,
  Crosshair: Crosshair,
  ShieldAlert: ShieldAlert,
  HeartHandshake: HeartHandshake,
};

export function FeatureCard({ feature }: FeatureCardProps) {
  const IconComponent = iconMap[feature.iconName] || Zap;

  return (
    <div className="relative group rounded-3xl p-7 sm:p-8 bg-gradient-to-br from-[#1B2A43]/80 via-[#111C30]/90 to-[#0F172A] border border-[#DDB65E]/20 hover:border-[#DDB65E]/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(221,182,94,0.25)] flex flex-col justify-between">
      {/* Background radial gradient hover */}
      <div className="absolute inset-0 rounded-3xl bg-radial from-[#DDB65E]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Top Header: Number and Badge */}
        <div className="flex items-center justify-between gap-2 mb-6">
          <span className="text-2xl font-mono font-bold text-[#DDB65E]/40 group-hover:text-[#DDB65E] transition-colors">
            /{feature.number}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider bg-[#DDB65E]/10 text-[#DDB65E] border border-[#DDB65E]/30 uppercase">
            {feature.badge}
          </span>
        </div>

        {/* Icon & Title */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#DDB65E]/15 border border-[#DDB65E]/30 flex items-center justify-center text-[#DDB65E] shrink-0 group-hover:scale-110 group-hover:bg-[#DDB65E] group-hover:text-[#0B1220] transition-all duration-300 shadow-md">
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#F5F1E8] font-heading group-hover:text-[#DDB65E] transition-colors">
              {feature.title}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-[#DDB65E]/80 mt-0.5">
              {feature.subtitle}
            </p>
          </div>
        </div>

        {/* Humorous Description */}
        <p className="text-sm sm:text-base text-[#A5B0C2] leading-relaxed mt-4 font-sans">
          {feature.description}
        </p>
      </div>

      {/* Superpower Highlight Box */}
      <div className="mt-6 pt-5 border-t border-white/5">
        <div className="rounded-xl p-3.5 bg-[#0B1220]/70 border border-[#DDB65E]/15 flex items-start gap-3">
          <span className="text-base shrink-0 mt-0.5">⚡</span>
          <div>
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#DDB65E] font-bold block mb-0.5">
              CERTIFIED SUPERPOWER
            </span>
            <p className="text-xs sm:text-sm text-[#F5F1E8] font-medium leading-snug">
              {feature.superpower}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
