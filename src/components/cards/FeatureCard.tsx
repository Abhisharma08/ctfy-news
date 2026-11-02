"use client";

import React from "react";
import { Feature } from "@/types";
import { Table, Cpu, Crosshair, ShieldAlert, HeartHandshake, Zap, LucideIcon, Sparkles } from "lucide-react";
import { sounds } from "@/lib/sounds";

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

  const skillTypeColors = {
    Passive: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    Active: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    Ultimate: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    Defense: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    Aura: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  };

  return (
    <div
      onClick={() => sounds.playBlip()}
      className="relative group rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#1B2A43]/90 via-[#111C30]/95 to-[#0B1220] border border-[#DDB65E]/30 hover:border-[#DDB65E] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(221,182,94,0.35)] flex flex-col justify-between cursor-pointer"
    >
      {/* Top RPG Skill Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-mono font-extrabold text-[#DDB65E]/40 group-hover:text-[#DDB65E] transition-colors">
              #{feature.number}
            </span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider ${
                skillTypeColors[feature.skillType || "Active"]
              }`}
            >
              {feature.skillType || "SKILL"}
            </span>
          </div>

          <span className="text-[10px] font-mono font-semibold tracking-wider bg-[#DDB65E]/10 text-[#DDB65E] border border-[#DDB65E]/30 px-2.5 py-0.5 rounded-full uppercase">
            {feature.badge}
          </span>
        </div>

        {/* Skill Title & Icon */}
        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#DDB65E]/20 to-[#B58F3B]/10 border border-[#DDB65E]/40 flex items-center justify-center text-[#DDB65E] shrink-0 group-hover:scale-110 group-hover:bg-[#DDB65E] group-hover:text-[#0B1220] transition-all duration-300 shadow-md">
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#F5F1E8] font-heading group-hover:text-[#DDB65E] transition-colors leading-snug">
              {feature.title}
            </h3>
            <p className="text-xs font-mono text-[#DDB65E]/80 mt-0.5">
              {feature.subtitle}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#A5B0C2] leading-relaxed font-sans mt-3">
          {feature.description}
        </p>

        {/* RPG Stat Indicators: Mana Cost & Cooldown */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/5 text-[10px] font-mono">
          <div className="p-1.5 rounded bg-black/30 border border-white/5">
            <span className="text-[#A5B0C2] block text-[9px]">MANA COST</span>
            <span className="text-blue-400 font-bold">{feature.manaCost || "0 MP"}</span>
          </div>
          <div className="p-1.5 rounded bg-black/30 border border-white/5">
            <span className="text-[#A5B0C2] block text-[9px]">COOLDOWN</span>
            <span className="text-amber-400 font-bold">{feature.cooldown || "Instant"}</span>
          </div>
        </div>
      </div>

      {/* Superpower Action Card */}
      <div className="mt-5 pt-4 border-t border-white/5">
        <div className="rounded-xl p-3 bg-[#0B1220]/80 border border-[#DDB65E]/20 flex items-start gap-2.5">
          <Zap className="w-4 h-4 text-[#DDB65E] shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] font-mono font-bold text-[#DDB65E] tracking-wider uppercase block">
              SPECIAL PASSIVE EFFECT
            </span>
            <p className="text-xs text-[#F5F1E8] font-medium leading-snug">
              {feature.superpower}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
