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
  LucideIcon,
} from "lucide-react";

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
    <div className="relative group p-7 rounded-3xl bg-gradient-to-b from-[#1B2A43]/60 to-[#111C30]/90 border border-[#DDB65E]/25 hover:border-[#DDB65E] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_45px_-10px_rgba(221,182,94,0.35)] flex flex-col justify-between">
      {/* Top golden crown motif watermark */}
      <div className="absolute top-4 right-4 text-[#DDB65E]/10 group-hover:text-[#DDB65E]/20 transition-colors pointer-events-none">
        <Trophy className="w-14 h-14" />
      </div>

      <div>
        {/* Category tag */}
        {award.category && (
          <span className="inline-block text-[10px] font-mono font-bold tracking-widest text-[#DDB65E] uppercase mb-4 px-2.5 py-1 rounded bg-[#DDB65E]/10 border border-[#DDB65E]/20">
            {award.category}
          </span>
        )}

        {/* Award Icon & Title */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#DDB65E]/20 to-[#B58F3B]/10 border border-[#DDB65E]/40 flex items-center justify-center text-[#DDB65E] mb-5 group-hover:scale-110 group-hover:bg-[#DDB65E] group-hover:text-[#0B1220] transition-all duration-300 shadow-md">
          <IconComponent className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-extrabold text-[#F5F1E8] font-heading group-hover:text-[#DDB65E] transition-colors leading-tight">
          {award.title}
        </h3>

        <p className="mt-3 text-sm text-[#A5B0C2] leading-relaxed font-sans">
          {award.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#DDB65E]/70 group-hover:text-[#DDB65E]">
        <span>CONTENTIFY HONOUR</span>
        <span>★ ★ ★ ★ ★</span>
      </div>
    </div>
  );
}
