import React from "react";
import { Section } from "@/components/layout/Section";
import { StatCard } from "@/components/cards/StatCard";
import { bossData } from "@/data/boss";
import { Reveal } from "@/components/ui/Reveal";

export function MeetTheLegend() {
  return (
    <Section
      id="legend"
      badge="SECTION 02 // DOSSIER"
      title={bossData.legendHeading}
      subtitle="Behind every impossible deadline hit and every solved crisis stands a leader operating on an entirely different plane."
    >
      <div className="space-y-12">
        {/* Narrative Box */}
        <Reveal direction="up" delay={0.1}>
          <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#1B2A43]/70 via-[#111C30]/85 to-[#0B1220] border border-[#DDB65E]/25 shadow-xl text-center">
            <p className="text-base sm:text-xl text-[#F5F1E8] font-heading font-medium leading-relaxed">
              &ldquo;{bossData.legendDescription}&rdquo;
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#DDB65E]" />
              <span className="text-xs font-mono tracking-widest text-[#DDB65E] uppercase font-bold">
                CONFIDENTIAL TEAM EVALUATION
              </span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#DDB65E]" />
            </div>
          </div>
        </Reveal>

        {/* 4 Personality Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {bossData.stats.map((stat, idx) => (
            <Reveal key={stat.id} direction="up" delay={0.15 * (idx + 1)}>
              <StatCard stat={stat} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
