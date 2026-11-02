import { Stat } from "@/types";

export const bossData = {
  name: "The Boss",
  title: "The Boss of One of a Kind",
  subtitle: "Not your regular boss. The ultimate-level boss.",
  company: "Contentify",
  portrait: "/images/boss/boss-portrait.jpg",
  characterClass: "SUPREME ARCHITECT · S-TIER LEADER",
  level: 99,
  rarity: "MYTHIC ★★★★★★",
  guild: "GUILD OF CONTENTIFY",
  heroCopy:
    "Introducing the man, the myth, the legend. A rare combination of charisma, kindness, leadership, unlimited second chances, and an extraordinary ability to turn absolutely anything into a tracker.",
  personalityLabels: [
    "THE VISIONARY",
    "THE TRACKER ARCHITECT",
    "THE AUTOMATION KING",
    "THE TARGET TERMINATOR",
    "THE TEAM'S KNIGHT IN SHINING ARMOUR",
  ],
  legendHeading: "NOT YOUR REGULAR BOSS. A WHOLE DIFFERENT LEVEL.",
  legendDescription:
    "Some leaders give orders. Others send emails. Our boss builds a multi-tab automated spreadsheet ecosystem, resolves an existential client crisis before lunch, and still stops by to ask if you've eaten. Equal parts visionary strategist, walking automation proposal, and patient mentor—he's the reason Contentify moves fast, dreams bigger, and laughs through the chaos.",
  stats: [
    {
      id: 1,
      label: "PATIENCE [HP]",
      value: "∞",
      note: "Tested daily by last-minute client requests and still unshakable",
      iconName: "Infinity",
      meterPercentage: 100,
      meterColor: "from-emerald-400 to-teal-500",
    },
    {
      id: 2,
      label: "TEAM SHIELD [DEF]",
      value: "100%",
      note: "Always shields the team and takes the heat when fires break out",
      iconName: "ShieldCheck",
      meterPercentage: 100,
      meterColor: "from-blue-400 to-indigo-500",
    },
    {
      id: 3,
      label: "SECOND CHANCES [REVIVE]",
      value: "Unlimited",
      note: "Believes people are worth way more than accidental bugs or misses",
      iconName: "Sparkles",
      meterPercentage: 100,
      meterColor: "from-amber-400 to-[#DDB65E]",
    },
    {
      id: 4,
      label: "MAIN CHARACTER ENERGY [AURA]",
      value: "MAX",
      note: "Enters the room and immediately elevates the standard and the vibe",
      iconName: "Flame",
      meterPercentage: 100,
      meterColor: "from-rose-500 to-orange-500",
    },
  ] as Stat[],
  appreciationHeading:
    "BEHIND ALL THE TRACKERS, TARGETS & AUTOMATION... THERE'S YOU.",
  appreciationParagraphs: [
    "It's easy to joke about the daily targets, the color-coded spreadsheets, and the automation scripts that solve problems we didn't even know we had. But beneath every system, protocol, and deadline lies something much rarer in modern leadership: profound, unwavering trust in your team.",
    "Thank you for never hesitating to step in when a client crisis erupts, for taking responsibility when things go sideways, and for offering second, third, and fourth chances when someone is learning. You don't just assign tasks—you create opportunities that change the trajectories of our careers.",
    "You have built Contentify into a powerhouse, but more importantly, you've created a culture where people feel heard, backed, and inspired to bring their best self every single day.",
  ],
  appreciationClosing:
    "Thank you for being the kind of leader who doesn't just build a better team, but helps build better people.",
  finaleHeadline: "VICTORY ACHIEVED! HAPPY BIRTHDAY, BOSS!",
  finaleTagline: "THE ORIGINAL. THE ICON. THE ONE OF ONE.",
  finaleCopy:
    "From your favourite minions at Contentify, with love, laughter and all the trackers we could ever need. ❤️",
  finalePunchline: "P.S. Please don't ask us to put this birthday surprise on a tracker.",
};
