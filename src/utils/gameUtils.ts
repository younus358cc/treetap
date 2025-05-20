import { Player } from '../types';

// Calculate rewards based on player's upgrades
export const calculateRewards = (player: Player) => {
  // Extract upgrade levels
  const axeLevel = player.upgrades.find(u => u.id === 'axe')?.level || 0;
  const treeQualityLevel = player.upgrades.find(u => u.id === 'tree-quality')?.level || 0;
  const multiplierLevel = player.upgrades.find(u => u.id === 'resource-multiplier')?.level || 0;
  
  // Base rewards
  const baseWood = 1;
  const baseLeaves = 0.5;
  const baseSap = 0.2;
  
  // Calculate upgrade effects
  const axeEffect = 1 + (axeLevel * 0.2); // Each axe level increases wood by 20%
  const treeQualityEffect = 1 + (treeQualityLevel * 0.5); // Each tree quality level increases all resources by 50%
  const multiplierEffect = 1 + (multiplierLevel * 0.1); // Each multiplier level increases all resources by 10%
  
  // Total multiplier
  const totalMultiplier = treeQualityEffect * multiplierEffect;
  
  // Final rewards
  const woodReward = Math.floor(baseWood * axeEffect * totalMultiplier);
  const leavesReward = Math.floor(baseLeaves * totalMultiplier);
  const sapReward = Math.floor(baseSap * totalMultiplier);
  
  // Add randomness (10% variation)
  const randomFactor = 0.9 + Math.random() * 0.2; // 0.9 to 1.1
  
  return {
    wood: Math.max(1, Math.floor(woodReward * randomFactor)),
    leaves: Math.max(0, Math.floor(leavesReward * randomFactor)),
    sap: Math.max(0, Math.floor(sapReward * randomFactor))
  };
};

// Format large numbers (e.g., 1000 -> 1K, 1000000 -> 1M)
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Calculate upgrade cost based on level
export const calculateUpgradeCost = (baseCost: number, multiplier: number, level: number): number => {
  return Math.floor(baseCost * Math.pow(multiplier, level));
};

// Calculate time until cooldown is complete
export const calculateCooldownRemaining = (lastTapTimestamp: number, cooldownDuration: number): number => {
  const now = Date.now();
  const elapsed = now - lastTapTimestamp;
  return Math.max(0, cooldownDuration - elapsed);
};

// Format time remaining in seconds
export const formatTimeRemaining = (ms: number): string => {
  const seconds = Math.ceil(ms / 1000);
  return `${seconds}s`;
};

// Calculate player level based on experience
export const calculateLevel = (experience: number): { level: number, nextLevelXP: number } => {
  // Simple level formula: each level requires 100 * level XP
  let level = 1;
  let xpRequired = 100;
  let remainingXP = experience;
  
  while (remainingXP >= xpRequired) {
    remainingXP -= xpRequired;
    level++;
    xpRequired = 100 * level;
  }
  
  return {
    level,
    nextLevelXP: xpRequired
  };
};

// Check if an achievement is newly unlocked
export const isNewlyUnlocked = (achievementId: string, lastCheckedAchievements: Record<string, boolean>, currentAchievements: Record<string, boolean>): boolean => {
  return !lastCheckedAchievements[achievementId] && currentAchievements[achievementId];
};