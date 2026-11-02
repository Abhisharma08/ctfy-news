"use client";

import React from "react";
import { Feature } from "@/types";
import {
  Table,
  Cpu,
  Crosshair,
  ShieldAlert,
  HeartHandshake,
  Zap,
  LucideIcon,
  Sparkles,
  CheckCircle2,
  FileSpreadsheet,
} from "lucide-react";
import { sounds } from "@/lib/sounds";
import { EasterEggModal } from "@/components/ui/EasterEggModal";

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
      className={`relative group rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between cursor-pointer ${
        feature.isHighlighted
          ? "bg-gradient-to-br from-[#1E304D] via-[#14233D] to-[#0B1220] border-2 border-[#DDB65E] shadow-[0_0_40px_rgba(221,182,94,0.35)] ring-2 ring-[#DDB65E]/40"
          : "bg-gradient-to-br from-[#1B2A43]/90 via-[#111C30]/95 to-[#0B1220] border border-[#DDB65E]/30 hover:border-[#DDB65E] hover:shadow-[0_15px_40px_-10px_rgba(221,182,94,0.35)]"
      }`}
    >
      <div>
        {/* Highlighted VIP Banner for Tracker */}
        {feature.isHighlighted && (
          <div className="mb-4 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#DDB65E] via-[#F4D992] to-[#DDB65E] text-[#0B1220] font-mono text-[10px] font-black tracking-widest uppercase flex items-center justify-center gap-1.5 shadow-lg animate-pulse">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>{feature.highlightBadge || "★ THE MAIN PART // UPDATED TRACKER ★"}</span>
          </div>
        )}

        {/* Top Header: ID, Skill Type and Mode */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`text-xl font-mono font-extrabold transition-colors ${
                feature.isHighlighted
                  ? "text-[#DDB65E]"
                  : "text-[#DDB65E]/50 group-hover:text-[#DDB65E]"
              }`}
            >
              #{feature.number}
            </span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider ${
                skillTypeColors[feature.skillType]
              }`}
            >
              {feature.skillType}
            </span>
          </div>

          <span className="text-[10px] font-mono font-semibold tracking-wider bg-[#DDB65E]/10 text-[#DDB65E] border border-[#DDB65E]/30 px-2.5 py-0.5 rounded-full uppercase">
            {feature.mode}
          </span>
        </div>

        {/* Title & Icon */}
        <div className="flex items-start gap-3.5 mb-3">
          <div
            className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 transition-all duration-300 shadow-md ${
              feature.isHighlighted
                ? "bg-[#DDB65E] text-[#0B1220] border-[#DDB65E] shadow-[0_0_15px_rgba(221,182,94,0.5)]"
                : "bg-gradient-to-br from-[#DDB65E]/20 to-[#B58F3B]/10 border-[#DDB65E]/40 text-[#DDB65E] group-hover:scale-110 group-hover:bg-[#DDB65E] group-hover:text-[#0B1220]"
            }`}
          >
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3
                className={`text-lg sm:text-xl font-extrabold font-heading leading-snug ${
                  feature.isHighlighted
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-[#DDB65E] via-[#F4D992] to-[#DDB65E] drop-shadow"
                    : "text-[#F5F1E8] group-hover:text-[#DDB65E] transition-colors"
                }`}
              >
                {feature.title}
              </h3>
              {feature.isHighlighted && (
                <span
                  className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block shrink-0"
                  title="Tracker status: 100% Updated"
                />
              )}
            </div>
            <p className="text-xs font-mono text-[#DDB65E]/90 mt-0.5 font-medium">
              {feature.tagline}
            </p>
          </div>
        </div>

        {/* Embedded Interactive Spreadsheet Simulation for Updated Tracker */}
        {feature.isHighlighted && (
          <div className="my-3.5 p-3 rounded-2xl bg-[#070B14]/95 border border-[#DDB65E]/50 font-mono text-[11px] shadow-inner space-y-2">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#DDB65E]/20 text-[#DDB65E]">
              <span className="font-bold flex items-center gap-1.5 text-[10px]">
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#DDB65E]" />
                UPDATED_TRACKER_KPI_V99.SHEETS
              </span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[9px] border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5" />
                UPDATED (LIVE)
              </span>
            </div>
            <div className="space-y-1.5 text-[10px]">
              <div className="flex items-center justify-between text-[#F5F1E8] bg-white/5 p-1.5 rounded">
                <span className="truncate pr-2">1. Birthday Tribute Surprise</span>
                <span className="text-emerald-400 font-bold shrink-0">COMPLETED ✅</span>
              </div>
              <div className="flex items-center justify-between text-[#F5F1E8] bg-white/5 p-1.5 rounded">
                <span className="truncate pr-2">2. Did You Update The Tracker?</span>
                <span className="text-[#DDB65E] font-bold shrink-0">ALWAYS UPDATED ⚡</span>
              </div>
              <div className="flex items-center justify-between text-[#F5F1E8] bg-white/5 p-1.5 rounded">
                <span className="truncate pr-2">3. Contentify Q4 Ambition Target</span>
                <span className="text-purple-400 font-bold shrink-0">+200% EXCEEDED 🚀</span>
              </div>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-[9px] text-[#A5B0C2]">FORMULA: =CONCAT(LOVE, TARGETS)</span>
              <EasterEggModal
                trigger={(open) => (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      open();
                    }}
                    type="button"
                    className="text-[10px] font-bold text-[#DDB65E] hover:underline flex items-center gap-1 cursor-pointer bg-[#DDB65E]/15 px-2 py-0.5 rounded border border-[#DDB65E]/40"
                  >
                    <span>OPEN SPREADSHEET</span>
                    <span>➔</span>
                  </button>
                )}
              />
            </div>
          </div>
        )}

        {/* Feature Quote */}
        <div className="my-4 p-3 rounded-xl bg-[#0B1220]/70 border border-white/5 relative">
          <p className="text-xs sm:text-sm text-[#F5F1E8]/90 italic font-sans leading-relaxed">
            &ldquo;{feature.quote}&rdquo;
          </p>
        </div>

        {/* RPG Attributes: Mana Cost & Cooldown */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-[10px] font-mono">
          <div className="p-1.5 rounded bg-black/40 border border-white/5">
            <span className="text-[#A5B0C2] block text-[9px]">MANA CONSUMPTION</span>
            <span className="text-blue-400 font-bold">{feature.manaCost}</span>
          </div>
          <div className="p-1.5 rounded bg-black/40 border border-white/5">
            <span className="text-[#A5B0C2] block text-[9px]">COOLDOWN PROTOCOL</span>
            <span className="text-amber-400 font-bold">{feature.cooldown}</span>
          </div>
        </div>
      </div>

      {/* Superpower & Side Effect Footer */}
      <div className="space-y-2 pt-3 border-t border-white/10">
        <div className="rounded-xl p-2.5 bg-[#0B1220]/80 border border-[#DDB65E]/20 flex items-start gap-2">
          <Zap className="w-4 h-4 text-[#DDB65E] shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] font-mono font-bold text-[#DDB65E] uppercase block">
              SUPERPOWER
            </span>
            <p className="text-xs text-[#F5F1E8] font-medium leading-tight">
              {feature.superpower}
            </p>
          </div>
        </div>

        {feature.sideEffectOrPhrase && (
          <div className="rounded-xl p-2 bg-[#1B2A43]/50 border border-white/5 text-[11px] font-sans flex items-start gap-2">
            <span className="text-[10px] font-mono text-[#A5B0C2] uppercase font-bold shrink-0">
              {feature.sideEffectOrPhrase.label}:
            </span>
            <span className="text-[#DDB65E]/90 italic">
              {feature.sideEffectOrPhrase.text}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
