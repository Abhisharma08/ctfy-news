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
  subtitle: string;
  description: string;
  superpower: string;
  badge: string;
  iconName: string;
  // RPG Skill attributes
  skillType?: "Ultimate" | "Passive" | "Active" | "Defense" | "Aura";
  manaCost?: string;
  cooldown?: string;
  powerLevel?: number;
}

export interface Award {
  id: number;
  title: string;
  description: string;
  iconName: string;
  category?: string;
  // Trophy attributes
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
