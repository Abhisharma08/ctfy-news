import React from "react";
import { Section } from "@/components/layout/Section";
import { bossData } from "@/data/boss";
import { Reveal } from "@/components/ui/Reveal";
import { Heart, Sparkles, Quote } from "lucide-react";

export function Appreciation() {
  return (
    <Section
      id="appreciation"
      badge="SECTION 05 // HEARTFELT"
      className="bg-gradient-to-b from-transparent via-[#0F172A]/70 to-transparent"
    >
      <div className="max-w-4xl mx-auto">
        <Reveal direction="up" delay={0.1}>
          <div className="text-center mb-10">
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Heart className="w-6 h-6 fill-rose-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F1E8] font-heading leading-tight">
              {bossData.appreciationHeading}
            </h2>
            <p className="mt-3 text-sm sm:text-base font-mono text-[#DDB65E] uppercase tracking-wider">
              A Moment of Genuine Gratitude from the Entire Contentify Family
            </p>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.25}>
          <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1B2A43]/80 via-[#111C30] to-[#0B1220] border border-[#DDB65E]/30 shadow-2xl backdrop-blur-xl">
            {/* Watermark Quote Icon */}
            <div className="absolute top-6 right-8 text-[#DDB65E]/10 pointer-events-none">
              <Quote className="w-20 h-20 rotate-180" />
            </div>

            <div className="space-y-6 text-[#F5F1E8] text-base sm:text-lg leading-relaxed font-sans relative z-10">
              {bossData.appreciationParagraphs.map((para, idx) => (
                <p key={idx} className="text-[#F5F1E8]/90">
                  {para}
                </p>
              ))}
            </div>

            {/* Climax Closing Quote Callout */}
            <div className="mt-10 pt-8 border-t border-[#DDB65E]/20 text-center">
              <div className="inline-flex items-center gap-2 mb-3 text-xs font-mono text-[#DDB65E] tracking-widest uppercase">
                <Sparkles className="w-4 h-4" />
                <span>The Core Truth</span>
                <Sparkles className="w-4 h-4" />
              </div>
              <blockquote className="text-xl sm:text-2xl font-bold font-hero text-transparent bg-clip-text bg-gradient-to-r from-[#DDB65E] via-[#F4D992] to-[#DDB65E] italic leading-snug">
                &ldquo;{bossData.appreciationClosing}&rdquo;
              </blockquote>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
