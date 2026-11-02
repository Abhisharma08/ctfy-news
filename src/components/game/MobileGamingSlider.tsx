"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MoveHorizontal, Hand, Sparkles } from "lucide-react";
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
  instruction = "SWIPE TO BROWSE CARDS",
  counterPrefix = "CARD",
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
        
        {/* Gaming Instruction Banner (Prominent Swipe Alert) */}
        {showInstruction && (
          <div className="mb-3.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#1B2A43] via-[#111C30] to-[#1B2A43] border-2 border-[#DDB65E]/50 shadow-[0_0_20px_rgba(221,182,94,0.2)] flex items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2.5 text-[#F5F1E8]">
              <div className="w-7 h-7 rounded-lg bg-[#DDB65E] text-[#0B1220] flex items-center justify-center shrink-0 shadow-md">
                <MoveHorizontal className="w-4 h-4 animate-pulse stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] sm:text-xs tracking-wider uppercase font-extrabold text-[#DDB65E] flex items-center gap-1.5 leading-none">
                  <span>SWIPE HORIZONTALLY</span>
                  <span className="inline-block animate-bounce">➔</span>
                </span>
                <span className="text-[9px] font-mono text-[#A5B0C2] uppercase tracking-wide mt-0.5">
                  {instruction}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0B1220] border border-[#DDB65E]/40 text-[11px] text-[#DDB65E] font-bold font-mono shrink-0 shadow-inner">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="text-[#A5B0C2]/60">/</span>
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
              className="w-[84vw] max-w-[340px] shrink-0 snap-center transition-opacity duration-300 relative"
            >
              {child}
            </div>
          ))}
        </div>

        {/* Gaming HUD Carousel Controls */}
        <div className="mt-2.5 flex items-center justify-between px-3 py-2 rounded-xl bg-[#111C30]/90 border border-[#DDB65E]/30 backdrop-blur-md shadow-md">
          
          {/* Active Card Monospace Counter + Swipe Hint */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#DDB65E] font-bold">
            <span className="text-[#A5B0C2] uppercase text-[9px]">{counterPrefix}:</span>
            <span>[{String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}]</span>
            <span className="text-[9px] text-[#A5B0C2] hidden xs:inline ml-1">
              (SWIPE ◄ ⇄ ►)
            </span>
          </div>

          {/* Dots / Progress Bar */}
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
