"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Hand, Sparkles } from "lucide-react";
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
  instruction = "SLIDE / SWIPE TO VIEW MORE",
  counterPrefix = "ITEM",
  desktopGridClassName = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8",
  showInstruction = true,
}: MobileGamingSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = children.length;

  const handleScroll = () => {
    if (!sliderRef.current) return;
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
    <div className="w-full">
      {/* ================= MOBILE SLIDER VIEW (< lg) ================= */}
      <div className="block lg:hidden">
        
        {/* Gaming Instruction Banner */}
        {showInstruction && (
          <div className="mb-3 px-3 py-2 rounded-xl bg-gradient-to-r from-[#1B2A43] via-[#111C30] to-[#1B2A43] border border-[#DDB65E]/40 shadow-[0_0_15px_rgba(221,182,94,0.15)] flex items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-[#DDB65E] font-bold">
              <span className="inline-block animate-bounce">👉</span>
              <span className="text-[11px] sm:text-xs tracking-wider uppercase font-bold">
                {instruction}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0B1220] border border-[#DDB65E]/30 text-[10px] text-[#F5F1E8] font-bold shrink-0">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="text-[#A5B0C2]">/</span>
              <span className="text-[#A5B0C2]">{String(total).padStart(2, "0")}</span>
            </div>
          </div>
        )}

        {/* Scrollable Snap Container */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-3 px-4 -mx-4 scroll-smooth"
        >
          {children.map((child, idx) => (
            <div
              key={idx}
              className="w-[84vw] max-w-[340px] shrink-0 snap-center transition-opacity duration-300"
            >
              {child}
            </div>
          ))}
        </div>

        {/* Gaming HUD Carousel Controls */}
        <div className="mt-3 flex items-center justify-between px-2 py-2 rounded-xl bg-[#111C30]/80 border border-[#DDB65E]/20 backdrop-blur-md">
          
          {/* Active Card Monospace Counter */}
          <div className="flex items-center gap-1 text-[11px] font-mono text-[#DDB65E] font-bold">
            <span className="text-[#A5B0C2] uppercase text-[9px]">{counterPrefix}:</span>
            <span>[{String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}]</span>
          </div>

          {/* Dots / Progress Bar */}
          <div className="flex items-center gap-1 max-w-[140px] overflow-hidden">
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
              <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#DDB65E] to-[#F4D992] transition-all duration-200"
                  style={{ width: `${((activeIndex + 1) / total) * 100}%` }}
                />
              </div>
            )}
          </div>

          {/* Prev / Next Gaming Buttons */}
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
