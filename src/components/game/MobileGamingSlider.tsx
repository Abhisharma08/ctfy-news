"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Hand, MoveRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "@/lib/sounds";

interface MobileGamingSliderProps {
  children: React.ReactNode[];
  instruction?: string;
  counterPrefix?: string;
  desktopGridClassName?: string;
  showInstruction?: boolean;
}

export function MobileGamingSlider({
  children,
  instruction = "SLIDE TO VIEW MORE",
  counterPrefix = "CARD",
  desktopGridClassName = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8",
  showInstruction = true,
}: MobileGamingSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const total = children.length;

  // Auto-peek nudge animation when slider scrolls into viewport
  useEffect(() => {
    if (typeof window === "undefined" || !sliderRef.current) return;
    const el = sliderRef.current;

    let hasNudged = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasNudged && !hasInteracted) {
            hasNudged = true;
            // Delay slightly for smooth visual impact
            setTimeout(() => {
              if (el && el.scrollLeft === 0) {
                // Nudge right 55px to reveal card #2 peeking
                el.scrollTo({ left: 55, behavior: "smooth" });
                setTimeout(() => {
                  if (el && el.scrollLeft <= 70) {
                    // Smoothly bounce back to card #1
                    el.scrollTo({ left: 0, behavior: "smooth" });
                  }
                }, 550);
              }
            }, 350);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasInteracted]);

  const handleScroll = () => {
    if (!sliderRef.current) return;
    setHasInteracted(true);
    const { scrollLeft, clientWidth } = sliderRef.current;
    if (clientWidth === 0) return;
    const newIndex = Math.min(
      total - 1,
      Math.max(0, Math.round(scrollLeft / (clientWidth * 0.85)))
    );
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const scrollTo = (index: number) => {
    if (!sliderRef.current) return;
    setHasInteracted(true);
    const clampedIndex = Math.min(total - 1, Math.max(0, index));
    const targetEl = sliderRef.current.children[clampedIndex] as HTMLElement;
    if (targetEl) {
      targetEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setActiveIndex(clampedIndex);
      sounds.playBlip();
    }
  };

  const handlePrev = () => {
    scrollTo(activeIndex - 1);
  };

  const handleNext = () => {
    scrollTo(activeIndex + 1);
  };

  return (
    <div className="w-full relative">
      {/* ================= MOBILE SLIDER VIEW (< lg) ================= */}
      <div className="block lg:hidden">
        
        {/* Animated Gaming Instruction Banner */}
        {showInstruction && (
          <div className="mb-3.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#1B2A43] via-[#111C30] to-[#1B2A43] border-2 border-[#DDB65E]/50 shadow-[0_0_25px_rgba(221,182,94,0.25)] flex items-center justify-between gap-2 text-xs font-mono relative overflow-hidden">
            
            {/* Animated Light Sweep Effect */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }}
              className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-[#DDB65E]/20 to-transparent pointer-events-none"
            />

            <div className="flex items-center gap-2.5 text-[#F5F1E8] relative z-10">
              {/* Animated Sliding Hand Icon */}
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#DDB65E] to-[#F4D992] text-[#0B1220] flex items-center justify-center shrink-0 shadow-md"
              >
                <Hand className="w-4 h-4 stroke-[2.5]" />
              </motion.div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] sm:text-xs tracking-wider uppercase font-extrabold text-[#DDB65E] leading-none">
                    SLIDE TO VIEW MORE
                  </span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                    className="text-[#DDB65E] text-xs font-bold inline-block"
                  >
                    ➔
                  </motion.span>
                </div>
                <span className="text-[9px] font-mono text-[#A5B0C2] uppercase tracking-wide mt-0.5">
                  {instruction}
                </span>
              </div>
            </div>

            {/* Counter Pill */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0B1220] border border-[#DDB65E]/40 text-[11px] text-[#DDB65E] font-bold font-mono shrink-0 shadow-inner relative z-10">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="text-[#A5B0C2]/60">/</span>
              <span className="text-[#A5B0C2]">{String(total).padStart(2, "0")}</span>
            </div>
          </div>
        )}

        {/* Scrollable Snap Container with Floating Animated Peek Cue */}
        <div className="relative">
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-3 px-4 -mx-4 scroll-smooth"
          >
            {children.map((child, idx) => (
              <div
                key={idx}
                className="w-[84vw] max-w-[340px] shrink-0 snap-center transition-all duration-300 relative"
              >
                {child}
              </div>
            ))}
          </div>

          {/* Floating 'SLIDE NEXT ➔' Edge Prompt (Appears on Card #1 if not yet swiped) */}
          <AnimatePresence>
            {!hasInteracted && activeIndex < total - 1 && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={handleNext}
                type="button"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 px-2.5 py-2 rounded-l-xl bg-[#0B1220]/95 border-y border-l border-[#DDB65E]/60 text-[#DDB65E] font-mono text-[10px] font-bold shadow-[0_0_20px_rgba(221,182,94,0.3)] flex items-center gap-1 cursor-pointer backdrop-blur-md active:scale-95"
              >
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                >
                  <MoveRight className="w-3.5 h-3.5" />
                </motion.span>
                <span className="tracking-widest uppercase">SLIDE</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Gaming HUD Carousel Controls Bar */}
        <div className="mt-2.5 flex items-center justify-between px-3 py-2 rounded-xl bg-[#111C30]/90 border border-[#DDB65E]/30 backdrop-blur-md shadow-md">
          
          {/* Active Card Monospace Counter + Live Gesture Hint */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#DDB65E] font-bold">
            <span className="text-[#A5B0C2] uppercase text-[9px]">{counterPrefix}:</span>
            <span>[{String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}]</span>
            <span className="text-[9px] text-[#A5B0C2] hidden xs:inline ml-1 font-mono">
              (SLIDE ◄ ⇄ ►)
            </span>
          </div>

          {/* Progress Indicators */}
          <div className="flex items-center gap-1 max-w-[120px] overflow-hidden">
            {total <= 10 ? (
              children.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === i
                      ? "w-5 bg-[#DDB65E] shadow-[0_0_8px_rgba(221,182,94,0.6)]"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))
            ) : (
              // For 20+ items, show a sleek segmented progress track
              <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#DDB65E] to-[#F4D992] transition-all duration-200"
                  style={{ width: `${((activeIndex + 1) / total) * 100}%` }}
                />
              </div>
            )}
          </div>

          {/* Prev / Next Gaming Buttons with Sound */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              type="button"
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                activeIndex === 0
                  ? "bg-white/5 border-white/5 text-[#A5B0C2]/30 cursor-not-allowed"
                  : "bg-[#1B2A43] border-[#DDB65E]/40 text-[#DDB65E] active:scale-95 hover:bg-[#DDB65E] hover:text-[#0B1220]"
              }`}
              aria-label="Previous card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === total - 1}
              type="button"
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                activeIndex === total - 1
                  ? "bg-white/5 border-white/5 text-[#A5B0C2]/30 cursor-not-allowed"
                  : "bg-[#1B2A43] border-[#DDB65E]/40 text-[#DDB65E] active:scale-95 hover:bg-[#DDB65E] hover:text-[#0B1220]"
              }`}
              aria-label="Next card"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP GRID VIEW (>= lg) ================= */}
      <div className={`hidden lg:${desktopGridClassName.startsWith("grid") ? desktopGridClassName : `grid ${desktopGridClassName}`}`}>
        {children}
      </div>
    </div>
  );
}
