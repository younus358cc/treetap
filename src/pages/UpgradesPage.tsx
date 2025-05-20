import React from 'react';
import useGameStore from '../store/gameStore';
import ResourceDisplay from '../components/ResourceDisplay';
import UpgradeShop from '../components/UpgradeShop';

const UpgradesPage: React.FC = () => {
  const { player } = useGameStore();
  
  if (!player) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading upgrades...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Resource Display */}
      <ResourceDisplay />
      
      <div className="mt-6">
        <UpgradeShop />
      </div>
      
      {/* Upgrade Explanation */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">How Upgrades Work</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 rounded-lg">
            <h3 className="font-medium text-amber-800 mb-2">Tool Upgrades</h3>
            <p className="text-sm text-gray-600">
              Tool upgrades increase the amount of wood you get per tap. Each level provides a 20% boost to wood collection.
              Max 5 levels.
            </p>
          </div>
          
          <div className="p-4 bg-emerald-50 rounded-lg">
            <h3 className="font-medium text-emerald-800 mb-2">Tree Quality</h3>
            <p className="text-sm text-gray-600">
              Improves the quality of your trees, providing a 50% boost to all resources per level.
              Max 3 levels, with each level also changing the appearance of your tree.
            </p>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-medium text-yellow-800 mb-2">Resource Multiplier</h3>
            <p className="text-sm text-gray-600">
              Multiplies all resources gained by 10% per level. No maximum level, but each level becomes
              more expensive than the last.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradesPage;