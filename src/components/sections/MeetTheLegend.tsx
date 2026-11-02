import React from "react";
import { Section } from "@/components/layout/Section";
import { StatCard } from "@/components/cards/StatCard";
import { bossData } from "@/data/boss";
import { Reveal } from "@/components/ui/Reveal";
import { CheckCircle2, Sparkles, Terminal } from "lucide-react";

export function MeetTheLegend() {
  return (
    <Section
      id="legend"
      badge="SECTION 02 // DETAILS & STATS"
      title={bossData.legendHeading}
      subtitle={bossData.legendSubheadline}
    >
      <div className="space-y-12">
        {/* Narrative & Cheat Code Box */}
        <Reveal direction="up" delay={0.1}>
          <div className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#1B2A43]/80 via-[#111C30]/90 to-[#0B1220] border border-[#DDB65E]/30 shadow-2xl">
            {/* Quick 3-Question Attribute Pills from Google Doc */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {bossData.legendBulletPoints.map((pt, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-[#0B1220]/80 border border-[#DDB65E]/20 flex items-center justify-between text-xs font-mono"
                >
                  <span className="text-[#A5B0C2]">{pt.label}</span>
                  <span className="text-[#DDB65E] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {pt.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Narrative Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-[#F5F1E8] font-sans leading-relaxed">
              {bossData.legendDescription.map((para, i) => (
                <p key={i} className="text-[#F5F1E8]/90">
                  {para}
                </p>
              ))}
            </div>

            {/* Leadership Cheat Code Banner */}
            <div className="mt-8 pt-5 border-t border-[#DDB65E]/20 flex items-center justify-center gap-2 text-xs font-mono text-[#DDB65E]">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>SYSTEM LOG: LEADERSHIP CHEAT CODE FOUND & ACTIVE</span>
            </div>
          </div>
        </Reveal>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
          {bossData.stats.map((stat, idx) => (
            <Reveal key={stat.id} direction="up" delay={0.1 * (idx + 1)}>
              <StatCard stat={stat} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
