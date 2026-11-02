import React from "react";
import { Section } from "@/components/layout/Section";
import { AwardCard } from "@/components/cards/AwardCard";
import { awardsData, awardsHeadline, awardsSubheadline, awardsDisclaimer } from "@/data/awards";
import { Reveal } from "@/components/ui/Reveal";
import { Info } from "lucide-react";
import { MobileGamingSlider } from "@/components/game/MobileGamingSlider";

export function HallOfFame() {
  return (
    <Section
      id="awards"
      badge="SECTION 04 // ACHIEVEMENTS UNLOCKED"
      title={awardsHeadline}
      subtitle={awardsSubheadline}
    >
      <MobileGamingSlider
        instruction="SWIPE TO UNLOCK ALL TROPHIES"
        counterPrefix="TROPHY"
        desktopGridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        {awardsData.map((award, idx) => (
          <Reveal key={award.id} direction="up" delay={0.1 * (idx + 1)}>
            <AwardCard award={award} />
          </Reveal>
        ))}
      </MobileGamingSlider>

      {/* Official Unofficial Disclaimer from Google Doc */}
      <Reveal direction="up" delay={0.4}>
        <div className="mt-8 sm:mt-12 max-w-2xl mx-auto p-4 rounded-2xl bg-[#111C30]/70 border border-[#DDB65E]/20 text-center text-xs font-mono text-[#A5B0C2] flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-[#DDB65E] shrink-0" />
          <span>{awardsDisclaimer}</span>
        </div>
      </Reveal>
    </Section>
  );
}
