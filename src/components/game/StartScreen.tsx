"use client";

import React, { useEffect, useRef, useState } from "react";
import { Crown, Volume2, VolumeX } from "lucide-react";
import { sounds } from "@/lib/sounds";
import { useGame, QUESTS } from "@/lib/game";
import { fireCelebrationConfetti } from "@/components/ui/ConfettiButton";

/** Arcade-style title screen shown on every visit. Pressing start unlocks audio (needs a user gesture). */
export function StartScreen() {
  const { completed, complete } = useGame();
  const [open, setOpen] = useState(true);
  const [leaving, setLeaving] = useState(false);

  const start = (withSound: boolean) => {
    if (leaving) return;
    sounds.setEnabled(withSound);
    sounds.playVictory();
    setLeaving(true);
    window.setTimeout(() => {
      setOpen(false);
      complete("press_start");
      window.scrollTo({ top: 0 });
      window.dispatchEvent(new Event("game:start"));
      fireCelebrationConfetti();
    }, 450);
  };

  const startRef = useRef(start);
  useEffect(() => {
    startRef.current = start;
  });

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        startRef.current(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  const returning = completed.size > 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Start screen"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center px-4 text-center bg-paper transition-opacity duration-500 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(201,162,77,0.18),transparent_60%)]" />
      {/* CRT scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07] bg-[repeating-linear-gradient(0deg,#fff_0px,#fff_1px,transparent_1px,transparent_3px)]" />

      <div className="relative flex flex-col items-center max-w-xl">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-gold via-gold-light to-gold-dark text-ink flex items-center justify-center shadow-[0_0_60px_rgba(201,162,77,0.5)] mb-6 animate-bounce">
          <Crown className="w-9 h-9 sm:w-11 sm:h-11 fill-current" />
        </div>

        <p className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-gold-deep uppercase mb-3">
          Contentify Studios presents
        </p>
        <h1 className="text-4xl sm:text-6xl font-extrabold font-hero text-ink leading-tight">
          The Boss of <span className="text-gold-deep">One of a Kind</span>
        </h1>
        <p className="mt-3 text-xs sm:text-sm font-mono text-ink-soft tracking-widest uppercase">
          Birthday Edition · Player 1: Nirupam Sir · LVL 99
        </p>

        <div className="mt-8 w-full rounded-2xl border border-gold/30 bg-canvas/80 p-4 text-left">
          <p className="text-[10px] font-mono text-gold-deep tracking-widest mb-2">MISSION BRIEFING</p>
          <p className="text-sm text-ink/90 leading-relaxed">
            Your minions have hidden <strong className="text-gold-deep">{QUESTS.length} quests</strong> across this
            world. Explore every zone, beat the mini-game and blow out your candles to reach{" "}
            <strong className="text-gold-deep">LEVEL 100</strong>.
          </p>
        </div>

        <button
          type="button"
          autoFocus
          onClick={() => start(true)}
          className="mt-8 inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-ink font-extrabold font-mono tracking-[0.25em] text-sm sm:text-base shadow-[0_0_40px_rgba(201,162,77,0.55)] hover:scale-105 active:scale-95 transition-transform cursor-pointer animate-pulse"
        >
          <Volume2 className="w-5 h-5" />
          {returning ? "CONTINUE" : "PRESS START"}
        </button>
        <button
          type="button"
          onClick={() => start(false)}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono text-ink-soft hover:text-ink cursor-pointer"
        >
          <VolumeX className="w-3.5 h-3.5" />
          Play muted
        </button>

        {returning && (
          <p className="mt-5 text-[11px] font-mono text-ink-soft">
            Save file found · {completed.size}/{QUESTS.length} quests complete
          </p>
        )}
      </div>
    </div>
  );
}
