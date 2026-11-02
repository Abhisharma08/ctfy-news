"use client";

import React from "react";
import { Section } from "@/components/layout/Section";
import { bossData } from "@/data/boss";
import { Reveal } from "@/components/ui/Reveal";
import { fireCelebrationConfetti } from "@/components/ui/ConfettiButton";
import { EasterEggModal } from "@/components/ui/EasterEggModal";
import { Sparkles, Crown, Heart, Trophy } from "lucide-react";
import { sounds } from "@/lib/sounds";
import { useGame } from "@/lib/game";
import { BirthdayCake } from "@/components/game/BirthdayCake";

export function Finale() {
  const { complete } = useGame();
  const triggerVictory = () => {
    sounds.playVictory();
    fireCelebrationConfetti();
    complete("victory_cannon");
  };

  return (
    <Section
      id="finale"
      badge="SECTION 07 // VICTORY CUTSCENE"
      className="pb-32 pt-16 md:pt-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <Reveal direction="up" delay={0.1}>
          <div className="relative p-8 sm:p-14 rounded-[36px] bg-gradient-to-b from-cream via-canvas to-paper border-2 border-gold/50 shadow-[0_0_90px_rgba(201,162,77,0.3)] overflow-hidden">
            {/* Victory Ribbon Header */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 border border-gold text-gold-deep text-xs font-mono font-bold uppercase tracking-widest mb-6 animate-pulse">
              <Trophy className="w-4 h-4" />
              <span>STAGE CLEARED // LEVEL 100 UNLOCKED</span>
            </div>

            {/* Giant Crown Trophy */}
            <div className="flex justify-center mb-6">
              <div
                onClick={triggerVictory}
                className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-gold via-gold-light to-gold-dark text-ink flex items-center justify-center shadow-xl cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300"
                title="Tap for Victory Fanfare"
              >
                <Crown className="w-11 h-11 fill-current" />
              </div>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-ink font-hero tracking-tight leading-tight">
              {bossData.finaleHeadline}
            </h2>

            <p className="mt-3 text-sm sm:text-lg font-mono tracking-widest text-gold-deep uppercase font-bold">
              {bossData.finaleTagline}
            </p>

            {/* Interactive birthday cake */}
            <BirthdayCake />

            {/* Heartfelt closing */}
            <p className="text-base sm:text-xl text-ink font-heading font-medium max-w-2xl mx-auto leading-relaxed">
              {bossData.finaleCopy}
            </p>

            {/* Humorous punchline */}
            <div className="mt-5 inline-block px-5 py-2.5 rounded-full bg-paper/80 border border-gold/30 text-xs sm:text-sm font-mono text-gold-deep">
              {bossData.finalePunchline}
            </div>

            {/* Celebration Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={triggerVictory}
                type="button"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-ink font-extrabold text-sm sm:text-base shadow-[0_0_35px_rgba(201,162,77,0.5)] hover:shadow-[0_0_50px_rgba(201,162,77,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-5 h-5 fill-current" />
                <span>FIRE VICTORY CANNON 🎉</span>
              </button>

              <EasterEggModal />
            </div>

            <p className="mt-8 text-xs font-mono text-ink-soft/80 flex items-center justify-center gap-1.5">
              <span>Made with 999,999 XP and unlimited love by Contentify Minions</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
