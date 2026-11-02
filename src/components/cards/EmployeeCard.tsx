"use client";

import React from "react";
import Image from "next/image";
import { Employee } from "@/types";
import { Heart, MessageSquareQuote } from "lucide-react";
import { sounds } from "@/lib/sounds";
import { useGame } from "@/lib/game";

interface EmployeeCardProps {
  employee: Employee;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

/** Splits a message on blank lines so multi-paragraph wishes keep their breaks. */
function Paragraphs({ text, className }: { text: string; className: string }) {
  return (
    <>
      {text.split(/\n\s*\n/).map((para, i) => (
        <p key={i} className={className}>
          {para}
        </p>
      ))}
    </>
  );
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  const formattedId = employee.id.toString().padStart(2, "0");
  const { step } = useGame();

  return (
    <div
      onClick={() => {
        sounds.playBlip();
        step("inspect_minions", String(employee.id));
      }}
      className="relative group h-full rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-cream/70 via-canvas/90 to-paper border border-gold/20 hover:border-gold transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_35px_-10px_rgba(201,162,77,0.3)] flex flex-col cursor-pointer"
    >
      {/* Party member header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cream text-gold-deep border border-ink/15">
          MINION #{formattedId}
        </span>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-gold/40 bg-gold/10 text-gold-deep font-bold uppercase tracking-wider">
          Party Member
        </span>
      </div>

      {/* Portrait: full party-hat sticker, or an initials badge when there's no photo */}
      <div className="relative h-44 sm:h-48 -mx-2 mb-3 rounded-2xl bg-[radial-gradient(circle_at_50%_60%,rgba(201,162,77,0.18),transparent_70%)] flex items-center justify-center">
        {employee.image ? (
          <Image
            src={employee.image}
            alt={employee.name}
            fill
            sizes="(min-width: 1280px) 260px, (min-width: 640px) 45vw, 80vw"
            // Photos are opaque PNGs with a white background; multiply blends the white into the card.
            className="object-contain object-bottom mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark flex items-center justify-center shadow-[0_8px_24px_rgba(201,162,77,0.4)] ring-4 ring-paper group-hover:scale-105 transition-transform duration-300">
            <span className="text-4xl font-extrabold font-hero text-ink">{initials(employee.name)}</span>
          </div>
        )}
      </div>

      {/* Name */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-ink font-heading group-hover:text-gold-deep transition-colors">
          {employee.name}
        </h3>
        <span className="text-[11px] text-gold-deep/90 font-mono block">
          {employee.designation || "Contentify Minion"}
        </span>
      </div>

      {/* Field log (optional funny association) */}
      {employee.funnyMessage && (
        <div className="mb-3.5 p-3 rounded-xl bg-paper/70 border border-ink/10">
          <div className="flex items-center gap-1 text-[10px] font-mono text-gold-deep mb-1">
            <MessageSquareQuote className="w-3 h-3" />
            <span>FIELD LOG OBSERVATION</span>
          </div>
          <p className="text-xs text-ink-soft leading-relaxed italic font-sans whitespace-pre-line">&ldquo;{employee.funnyMessage}&rdquo;</p>
        </div>
      )}

      {/* Birthday wish */}
      <div className="pt-1 flex-1">
        <div className="flex items-center gap-1 text-[10px] font-mono text-rose-700 mb-1">
          <Heart className="w-3 h-3 fill-rose-400" />
          <span>BIRTHDAY WISH</span>
        </div>
        <div className="space-y-2">
          <Paragraphs text={employee.birthdayMessage} className="text-xs sm:text-sm text-ink leading-relaxed font-sans" />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-ink/10 flex items-center justify-between text-[9px] font-mono text-ink-soft">
        <span>GUILD SYNERGY</span>
        <span className="text-emerald-700 font-bold">100% MAXIMUM</span>
      </div>
    </div>
  );
}
