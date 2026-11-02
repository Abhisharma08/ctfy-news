import React from "react";
import { Section } from "@/components/layout/Section";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { featuresData, featuresHeadline, featuresSubheadline } from "@/data/features";
import { Reveal } from "@/components/ui/Reveal";
import { MobileGamingSlider } from "@/components/game/MobileGamingSlider";

export function Superpowers() {
  return (
    <Section
      id="superpowers"
      badge="SECTION 03 // THE BOSS EDITION"
      title={featuresHeadline}
      subtitle={featuresSubheadline}
    >
      <MobileGamingSlider
        instruction="SWIPE TO INSPECT BOSS ABILITIES"
        counterPrefix="ABILITY"
        desktopGridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
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
      </MobileGamingSlider>
    </Section>
  );
}
