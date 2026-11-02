"use client";

import React, { useState } from "react";
import { X, Table, FileSpreadsheet, Sparkles, CheckCircle2 } from "lucide-react";
import { fireCelebrationConfetti } from "./ConfettiButton";
import { useGame } from "@/lib/game";

interface EasterEggModalProps {
  trigger?: (open: () => void) => React.ReactNode;
  className?: string;
}

export function EasterEggModal({ trigger, className }: EasterEggModalProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const { complete } = useGame();

  const trackerRows = [
    {
      id: "ROW-01",
      task: "Surprise Boss with Custom Website",
      owner: "All 20 Minions",
      formula: "=CONCAT(LOVE, GRATITUDE, CAKE)",
      status: "COMPLETED",
      priority: "CRITICAL",
    },
    {
      id: "ROW-02",
      task: "Put this Birthday on a Tracker",
      owner: "The Boss",
      formula: "=IF(BOSS_ASKS, 'FORBIDDEN', 'SUCCESS')",
      status: "BLOCKED BY MINIONS",
      priority: "HIGH",
    },
    {
      id: "ROW-03",
      task: "Automate Birthday Cake Cutting",
      owner: "Zapier Bot #42",
      formula: "=WEBHOOK_SLICE(CAKE_DIMENSIONS)",
      status: "IN PROGRESS",
      priority: "CRITICAL",
    },
    {
      id: "ROW-04",
      task: "Exceed Q4 Ambition Target",
      owner: "Contentify Team",
      formula: "=BOSS_ENERGY * 1000%",
      status: "GUARANTEED",
      priority: "MAX",
    },
  ];

  const handleOpen = () => {
    setIsOpen(true);
    fireCelebrationConfetti();
    complete("tracker_found");
  };

  return (
    <>
      {trigger ? (
        trigger(handleOpen)
      ) : (
        <button
          onClick={handleOpen}
          type="button"
          className={
            className ||
            "inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-gold-deep bg-canvas hover:bg-cream border border-gold/40 rounded-md transition-all duration-200 cursor-pointer shadow-sm hover:border-gold font-bold"
          }
          title="Classified: Boss's Updated Tracker"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-gold-deep" />
          <span>UPDATED_TRACKER.XLSX</span>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-paper border-2 border-gold/60 rounded-2xl shadow-[0_0_50px_rgba(201,162,77,0.3)] overflow-hidden">
            {/* Window Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-canvas border-b border-gold/30">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                <span className="ml-2 text-xs font-mono text-gold-deep font-bold flex items-center gap-1.5">
                  <Table className="w-3.5 h-3.5 text-gold-deep" />
                  UPDATED TRACKER // CONFIDENTIAL_BOSS_KPI_TRACKER_V99.SHEETS
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-ink-soft hover:text-ink p-1 rounded-lg hover:bg-cream transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Formula bar */}
            <div className="flex items-center gap-3 px-4 py-2 bg-cream/50 border-b border-gold/10 text-xs font-mono">
              <span className="text-gold-deep font-bold">fx</span>
              <span className="text-ink truncate">
                {`=IF(BOSS_ASKS="DID YOU UPDATE THE TRACKER?", "YES BOSS, 100% UPDATED!", "UPDATING RIGHT NOW...")`}
              </span>
            </div>

            {/* Mock Spreadsheet Table */}
            <div className="p-4 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-gold/20 text-gold-deep">
                    <th className="py-2 px-2.5">ID</th>
                    <th className="py-2 px-2.5">TASK DESCRIPTION</th>
                    <th className="py-2 px-2.5">FORMULA</th>
                    <th className="py-2 px-2.5">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10 text-ink">
                  {trackerRows.map((row) => (
                    <tr key={row.id} className="hover:bg-ink/5 transition-colors">
                      <td className="py-3 px-2.5 text-ink-soft">{row.id}</td>
                      <td className="py-3 px-2.5 font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-deep" />
                        {row.task}
                      </td>
                      <td className="py-3 px-2.5 text-gold-deep/80">{row.formula}</td>
                      <td className="py-3 px-2.5">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-gold/20 text-gold-deep font-semibold">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-6 p-4 rounded-xl bg-cream/60 border border-gold/20 text-center">
                <p className="text-sm text-ink font-sans">
                  🎯 <strong className="text-gold-deep">System Diagnostic:</strong> You have officially discovered the classified tracker!
                </p>
                <p className="text-xs text-ink-soft mt-1 font-sans">
                  The team strictly forbids closing this tab until you have eaten a massive slice of birthday cake.
                </p>
                <div className="mt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      fireCelebrationConfetti();
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-ink bg-gradient-to-r from-gold to-gold-light rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Trigger Minion Applause</span>
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-ink-soft hover:text-ink bg-canvas hover:bg-cream rounded-lg transition-colors border border-ink/15"
                  >
                    Close & Return to Gala
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
