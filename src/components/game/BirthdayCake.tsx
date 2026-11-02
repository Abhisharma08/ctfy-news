"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { sounds } from "@/lib/sounds";
import { useGame } from "@/lib/game";
import { fireCelebrationConfetti } from "@/components/ui/ConfettiButton";

const CANDLES = 5;

/** Tap each candle to blow it out. Clearing all of them completes the "Make A Wish" quest. */
export function BirthdayCake() {
  const { complete } = useGame();
  const [lit, setLit] = useState<boolean[]>(() => Array(CANDLES).fill(true));
  const remaining = lit.filter(Boolean).length;

  const blow = (i: number) => {
    if (!lit[i]) return;
    const next = [...lit];
    next[i] = false;
    setLit(next);
    sounds.playPuff();
    if (next.every((l) => !l)) {
      window.setTimeout(() => {
        sounds.playVictory();
        fireCelebrationConfetti();
        complete("candles");
      }, 300);
    }
  };

  return (
    <div className="my-8 flex flex-col items-center">
      <p className="mb-3 text-[11px] font-mono tracking-widest text-gold-deep uppercase">
        {remaining > 0 ? `Tap to blow out the candles · ${remaining} left` : "Wish granted ✨"}
      </p>

      <div className="relative select-none">
        {/* Candles */}
        <div className="flex justify-center gap-4 sm:gap-6 px-6 relative z-10">
          {lit.map((isLit, i) => (
            <button
              key={i}
              type="button"
              onClick={() => blow(i)}
              aria-label={isLit ? `Blow out candle ${i + 1}` : `Candle ${i + 1} is out`}
              className="relative flex flex-col items-center pt-7 cursor-pointer group"
            >
              <AnimatePresence>
                {isLit ? (
                  <motion.span
                    key="flame"
                    className="absolute top-0 w-3.5 h-6 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_18px_6px_rgba(251,191,36,0.55)] group-hover:scale-110"
                    animate={{ scaleY: [1, 1.15, 0.95, 1.1, 1], rotate: [-3, 3, -2, 2, -3] }}
                    exit={{ scale: 0, opacity: 0, y: -6 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                  />
                ) : (
                  <motion.span
                    key="smoke"
                    className="absolute top-1 w-2 h-2 rounded-full bg-ink/40"
                    initial={{ opacity: 0.7, y: 0, scale: 1 }}
                    animate={{ opacity: 0, y: -24, scale: 2.5 }}
                    transition={{ duration: 1.1 }}
                  />
                )}
              </AnimatePresence>
              <span className="w-0.5 h-1.5 bg-[#2a2a2a]" />
              <span className="w-2.5 h-10 rounded-sm bg-[repeating-linear-gradient(45deg,#F4D992_0px,#F4D992_4px,#B58F3B_4px,#B58F3B_8px)]" />
            </button>
          ))}
        </div>

        {/* Cake body */}
        <div className="-mt-1 w-64 sm:w-80 h-12 rounded-t-xl bg-gradient-to-b from-gold-light to-gold relative">
          <div className="absolute -bottom-2 inset-x-0 h-4 flex justify-around">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="w-5 h-4 rounded-b-full bg-gold" />
            ))}
          </div>
        </div>
        <div className="w-64 sm:w-80 h-14 bg-gradient-to-b from-[#7A4B2A] to-[#4A2C18] rounded-b-xl flex items-center justify-center">
          <span className="text-[11px] font-mono font-bold tracking-[0.3em] text-gold-light">LVL 99 → 100</span>
        </div>
        <div className="mx-auto -mt-1 w-72 sm:w-[22rem] h-3 rounded-full bg-cream border border-gold/30" />
      </div>

      {remaining === 0 && (
        <button
          type="button"
          onClick={() => setLit(Array(CANDLES).fill(true))}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-ink-soft hover:text-ink cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Relight candles
        </button>
      )}
    </div>
  );
}
