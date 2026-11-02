import React from "react";
import { Section } from "@/components/layout/Section";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { featuresData } from "@/data/features";
import { Reveal } from "@/components/ui/Reveal";

export function Superpowers() {
  return (
    <Section
      id="superpowers"
      badge="SECTION 03 // CORE FEATURES"
      title="BUILT DIFFERENT. AUTOMATED BETTER."
      subtitle="The five proprietary algorithms, superpowers, and workplace habits that turn chaos into flawless execution."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresData.map((feature, idx) => (
          <Reveal
            key={feature.id}
            direction="up"
            delay={0.1 * (idx + 1)}
            className={idx === 4 ? "md:col-span-2 lg:col-span-1" : ""}
          >
            <FeatureCard feature={feature} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
