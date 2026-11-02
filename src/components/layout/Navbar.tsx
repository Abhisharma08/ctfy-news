"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Menu,
  X,
  Crown,
  FileSpreadsheet,
  Volume2,
  VolumeX,
  Shield,
  Zap,
  Trophy,
  Users,
  Heart,
  ChevronRight,
} from "lucide-react";
import { fireCelebrationConfetti } from "@/components/ui/ConfettiButton";
import { EasterEggModal } from "@/components/ui/EasterEggModal";
import { sounds } from "@/lib/sounds";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "The Legend", href: "#legend", icon: Shield, badge: "STATS", desc: "Dossier & Combat Stats" },
    { label: "Superpowers", href: "#superpowers", icon: Zap, badge: "FEATURES", desc: "Core Leadership Abilities" },
    { label: "Hall of Fame", href: "#awards", icon: Trophy, badge: "AWARDS", desc: "Achievements Unlocked" },
    { label: "The Minions", href: "#minions", icon: Users, badge: "20 TEAM", desc: "Party Roster & Wishes" },
    { label: "Appreciation", href: "#appreciation", icon: Heart, badge: "EPILOGUE", desc: "Behind the System" },
  ];

  const handleLinkClick = () => {
    sounds.playBlip();
    setMobileMenuOpen(false);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.toggleMute();
    if (next) sounds.playFanfare();
  };

  return (
    <>
      {/* Main Top Header Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          mobileMenuOpen
            ? "bg-[#070B14] border-b border-[#DDB65E]/30"
            : isScrolled
            ? "bg-[#070B14]/90 backdrop-blur-xl border-b border-[#DDB65E]/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3"
            : "bg-[#070B14]/60 backdrop-blur-md border-b border-white/5 py-3.5 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            
            {/* Logo / Brand */}
            <Link
              href="#"
              onClick={() => sounds.playBlip()}
              className="flex items-center gap-2.5 group cursor-pointer shrink-0"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#DDB65E] to-[#B58F3B] flex items-center justify-center text-[#0B1220] shadow-md group-hover:shadow-[0_0_20px_rgba(221,182,94,0.6)] transition-all duration-300">
                <Crown className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-base sm:text-lg tracking-wider text-[#F5F1E8] group-hover:text-[#DDB65E] transition-colors leading-none">
                  CONTENTIFY
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#DDB65E] font-medium uppercase mt-0.5">
                  The 1 of 1 Edition
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-[#111C30]/80 border border-[#DDB65E]/20 px-3 py-1.5 rounded-full backdrop-blur-md shadow-inner">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => sounds.playBlip()}
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-[#A5B0C2] hover:text-[#F5F1E8] hover:bg-[#1B2A43] transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Action buttons (Desktop) */}
            <div className="hidden lg:flex items-center gap-3">
              <EasterEggModal />
              <button
                onClick={() => {
                  fireCelebrationConfetti();
                  sounds.playFanfare();
                }}
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-[#DDB65E] to-[#F4D992] text-[#0B1220] hover:shadow-[0_0_20px_rgba(221,182,94,0.5)] active:scale-95 transition-all cursor-pointer font-mono"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>Wish Boss!</span>
              </button>
            </div>

            {/* Mobile Header Actions */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Quick Confetti Wish Button */}
              <button
                onClick={() => {
                  fireCelebrationConfetti();
                  sounds.playFanfare();
                }}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#DDB65E] to-[#F4D992] text-[#0B1220] font-bold text-xs shadow-md active:scale-95 transition-transform"
                title="Send Birthday Confetti"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span className="text-[11px] font-mono uppercase font-extrabold hidden xs:inline">
                  Wish
                </span>
              </button>

              {/* Hamburger Toggle */}
              <button
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  sounds.playSelect();
                }}
                type="button"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#111C30] text-[#F5F1E8] border border-[#DDB65E]/30 active:scale-95 transition-all cursor-pointer"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-[#DDB65E]" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer (Rendered outside header to avoid backdrop-filter stacking context traps) */}
      {mobileMenuOpen && (
        <div
          style={{ backgroundColor: "#070B14" }}
          className="fixed inset-x-0 top-[57px] sm:top-[61px] bottom-0 z-40 flex flex-col justify-between overflow-y-auto px-5 py-6 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          {/* Top Tactical Status */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#DDB65E] font-bold">
                TACTICAL MENU NAVIGATION
              </span>
              <button
                onClick={toggleSound}
                type="button"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#111C30] border border-white/10 text-[11px] font-mono text-[#A5B0C2] hover:text-[#DDB65E] cursor-pointer"
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#DDB65E]" />
                    <span className="text-[#DDB65E] font-bold">AUDIO: ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>AUDIO: OFF</span>
                  </>
                )}
              </button>
            </div>

            {/* Nav Links List */}
            <div className="space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#111C30] border border-[#DDB65E]/20 active:border-[#DDB65E] active:bg-[#1B2A43] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#1B2A43] border border-[#DDB65E]/40 flex items-center justify-center text-[#DDB65E] shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#F5F1E8]">
                            {link.label}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#DDB65E]/15 text-[#DDB65E] font-semibold">
                            {link.badge}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-[#A5B0C2]">
                          {link.desc}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#A5B0C2]" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Mobile Menu Bottom Actions */}
          <div className="pt-6 pb-14 space-y-3 border-t border-white/10 mt-6">
            
            {/* Secret Tracker Trigger */}
            <EasterEggModal
              trigger={(open) => (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    open();
                  }}
                  type="button"
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#111C30] border border-[#DDB65E]/40 text-[#DDB65E] text-xs font-mono font-bold shadow-md cursor-pointer hover:bg-[#1B2A43] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FileSpreadsheet className="w-4 h-4 text-[#DDB65E]" />
                    <span>CONFIDENTIAL_BOSS_TRACKER.XLSX</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#DDB65E]/20 text-[9px] font-mono font-semibold">
                    EASTER EGG
                  </span>
                </button>
              )}
            />

            {/* Full Confetti Cannon Trigger */}
            <button
              onClick={() => {
                fireCelebrationConfetti();
                sounds.playFanfare();
                setMobileMenuOpen(false);
              }}
              type="button"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#DDB65E] via-[#F4D992] to-[#DDB65E] text-[#0B1220] font-heading font-extrabold text-sm shadow-[0_0_25px_rgba(221,182,94,0.4)] flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-transform"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>SEND BIRTHDAY CONFETTI CANNON</span>
            </button>

            <p className="text-[10px] font-mono text-center text-[#A5B0C2] pt-2">
              Contentify Birthday Tribute · Dedicated to Our One of a Kind Boss
            </p>
          </div>
        </div>
      )}
    </>
  );
}
