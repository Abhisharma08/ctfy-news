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
    <div className="relative group p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-cream/70 to-canvas/90 border border-gold/20 hover:border-gold/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_-10px_rgba(201,162,77,0.22)]">
      {/* Subtle corner glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-full pointer-events-none group-hover:bg-gold/10 transition-colors" />

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono tracking-wider uppercase text-ink-soft">
          METRIC // {stat.id.toString().padStart(2, "0")}
        </span>
        <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold-deep group-hover:bg-gold group-hover:text-ink transition-all duration-300">
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      <div className="my-2">
        <div className="text-4xl sm:text-5xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-gold-deep via-gold-dark to-gold-deep tracking-tight">
          {stat.value}
        </div>
        <h3 className="text-lg font-bold text-ink mt-2 font-heading">
          {stat.label}
        </h3>
      </div>

      <p className="text-xs sm:text-sm text-ink-soft leading-relaxed mt-2 font-sans border-t border-ink/10 pt-3">
        {stat.note}
      </p>
    </div>
  );
}
