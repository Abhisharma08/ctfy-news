"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { sounds } from "@/lib/sounds";

export type QuestId =
  | "press_start"
  | "zone_legend"
  | "zone_superpowers"
  | "zone_awards"
  | "zone_minions"
  | "zone_appreciation"
  | "inspect_minions"
  | "tracker_found"
  | "tracker_rush"
  | "candles"
  | "victory_cannon";

export interface Quest {
  id: QuestId;
  title: string;
  hint: string;
  xp: number;
  icon: string;
  /** Number of steps needed (defaults to 1) */
  goal?: number;
}

export const QUESTS: Quest[] = [
  { id: "press_start", title: "Player One Has Entered", hint: "Press start on the title screen", xp: 50, icon: "🎮" },
  { id: "zone_legend", title: "Read The Dossier", hint: "Reach the Meet The Legend zone", xp: 50, icon: "📜" },
  { id: "zone_superpowers", title: "Skill Tree Discovered", hint: "Reach the Superpowers zone", xp: 50, icon: "⚡" },
  { id: "zone_awards", title: "Trophy Room Unlocked", hint: "Reach the Hall of Fame", xp: 50, icon: "🏆" },
  { id: "zone_minions", title: "The Party Assembles", hint: "Reach the Minions zone", xp: 50, icon: "👥" },
  { id: "zone_appreciation", title: "The Lore Revealed", hint: "Reach the Story Epilogue", xp: 50, icon: "❤️" },
  { id: "inspect_minions", title: "Know Your Squad", hint: "Tap 5 minion cards to read their wishes", xp: 150, icon: "🔍", goal: 5 },
  { id: "tracker_found", title: "The Classified Tracker", hint: "Find and open UPDATED_TRACKER.XLSX", xp: 150, icon: "📊" },
  { id: "tracker_rush", title: "Tracker Rush Champion", hint: "Score 15+ in the Tracker Rush mini-game", xp: 250, icon: "🕹️" },
  { id: "candles", title: "Make A Wish", hint: "Blow out every candle on the cake", xp: 200, icon: "🎂" },
  { id: "victory_cannon", title: "Fire In The Hole", hint: "Fire the Victory Cannon", xp: 100, icon: "🎉" },
];

export const TOTAL_XP = QUESTS.reduce((sum, q) => sum + q.xp, 0);

interface SaveData {
  completed: QuestId[];
  progress: Partial<Record<QuestId, number>>;
  rushBest: number;
}

interface Toast {
  key: number;
  quest: Quest;
}

interface GameContextValue {
  completed: Set<QuestId>;
  progress: Partial<Record<QuestId, number>>;
  xp: number;
  allDone: boolean;
  rushBest: number;
  toasts: Toast[];
  complete: (id: QuestId) => void;
  /** Advance a multi-step quest; `key` makes repeat steps idempotent (e.g. same card tapped twice) */
  step: (id: QuestId, key: string) => void;
  recordRushScore: (score: number) => void;
  dismissToast: (key: number) => void;
  reset: () => void;
}

const STORAGE_KEY = "boss-birthday-quest-save-v1";
const GameContext = createContext<GameContextValue | null>(null);

function loadSave(): SaveData | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SaveData) : null;
  } catch {
    return null;
  }
}

function writeSave(data: SaveData) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage unavailable (private mode etc.) — progress just won't persist.
  }
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [completed, setCompleted] = useState<Set<QuestId>>(new Set());
  const [progress, setProgress] = useState<Partial<Record<QuestId, number>>>({});
  const [rushBest, setRushBest] = useState(0);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [loaded, setLoaded] = useState(false);
  const stepKeys = useRef<Partial<Record<QuestId, Set<string>>>>({});
  const toastKey = useRef(0);
  const completedRef = useRef<Set<QuestId>>(completed);
  const progressRef = useRef<Partial<Record<QuestId, number>>>({});

  useEffect(() => {
    const save = loadSave();
    if (save) {
      completedRef.current = new Set(save.completed);
      progressRef.current = save.progress ?? {};
      setCompleted(completedRef.current);
      setProgress(progressRef.current);
      setRushBest(save.rushBest ?? 0);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) writeSave({ completed: [...completed], progress, rushBest });
  }, [completed, progress, rushBest, loaded]);

  const complete = useCallback((id: QuestId) => {
    if (completedRef.current.has(id)) return;
    const quest = QUESTS.find((q) => q.id === id);
    if (!quest) return;
    completedRef.current = new Set(completedRef.current).add(id);
    setCompleted(completedRef.current);
    const key = ++toastKey.current;
    setToasts((t) => [...t, { key, quest }]);
    sounds.playAchievement();
  }, []);

  const step = useCallback(
    (id: QuestId, key: string) => {
      const quest = QUESTS.find((q) => q.id === id);
      if (!quest || completedRef.current.has(id)) return;
      const seen = (stepKeys.current[id] ??= new Set());
      if (seen.has(key)) return;
      seen.add(key);
      const goal = quest.goal ?? 1;
      const value = Math.min((progressRef.current[id] ?? 0) + 1, goal);
      progressRef.current = { ...progressRef.current, [id]: value };
      setProgress(progressRef.current);
      if (value >= goal) complete(id);
    },
    [complete]
  );

  const recordRushScore = useCallback(
    (score: number) => {
      setRushBest((best) => Math.max(best, score));
      if (score >= 15) complete("tracker_rush");
    },
    [complete]
  );

  const dismissToast = useCallback((key: number) => {
    setToasts((t) => t.filter((x) => x.key !== key));
  }, []);

  const reset = useCallback(() => {
    stepKeys.current = {};
    completedRef.current = new Set();
    progressRef.current = {};
    setCompleted(completedRef.current);
    setProgress(progressRef.current);
    setRushBest(0);
  }, []);

  const value = useMemo<GameContextValue>(() => {
    const xp = QUESTS.filter((q) => completed.has(q.id)).reduce((s, q) => s + q.xp, 0);
    return {
      completed,
      progress,
      xp,
      allDone: completed.size === QUESTS.length,
      rushBest,
      toasts,
      complete,
      step,
      recordRushScore,
      dismissToast,
      reset,
    };
  }, [completed, progress, rushBest, toasts, complete, step, recordRushScore, dismissToast, reset]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside <GameProvider>");
  return ctx;
}
