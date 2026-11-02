"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Crown, Sparkles, Volume2, VolumeX, Shield, Zap, Flame, RefreshCw } from "lucide-react";
import { bossData } from "@/data/boss";
import { sounds, useSoundEnabled } from "@/lib/sounds";
import { fireCelebrationConfetti } from "@/components/ui/ConfettiButton";
import { BirthdayBunting, FloatingBalloons } from "@/components/game/BirthdayVibes";

export function CharacterIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const metersRef = useRef<HTMLDivElement>(null);
  const sfxEnabled = useSoundEnabled();

  const toggleSound = () => {
    if (sounds.toggleMute()) {
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
    // Replay the character reveal once the player leaves the title screen
    const onStart = () => runIntroAnimation();
    window.addEventListener("game:start", onStart);
    return () => window.removeEventListener("game:start", onStart);
  }, []);

  return (
    <div ref={containerRef} className="relative isolate w-full pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
      <FloatingBalloons />
      {/* Top Gaming HUD Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex items-center justify-between gap-2 p-2.5 sm:p-4 rounded-2xl bg-canvas/90 border border-gold/30 backdrop-blur-md shadow-lg">
          {/* Left Player Tag */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-gold to-gold-light text-ink font-bold font-mono text-xs shadow-md shrink-0">
              99
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xs sm:text-sm font-extrabold text-ink font-heading tracking-wide uppercase whitespace-nowrap shrink-0">
                  {bossData.name}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-gold/20 text-gold-deep font-semibold min-w-0 truncate">
                  {bossData.rarity}
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono text-ink-soft block leading-tight">
                {bossData.characterClass}
              </span>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={runIntroAnimation}
              type="button"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono bg-cream text-gold-deep border border-gold/30 hover:bg-gold hover:text-ink transition-colors cursor-pointer"
              title="Replay Intro Sequence"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">REPLAY</span>
            </button>

            <button
              onClick={toggleSound}
              type="button"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono border transition-all cursor-pointer ${
                sfxEnabled
                  ? "bg-gold/20 text-gold-deep border-gold"
                  : "bg-canvas text-ink-soft border-ink/15 hover:border-ink/25"
              }`}
              title="Toggle Game Audio Effects"
            >
              {sfxEnabled ? <Volume2 className="w-3.5 h-3.5 text-gold-deep" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden xs:inline">{sfxEnabled ? "SFX: ON" : "SFX: MUTED"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Birthday bunting */}
      <div className="px-3 sm:px-6 -mt-2 mb-4 sm:mb-6">
        <BirthdayBunting />
      </div>

      {/* Main Character Showcase Screen */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Supporting Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream border border-gold/50 shadow-[0_0_20px_rgba(201,162,77,0.3)]">
              <Crown className="w-4 h-4 text-gold-deep" />
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-gold-deep uppercase">
                ✦ CHARACTER UNLOCKED: FINAL FORM ✦
              </span>
            </div>

            {/* Main Headline */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-ink font-hero leading-[1.08]"
            >
              THE BOSS OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-deep via-gold-dark to-gold-deep drop-shadow-md">
                ONE OF A KIND.
              </span>
            </h1>

            {/* Subheadline from Google Doc */}
            <div className="inline-block p-1 px-3 rounded-lg bg-canvas border-l-4 border-gold text-xs sm:text-sm font-mono text-gold-deep">
              &ldquo;{bossData.subheadline}&rdquo;
            </div>

            {/* Supporting Copy Paragraphs from Google Doc */}
            <div className="space-y-3 text-sm sm:text-base text-ink-soft leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans">
              {bossData.heroCopy.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Combat Stat Bars */}
            <div ref={metersRef} className="space-y-3 pt-2 max-w-xl mx-auto lg:mx-0">
              {bossData.stats.map((stat) => (
                <div key={stat.id} className="p-3 rounded-xl bg-canvas/80 border border-ink/10 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-ink-soft font-semibold flex items-center gap-1.5">
                      <span className="text-gold-deep">▶</span> {stat.label}
                    </span>
                    <span className="text-gold-deep font-bold">{stat.value}</span>
                  </div>
                  <div className="h-2 w-full bg-paper rounded-full overflow-hidden border border-ink/15">
                    <div
                      className={`stat-bar-fill h-full rounded-full bg-gradient-to-r ${stat.meterColor || "from-gold to-gold-light"} shadow-sm`}
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
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-gold to-gold-light text-ink font-extrabold text-sm sm:text-base shadow-[0_0_30px_rgba(201,162,77,0.4)] hover:shadow-[0_0_45px_rgba(201,162,77,0.65)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
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
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-cream text-ink border border-gold/40 hover:border-gold hover:bg-canvas active:scale-95 transition-all text-sm font-semibold cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-gold-deep" />
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
              <div className="absolute -inset-2 rounded-[34px] bg-gradient-to-tr from-gold via-[#38BDF8] to-gold opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

              {/* Character Card Body */}
              <div className="relative aspect-[3/4] w-full rounded-[28px] overflow-hidden border-2 border-gold bg-paper shadow-[0_0_60px_rgba(201,162,77,0.3)]">
                <Image
                  src={bossData.portrait}
                  alt="Boss Character Art"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-paper/80 border border-gold/40 backdrop-blur-md">
                  <Crown className="w-3.5 h-3.5 text-gold-deep" />
                  <span className="text-[10px] font-mono font-bold text-gold-deep">
                    MYTHIC 1/1
                  </span>
                </div>

                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-paper/80 border border-ink/25 text-[10px] font-mono text-ink">
                  LVL 99
                </div>

              </div>
            </div>

            {/* Personality Tags directly underneath photo from Google Doc */}
            <div className="mt-5 flex flex-wrap gap-2 justify-center max-w-sm sm:max-w-md">
              {bossData.personalityLabels.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-canvas border border-gold/30 text-gold-deep shadow-sm"
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
