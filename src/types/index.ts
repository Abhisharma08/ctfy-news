export interface Employee {
  id: number;
  name: string;
  designation?: string;
  image: string;
  funnyMessage: string;
  birthdayMessage: string;
  // Game attributes
  role?: "Tactical" | "Creative" | "Ops Vanguard" | "Code Sorcerer" | "Defense";
  level?: number;
  specialSkill?: string;
}

export interface Feature {
  id: number;
  number: string;
  title: string;
  mode: string;
  tagline: string;
  quote: string;
  superpower: string;
  sideEffectOrPhrase?: {
    label: string;
    text: string;
  };
  iconName: string;
  skillType: "Passive" | "Active" | "Ultimate" | "Defense" | "Aura";
  manaCost: string;
  cooldown: string;
}

export interface Award {
  id: number;
  title: string;
  description: string;
  iconName: string;
  category?: string;
  trophyTier?: "Platinum" | "Mythic" | "Gold";
  rarity?: string;
  xpReward?: string;
}

export interface Stat {
  id: number;
  label: string;
  value: string;
  note: string;
  iconName: string;
  meterPercentage?: number;
  meterColor?: string;
}
