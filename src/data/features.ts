import { Feature } from "@/types";

export const featuresHeadline = "BUILT DIFFERENT. WIRED FOR GREATNESS.";
export const featuresSubheadline =
  "Every legendary personality comes with some extraordinary features. Here's what makes this one a limited edition.";

export const featuresData: Feature[] = [
  {
    id: 1,
    number: "01",
    title: "UPDATED TRACKER",
    mode: "Always ON",
    tagline: "The ability to track absolutely EVERYTHING.",
    quote:
      "If there's a task, there's a tracker. If there's a tracker, there's a better tracker. And if there's a better tracker, we're probably getting a tracker to maintain it.",
    superpower: "Can detect an unupdated tracker from miles away.",
    sideEffectOrPhrase: {
      label: "Side effect",
      text: "Team members occasionally dream in google sheets.",
    },
    iconName: "TableCells",
    skillType: "Passive",
    manaCost: "0 MP (Always Active)",
    cooldown: "Instant",
    isHighlighted: true,
    highlightBadge: "★ MAIN PART // SACRED WORKPLACE TRACKER ★",
  },
  {
    id: 2,
    number: "02",
    title: "AUTOMATION OVERLORD",
    mode: "Auto mode",
    tagline: "Why do it manually when we can automate it?",
    quote:
      "From simple tasks to complex workflows, no process is safe from his automation vision.",
    superpower: "Sees an automation opportunity in literally everything.",
    sideEffectOrPhrase: {
      label: "Favourite phrase",
      text: "“Let's automate this. I just want you guys to rest.”",
    },
    iconName: "Cpu",
    skillType: "Active",
    manaCost: "50 MP",
    cooldown: "0.2s (Infinite Loop)",
  },
  {
    id: 3,
    number: "03",
    title: "TARGET LOCK™",
    mode: "Mission active",
    tagline: "Dream big. Set targets. Exceed targets. Repeat.",
    quote:
      "Daily targets? Yes. Weekly targets? Obviously. Monthly targets? Mandatory. Targets for the targets? Let's discuss.",
    superpower: "Can turn any casual conversation into a performance review.",
    sideEffectOrPhrase: {
      label: "Target status",
      text: "Target achieved? Great. What's the next target?",
    },
    iconName: "Crosshair",
    skillType: "Ultimate",
    manaCost: "100 MP",
    cooldown: "Quarterly Reset",
  },
  {
    id: 4,
    number: "04",
    title: "KNIGHT IN SHINING ARMOUR",
    mode: "Hero mode",
    tagline: "When clients bring chaos, he brings calm.",
    quote:
      "Difficult client? Unexpected crisis? Situation getting out of hand? Don't panic. The boss has entered the chat.",
    superpower: "Takes the heat, handles the situation and protects his people.",
    sideEffectOrPhrase: {
      label: "Battle report",
      text: "Team status: Safe. Boss status: Handling it.",
    },
    iconName: "ShieldAlert",
    skillType: "Defense",
    manaCost: "75 MP",
    cooldown: "24/7 Readiness",
  },
  {
    id: 5,
    number: "05",
    title: "SECOND CHANCE PRO MAX",
    mode: "Unlimited access",
    tagline: "Because people matter more than mistakes.",
    quote:
      "A rare leadership feature that gives people room to learn, grow, make mistakes and come back stronger.",
    superpower: "Believes in people even when they haven't fully figured themselves out.",
    sideEffectOrPhrase: {
      label: "Subscription tier",
      text: "Subscription: Lifetime. Renewal: Not required.",
    },
    iconName: "HeartHandshake",
    skillType: "Aura",
    manaCost: "0 MP (Passive Heart)",
    cooldown: "Infinite Charges",
  },
];
