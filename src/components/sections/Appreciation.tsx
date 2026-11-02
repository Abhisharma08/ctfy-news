"use client";

import React from "react";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { bossData } from "@/data/boss";
import { Reveal } from "@/components/ui/Reveal";
import { Heart, ScrollText, Crown } from "lucide-react";
import { sounds } from "@/lib/sounds";

export function Appreciation() {
  return (
    <Section
      id="appreciation"
      badge="SECTION 06 // STORY EPILOGUE"
      className="bg-gradient-to-b from-transparent via-paper/80 to-transparent"
    >
      <div className="max-w-4xl mx-auto">
        <Reveal direction="up" delay={0.1}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-700 text-xs font-mono font-bold tracking-wider mb-3">
              <Heart className="w-3.5 h-3.5 fill-rose-400" />
              <span>MAIN STORY QUEST // FINAL TRANSMISSION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-ink font-heading leading-tight">
              {bossData.appreciationHeading}
            </h2>
            <p className="mt-2 text-xs sm:text-sm font-mono text-gold-deep uppercase tracking-wider">
              Recorded into Contentify Archives by Unanimous Team Decree
            </p>
          </div>
        </Reveal>

        {/* Cinematic Game Dialogue Box */}
        <Reveal direction="up" delay={0.25}>
          <div
            onClick={() => sounds.playSelect()}
            className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-cream/90 via-canvas to-paper border-2 border-gold/40 shadow-[0_0_50px_rgba(201,162,77,0.2)] backdrop-blur-xl cursor-pointer"
          >
            {/* Top Dialogue Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gold/20">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-gold/60 shadow-md shrink-0">
                  <Image
                    src={bossData.portrait}
                    alt="Boss"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gold-deep tracking-wider uppercase font-bold block">
                    SPEAKER: THE MINIONS OF CONTENTIFY
                  </span>
                  <h4 className="text-base font-extrabold text-ink font-heading">
                    To Our Extraordinary Leader
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-gold/10 border border-gold/30 text-[10px] font-mono text-gold-deep">
                <ScrollText className="w-3.5 h-3.5" />
                <span>EPILOGUE</span>
              </div>
            </div>

            {/* Dialogue Narrative from Google Doc */}
            <div className="space-y-4 text-ink text-sm sm:text-base leading-relaxed font-sans relative z-10">
              {bossData.appreciationParagraphs.map((para, idx) => (
                <p key={idx} className="text-ink/90">
                  {para}
                </p>
              ))}
            </div>

            {/* Core Truth Closing Quote Callout */}
            <div className="mt-8 pt-6 border-t border-gold/20 text-center">
              <div className="inline-flex items-center gap-2 mb-3 text-xs font-mono text-gold-deep tracking-widest uppercase">
                <Crown className="w-4 h-4" />
                <span>CORE LEADERSHIP PHILOSOPHY</span>
                <Crown className="w-4 h-4" />
              </div>
              <blockquote className="text-lg sm:text-2xl font-bold font-hero text-transparent bg-clip-text bg-gradient-to-r from-gold-deep via-gold-dark to-gold-deep italic leading-snug">
                &ldquo;{bossData.appreciationClosing}&rdquo;
              </blockquote>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
