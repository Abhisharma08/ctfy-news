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
      className="relative group p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-cream/70 via-canvas/95 to-paper border border-gold/30 hover:border-gold transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(201,162,77,0.35)] flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Top Trophy Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-400/20 text-amber-700 border border-amber-400/30 uppercase">
              {award.trophyTier || "PLATINUM"}
            </span>
            <span className="text-[10px] font-mono text-emerald-700 flex items-center gap-1 font-semibold">
              <CheckCircle className="w-3 h-3" /> UNLOCKED
            </span>
          </div>

          <span className="text-[10px] font-mono text-gold-deep font-bold">
            {award.xpReward || "+50,000 XP"}
          </span>
        </div>

        {/* Icon & Title */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-gold/20 to-gold-dark/10 border border-gold/40 flex items-center justify-center text-gold-deep shrink-0 group-hover:scale-110 group-hover:bg-gold group-hover:text-ink transition-all duration-300 shadow-md">
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-ink font-heading group-hover:text-gold-deep transition-colors leading-snug">
              {award.title}
            </h3>
            <span className="text-[10px] font-mono text-ink-soft uppercase">
              {award.category}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-ink-soft leading-relaxed font-sans">
          {award.description}
        </p>
      </div>

      {/* Trophy Rarity Footer */}
      <div className="mt-5 pt-3 border-t border-ink/10 flex items-center justify-between text-[10px] font-mono">
        <span className="text-ink-soft">GLOBAL RARITY</span>
        <span className="text-gold-deep font-semibold">{award.rarity || "0.01% of bosses"}</span>
      </div>
    </div>
  );
}
