import React from 'react';
import useGameStore from '../store/gameStore';
import { Award, Lock, Gift } from 'lucide-react';

const Achievements: React.FC = () => {
  const { player, collectAchievementReward } = useGameStore();

  if (!player) return <div className="animate-pulse">Loading achievements...</div>;

  const unlockedCount = player.achievements.filter(a => a.unlocked).length;
  const totalCount = player.achievements.length;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Award className="w-6 h-6 text-amber-500 mr-2" />
          <h2 className="text-xl font-bold text-gray-800">Achievements</h2>
        </div>
        <div className="text-sm text-gray-600">
          {unlockedCount}/{totalCount} Unlocked
        </div>
      </div>
      
      <div className="space-y-3">
        {player.achievements.map((achievement) => (
          <div 
            key={achievement.id}
            className={`border rounded-lg p-3 transition-all duration-300
                      ${achievement.unlocked 
                        ? achievement.collected
                          ? 'border-gray-200 bg-gray-50'
                          : 'border-amber-200 bg-amber-50' 
                        : 'border-gray-200 bg-gray-100'}`}
          >
            <div className="flex items-start">
              <div className={`p-2 rounded-full ${
                achievement.unlocked 
                  ? achievement.collected
                    ? 'bg-gray-100'
                    : 'bg-amber-100'
                  : 'bg-gray-200'
              } mr-3`}>
                {achievement.unlocked ? (
                  <span className="text-xl">{achievement.icon}</span>
                ) : (
                  <Lock className="w-5 h-5 text-gray-400" />
                )}
              </div>
              
              <div className="flex-1">
                <h3 className={`font-medium ${
                  achievement.unlocked 
                    ? achievement.collected
                      ? 'text-gray-600'
                      : 'text-gray-800'
                    : 'text-gray-500'
                }`}>
                  {achievement.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                
                {achievement.unlocked ? (
                  achievement.collected ? (
                    <div className="text-xs text-gray-500">
                      Reward collected: {achievement.reward.amount} {achievement.reward.type === 'Wood' ? '🪵' : achievement.reward.type === 'Leaves' ? '🍃' : '💧'}
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-emerald-600 font-medium">
                        Reward: {achievement.reward.amount} {achievement.reward.type === 'Wood' ? '🪵' : achievement.reward.type === 'Leaves' ? '🍃' : '💧'}
                      </div>
                      <button
                        onClick={() => collectAchievementReward(achievement.id)}
                        className="flex items-center px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-medium hover:bg-amber-600 transition-colors"
                      >
                        <Gift className="w-3 h-3 mr-1" />
                        Collect
                      </button>
                    </div>
                  )
                ) : (
                  <div className="text-xs text-gray-500">
                    Locked - Complete the task to unlock
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;