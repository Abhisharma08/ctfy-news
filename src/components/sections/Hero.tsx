import React from "react";
import { CharacterIntro } from "@/components/game/CharacterIntro";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen">
      <CharacterIntro />
    </section>
  );
}
