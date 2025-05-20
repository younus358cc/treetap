export interface Resource {
  name: string;
  amount: number;
  icon: string;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  cost: number;
  costMultiplier: number;
  effect: number;
  effectMultiplier: number;
  type: 'tool' | 'tree' | 'multiplier';
  icon: string;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  goal: number;
  progress: number;
  reward: {
    type: string;
    amount: number;
  };
  completed: boolean;
  expiresAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  collected: boolean;
  reward: {
    type: string;
    amount: number;
  };
  icon: string;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  taps: number;
  resources: number;
  rank: number;
}

export interface Player {
  id: string;
  username: string;
  level: number;
  experience: number;
  nextLevelXP: number;
  resources: Resource[];
  upgrades: Upgrade[];
  tasks: Task[];
  achievements: Achievement[];
  lastTapTimestamp: number;
  tapCooldown: number;
  totalTaps: number;
  joinDate: string;
  referralCode: string;
  friends: string[];
}