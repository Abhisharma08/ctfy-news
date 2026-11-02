"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown, Crown, Sparkles } from "lucide-react";
import { bossData } from "@/data/boss";
import { Reveal } from "@/components/ui/Reveal";
import { ConfettiButton } from "@/components/ui/ConfettiButton";

export function Hero() {
  return (
    <section className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden">
      {/* Background radial gold gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#DDB65E]/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[#1B2A43]/50 blur-[130px] pointer-events-none rounded-full" />

      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Celebration Badge */}
        <div className="flex justify-center mb-8">
          <Reveal isAboveFold direction="down" delay={0.05}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#111C30]/90 border border-[#DDB65E]/40 shadow-[0_0_25px_rgba(221,182,94,0.15)] backdrop-blur-md">
              <Crown className="w-4 h-4 text-[#DDB65E]" />
              <span className="text-xs sm:text-sm font-mono tracking-widest text-[#DDB65E] uppercase font-semibold">
                THE ORIGINAL · THE ICON · THE ONE OF ONE
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#F4D992]" />
            </div>
          </Reveal>
        </div>

        {/* Main 2-Column Hero on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headlines & Copy */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <Reveal isAboveFold direction="up" delay={0.15}>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#F5F1E8] font-hero leading-[1.08]">
                THE BOSS OF <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DDB65E] via-[#F4D992] to-[#B58F3B] drop-shadow-sm">
                  ONE OF A KIND.
                </span>
              </h1>
            </Reveal>

            <Reveal isAboveFold direction="up" delay={0.25}>
              <p className="text-lg sm:text-2xl font-heading font-semibold text-[#DDB65E]/90 tracking-wide">
                {bossData.subtitle}
              </p>
            </Reveal>

            <Reveal isAboveFold direction="up" delay={0.35}>
              <p className="text-base sm:text-lg text-[#A5B0C2] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans">
                {bossData.heroCopy}
              </p>
            </Reveal>

            {/* Personality Labels Tag Cloud */}
            <Reveal isAboveFold direction="up" delay={0.45}>
              <div className="pt-2 flex flex-wrap gap-2 justify-center lg:justify-start">
                {bossData.personalityLabels.map((label, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 text-[11px] sm:text-xs font-mono font-medium rounded-lg bg-[#1B2A43]/80 border border-[#DDB65E]/20 text-[#F5F1E8] hover:border-[#DDB65E]/60 hover:text-[#DDB65E] transition-colors"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* CTA Buttons */}
            <Reveal isAboveFold direction="up" delay={0.55}>
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a
                  href="#legend"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#DDB65E] to-[#F4D992] text-[#0B1220] font-bold text-sm sm:text-base shadow-[0_4px_25px_rgba(221,182,94,0.35)] hover:shadow-[0_6px_35px_rgba(221,182,94,0.55)] hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <span>Explore The Legend</span>
                  <ArrowDown className="w-4 h-4" />
                </a>
                <ConfettiButton label="Launch Birthday Confetti" variant="secondary" />
              </div>
            </Reveal>
          </div>

          {/* Right Column: Cinematic Boss Portrait Treatment */}
          <div className="lg:col-span-5 flex justify-center">
            <Reveal isAboveFold direction="up" delay={0.25} duration={0.7} className="w-full max-w-sm sm:max-w-md">
              <div className="relative group w-full">
                {/* Gold rim glow effect behind frame */}
                <div className="absolute -inset-1.5 rounded-[32px] bg-gradient-to-tr from-[#DDB65E] via-[#F4D992] to-[#1B2A43] opacity-60 blur-lg group-hover:opacity-90 transition-opacity duration-700 animate-pulse" />

                {/* Main Frame Container */}
                <div className="relative aspect-[3/4] w-full rounded-[28px] overflow-hidden border-2 border-[#DDB65E]/50 bg-[#111C30] shadow-2xl">
                  <Image
                    src={bossData.portrait}
                    alt="The Boss of One of a Kind"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient bottom shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent opacity-75" />

                  {/* Overlay Nameplate Badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0B1220]/85 border border-[#DDB65E]/30 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest uppercase text-[#DDB65E] font-semibold block">
                          SUPREME LEADER // CONTENTIFY
                        </span>
                        <h4 className="text-lg font-bold font-heading text-[#F5F1E8]">
                          The Boss
                        </h4>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#DDB65E]/15 border border-[#DDB65E]/40 flex items-center justify-center text-[#DDB65E]">
                        <Crown className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
