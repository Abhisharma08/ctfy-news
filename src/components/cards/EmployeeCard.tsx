import React from "react";
import Image from "next/image";
import { Employee } from "@/types";
import { Heart, MessageSquareQuote } from "lucide-react";

interface EmployeeCardProps {
  employee: Employee;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  const formattedId = employee.id.toString().padStart(2, "0");

  return (
    <div className="relative group rounded-3xl p-6 bg-gradient-to-br from-[#1B2A43]/60 via-[#111C30]/90 to-[#0F172A] border border-[#DDB65E]/20 hover:border-[#DDB65E]/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(221,182,94,0.22)] flex flex-col justify-between">
      <div>
        {/* Top Header: ID & Designation */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono font-bold text-[#DDB65E]/60 group-hover:text-[#DDB65E] transition-colors">
            MINION #{formattedId}
          </span>
          {employee.designation && (
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#1B2A43] text-[#DDB65E] border border-[#DDB65E]/25 truncate max-w-[170px]">
              {employee.designation}
            </span>
          )}
        </div>

        {/* Profile Details */}
        <div className="flex items-center gap-4 mb-5">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#DDB65E]/40 shadow-md shrink-0 group-hover:border-[#DDB65E] group-hover:scale-105 transition-all duration-300">
            <Image
              src={employee.image}
              alt={employee.name}
              fill
              sizes="(max-width: 768px) 56px, 56px"
              className="object-cover object-center"
            />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#F5F1E8] font-heading group-hover:text-[#DDB65E] transition-colors">
              {employee.name}
            </h3>
            <span className="text-xs text-[#A5B0C2] font-mono block">
              Contentify Team
            </span>
          </div>
        </div>

        {/* Funny Observation */}
        <div className="mb-4 p-3 rounded-xl bg-[#0B1220]/70 border border-white/5">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#DDB65E] mb-1">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>THE OBSERVATION</span>
          </div>
          <p className="text-xs text-[#A5B0C2] leading-relaxed italic font-sans">
            &ldquo;{employee.funnyMessage}&rdquo;
          </p>
        </div>

        {/* Birthday Wish */}
        <div className="pt-2">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-rose-400/90 mb-1">
            <Heart className="w-3 h-3 fill-rose-400" />
            <span>BIRTHDAY WISH</span>
          </div>
          <p className="text-xs sm:text-sm text-[#F5F1E8] leading-relaxed font-sans">
            {employee.birthdayMessage}
          </p>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#A5B0C2]/60">
        <span>VERIFIED MINION</span>
        <span className="text-[#DDB65E]">100% SINCERE</span>
      </div>
    </div>
  );
}
