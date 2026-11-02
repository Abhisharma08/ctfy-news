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
    Passive: "bg-emerald-500/20 text-emerald-700 border-emerald-500/30",
    Active: "bg-blue-500/20 text-blue-700 border-blue-500/30",
    Ultimate: "bg-purple-500/20 text-purple-700 border-purple-500/30",
    Defense: "bg-amber-500/20 text-amber-700 border-amber-500/30",
    Aura: "bg-rose-500/20 text-rose-700 border-rose-500/30",
  };

  return (
    <div
      onClick={() => sounds.playBlip()}
      className={`relative group rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between cursor-pointer ${
        feature.isHighlighted
          ? "bg-gradient-to-br from-cream via-cream to-paper border-2 border-gold shadow-[0_0_40px_rgba(201,162,77,0.35)] ring-2 ring-gold/40"
          : "bg-gradient-to-br from-cream/90 via-canvas/95 to-paper border border-gold/30 hover:border-gold hover:shadow-[0_15px_40px_-10px_rgba(201,162,77,0.35)]"
      }`}
    >
      <div>
        {/* Highlighted VIP Banner for Tracker */}
        {feature.isHighlighted && (
          <div className="mb-4 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-ink font-mono text-[10px] font-black tracking-widest uppercase flex items-center justify-center gap-1.5 shadow-lg animate-pulse">
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
                  ? "text-gold-deep"
                  : "text-gold-deep/50 group-hover:text-gold-deep"
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

          <span className="text-[10px] font-mono font-semibold tracking-wider bg-gold/10 text-gold-deep border border-gold/30 px-2.5 py-0.5 rounded-full uppercase">
            {feature.mode}
          </span>
        </div>

        {/* Title & Icon */}
        <div className="flex items-start gap-3.5 mb-3">
          <div
            className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 transition-all duration-300 shadow-md ${
              feature.isHighlighted
                ? "bg-gold text-ink border-gold shadow-[0_0_15px_rgba(201,162,77,0.5)]"
                : "bg-gradient-to-br from-gold/20 to-gold-dark/10 border-gold/40 text-gold-deep group-hover:scale-110 group-hover:bg-gold group-hover:text-ink"
            }`}
          >
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3
                className={`text-lg sm:text-xl font-extrabold font-heading leading-snug ${
                  feature.isHighlighted
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-gold-deep via-gold-dark to-gold-deep drop-shadow"
                    : "text-ink group-hover:text-gold-deep transition-colors"
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
            <p className="text-xs font-mono text-gold-deep/90 mt-0.5 font-medium">
              {feature.tagline}
            </p>
          </div>
        </div>

        {/* Embedded Interactive Spreadsheet Simulation for Updated Tracker */}
        {feature.isHighlighted && (
          <div className="my-3.5 p-3 rounded-2xl bg-paper/95 border border-gold/50 font-mono text-[11px] shadow-inner space-y-2">
            <div className="flex items-center justify-between pb-1.5 border-b border-gold/20 text-gold-deep">
              <span className="font-bold flex items-center gap-1.5 text-[10px]">
                <FileSpreadsheet className="w-3.5 h-3.5 text-gold-deep" />
                UPDATED_TRACKER_KPI_V99.SHEETS
              </span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-700 font-bold text-[9px] border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5" />
                UPDATED (LIVE)
              </span>
            </div>
            <div className="space-y-1.5 text-[10px]">
              <div className="flex items-center justify-between text-ink bg-ink/5 p-1.5 rounded">
                <span className="truncate pr-2">1. Birthday Tribute Surprise</span>
                <span className="text-emerald-700 font-bold shrink-0">COMPLETED ✅</span>
              </div>
              <div className="flex items-center justify-between text-ink bg-ink/5 p-1.5 rounded">
                <span className="truncate pr-2">2. Did You Update The Tracker?</span>
                <span className="text-gold-deep font-bold shrink-0">ALWAYS UPDATED ⚡</span>
              </div>
              <div className="flex items-center justify-between text-ink bg-ink/5 p-1.5 rounded">
                <span className="truncate pr-2">3. Contentify Q4 Ambition Target</span>
                <span className="text-purple-700 font-bold shrink-0">+200% EXCEEDED 🚀</span>
              </div>
            </div>
            <div className="pt-2 border-t border-ink/15 flex items-center justify-between">
              <span className="text-[9px] text-ink-soft">FORMULA: =CONCAT(LOVE, TARGETS)</span>
              <EasterEggModal
                trigger={(open) => (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      open();
                    }}
                    type="button"
                    className="text-[10px] font-bold text-gold-deep hover:underline flex items-center gap-1 cursor-pointer bg-gold/15 px-2 py-0.5 rounded border border-gold/40"
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
        <div className="my-4 p-3 rounded-xl bg-paper/70 border border-ink/10 relative">
          <p className="text-xs sm:text-sm text-ink/90 italic font-sans leading-relaxed">
            &ldquo;{feature.quote}&rdquo;
          </p>
        </div>

        {/* RPG Attributes: Mana Cost & Cooldown */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-[10px] font-mono">
          <div className="p-1.5 rounded bg-cream border border-ink/10">
            <span className="text-ink-soft block text-[9px]">MANA CONSUMPTION</span>
            <span className="text-blue-700 font-bold">{feature.manaCost}</span>
          </div>
          <div className="p-1.5 rounded bg-cream border border-ink/10">
            <span className="text-ink-soft block text-[9px]">COOLDOWN PROTOCOL</span>
            <span className="text-amber-700 font-bold">{feature.cooldown}</span>
          </div>
        </div>
      </div>

      {/* Superpower & Side Effect Footer */}
      <div className="space-y-2 pt-3 border-t border-ink/15">
        <div className="rounded-xl p-2.5 bg-paper/80 border border-gold/20 flex items-start gap-2">
          <Zap className="w-4 h-4 text-gold-deep shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] font-mono font-bold text-gold-deep uppercase block">
              SUPERPOWER
            </span>
            <p className="text-xs text-ink font-medium leading-tight">
              {feature.superpower}
            </p>
          </div>
        </div>

        {feature.sideEffectOrPhrase && (
          <div className="rounded-xl p-2 bg-cream/50 border border-ink/10 text-[11px] font-sans flex items-start gap-2">
            <span className="text-[10px] font-mono text-ink-soft uppercase font-bold shrink-0">
              {feature.sideEffectOrPhrase.label}:
            </span>
            <span className="text-gold-deep/90 italic">
              {feature.sideEffectOrPhrase.text}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
