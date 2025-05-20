import React from 'react';
import useGameStore from '../store/gameStore';
import { formatNumber } from '../utils/gameUtils';

const ResourceDisplay: React.FC = () => {
  const { player } = useGameStore();

  if (!player) return <div className="animate-pulse">Loading resources...</div>;

  return (
    <div className="flex justify-center gap-4 md:gap-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-sm">
      {player.resources.map((resource) => (
        <div 
          key={resource.name}
          className="flex flex-col items-center p-2 min-w-20"
        >
          <div className="text-2xl mb-1">{resource.icon}</div>
          <div className="text-sm font-medium text-gray-600">{resource.name}</div>
          <div className="text-lg font-bold text-gray-800">{formatNumber(resource.amount)}</div>
        </div>
      ))}
    </div>
  );
};

export default ResourceDisplay;