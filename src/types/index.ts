export interface Employee {
  id: number;
  name: string;
  designation?: string;
  image: string;
  funnyMessage: string;
  birthdayMessage: string;
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
}

export interface Award {
  id: number;
  title: string;
  description: string;
  iconName: string;
  category?: string;
}

export interface Stat {
  id: number;
  label: string;
  value: string;
  note: string;
  iconName: string;
}
