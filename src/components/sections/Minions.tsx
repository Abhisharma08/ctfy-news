"use client";

import React, { useState } from "react";
import { Section } from "@/components/layout/Section";
import { EmployeeCard } from "@/components/cards/EmployeeCard";
import { employeesData } from "@/data/employees";
import { Reveal } from "@/components/ui/Reveal";
import { sounds } from "@/lib/sounds";
import { Users, Filter, Sparkles } from "lucide-react";
import { MobileGamingSlider } from "@/components/game/MobileGamingSlider";

export function Minions() {
  const [selectedRole, setSelectedRole] = useState<string>("ALL");

  const roles = ["ALL", "CREATIVE", "CODE SORCERER", "OPS VANGUARD", "TACTICAL", "DEFENSE"];

  const filteredEmployees =
    selectedRole === "ALL"
      ? employeesData
      : employeesData.filter((emp) => emp.role?.toUpperCase() === selectedRole);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    sounds.playBlip();
  };

  return (
    <Section
      id="minions"
      badge="SECTION 05 // PARTY ROSTER"
      title="THE MINIONS HAVE ENTERED THE CHAT."
      subtitle="20 employees. One legendary boss. Countless tracker updates. And a whole lot of appreciation."
    >
      {/* Fan Club Motto Banner from Google Doc */}
      <Reveal direction="up" delay={0.05}>
        <div className="max-w-xl mx-auto mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B2A43] border border-[#DDB65E]/40 text-xs sm:text-sm font-mono text-[#DDB65E] font-bold shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>“Every legend has a fan club. Here&apos;s yours.”</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>
      </Reveal>

      {/* Role Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <div className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-[#DDB65E] mr-1 hidden sm:flex">
          <Filter className="w-3.5 h-3.5" />
          <span>FILTER BY CLASS:</span>
        </div>
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => handleRoleSelect(role)}
            type="button"
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              selectedRole === role
                ? "bg-[#DDB65E] text-[#0B1220] shadow-[0_0_15px_rgba(221,182,94,0.4)] scale-105"
                : "bg-[#111C30] text-[#A5B0C2] border border-white/10 hover:border-[#DDB65E]/40 hover:text-white"
            }`}
          >
            {role === "ALL" ? `ALL PARTY (${employeesData.length})` : role}
          </button>
        ))}
      </div>

      {/* Gaming Mobile Slider / Desktop Grid */}
      <MobileGamingSlider
        key={selectedRole}
        instruction="SWIPE TO INSPECT ALL 20 PARTY MEMBERS"
        counterPrefix="MINION"
        desktopGridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
      >
        {filteredEmployees.map((employee, idx) => (
          <Reveal
            key={employee.id}
            direction="up"
            delay={0.05 * ((idx % 4) + 1)}
          >
            <EmployeeCard employee={employee} />
          </Reveal>
        ))}
      </MobileGamingSlider>
    </Section>
  );
}
