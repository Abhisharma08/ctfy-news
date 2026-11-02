"use client";

import React from "react";
import Image from "next/image";
import { Employee } from "@/types";
import { Heart, MessageSquareQuote, Shield, Sparkles } from "lucide-react";
import { sounds } from "@/lib/sounds";

interface EmployeeCardProps {
  employee: Employee;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  const formattedId = employee.id.toString().padStart(2, "0");

  const roleColors: Record<string, string> = {
    Creative: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    "Code Sorcerer": "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "Ops Vanguard": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    Tactical: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    Defense: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  };

  return (
    <div
      onClick={() => sounds.playBlip()}
      className="relative group rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-[#1B2A43]/70 via-[#111C30]/90 to-[#0F172A] border border-[#DDB65E]/20 hover:border-[#DDB65E] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_35px_-10px_rgba(221,182,94,0.3)] flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Top RPG Party Member Header */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/40 text-[#DDB65E] border border-white/10">
              MINION #{formattedId}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#DDB65E]/10 text-[#DDB65E] font-semibold">
              LVL {employee.level || 40}
            </span>
          </div>

          <span
            className={`text-[9px] font-mono px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider ${
              roleColors[employee.role || "Tactical"] || "bg-white/10 text-white"
            }`}
          >
            {employee.role || "PARTY MEMBER"}
          </span>
        </div>

        {/* Profile Card & Avatar */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#DDB65E]/40 shadow-md shrink-0 group-hover:border-[#DDB65E] group-hover:scale-105 transition-all duration-300">
            <Image
              src={employee.image}
              alt={employee.name}
              fill
              sizes="56px"
              className="object-cover object-center"
            />
          </div>
          <div className="overflow-hidden">
            <h3 className="text-base font-bold text-[#F5F1E8] font-heading group-hover:text-[#DDB65E] transition-colors truncate">
              {employee.name}
            </h3>
            <span className="text-[11px] text-[#DDB65E]/90 font-mono block truncate">
              {employee.designation || "Contentify Minion"}
            </span>
          </div>
        </div>

        {/* Special Skill Tag */}
        {employee.specialSkill && (
          <div className="mb-3 px-2.5 py-1 rounded-lg bg-[#0B1220]/80 border border-white/5 flex items-center gap-1.5 text-[10px] font-mono text-[#A5B0C2]">
            <Sparkles className="w-3 h-3 text-[#DDB65E] shrink-0" />
            <span className="truncate">{employee.specialSkill}</span>
          </div>
        )}

        {/* Battlefield Observation */}
        <div className="mb-3.5 p-3 rounded-xl bg-[#0B1220]/70 border border-white/5">
          <div className="flex items-center gap-1 text-[10px] font-mono text-[#DDB65E] mb-1">
            <MessageSquareQuote className="w-3 h-3" />
            <span>FIELD LOG OBSERVATION</span>
          </div>
          <p className="text-xs text-[#A5B0C2] leading-relaxed italic font-sans">
            &ldquo;{employee.funnyMessage}&rdquo;
          </p>
        </div>

        {/* Birthday Wish */}
        <div className="pt-1">
          <div className="flex items-center gap-1 text-[10px] font-mono text-rose-400 mb-1">
            <Heart className="w-3 h-3 fill-rose-400" />
            <span>BIRTHDAY WISH</span>
          </div>
          <p className="text-xs sm:text-sm text-[#F5F1E8] leading-relaxed font-sans">
            {employee.birthdayMessage}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-[#A5B0C2]">
        <span>GUILD SYNERGY</span>
        <span className="text-emerald-400 font-bold">100% MAXIMUM</span>
      </div>
    </div>
  );
}
