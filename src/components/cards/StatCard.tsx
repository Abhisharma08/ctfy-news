import React from "react";
import { Stat } from "@/types";
import { Infinity as InfinityIcon, ShieldCheck, Sparkles, Flame, LucideIcon } from "lucide-react";

interface StatCardProps {
  stat: Stat;
}

const iconMap: Record<string, LucideIcon> = {
  Infinity: InfinityIcon,
  ShieldCheck: ShieldCheck,
  Sparkles: Sparkles,
  Flame: Flame,
};

export function StatCard({ stat }: StatCardProps) {
  const IconComponent = iconMap[stat.iconName] || Sparkles;

  return (
    <div className="relative group p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#1B2A43]/70 to-[#111C30]/90 border border-[#DDB65E]/20 hover:border-[#DDB65E]/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_-10px_rgba(221,182,94,0.22)]">
      {/* Subtle corner glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#DDB65E]/5 rounded-bl-full pointer-events-none group-hover:bg-[#DDB65E]/10 transition-colors" />

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono tracking-wider uppercase text-[#A5B0C2]">
          METRIC // {stat.id.toString().padStart(2, "0")}
        </span>
        <div className="w-9 h-9 rounded-xl bg-[#DDB65E]/10 border border-[#DDB65E]/20 flex items-center justify-center text-[#DDB65E] group-hover:bg-[#DDB65E] group-hover:text-[#0B1220] transition-all duration-300">
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      <div className="my-2">
        <div className="text-4xl sm:text-5xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-[#DDB65E] via-[#F4D992] to-[#DDB65E] tracking-tight">
          {stat.value}
        </div>
        <h3 className="text-lg font-bold text-[#F5F1E8] mt-2 font-heading">
          {stat.label}
        </h3>
      </div>

      <p className="text-xs sm:text-sm text-[#A5B0C2] leading-relaxed mt-2 font-sans border-t border-white/5 pt-3">
        {stat.note}
      </p>
    </div>
  );
}
