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
    <footer className="relative bg-paper border-t border-gold/20 pt-16 pb-12 overflow-hidden text-ink-soft">
      {/* Ambient gold glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-ink/10">
          {/* Left Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-ink">
                <Crown className="w-4 h-4 fill-current" />
              </div>
              <span className="font-heading font-extrabold text-xl text-ink">
                CONTENTIFY
              </span>
            </div>
            <p className="mt-2 text-sm text-ink-soft max-w-sm">
              The Boss of One of a Kind, An internal birthday tribute crafted with boundless admiration, humor, and 0 unupdated rows.
            </p>
          </div>

          {/* Quick interactive links */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <EasterEggModal />
            <button
              onClick={fireCelebrationConfetti}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-gold-deep bg-canvas hover:bg-cream border border-gold/30 rounded-md transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>TRIGGER_CONFETTI()</span>
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-canvas border border-ink/15 text-ink hover:text-gold-deep hover:border-gold/40 transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Punchline */}
        <div className="mt-8 flex items-center justify-center text-xs font-mono text-center">
          <p className="flex items-center justify-center gap-1 text-ink">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> by the Minions at Contentify.
          </p>
        </div>
      </div>
    </footer>
  );
}
