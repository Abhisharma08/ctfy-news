"use client";

import React from "react";
import { Award } from "@/types";
import {
  FileSpreadsheet,
  Bot,
  Target,
  Shield,
  Award as AwardIcon,
  Crown,
  Trophy,
  CheckCircle,
  LucideIcon,
} from "lucide-react";
import { sounds } from "@/lib/sounds";

interface AwardCardProps {
  award: Award;
}

const iconMap: Record<string, LucideIcon> = {
  FileSpreadsheet: FileSpreadsheet,
  Bot: Bot,
  Target: Target,
  Shield: Shield,
  Award: AwardIcon,
  Crown: Crown,
};

export function AwardCard({ award }: AwardCardProps) {
  const IconComponent = iconMap[award.iconName] || Trophy;

  return (
    <div
      onClick={() => sounds.playSelect()}
      className="relative group p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#1B2A43]/70 via-[#111C30]/95 to-[#0B1220] border border-[#DDB65E]/30 hover:border-[#DDB65E] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(221,182,94,0.35)] flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Top Trophy Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase">
              {award.trophyTier || "PLATINUM"}
            </span>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
              <CheckCircle className="w-3 h-3" /> UNLOCKED
            </span>
          </div>

          <span className="text-[10px] font-mono text-[#DDB65E] font-bold">
            {award.xpReward || "+50,000 XP"}
          </span>
        </div>

        {/* Icon & Title */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#DDB65E]/20 to-[#B58F3B]/10 border border-[#DDB65E]/40 flex items-center justify-center text-[#DDB65E] shrink-0 group-hover:scale-110 group-hover:bg-[#DDB65E] group-hover:text-[#0B1220] transition-all duration-300 shadow-md">
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#F5F1E8] font-heading group-hover:text-[#DDB65E] transition-colors leading-snug">
              {award.title}
            </h3>
            <span className="text-[10px] font-mono text-[#A5B0C2] uppercase">
              {award.category}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#A5B0C2] leading-relaxed font-sans">
          {award.description}
        </p>
      </div>

      {/* Trophy Rarity Footer */}
      <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
        <span className="text-[#A5B0C2]">GLOBAL RARITY</span>
        <span className="text-[#DDB65E] font-semibold">{award.rarity || "0.01% of bosses"}</span>
      </div>
    </div>
  );
}
