import React from 'react';
import useGameStore from '../store/gameStore';
import { calculateUpgradeCost, formatNumber } from '../utils/gameUtils';
import { Spade as UpgradeIcon, PenTool as Tool, Trees as Tree, Sparkles } from 'lucide-react';

const UpgradeShop: React.FC = () => {
  const { player, purchaseUpgrade } = useGameStore();

  if (!player) return <div className="animate-pulse">Loading upgrades...</div>;

  // Get wood resource amount
  const woodResource = player.resources.find(r => r.name === 'Wood');
  const woodAmount = woodResource ? woodResource.amount : 0;

  // Get icon component based on upgrade type
  const getUpgradeIcon = (type: string) => {
    switch (type) {
      case 'tool': return <Tool className="w-5 h-5 text-amber-700" />;
      case 'tree': return <Tree className="w-5 h-5 text-emerald-600" />;
      case 'multiplier': return <Sparkles className="w-5 h-5 text-yellow-500" />;
      default: return <UpgradeIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4">
        <UpgradeIcon className="w-6 h-6 text-emerald-600 mr-2" />
        <h2 className="text-xl font-bold text-gray-800">Upgrades</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {player.upgrades.map((upgrade) => {
          const cost = calculateUpgradeCost(upgrade.cost, upgrade.costMultiplier, upgrade.level);
          const canAfford = woodAmount >= cost;
          const maxedOut = upgrade.maxLevel !== -1 && upgrade.level >= upgrade.maxLevel;
          
          return (
            <div 
              key={upgrade.id}
              className={`border rounded-lg p-3 transition-all duration-300 
                        ${maxedOut 
                          ? 'border-gray-200 bg-gray-50' 
                          : canAfford 
                            ? 'border-emerald-200 bg-emerald-50 hover:shadow-md cursor-pointer' 
                            : 'border-gray-200 bg-gray-50'}`}
              onClick={() => !maxedOut && canAfford && purchaseUpgrade(upgrade.id)}
            >
              <div className="flex items-center mb-2">
                <div className="p-2 rounded-full bg-white shadow-sm mr-3">
                  {getUpgradeIcon(upgrade.type)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{upgrade.name}</h3>
                  <div className="text-xs text-gray-500">Level {upgrade.level}{upgrade.maxLevel !== -1 ? `/${upgrade.maxLevel}` : ''}</div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{upgrade.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm">
                  <span className="mr-1">🪵</span>
                  <span className={`font-medium ${canAfford ? 'text-emerald-600' : 'text-red-500'}`}>
                    {formatNumber(cost)}
                  </span>
                </div>
                
                {maxedOut ? (
                  <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded">Maxed</span>
                ) : (
                  <button 
                    className={`text-xs px-2 py-1 rounded font-medium
                              ${canAfford 
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                    disabled={!canAfford}
                  >
                    Upgrade
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpgradeShop;