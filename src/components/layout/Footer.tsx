"use client";

import React from "react";
import { ArrowUp, Crown, Heart, Sparkles } from "lucide-react";
import { EasterEggModal } from "@/components/ui/EasterEggModal";
import { fireCelebrationConfetti } from "@/components/ui/ConfettiButton";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#070B14] border-t border-[#DDB65E]/20 pt-16 pb-12 overflow-hidden text-[#A5B0C2]">
      {/* Ambient gold glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#DDB65E]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/5">
          {/* Left Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#DDB65E] to-[#B58F3B] flex items-center justify-center text-[#0B1220]">
                <Crown className="w-4 h-4 fill-current" />
              </div>
              <span className="font-heading font-extrabold text-xl text-[#F5F1E8]">
                CONTENTIFY
              </span>
            </div>
            <p className="mt-2 text-sm text-[#A5B0C2] max-w-sm">
              The Boss of One of a Kind — An internal birthday tribute crafted with boundless admiration, humor, and 0 unupdated rows.
            </p>
          </div>

          {/* Quick interactive links */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <EasterEggModal />
            <button
              onClick={fireCelebrationConfetti}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#DDB65E] bg-[#111C30] hover:bg-[#1B2A43] border border-[#DDB65E]/30 rounded-md transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>TRIGGER_CONFETTI()</span>
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#111C30] border border-white/10 text-[#F5F1E8] hover:text-[#DDB65E] hover:border-[#DDB65E]/40 transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Punchline */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-center md:text-left">
          <p className="flex items-center justify-center gap-1 text-[#F5F1E8]">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> by the 20 Minions at Contentify.
          </p>
          <p className="text-[#DDB65E]/90 italic">
            “P.S. Please don&apos;t ask us to put this birthday surprise on a tracker.”
          </p>
        </div>
      </div>
    </footer>
  );
}
