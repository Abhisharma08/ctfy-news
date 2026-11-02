import { Award } from "@/types";

export const awardsHeadline = "THE LEGENDARY ACHIEVEMENTS BOARD.";
export const awardsSubheadline =
  "Some awards are earned. Some are deserved. And some are basically his job description at this point. Let's give credit where credit is due.";
export const awardsDisclaimer =
  "Disclaimer: These awards are based on years of first-hand observation, countless team interactions and an entirely unofficial jury of Team Contentify.";

export const awardsData: Award[] = [
  {
    id: 1,
    title: "The Tracker Architect",
    description:
      "For creating more spreadsheets, dashboards, and status columns than the world has problems.",
    iconName: "FileSpreadsheet",
    category: "OPERATIONAL DISCIPLINE",
    trophyTier: "Platinum",
    rarity: "0.01% of all bosses",
    xpReward: "+50,000 XP",
  },
  {
    id: 2,
    title: "The Automation Evangelist",
    description:
      "For making manual repetitive work question its very existence across every single department.",
    iconName: "Bot",
    category: "TECH INGENUITY",
    trophyTier: "Mythic",
    rarity: "0.05% of all bosses",
    xpReward: "+45,000 XP",
  },
  {
    id: 3,
    title: "The Target Terminator",
    description:
      "For never letting a deadline or target slip past unchecked, with relentless tactical focus.",
    iconName: "Target",
    category: "GOAL MASTERY",
    trophyTier: "Platinum",
    rarity: "0.02% of all bosses",
    xpReward: "+60,000 XP",
  },
  {
    id: 4,
    title: "The Client Crisis Knight",
    description:
      "For single-handedly disarming 5-alarm client escalations and saving the day before lunch.",
    iconName: "Shield",
    category: "FRONTLINE VALOR",
    trophyTier: "Mythic",
    rarity: "0.01% of all bosses",
    xpReward: "+75,000 XP",
  },
  {
    id: 5,
    title: "The Second Chance Champion",
    description:
      "For choosing mentorship over penalties, believing in raw potential, and never giving up on anyone.",
    iconName: "Award",
    category: "HEART OF GOLD",
    trophyTier: "Platinum",
    rarity: "ONE OF ONE (UNIQUE)",
    xpReward: "+100,000 XP",
  },
  {
    id: 6,
    title: "The GOAT of Leadership",
    description:
      "For inspiring a whole team of minions to build an entire secret video game just to celebrate your birthday.",
    iconName: "Crown",
    category: "ALL-TIME LEGEND",
    trophyTier: "Mythic",
    rarity: "UNPRECEDENTED",
    xpReward: "+999,999 XP",
  },
];
