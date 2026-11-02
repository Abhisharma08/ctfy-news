"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles } from "lucide-react";

interface ConfettiButtonProps {
  label?: string;
  className?: string;
  variant?: "primary" | "secondary" | "subtle";
}

export function fireCelebrationConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ["#C9A24D", "#EAD49C", "#8A6620", "#101828", "#F4EEE1"],
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export function ConfettiButton({
  label = "Celebrate Nirupam Sir! 🎂",
  className = "",
  variant = "primary",
}: ConfettiButtonProps) {
  const [isFiring, setIsFiring] = useState(false);

  const handleClick = () => {
    setIsFiring(true);
    fireCelebrationConfetti();
    setTimeout(() => setIsFiring(false), 800);
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-gold via-gold-light to-gold text-ink font-semibold hover:shadow-[0_0_30px_rgba(201,162,77,0.5)] active:scale-95",
    secondary:
      "bg-cream text-ink border border-gold/40 hover:border-gold hover:bg-canvas active:scale-95",
    subtle:
      "bg-transparent text-gold-deep hover:bg-gold/10 border border-gold/20 active:scale-95",
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full cursor-pointer transition-all duration-300 font-sans tracking-wide text-sm md:text-base ${variantStyles[variant]} ${className}`}
    >
      <Sparkles
        className={`w-4 h-4 transition-transform duration-500 ${
          isFiring ? "rotate-180 scale-125" : ""
        }`}
      />
      <span>{label}</span>
    </button>
  );
}
