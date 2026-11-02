"use client";

import React from "react";
import { Section } from "@/components/layout/Section";
import { EmployeeCard } from "@/components/cards/EmployeeCard";
import { employeesData } from "@/data/employees";
import { Reveal } from "@/components/ui/Reveal";
import { Sparkles } from "lucide-react";
import { MobileGamingSlider } from "@/components/game/MobileGamingSlider";

export function Minions() {
  const count = employeesData.length;

  return (
    <Section
      id="minions"
      badge="SECTION 05 // PARTY ROSTER"
      title="THE MINIONS HAVE ENTERED THE CHAT."
      subtitle={`${count} minions. One legendary boss. Countless tracker updates. And a whole lot of appreciation.`}
    >
      {/* Fan Club Motto Banner from Google Doc */}
      <Reveal direction="up" delay={0.05}>
        <div className="max-w-xl mx-auto mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream border border-gold/40 text-xs sm:text-sm font-mono text-gold-deep font-bold shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>“Every legend has a fan club. Here&apos;s yours.”</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>
      </Reveal>

      {/* Gaming Mobile Slider / Desktop Grid */}
      <MobileGamingSlider
        instruction={`SWIPE TO READ ALL ${count} BIRTHDAY WISHES`}
        counterPrefix="MINION"
        desktopGridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
      >
        {employeesData.map((employee, idx) => (
          <Reveal
            key={employee.id}
            direction="up"
            delay={0.05 * ((idx % 4) + 1)}
          >
            <EmployeeCard employee={employee} />
          </Reveal>
        ))}
      </MobileGamingSlider>
    </Section>
  );
}
