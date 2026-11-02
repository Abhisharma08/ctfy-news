"use client";

import React, { useState } from "react";
import { X, Table, FileSpreadsheet, Sparkles, CheckCircle2 } from "lucide-react";
import { fireCelebrationConfetti } from "./ConfettiButton";

interface EasterEggModalProps {
  trigger?: (open: () => void) => React.ReactNode;
  className?: string;
}

export function EasterEggModal({ trigger, className }: EasterEggModalProps = {}) {
  const [isOpen, setIsOpen] = useState(false);

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
            "inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-[#DDB65E] bg-[#111C30] hover:bg-[#1B2A43] border border-[#DDB65E]/40 rounded-md transition-all duration-200 cursor-pointer shadow-sm hover:border-[#DDB65E] font-bold"
          }
          title="Classified: Boss's Updated Tracker"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-[#DDB65E]" />
          <span>UPDATED_TRACKER.XLSX</span>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#0F172A] border-2 border-[#DDB65E]/60 rounded-2xl shadow-[0_0_50px_rgba(221,182,94,0.3)] overflow-hidden">
            {/* Window Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#111C30] border-b border-[#DDB65E]/30">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                <span className="ml-2 text-xs font-mono text-[#DDB65E] font-bold flex items-center gap-1.5">
                  <Table className="w-3.5 h-3.5 text-[#DDB65E]" />
                  UPDATED TRACKER // CONFIDENTIAL_BOSS_KPI_TRACKER_V99.SHEETS
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#A5B0C2] hover:text-[#F5F1E8] p-1 rounded-lg hover:bg-[#1B2A43] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Formula bar */}
            <div className="flex items-center gap-3 px-4 py-2 bg-[#1B2A43]/50 border-b border-[#DDB65E]/10 text-xs font-mono">
              <span className="text-[#DDB65E] font-bold">fx</span>
              <span className="text-[#F5F1E8] truncate">
                =IF(BOSS_ASKS="DID YOU UPDATE THE TRACKER?", "YES BOSS, 100% UPDATED!", "UPDATING RIGHT NOW...")
              </span>
            </div>

            {/* Mock Spreadsheet Table */}
            <div className="p-4 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-[#DDB65E]/20 text-[#DDB65E]">
                    <th className="py-2 px-2.5">ID</th>
                    <th className="py-2 px-2.5">TASK DESCRIPTION</th>
                    <th className="py-2 px-2.5">FORMULA</th>
                    <th className="py-2 px-2.5">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-[#F5F1E8]">
                  {trackerRows.map((row) => (
                    <tr key={row.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-2.5 text-[#A5B0C2]">{row.id}</td>
                      <td className="py-3 px-2.5 font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#DDB65E]" />
                        {row.task}
                      </td>
                      <td className="py-3 px-2.5 text-[#DDB65E]/80">{row.formula}</td>
                      <td className="py-3 px-2.5">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-[#DDB65E]/20 text-[#DDB65E] font-semibold">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-6 p-4 rounded-xl bg-[#1B2A43]/60 border border-[#DDB65E]/20 text-center">
                <p className="text-sm text-[#F5F1E8] font-sans">
                  🎯 <strong className="text-[#DDB65E]">System Diagnostic:</strong> You have officially discovered the classified tracker!
                </p>
                <p className="text-xs text-[#A5B0C2] mt-1 font-sans">
                  The team strictly forbids closing this tab until you have eaten a massive slice of birthday cake.
                </p>
                <div className="mt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      fireCelebrationConfetti();
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B1220] bg-gradient-to-r from-[#DDB65E] to-[#F4D992] rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Trigger Minion Applause</span>
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-[#A5B0C2] hover:text-white bg-[#111C30] hover:bg-[#1B2A43] rounded-lg transition-colors border border-white/10"
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
