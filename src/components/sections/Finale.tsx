"use client";

import React from "react";
import { Section } from "@/components/layout/Section";
import { bossData } from "@/data/boss";
import { Reveal } from "@/components/ui/Reveal";
import { ConfettiButton } from "@/components/ui/ConfettiButton";
import { EasterEggModal } from "@/components/ui/EasterEggModal";
import { Cake, Sparkles, Crown, Heart } from "lucide-react";

export function Finale() {
  return (
    <Section
      id="finale"
      badge="SECTION 07 // CELEBRATION"
      className="pb-24 pt-16 md:pt-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <Reveal direction="up" delay={0.1}>
          <div className="relative p-10 sm:p-16 rounded-[36px] bg-gradient-to-b from-[#1B2A43] via-[#111C30] to-[#070B14] border-2 border-[#DDB65E]/40 shadow-[0_0_80px_rgba(221,182,94,0.25)] overflow-hidden">
            {/* Top crown ornament */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#DDB65E] to-[#B58F3B] text-[#0B1220] flex items-center justify-center shadow-lg animate-bounce">
                <Crown className="w-9 h-9 fill-current" />
              </div>
            </div>

            {/* Giant Headline */}
            <h2 className="text-4xl sm:text-6xl font-extrabold text-[#F5F1E8] font-hero tracking-tight leading-tight">
              {bossData.finaleHeadline}
            </h2>

            <p className="mt-4 text-base sm:text-xl font-mono tracking-widest text-[#DDB65E] uppercase font-bold">
              {bossData.finaleTagline}
            </p>

            {/* Cake Icon Accent */}
            <div className="my-8 flex items-center justify-center gap-3">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#DDB65E]/60" />
              <div className="w-10 h-10 rounded-full bg-[#DDB65E]/15 border border-[#DDB65E]/30 flex items-center justify-center text-[#DDB65E]">
                <Cake className="w-5 h-5" />
              </div>
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#DDB65E]/60" />
            </div>

            {/* Heartfelt closing */}
            <p className="text-lg sm:text-2xl text-[#F5F1E8] font-heading font-medium max-w-2xl mx-auto leading-relaxed">
              {bossData.finaleCopy}
            </p>

            {/* Humorous punchline */}
            <div className="mt-6 inline-block px-5 py-2.5 rounded-full bg-[#0B1220]/80 border border-[#DDB65E]/30 text-xs sm:text-sm font-mono text-[#DDB65E]">
              {bossData.finalePunchline}
            </div>

            {/* Celebration Actions */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <ConfettiButton
                label="Fire Birthday Confetti Cannon! 🎉"
                variant="primary"
                className="text-base sm:text-lg px-9 py-4 shadow-xl"
              />
              <EasterEggModal />
            </div>

            <p className="mt-8 text-xs font-mono text-[#A5B0C2]/80 flex items-center justify-center gap-1.5">
              <span>Made with unlimited respect and gratitude by Contentify Minions</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
