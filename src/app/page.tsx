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
import { GameProvider } from "@/lib/game";
import { StartScreen } from "@/components/game/StartScreen";
import { TrackerRush } from "@/components/sections/TrackerRush";
import { BirthdayRibbon } from "@/components/game/BirthdayVibes";

export default function Home() {
  return (
    <GameProvider>
    <main className="min-h-screen bg-paper text-ink relative selection:bg-gold selection:text-ink pb-28">
      {/* Arcade title screen */}
      <StartScreen />

      {/* Top sticky HUD navigation */}
      <Navbar />

      {/* 01. Character Intro & Profile */}
      <Hero />

      <BirthdayRibbon />

      {/* 02. Meet the Legend (Dossier & Combat Stats) */}
      <MeetTheLegend />

      {/* 03. Core Features - Skill Tree */}
      <Superpowers />

      {/* 04. Hall of Fame - Achievements & Trophies */}
      <HallOfFame />

      {/* 05. Party Roster - The Minions Have Entered The Chat */}
      <Minions />

      {/* Bonus Stage - Tracker Rush mini-game */}
      <TrackerRush />

      {/* 06. Story Epilogue - Behind The System Is A Human We Admire */}
      <Appreciation />

      <BirthdayRibbon reverse />

      {/* 07. Grand Victory Finale */}
      <Finale />

      {/* Footer */}
      <Footer />

      {/* Game Controller Dock (Bottom navigation for mobile & desktop) */}
      <GameDock />
    </main>
    </GameProvider>
  );
}
