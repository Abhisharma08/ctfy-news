"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gamepad2, Play, RotateCcw, Timer, Trophy } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { sounds } from "@/lib/sounds";
import { useGame } from "@/lib/game";
import { fireCelebrationConfetti } from "@/components/ui/ConfettiButton";

type CellKind = "empty" | "pending" | "cake" | "asap" | "done" | "missed" | "oops";

interface Cell {
  kind: CellKind;
  /** ms timestamp when the cell expires / resets */
  until: number;
}

const COLS = 4;
const ROWS = 3;
const CELL_COUNT = COLS * ROWS;
const ROUND_MS = 30_000;
const TARGET = 15;
const COL_LETTERS = ["A", "B", "C", "D"];

const BOSS_LINES = [
  "Did you update the tracker?",
  "Is this on the tracker?",
  "Can we automate this?",
  "What's the ETA on that row?",
  "Tracker. Now. Please. 🙂",
];

const emptyGrid = (): Cell[] => Array.from({ length: CELL_COUNT }, () => ({ kind: "empty", until: 0 }));

export function TrackerRush() {
  const { recordRushScore, rushBest } = useGame();
  const [phase, setPhase] = useState<"ready" | "playing" | "over">("ready");
  const [cells, setCells] = useState<Cell[]>(emptyGrid);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_MS);
  const [bossLine, setBossLine] = useState<string | null>(null);

  const cellsRef = useRef(cells);
  const scoreRef = useRef(0);
  const startRef = useRef(0);
  const nextSpawnRef = useRef(0);
  const bossTimer = useRef<number | undefined>(undefined);

  const commitCells = (next: Cell[]) => {
    cellsRef.current = next;
    setCells(next);
  };

  const nag = useCallback(() => {
    setBossLine(BOSS_LINES[Math.floor(Math.random() * BOSS_LINES.length)]);
    window.clearTimeout(bossTimer.current);
    bossTimer.current = window.setTimeout(() => setBossLine(null), 1300);
  }, []);

  const finish = useCallback(() => {
    setPhase("over");
    commitCells(emptyGrid());
    const final = scoreRef.current;
    recordRushScore(final);
    if (final >= TARGET) {
      sounds.playVictory();
      fireCelebrationConfetti();
    } else {
      sounds.playMiss();
    }
  }, [recordRushScore]);

  // Game loop
  useEffect(() => {
    if (phase !== "playing") return;
    const id = window.setInterval(() => {
      const now = performance.now();
      const elapsed = now - startRef.current;
      const remaining = Math.max(0, ROUND_MS - elapsed);
      setTimeLeft(remaining);
      if (remaining <= 0) {
        window.clearInterval(id);
        finish();
        return;
      }

      // Difficulty ramps up over the round
      const t = elapsed / ROUND_MS;
      const lifetime = 1500 - 650 * t;
      const spawnEvery = 850 - 450 * t;

      let changed = false;
      let missed = false;
      const next = cellsRef.current.map((c) => {
        if (c.kind !== "empty" && now >= c.until) {
          changed = true;
          if (c.kind === "pending") {
            missed = true;
            return { kind: "missed" as const, until: now + 450 };
          }
          return { kind: "empty" as const, until: 0 };
        }
        return c;
      });

      if (now >= nextSpawnRef.current) {
        const free = next.map((c, i) => (c.kind === "empty" ? i : -1)).filter((i) => i >= 0);
        if (free.length) {
          const i = free[Math.floor(Math.random() * free.length)];
          const roll = Math.random();
          const kind: CellKind = roll < 0.12 ? "cake" : roll < 0.27 ? "asap" : "pending";
          next[i] = { kind, until: now + (kind === "cake" ? lifetime * 0.7 : lifetime) };
          changed = true;
        }
        nextSpawnRef.current = now + spawnEvery;
      }

      if (changed) commitCells(next);
      if (missed) {
        setStreak(0);
        nag();
      }
    }, 50);
    return () => window.clearInterval(id);
  }, [phase, finish, nag]);

  useEffect(() => () => window.clearTimeout(bossTimer.current), []);

  const start = () => {
    sounds.playSelect();
    scoreRef.current = 0;
    setScore(0);
    setStreak(0);
    setBossLine(null);
    setTimeLeft(ROUND_MS);
    commitCells(emptyGrid());
    startRef.current = performance.now();
    nextSpawnRef.current = startRef.current + 400;
    setPhase("playing");
  };

  const hit = (index: number) => {
    if (phase !== "playing") return;
    const cell = cellsRef.current[index];
    const now = performance.now();
    let delta = 0;
    let nextKind: CellKind = cell.kind;

    if (cell.kind === "pending" || cell.kind === "cake") {
      const bonus = streak > 0 && (streak + 1) % 5 === 0 ? 1 : 0;
      delta = (cell.kind === "cake" ? 3 : 1) + bonus;
      nextKind = "done";
      setStreak((s) => s + 1);
      sounds.playCoin();
    } else if (cell.kind === "asap") {
      delta = -2;
      nextKind = "oops";
      setStreak(0);
      sounds.playMiss();
      setBossLine("That client request wasn't on the tracker! 😤");
      window.clearTimeout(bossTimer.current);
      bossTimer.current = window.setTimeout(() => setBossLine(null), 1300);
    } else {
      return;
    }

    scoreRef.current = Math.max(0, scoreRef.current + delta);
    setScore(scoreRef.current);
    const next = [...cellsRef.current];
    next[index] = { kind: nextKind, until: now + 350 };
    commitCells(next);
  };

  const seconds = Math.ceil(timeLeft / 1000);

  return (
    <Section
      id="arcade"
      badge="BONUS STAGE // MINI-GAME"
      title="TRACKER RUSH"
      subtitle="Rows are going pending. The Boss is about to ask. Update as many tracker cells as you can in 30 seconds."
    >
      <Reveal direction="up" delay={0.05}>
        <div className="max-w-2xl mx-auto">
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-2 mb-5 text-[11px] font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-700">⏳ PENDING = +1</span>
            <span className="px-2.5 py-1 rounded-lg bg-gold/15 border border-gold/50 text-gold-dark">🎂 CAKE = +3</span>
            <span className="px-2.5 py-1 rounded-lg bg-violet-500/15 border border-violet-500/40 text-violet-700">📞 ASAP REQUEST = −2 (don&apos;t tap!)</span>
          </div>

          <div className="relative rounded-3xl border-2 border-gold/40 bg-paper shadow-[0_0_50px_rgba(201,162,77,0.15)] overflow-hidden">
            {/* HUD */}
            <div className="flex items-center justify-between gap-2 px-4 py-3 bg-canvas border-b border-gold/20 font-mono text-xs">
              <span className="flex items-center gap-1.5 text-ink">
                <Timer className="w-4 h-4 text-gold-deep" />
                <span className={`tabular-nums font-bold ${seconds <= 5 && phase === "playing" ? "text-rose-700" : ""}`}>
                  {seconds}s
                </span>
              </span>
              <span className="text-gold-deep font-bold text-sm tabular-nums">
                SCORE {score}
                <span className="text-ink-soft font-normal text-xs"> / {TARGET}</span>
              </span>
              <span className="flex items-center gap-1.5 text-ink-soft">
                <Trophy className="w-4 h-4 text-gold-deep" />
                BEST {rushBest}
              </span>
            </div>
            <div className="h-1 bg-ink/5">
              <div
                className="h-full bg-gradient-to-r from-gold to-gold-light transition-[width] duration-100"
                style={{ width: `${(timeLeft / ROUND_MS) * 100}%` }}
              />
            </div>

            {/* Formula bar with the boss nag */}
            <div className="flex items-center gap-3 px-4 py-2 border-b border-ink/10 text-xs font-mono min-h-[36px]">
              <span className="text-gold-deep font-bold">fx</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={bossLine ?? "idle"}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className={bossLine ? "text-rose-700 font-bold" : "text-ink-soft"}
                >
                  {bossLine ? `BOSS: "${bossLine}"` : streak >= 3 ? `=STREAK(${streak}) 🔥` : "=UPDATE(ALL_ROWS)"}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Grid */}
            <div className="p-3 sm:p-4">
              <div className="grid grid-cols-[auto_repeat(4,1fr)] gap-1.5 sm:gap-2 select-none">
                <span />
                {COL_LETTERS.map((l) => (
                  <span key={l} className="text-center text-[10px] font-mono text-ink-soft">
                    {l}
                  </span>
                ))}
                {Array.from({ length: ROWS }).map((_, r) => (
                  <React.Fragment key={r}>
                    <span className="flex items-center pr-1 text-[10px] font-mono text-ink-soft">{r + 1}</span>
                    {Array.from({ length: COLS }).map((__, c) => {
                      const i = r * COLS + c;
                      return <GridCell key={i} cell={cells[i]} label={`${COL_LETTERS[c]}${r + 1}`} onHit={() => hit(i)} />;
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Overlays */}
            {phase !== "playing" && (
              <div className="absolute inset-0 top-[44px] flex flex-col items-center justify-center bg-paper/85 backdrop-blur-sm text-center px-6">
                {phase === "over" && (
                  <>
                    <p className="text-[10px] font-mono tracking-widest text-gold-deep">
                      {score >= TARGET ? "STAGE CLEARED" : "TIME'S UP"}
                    </p>
                    <p className="text-4xl font-extrabold font-heading text-ink mt-1">{score} rows updated</p>
                    <p className="text-sm text-ink-soft mt-2 max-w-sm">
                      {score >= TARGET
                        ? "Tracker 100% updated. The Boss would be proud (and would ask you to automate it next)."
                        : `Reach ${TARGET} to unlock the achievement. The tracker believes in you.`}
                    </p>
                  </>
                )}
                {phase === "ready" && (
                  <>
                    <Gamepad2 className="w-10 h-10 text-gold-deep mb-2" />
                    <p className="text-sm text-ink max-w-sm">
                      Tap <strong>pending</strong> cells before they expire. Grab the <strong>cake</strong>. Ignore the
                      last-minute <strong>ASAP</strong> requests.
                    </p>
                  </>
                )}
                <button
                  type="button"
                  onClick={start}
                  className="mt-5 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-ink font-extrabold font-mono tracking-widest text-sm shadow-[0_0_30px_rgba(201,162,77,0.45)] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                >
                  {phase === "over" ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  {phase === "over" ? "PLAY AGAIN" : "START GAME"}
                </button>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

const CELL_STYLES: Record<CellKind, string> = {
  empty: "bg-canvas border-ink/10 text-transparent",
  pending: "bg-rose-500/20 border-rose-400 text-rose-700 cursor-pointer shadow-[0_0_14px_rgba(244,63,94,0.35)]",
  cake: "bg-gold/25 border-gold text-gold-dark cursor-pointer shadow-[0_0_18px_rgba(201,162,77,0.55)]",
  asap: "bg-violet-500/20 border-violet-400 text-violet-700 cursor-pointer",
  done: "bg-emerald-500/20 border-emerald-400 text-emerald-700",
  missed: "bg-cream border-rose-900 text-rose-700/70",
  oops: "bg-violet-900/40 border-violet-700 text-violet-700",
};

const CELL_TEXT: Record<CellKind, string> = {
  empty: "",
  pending: "⏳ PENDING",
  cake: "🎂 CAKE",
  asap: "📞 ASAP",
  done: "✓ UPDATED",
  missed: "✗ MISSED",
  oops: "−2",
};

function GridCell({ cell, label, onHit }: { cell: Cell; label: string; onHit: () => void }) {
  return (
    <button
      type="button"
      onPointerDown={(e) => {
        e.preventDefault();
        onHit();
      }}
      aria-label={`Cell ${label}: ${cell.kind}`}
      className={`relative h-14 sm:h-16 rounded-lg border text-[10px] sm:text-xs font-mono font-bold transition-colors duration-100 touch-manipulation ${CELL_STYLES[cell.kind]}`}
    >
      <AnimatePresence mode="popLayout">
        {cell.kind !== "empty" && (
          <motion.span
            key={cell.kind}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="inline-block"
          >
            {CELL_TEXT[cell.kind]}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
