import React, { useState, useEffect } from 'react';
import useGameStore from '../store/gameStore';
import { calculateCooldownRemaining, formatTimeRemaining } from '../utils/gameUtils';

const Tree: React.FC = () => {
  const { player, tapTree, cooldownActive } = useGameStore();
  const [treeState, setTreeState] = useState<'idle' | 'tapped' | 'cooldown'>('idle');
  const [cooldownTime, setCooldownTime] = useState<string>('');
  const [rewards, setRewards] = useState<{ type: string; amount: number }[]>([]);
  const [animations, setAnimations] = useState<{ id: string; type: string; amount: number; top: number; left: number }[]>([]);

  useEffect(() => {
    if (!player) return;
    
    // Check cooldown status
    const checkCooldown = () => {
      if (!player) return;
      
      const remaining = calculateCooldownRemaining(player.lastTapTimestamp, player.tapCooldown);
      
      if (remaining > 0) {
        setTreeState('cooldown');
        setCooldownTime(formatTimeRemaining(remaining));
      } else {
        setTreeState('idle');
        setCooldownTime('');
      }
    };
    
    // Set up interval to update cooldown timer
    const interval = setInterval(checkCooldown, 100);
    checkCooldown();
    
    return () => clearInterval(interval);
  }, [player]);

  // Handle tree tap
  const handleTap = () => {
    if (treeState !== 'idle' || !player) return;
    
    tapTree();
    setTreeState('tapped');
    
    // Create floating number animations
    const newAnimations = player.resources.map((resource, index) => ({
      id: `anim-${Date.now()}-${index}`,
      type: resource.name,
      amount: Math.floor(Math.random() * 5) + 1, // Random amount for visual effect
      top: Math.random() * 50 - 100, // Random position
      left: Math.random() * 100 - 50 // Random position
    }));
    
    setAnimations(prev => [...prev, ...newAnimations]);
    
    // Reset tree state after animation
    setTimeout(() => {
      setTreeState('cooldown');
    }, 500);
    
    // Remove animations after they complete
    setTimeout(() => {
      setAnimations(prev => prev.filter(a => !newAnimations.some(na => na.id === a.id)));
    }, 2000);
  };

  // Determine tree image based on upgrades
  const getTreeImage = () => {
    if (!player) return '🌱';
    
    const treeLevel = player.upgrades.find(u => u.id === 'tree-quality')?.level || 0;
    
    switch (treeLevel) {
      case 0: return '🌱';
      case 1: return '🌿';
      case 2: return '🌳';
      case 3: return '🌲';
      default: return '🌳';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={`relative w-64 h-64 flex items-center justify-center cursor-pointer 
                   ${treeState === 'idle' ? 'hover:scale-105' : ''} 
                   ${treeState === 'tapped' ? 'scale-110' : ''} 
                   ${treeState === 'cooldown' ? 'opacity-80' : ''} 
                   transition-all duration-300`}
        onClick={handleTap}
      >
        {/* Tree image */}
        <div className={`text-9xl ${treeState === 'tapped' ? 'animate-bounce' : ''}`}>
          {getTreeImage()}
        </div>
        
        {/* Cooldown overlay */}
        {treeState === 'cooldown' && (
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {cooldownTime}
          </div>
        )}
        
        {/* Floating rewards animations */}
        {animations.map(anim => (
          <div 
            key={anim.id}
            className="absolute text-xl font-bold animate-float pointer-events-none"
            style={{ 
              top: `${anim.top}px`, 
              left: `${anim.left}px`,
              color: anim.type === 'Wood' ? '#7F5539' : anim.type === 'Leaves' ? '#40916C' : '#FFD700',
              animationDelay: `${Math.random() * 0.5}s`
            }}
          >
            +{anim.amount} {anim.type === 'Wood' ? '🪵' : anim.type === 'Leaves' ? '🍃' : '💧'}
          </div>
        ))}
      </div>
      
      <p className="mt-4 text-lg font-medium text-gray-600">
        {treeState === 'idle' ? 'Tap the tree!' : treeState === 'tapped' ? 'Great job!' : 'Wait for cooldown...'}
      </p>
      
      {player && (
        <div className="mt-2 text-sm text-gray-500">
          Total Taps: {player.totalTaps}
        </div>
      )}
    </div>
  );
};

export default Tree;