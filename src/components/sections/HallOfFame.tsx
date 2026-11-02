import React from "react";
import { Section } from "@/components/layout/Section";
import { AwardCard } from "@/components/cards/AwardCard";
import { awardsData } from "@/data/awards";
import { Reveal } from "@/components/ui/Reveal";

export function HallOfFame() {
  return (
    <Section
      id="awards"
      badge="SECTION 04 // HALL OF FAME"
      title="THE LEGENDARY ACHIEVEMENTS BOARD"
      subtitle="Honoring the extraordinary feats, tactical triumphs, and signature habits that make our boss an undisputed legend."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {awardsData.map((award, idx) => (
          <Reveal key={award.id} direction="up" delay={0.1 * (idx + 1)}>
            <AwardCard award={award} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
