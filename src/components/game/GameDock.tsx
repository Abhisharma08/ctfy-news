"use client";

import React, { useState, useEffect } from "react";
import { User, Zap, Trophy, Users, Heart, Crown, FileSpreadsheet } from "lucide-react";
import { sounds } from "@/lib/sounds";
import { EasterEggModal } from "@/components/ui/EasterEggModal";

export function GameDock() {
  const [activeSection, setActiveSection] = useState("hero");

  const dockItems = [
    { id: "hero", label: "Profile", icon: User, href: "#hero" },
    { id: "legend", label: "Dossier", icon: Crown, href: "#legend" },
    { id: "superpowers", label: "Skills", icon: Zap, href: "#superpowers" },
    { id: "awards", label: "Trophies", icon: Trophy, href: "#awards" },
    { id: "minions", label: "Party", icon: Users, href: "#minions" },
    { id: "appreciation", label: "Lore", icon: Heart, href: "#appreciation" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const item of dockItems) {
        const el = document.querySelector(item.href);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          const height = el.getBoundingClientRect().height;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-3 inset-x-0 z-40 flex justify-center px-3 pointer-events-none">
      <nav className="pointer-events-auto max-w-lg w-full p-1.5 sm:p-2 rounded-2xl bg-[#0B1220]/90 border border-[#DDB65E]/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex items-center justify-between gap-1">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => sounds.playBlip()}
              className={`flex-1 py-1.5 px-1 sm:px-2 rounded-xl flex flex-col items-center justify-center transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-t from-[#DDB65E]/20 to-[#1B2A43] text-[#DDB65E] border border-[#DDB65E]/40 shadow-sm scale-105"
                  : "text-[#A5B0C2] hover:text-[#F5F1E8] hover:bg-white/5"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-[#DDB65E]" : "text-[#A5B0C2]"}`} />
              <span className="text-[9px] sm:text-[10px] font-mono mt-0.5 tracking-tight truncate max-w-[50px] sm:max-w-none">
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
