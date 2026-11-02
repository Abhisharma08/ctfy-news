"use client";

import React, { useState, useEffect } from "react";
import { User, Zap, Trophy, Users, Heart, Crown, Gamepad2 } from "lucide-react";
import { sounds } from "@/lib/sounds";
import { QuestSystem, XpBar } from "@/components/game/QuestSystem";

export function GameDock() {
  const [activeSection, setActiveSection] = useState("hero");
  const [logOpen, setLogOpen] = useState(false);

  const dockItems = [
    { id: "hero", label: "Profile", icon: User, href: "#hero" },
    { id: "legend", label: "Dossier", icon: Crown, href: "#legend" },
    { id: "superpowers", label: "Skills", icon: Zap, href: "#superpowers" },
    { id: "awards", label: "Trophies", icon: Trophy, href: "#awards" },
    { id: "minions", label: "Party", icon: Users, href: "#minions" },
    { id: "arcade", label: "Arcade", icon: Gamepad2, href: "#arcade" },
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
    <>
    <QuestSystem logOpen={logOpen} onCloseLog={() => setLogOpen(false)} />
    <div className="fixed bottom-3 inset-x-0 z-40 flex justify-center px-3 pointer-events-none">
      <div className="max-w-lg w-full">
      <XpBar onOpen={() => setLogOpen(true)} />
      <nav className="pointer-events-auto w-full p-1.5 sm:p-2 rounded-2xl bg-paper/90 border border-gold/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(11,18,32,0.12)] flex items-center justify-between gap-0.5 sm:gap-1">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => sounds.playBlip()}
              className={`flex-1 min-w-0 py-1.5 px-0.5 sm:px-2 rounded-xl flex flex-col items-center justify-center transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-t from-gold/20 to-cream text-gold-deep border border-gold/40 shadow-sm scale-105"
                  : "text-ink-soft hover:text-ink hover:bg-ink/5"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-gold-deep" : "text-ink-soft"}`} />
              <span className="text-[9px] sm:text-[10px] font-mono mt-0.5 tracking-tight truncate max-w-[50px] sm:max-w-none">
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
      </div>
    </div>
    </>
  );
}
