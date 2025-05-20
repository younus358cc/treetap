import { create } from 'zustand';
import { Player, Resource, Upgrade, Task, Achievement } from '../types';
import { calculateRewards } from '../utils/gameUtils';

interface GameState {
  player: Player | null;
  isLoading: boolean;
  error: string | null;
  cooldownActive: boolean;
  
  // Actions
  initializePlayer: () => void;
  tapTree: () => void;
  purchaseUpgrade: (upgradeId: string) => void;
  collectTaskReward: (taskId: string) => void;
  collectAchievementReward: (achievementId: string) => void;
  resetCooldown: () => void;
}

// Initial resources
const initialResources: Resource[] = [
  { name: 'Wood', amount: 0, icon: '🪵' },
  { name: 'Leaves', amount: 0, icon: '🍃' },
  { name: 'Sap', amount: 0, icon: '💧' },
];

// Initial upgrades
const initialUpgrades: Upgrade[] = [
  {
    id: 'axe',
    name: 'Better Axe',
    description: 'Increases wood gain per tap',
    level: 0,
    maxLevel: 5,
    cost: 10,
    costMultiplier: 1.5,
    effect: 1,
    effectMultiplier: 1.2,
    type: 'tool',
    icon: '🪓'
  },
  {
    id: 'tree-quality',
    name: 'Tree Quality',
    description: 'Improves the quality of your trees',
    level: 0,
    maxLevel: 3,
    cost: 25,
    costMultiplier: 2,
    effect: 1,
    effectMultiplier: 1.5,
    type: 'tree',
    icon: '🌳'
  },
  {
    id: 'resource-multiplier',
    name: 'Resource Multiplier',
    description: 'Multiplies all resources gained',
    level: 0,
    maxLevel: -1, // Unlimited
    cost: 50,
    costMultiplier: 2.5,
    effect: 0.1,
    effectMultiplier: 1.1,
    type: 'multiplier',
    icon: '✨'
  }
];

// Mock daily tasks
const generateDailyTasks = (): Task[] => {
  return [
    {
      id: 'task-1',
      name: 'Eager Tapper',
      description: 'Tap the tree 50 times',
      goal: 50,
      progress: 0,
      reward: { type: 'Wood', amount: 25 },
      completed: false,
      expiresAt: new Date(new Date().setHours(24, 0, 0, 0)).toISOString()
    },
    {
      id: 'task-2',
      name: 'Resource Collector',
      description: 'Collect 100 wood',
      goal: 100,
      progress: 0,
      reward: { type: 'Leaves', amount: 15 },
      completed: false,
      expiresAt: new Date(new Date().setHours(24, 0, 0, 0)).toISOString()
    },
    {
      id: 'task-3',
      name: 'Upgrade Enthusiast',
      description: 'Purchase any upgrade',
      goal: 1,
      progress: 0,
      reward: { type: 'Sap', amount: 10 },
      completed: false,
      expiresAt: new Date(new Date().setHours(24, 0, 0, 0)).toISOString()
    }
  ];
};

// Initial achievements
const initialAchievements: Achievement[] = [
  {
    id: 'first-tap',
    name: 'First Tap',
    description: 'Tap your first tree',
    unlocked: false,
    collected: false,
    reward: { type: 'Wood', amount: 5 },
    icon: '🌱'
  },
  {
    id: 'ten-taps',
    name: 'Ten Taps',
    description: 'Tap trees 10 times',
    unlocked: false,
    collected: false,
    reward: { type: 'Leaves', amount: 10 },
    icon: '🌿'
  },
  {
    id: 'first-upgrade',
    name: 'First Upgrade',
    description: 'Purchase your first upgrade',
    unlocked: false,
    collected: false,
    reward: { type: 'Sap', amount: 5 },
    icon: '📈'
  },
  {
    id: 'sap-master',
    name: 'Sap Master',
    description: 'Collect 50 sap',
    unlocked: false,
    collected: false,
    reward: { type: 'Sap', amount: 25 },
    icon: '💧'
  }
];

// Create the store
const useGameStore = create<GameState>((set, get) => ({
  player: null,
  isLoading: true,
  error: null,
  cooldownActive: false,

  initializePlayer: () => {
    // Simulate loading player data from backend
    setTimeout(() => {
      const initialPlayer: Player = {
        id: 'player-1',
        username: 'TreeTapper',
        level: 1,
        experience: 0,
        nextLevelXP: 100,
        resources: initialResources,
        upgrades: initialUpgrades,
        tasks: generateDailyTasks(),
        achievements: initialAchievements,
        lastTapTimestamp: 0,
        tapCooldown: 3000, // 3 seconds
        totalTaps: 0,
        joinDate: new Date().toISOString(),
        referralCode: 'TREETAP1',
        friends: []
      };

      set({ player: initialPlayer, isLoading: false });
    }, 1000);
  },

  tapTree: () => {
    const { player, cooldownActive } = get();
    
    if (!player || cooldownActive) return;
    
    // Calculate rewards based on player upgrades
    const rewards = calculateRewards(player);
    const now = Date.now();
    
    // Check cooldown
    if (now - player.lastTapTimestamp < player.tapCooldown) {
      return;
    }

    // Update player data
    const updatedPlayer = { 
      ...player,
      lastTapTimestamp: now,
      totalTaps: player.totalTaps + 1,
      resources: player.resources.map(resource => {
        const rewardAmount = rewards[resource.name.toLowerCase()] || 0;
        return {
          ...resource,
          amount: resource.amount + rewardAmount
        };
      }),
      tasks: player.tasks.map(task => {
        // Update task progress
        if (task.name === 'Eager Tapper' && !task.completed) {
          const newProgress = Math.min(task.progress + 1, task.goal);
          return {
            ...task,
            progress: newProgress,
            completed: newProgress >= task.goal
          };
        }
        
        if (task.name === 'Resource Collector' && !task.completed) {
          const woodResource = player.resources.find(r => r.name === 'Wood');
          const woodReward = rewards['wood'] || 0;
          
          if (woodResource) {
            const newProgress = Math.min(task.progress + woodReward, task.goal);
            return {
              ...task,
              progress: newProgress,
              completed: newProgress >= task.goal
            };
          }
        }
        
        return task;
      }),
      achievements: player.achievements.map(achievement => {
        if (achievement.id === 'first-tap' && !achievement.unlocked) {
          return { ...achievement, unlocked: true };
        }
        
        if (achievement.id === 'ten-taps' && !achievement.unlocked && player.totalTaps + 1 >= 10) {
          return { ...achievement, unlocked: true };
        }
        
        if (achievement.id === 'sap-master' && !achievement.unlocked) {
          const sapResource = player.resources.find(r => r.name === 'Sap');
          if (sapResource && sapResource.amount + (rewards['sap'] || 0) >= 50) {
            return { ...achievement, unlocked: true };
          }
        }
        
        return achievement;
      })
    };
    
    set({ 
      player: updatedPlayer,
      cooldownActive: true
    });
    
    // Start cooldown
    setTimeout(() => {
      set({ cooldownActive: false });
    }, player.tapCooldown);
  },

  purchaseUpgrade: (upgradeId: string) => {
    const { player } = get();
    if (!player) return;
    
    const upgradeIndex = player.upgrades.findIndex(u => u.id === upgradeId);
    if (upgradeIndex === -1) return;
    
    const upgrade = player.upgrades[upgradeIndex];
    if (upgrade.maxLevel !== -1 && upgrade.level >= upgrade.maxLevel) return;
    
    // Calculate cost based on current level
    const cost = Math.floor(upgrade.cost * Math.pow(upgrade.costMultiplier, upgrade.level));
    
    // Check if player has enough resources
    const woodResource = player.resources.find(r => r.name === 'Wood');
    if (!woodResource || woodResource.amount < cost) return;
    
    // Update player data
    const updatedPlayer = {
      ...player,
      resources: player.resources.map(resource => {
        if (resource.name === 'Wood') {
          return { ...resource, amount: resource.amount - cost };
        }
        return resource;
      }),
      upgrades: player.upgrades.map((u, index) => {
        if (index === upgradeIndex) {
          return { ...u, level: u.level + 1 };
        }
        return u;
      }),
      tasks: player.tasks.map(task => {
        if (task.name === 'Upgrade Enthusiast' && !task.completed) {
          return {
            ...task,
            progress: task.goal,
            completed: true
          };
        }
        return task;
      }),
      achievements: player.achievements.map(achievement => {
        if (achievement.id === 'first-upgrade' && !achievement.unlocked) {
          return { ...achievement, unlocked: true };
        }
        return achievement;
      })
    };
    
    set({ player: updatedPlayer });
  },

  collectTaskReward: (taskId: string) => {
    const { player } = get();
    if (!player) return;
    
    const taskIndex = player.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;
    
    const task = player.tasks[taskIndex];
    if (!task.completed) return;
    
    // Update player resources with task reward
    const updatedPlayer = {
      ...player,
      resources: player.resources.map(resource => {
        if (resource.name === task.reward.type) {
          return { ...resource, amount: resource.amount + task.reward.amount };
        }
        return resource;
      }),
      tasks: player.tasks.map((t, index) => {
        if (index === taskIndex) {
          return { ...t, completed: true };
        }
        return t;
      })
    };
    
    set({ player: updatedPlayer });
  },

  collectAchievementReward: (achievementId: string) => {
    const { player } = get();
    if (!player) return;
    
    const achievement = player.achievements.find(a => a.id === achievementId);
    if (!achievement || !achievement.unlocked || achievement.collected) return;
    
    // Update player resources with achievement reward
    const updatedPlayer = {
      ...player,
      resources: player.resources.map(resource => {
        if (resource.name === achievement.reward.type) {
          return { ...resource, amount: resource.amount + achievement.reward.amount };
        }
        return resource;
      }),
      achievements: player.achievements.map(a => {
        if (a.id === achievementId) {
          return { ...a, collected: true };
        }
        return a;
      })
    };
    
    set({ player: updatedPlayer });
  },

  resetCooldown: () => {
    set({ cooldownActive: false });
  }
}));

export default useGameStore;