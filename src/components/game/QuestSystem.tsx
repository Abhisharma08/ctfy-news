"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Circle, Crown, RotateCcw, ScrollText, X } from "lucide-react";
import { QUESTS, TOTAL_XP, useGame, type QuestId } from "@/lib/game";
import { sounds } from "@/lib/sounds";
import { fireCelebrationConfetti } from "@/components/ui/ConfettiButton";

const ZONES: { id: string; quest: QuestId }[] = [
  { id: "legend", quest: "zone_legend" },
  { id: "superpowers", quest: "zone_superpowers" },
  { id: "awards", quest: "zone_awards" },
  { id: "minions", quest: "zone_minions" },
  { id: "appreciation", quest: "zone_appreciation" },
];

/** Completes "discover zone" quests as sections scroll into view. */
function ZoneWatcher() {
  const { complete } = useGame();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const zone = ZONES.find((z) => z.id === entry.target.id);
          if (zone) complete(zone.quest);
        });
      },
      { threshold: 0.25 }
    );
    ZONES.forEach((z) => {
      const el = document.getElementById(z.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [complete]);
  return null;
}

/** XP strip that sits on top of the GameDock; opens the quest log. */
export function XpBar({ onOpen }: { onOpen: () => void }) {
  const { xp, completed, allDone } = useGame();
  const pct = Math.round((xp / TOTAL_XP) * 100);
  return (
    <button
      type="button"
      onClick={() => {
        sounds.playSelect();
        onOpen();
      }}
      className="pointer-events-auto w-full flex items-center gap-2 px-3 py-1.5 mb-1.5 rounded-xl bg-paper/90 border border-gold/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(11,18,32,0.12)] cursor-pointer hover:border-gold transition-colors"
      aria-label="Open quest log"
    >
      <span className="shrink-0 text-[10px] font-mono font-bold text-ink bg-gradient-to-r from-gold to-gold-light rounded px-1.5 py-0.5">
        LV {allDone ? 100 : 99}
      </span>
      <div className="flex-1 h-2 rounded-full bg-ink/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
        />
      </div>
      <span className="shrink-0 text-[10px] font-mono text-ink-soft tabular-nums">
        {xp}/{TOTAL_XP} XP
      </span>
      <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-mono font-bold text-gold-deep">
        <ScrollText className="w-3.5 h-3.5" />
        {completed.size}/{QUESTS.length}
      </span>
    </button>
  );
}

function QuestLog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { completed, progress, xp, reset } = useGame();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-ink/40 backdrop-blur-sm p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Quest log"
            className="w-full max-w-md max-h-[85vh] flex flex-col rounded-3xl bg-paper border-2 border-gold/50 shadow-[0_0_50px_rgba(201,162,77,0.25)] overflow-hidden"
            initial={{ y: 40, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 40, scale: 0.97 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gold/20 bg-canvas">
              <div>
                <p className="text-[10px] font-mono tracking-widest text-gold-deep">QUEST LOG</p>
                <p className="text-lg font-extrabold font-heading text-ink">Road to Level 100</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-ink-soft hover:text-ink hover:bg-ink/10 cursor-pointer"
                aria-label="Close quest log"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ul className="flex-1 overflow-y-auto p-3 space-y-2">
              {QUESTS.map((q) => {
                const done = completed.has(q.id);
                const step = progress[q.id] ?? 0;
                return (
                  <li
                    key={q.id}
                    className={`flex items-center gap-3 p-3 rounded-2xl border ${
                      done ? "bg-gold/10 border-gold/40" : "bg-canvas border-ink/10"
                    }`}
                  >
                    <span className={`text-xl ${done ? "" : "grayscale opacity-60"}`}>{q.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold ${done ? "text-gold-deep" : "text-ink"}`}>{q.title}</p>
                      <p className="text-xs text-ink-soft">
                        {q.hint}
                        {q.goal && !done ? ` (${step}/${q.goal})` : ""}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 shrink-0">
                      {done ? (
                        <CheckCircle2 className="w-5 h-5 text-gold-deep" />
                      ) : (
                        <Circle className="w-5 h-5 text-ink/20" />
                      )}
                      <span className="text-[10px] font-mono text-ink-soft">+{q.xp} XP</span>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between px-5 py-3 border-t border-ink/15 text-xs font-mono">
              <span className="text-gold-deep font-bold">
                {xp} / {TOTAL_XP} XP
              </span>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1 text-ink-soft hover:text-ink cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AchievementToasts() {
  const { toasts, dismissToast } = useGame();

  useEffect(() => {
    if (toasts.length === 0) return;
    const first = toasts[0];
    const t = window.setTimeout(() => dismissToast(first.key), 3200);
    return () => window.clearTimeout(t);
  }, [toasts, dismissToast]);

  return (
    <div className="fixed top-20 inset-x-0 z-[70] flex flex-col items-center gap-2 px-3 pointer-events-none">
      <AnimatePresence>
        {toasts.slice(0, 3).map(({ key, quest }) => (
          <motion.div
            key={key}
            layout
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="pointer-events-auto flex items-center gap-3 pl-3 pr-4 py-2.5 rounded-2xl bg-canvas/95 border border-gold shadow-[0_0_30px_rgba(201,162,77,0.4)] backdrop-blur-md max-w-sm w-full"
            onClick={() => dismissToast(key)}
          >
            <span className="text-2xl">{quest.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-mono tracking-widest text-gold-deep">ACHIEVEMENT UNLOCKED</p>
              <p className="text-sm font-bold text-ink truncate">{quest.title}</p>
            </div>
            <span className="text-xs font-mono font-bold text-gold-deep">+{quest.xp} XP</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/** Full-screen celebration the first time every quest is cleared. */
function LevelUpCutscene() {
  const { allDone, toasts } = useGame();
  const [show, setShow] = useState(false);
  // Only celebrate when the final quest is cleared live (a toast is showing), not when a finished save loads.
  const justFinished = allDone && toasts.length > 0;

  useEffect(() => {
    if (!justFinished) return;
    const t = window.setTimeout(() => {
      setShow(true);
      sounds.playVictory();
      fireCelebrationConfetti();
      window.setTimeout(fireCelebrationConfetti, 700);
      window.setTimeout(fireCelebrationConfetti, 1400);
    }, 1200);
    return () => window.clearTimeout(t);
  }, [justFinished]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-white/90 backdrop-blur-md p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShow(false)}
        >
          <motion.div
            className="text-center max-w-lg"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
          >
            <div className="mx-auto mb-6 w-24 h-24 rounded-3xl bg-gradient-to-tr from-gold via-gold-light to-gold-dark text-ink flex items-center justify-center shadow-[0_0_80px_rgba(201,162,77,0.7)]">
              <Crown className="w-14 h-14 fill-current" />
            </div>
            <p className="text-xs font-mono tracking-[0.4em] text-gold-deep">100% COMPLETION</p>
            <h2 className="mt-2 text-5xl sm:text-7xl font-extrabold font-hero text-ink">LEVEL 100</h2>
            <p className="mt-4 text-base sm:text-lg text-ink/90 leading-relaxed">
              One more year, one more level. Happy Birthday, Boss! Your minions are proud to be in your party. 🎂
            </p>
            <p className="mt-6 text-[11px] font-mono text-ink-soft">Tap anywhere to continue</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Mount once: zone tracking, achievement toasts, quest log and the level-up cutscene. */
export function QuestSystem({ logOpen, onCloseLog }: { logOpen: boolean; onCloseLog: () => void }) {
  return (
    <>
      <ZoneWatcher />
      <AchievementToasts />
      <QuestLog open={logOpen} onClose={onCloseLog} />
      <LevelUpCutscene />
    </>
  );
}
