import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { MeetTheLegend } from "@/components/sections/MeetTheLegend";
import { Superpowers } from "@/components/sections/Superpowers";
import { HallOfFame } from "@/components/sections/HallOfFame";
import { Appreciation } from "@/components/sections/Appreciation";
import { Minions } from "@/components/sections/Minions";
import { Finale } from "@/components/sections/Finale";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B1220] text-[#F5F1E8] relative selection:bg-[#DDB65E] selection:text-[#0B1220]">
      {/* Top sticky navigation */}
      <Navbar />

      {/* 01. Hero */}
      <Hero />

      {/* 02. Meet the Legend */}
      <MeetTheLegend />

      {/* 03. Core Features - Built Different */}
      <Superpowers />

      {/* 04. Hall of Fame - Legendary Achievements */}
      <HallOfFame />

      {/* 05. Appreciation - Behind the System is You */}
      <Appreciation />

      {/* 06. Team Tributes - The Minions Have Entered The Chat */}
      <Minions />

      {/* 07. Birthday Finale */}
      <Finale />

      {/* Footer */}
      <Footer />
    </main>
  );
}
