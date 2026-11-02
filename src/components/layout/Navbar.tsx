"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, Crown } from "lucide-react";
import { fireCelebrationConfetti } from "@/components/ui/ConfettiButton";
import { EasterEggModal } from "@/components/ui/EasterEggModal";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "The Legend", href: "#legend" },
    { label: "Superpowers", href: "#superpowers" },
    { label: "Hall of Fame", href: "#awards" },
    { label: "Minions", href: "#minions" },
    { label: "Appreciation", href: "#appreciation" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "glass-nav py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="#"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#DDB65E] to-[#B58F3B] flex items-center justify-center text-[#0B1220] shadow-md group-hover:shadow-[0_0_20px_rgba(221,182,94,0.6)] transition-all duration-300">
              <Crown className="w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg tracking-wider text-[#F5F1E8] group-hover:text-[#DDB65E] transition-colors leading-none">
                CONTENTIFY
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#DDB65E] font-medium uppercase mt-0.5">
                The 1 of 1 Edition
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-[#111C30]/80 border border-[#DDB65E]/20 px-3 py-1.5 rounded-full backdrop-blur-md shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-[#A5B0C2] hover:text-[#F5F1E8] hover:bg-[#1B2A43] transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <EasterEggModal />
            <button
              onClick={fireCelebrationConfetti}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-[#DDB65E] to-[#F4D992] text-[#0B1220] hover:shadow-[0_0_20px_rgba(221,182,94,0.5)] active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Wish Boss!</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <EasterEggModal />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg bg-[#111C30] text-[#F5F1E8] border border-[#DDB65E]/30"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b border-[#DDB65E]/20 px-6 py-5 mt-2 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#F5F1E8] hover:text-[#DDB65E] py-2 border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                fireCelebrationConfetti();
                setMobileMenuOpen(false);
              }}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#DDB65E] to-[#F4D992] text-[#0B1220] font-semibold text-sm shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Send Birthday Confetti</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
