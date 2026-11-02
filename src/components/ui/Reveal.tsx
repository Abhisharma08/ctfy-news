"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  duration?: number;
  isAboveFold?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  duration = 0.6,
  isAboveFold = false,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const getInitial = () => {
    if (shouldReduceMotion || direction === "none") return { opacity: 0 };
    switch (direction) {
      case "up":
        return { opacity: 0, y: 30 };
      case "down":
        return { opacity: 0, y: -30 };
      case "left":
        return { opacity: 0, x: 30 };
      case "right":
        return { opacity: 0, x: -30 };
      default:
        return { opacity: 0, y: 30 };
    }
  };

  const getAnimate = () => {
    if (shouldReduceMotion || direction === "none") return { opacity: 1 };
    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0 };
      case "left":
      case "right":
        return { opacity: 1, x: 0 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  if (isAboveFold) {
    return (
      <motion.div
        initial={getInitial()}
        animate={getAnimate()}
        transition={{
          duration: shouldReduceMotion ? 0.2 : duration,
          delay: shouldReduceMotion ? 0 : delay,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
