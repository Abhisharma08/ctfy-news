"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Crown, Sparkles, Volume2, VolumeX, Shield, Zap, Flame, RefreshCw } from "lucide-react";
import { bossData } from "@/data/boss";
import { sounds } from "@/lib/sounds";
import { fireCelebrationConfetti } from "@/components/ui/ConfettiButton";

export function CharacterIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const metersRef = useRef<HTMLDivElement>(null);
  const [sfxEnabled, setSfxEnabled] = useState(false);

  const toggleSound = () => {
    sounds.enabled = !sounds.enabled;
    setSfxEnabled(sounds.enabled);
    if (sounds.enabled) {
      sounds.playBlip();
    }
  };

  const runIntroAnimation = () => {
    if (!cardRef.current || !titleRef.current) return;

    sounds.playSelect();

    const tl = gsap.timeline();

    gsap.set(cardRef.current, { scale: 0.88, opacity: 0, rotationY: -15 });
    gsap.set(titleRef.current, { opacity: 0, y: 30, letterSpacing: "0.15em" });
    if (badgeRef.current) gsap.set(badgeRef.current, { scale: 0, opacity: 0 });
    if (metersRef.current) gsap.set(metersRef.current.querySelectorAll(".stat-bar-fill"), { width: "0%" });

    tl.to(cardRef.current, {
      opacity: 1,
      scale: 1,
      rotationY: 0,
      duration: 1.1,
      ease: "power4.out",
    })
      .to(
        badgeRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(2)",
          onStart: () => sounds.playBlip(),
        },
        "-=0.6"
      )
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          letterSpacing: "normal",
          duration: 0.8,
          ease: "expo.out",
        },
        "-=0.4"
      )
      .to(
        metersRef.current?.querySelectorAll(".stat-bar-fill") || [],
        {
          width: "100%",
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.inOut",
          onComplete: () => sounds.playVictory(),
        },
        "-=0.3"
      );
  };

  useEffect(() => {
    runIntroAnimation();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full pt-20 pb-12 sm:pt-28 sm:pb-16 overflow-hidden">
      {/* Top Gaming HUD Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-[#111C30]/90 border border-[#DDB65E]/30 backdrop-blur-md shadow-lg">
          {/* Left Player Tag */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-[#DDB65E] to-[#F4D992] text-[#0B1220] font-bold font-mono text-xs shadow-md">
              99
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-extrabold text-[#F5F1E8] font-heading tracking-wide uppercase">
                  {bossData.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#DDB65E]/20 text-[#DDB65E] font-semibold">
                  {bossData.rarity}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#A5B0C2]">
                {bossData.characterClass}
              </span>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={runIntroAnimation}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-[#1B2A43] text-[#DDB65E] border border-[#DDB65E]/30 hover:bg-[#DDB65E] hover:text-[#0B1220] transition-colors cursor-pointer"
              title="Replay Intro Sequence"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">REPLAY INTRO</span>
            </button>

            <button
              onClick={toggleSound}
              type="button"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                sfxEnabled
                  ? "bg-[#DDB65E]/20 text-[#DDB65E] border-[#DDB65E]"
                  : "bg-[#111C30] text-[#A5B0C2] border-white/10 hover:border-white/20"
              }`}
              title="Toggle Game Audio Effects"
            >
              {sfxEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#DDB65E]" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{sfxEnabled ? "SFX: ON" : "SFX: MUTED"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Character Showcase Screen */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Supporting Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B2A43] border border-[#DDB65E]/50 shadow-[0_0_20px_rgba(221,182,94,0.3)]">
              <Crown className="w-4 h-4 text-[#DDB65E]" />
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-[#DDB65E] uppercase">
                ✦ CHARACTER UNLOCKED: FINAL FORM ✦
              </span>
            </div>

            {/* Main Headline */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#F5F1E8] font-hero leading-[1.08]"
            >
              THE BOSS OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DDB65E] via-[#F4D992] to-[#DDB65E] drop-shadow-md">
                ONE OF A KIND.
              </span>
            </h1>

            {/* Subheadline from Google Doc */}
            <div className="inline-block p-1 px-3 rounded-lg bg-[#111C30] border-l-4 border-[#DDB65E] text-xs sm:text-sm font-mono text-[#DDB65E]">
              &ldquo;{bossData.subheadline}&rdquo;
            </div>

            {/* Supporting Copy Paragraphs from Google Doc */}
            <div className="space-y-3 text-sm sm:text-base text-[#A5B0C2] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans">
              {bossData.heroCopy.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Combat Stat Bars */}
            <div ref={metersRef} className="space-y-3 pt-2 max-w-xl mx-auto lg:mx-0">
              {bossData.stats.map((stat) => (
                <div key={stat.id} className="p-3 rounded-xl bg-[#111C30]/80 border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#A5B0C2] font-semibold flex items-center gap-1.5">
                      <span className="text-[#DDB65E]">▶</span> {stat.label}
                    </span>
                    <span className="text-[#DDB65E] font-bold">{stat.value}</span>
                  </div>
                  <div className="h-2 w-full bg-[#0B1220] rounded-full overflow-hidden border border-white/10">
                    <div
                      className={`stat-bar-fill h-full rounded-full bg-gradient-to-r ${stat.meterColor || "from-[#DDB65E] to-[#F4D992]"} shadow-sm`}
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Controller Actions */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#superpowers"
                onClick={() => sounds.playSelect()}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#DDB65E] to-[#F4D992] text-[#0B1220] font-extrabold text-sm sm:text-base shadow-[0_0_30px_rgba(221,182,94,0.4)] hover:shadow-[0_0_45px_rgba(221,182,94,0.65)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>INSPECT SKILL TREE</span>
              </a>

              <button
                onClick={() => {
                  sounds.playVictory();
                  fireCelebrationConfetti();
                }}
                type="button"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1B2A43] text-[#F5F1E8] border border-[#DDB65E]/40 hover:border-[#DDB65E] hover:bg-[#111C30] active:scale-95 transition-all text-sm font-semibold cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#DDB65E]" />
                <span>TRIGGER SPECIAL VICTORY</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Holographic Character Card & Personality Tags */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              ref={cardRef}
              className="relative group w-full max-w-sm sm:max-w-md perspective-1000"
            >
              {/* Animated Holographic Outer Border */}
              <div className="absolute -inset-2 rounded-[34px] bg-gradient-to-tr from-[#DDB65E] via-[#38BDF8] to-[#DDB65E] opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

              {/* Character Card Body */}
              <div className="relative aspect-[3/4] w-full rounded-[28px] overflow-hidden border-2 border-[#DDB65E] bg-[#0B1220] shadow-[0_0_60px_rgba(221,182,94,0.3)]">
                <Image
                  src={bossData.portrait}
                  alt="Boss Character Art"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1220]/20 to-[#0B1220]/90 pointer-events-none" />

                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0B1220]/80 border border-[#DDB65E]/40 backdrop-blur-md">
                  <Crown className="w-3.5 h-3.5 text-[#DDB65E]" />
                  <span className="text-[10px] font-mono font-bold text-[#DDB65E]">
                    MYTHIC 1/1
                  </span>
                </div>

                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-[#0B1220]/80 border border-white/20 text-[10px] font-mono text-[#F5F1E8]">
                  LVL 99
                </div>

                {/* Bottom Character Stats Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0B1220]/90 border border-[#DDB65E]/40 backdrop-blur-md shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-[10px] font-mono text-[#DDB65E] tracking-wider uppercase font-bold block">
                        SUPREME ARCHITECT
                      </span>
                      <h3 className="text-xl font-extrabold text-[#F5F1E8] font-heading">
                        {bossData.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-[#A5B0C2] block">PWR LEVEL</span>
                      <span className="text-sm font-mono font-extrabold text-emerald-400">OVER 9000</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1 pt-2 border-t border-white/10 text-center text-[10px] font-mono">
                    <div className="p-1 rounded bg-white/5">
                      <span className="text-[#A5B0C2] block text-[9px]">PATIENCE</span>
                      <span className="text-[#DDB65E] font-bold">∞</span>
                    </div>
                    <div className="p-1 rounded bg-white/5">
                      <span className="text-[#A5B0C2] block text-[9px]">SHIELD</span>
                      <span className="text-blue-400 font-bold">100%</span>
                    </div>
                    <div className="p-1 rounded bg-white/5">
                      <span className="text-[#A5B0C2] block text-[9px]">REVIVES</span>
                      <span className="text-emerald-400 font-bold">UNLIMITED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personality Tags directly underneath photo from Google Doc */}
            <div className="mt-5 flex flex-wrap gap-2 justify-center max-w-sm sm:max-w-md">
              {bossData.personalityLabels.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-[#111C30] border border-[#DDB65E]/30 text-[#DDB65E] shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
