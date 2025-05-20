import React, { useEffect } from 'react';
import useGameStore from '../store/gameStore';
import Tree from '../components/Tree';
import ResourceDisplay from '../components/ResourceDisplay';
import DailyTasks from '../components/DailyTasks';
import Achievements from '../components/Achievements';

const GamePage: React.FC = () => {
  const { initializePlayer, player } = useGameStore();
  
  useEffect(() => {
    if (!player) {
      initializePlayer();
    }
  }, [initializePlayer, player]);

  if (!player) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading your forest...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Resource Display */}
      <ResourceDisplay />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          {/* Tree Tapping Area */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <Tree />
          </div>
          
          {/* Achievements */}
          <Achievements />
        </div>
        
        <div>
          {/* Daily Tasks */}
          <DailyTasks />
        </div>
      </div>
    </div>
  );
};

export default GamePage;