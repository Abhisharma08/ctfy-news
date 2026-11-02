import React from "react";

/* Festive decorations. Pure CSS animations (see globals.css), all pointer-events: none,
   and hidden or paused for visitors who prefer reduced motion. */

const FLAG_COLORS = ["bg-gold", "bg-blush", "bg-gold-light", "bg-sky"];

/** "HAPPY BIRTHDAY" pennant banner hanging on a curved string. */
export function BirthdayBunting({ text = "HAPPY BIRTHDAY", className = "" }: { text?: string; className?: string }) {
  const chars = [...text];
  const n = chars.length;
  // String is a quadratic curve M0,2 Q50,30 100,2 in a 100x20 viewBox stretched to the banner height.
  const curveY = (t: number) => (1 - t) * (1 - t) * 2 + 2 * t * (1 - t) * 30 + t * t * 2;
  const H = 26; // px height of the string's SVG

  return (
    <div className={`relative w-full max-w-2xl mx-auto select-none pointer-events-none ${className}`} aria-label={text} role="img">
      <svg className="absolute inset-x-0 top-0 w-full" style={{ height: H }} viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden>
        <path d="M0 2 Q50 30 100 2" fill="none" stroke="var(--color-gold-dark)" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="relative flex justify-between px-[2%]" style={{ height: H + 46 }} aria-hidden>
        {chars.map((ch, i) => {
          const t = (i + 0.5) / n;
          const top = (curveY(0.02 + t * 0.96) / 20) * H - 2;
          const tilt = (t - 0.5) * -18;
          if (ch === " ") {
            return (
              <span key={i} className="relative w-3 sm:w-5 text-gold-dark text-xs sm:text-sm text-center" style={{ top: top + 2 }}>
                ✦
              </span>
            );
          }
          return (
            <span key={i} className="relative" style={{ top, transform: `rotate(${tilt}deg)` }}>
              <span
                className={`bunting-flag block w-[19px] h-[26px] sm:w-8 sm:h-11 ${FLAG_COLORS[i % FLAG_COLORS.length]} shadow-sm`}
                style={{ animationDelay: `${(i % 5) * 0.35}s` }}
              >
                <span className="block pt-[3px] sm:pt-1.5 text-center text-[10px] sm:text-base font-extrabold font-hero text-ink leading-none">
                  {ch}
                </span>
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

// Fixed (not random) layout so server and client render the same markup.
const BALLOONS = [
  { left: 4, size: 46, color: "var(--color-gold)", dur: 17, delay: 0 },
  { left: 16, size: 34, color: "var(--color-blush)", dur: 21, delay: 6 },
  { left: 29, size: 40, color: "var(--color-sky)", dur: 19, delay: 11 },
  { left: 71, size: 38, color: "var(--color-gold-light)", dur: 20, delay: 3 },
  { left: 83, size: 48, color: "var(--color-blush)", dur: 16, delay: 9 },
  { left: 93, size: 34, color: "var(--color-gold)", dur: 22, delay: 14 },
];

/** Balloons drifting up behind the content. Parent must be `relative isolate overflow-hidden`. */
export function FloatingBalloons({ className = "" }: { className?: string }) {
  return (
    <div className={`balloons absolute inset-0 -z-10 pointer-events-none overflow-hidden ${className}`} aria-hidden>
      {BALLOONS.map((b, i) => (
        <span
          key={i}
          className="balloon absolute bottom-0"
          style={{ left: `${b.left}%`, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}
        >
          <svg width={b.size} height={b.size * 2.1} viewBox="0 0 40 84" className="balloon-sway" style={{ animationDuration: `${3 + (i % 3)}s` }}>
            <ellipse cx="20" cy="22" rx="17" ry="21" fill={b.color} opacity="0.85" />
            <ellipse cx="13" cy="14" rx="4" ry="6" fill="#fff" opacity="0.45" />
            <path d="M17 43 L23 43 L20 47 Z" fill={b.color} />
            <path d="M20 47 C 14 56, 26 64, 20 72 S 22 80, 20 84" stroke="var(--color-gold-dark)" strokeWidth="0.8" fill="none" opacity="0.6" />
          </svg>
        </span>
      ))}
    </div>
  );
}

const RIBBON_ITEMS = ["HAPPY BIRTHDAY, BOSS", "🎂", "LEVEL 99 → 100", "🎉", "THE ONE OF ONE", "🎈", "TRACKER STATUS: CELEBRATING", "🥳"];

/** Scrolling "Happy Birthday" ribbon used as a divider between sections. */
export function BirthdayRibbon({ reverse = false }: { reverse?: boolean }) {
  const row = (
    <div className="flex shrink-0 items-center gap-6 pr-6">
      {RIBBON_ITEMS.map((item, i) => (
        <span key={i} className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] whitespace-nowrap text-ink">
          {item}
        </span>
      ))}
    </div>
  );
  return (
    // Wrapper clips the tilted ribbon's corners so it never causes sideways scrolling.
    <div className="overflow-hidden py-3">
    <div
      className="relative overflow-hidden py-2.5 sm:py-3 bg-gradient-to-r from-gold-light via-gold to-gold-light border-y border-gold-dark/30 -rotate-1 scale-[1.02] shadow-[0_6px_20px_rgba(201,162,77,0.25)]"
      aria-label="Happy Birthday, Boss!"
      role="img"
    >
      <div className={`marquee flex w-max ${reverse ? "marquee-reverse" : ""}`} aria-hidden>
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
    </div>
  );
}
