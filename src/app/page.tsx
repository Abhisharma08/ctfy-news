import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { MeetTheLegend } from "@/components/sections/MeetTheLegend";
import { Superpowers } from "@/components/sections/Superpowers";
import { HallOfFame } from "@/components/sections/HallOfFame";
import { Minions } from "@/components/sections/Minions";
import { Appreciation } from "@/components/sections/Appreciation";
import { Finale } from "@/components/sections/Finale";
import { GameDock } from "@/components/game/GameDock";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B1220] text-[#F5F1E8] relative selection:bg-[#DDB65E] selection:text-[#0B1220] pb-16">
      {/* Top sticky HUD navigation */}
      <Navbar />

      {/* 01. Character Intro & Profile */}
      <Hero />

      {/* 02. Meet the Legend (Dossier & Combat Stats) */}
      <MeetTheLegend />

      {/* 03. Core Features - Skill Tree */}
      <Superpowers />

      {/* 04. Hall of Fame - Achievements & Trophies */}
      <HallOfFame />

      {/* 05. Party Roster - The 20 Minions Have Entered The Chat */}
      <Minions />

      {/* 06. Story Epilogue - Behind The System Is A Human We Admire */}
      <Appreciation />

      {/* 07. Grand Victory Finale */}
      <Finale />

      {/* Footer */}
      <Footer />

      {/* Game Controller Dock (Bottom navigation for mobile & desktop) */}
      <GameDock />
    </main>
  );
}
