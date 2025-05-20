import React from 'react';
import useGameStore from '../store/gameStore';
import { formatNumber } from '../utils/gameUtils';
import { CheckSquare, Calendar } from 'lucide-react';

const DailyTasks: React.FC = () => {
  const { player, collectTaskReward } = useGameStore();

  if (!player) return <div className="animate-pulse">Loading tasks...</div>;

  // Sort tasks by completion status
  const sortedTasks = [...player.tasks].sort((a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return 0;
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4">
        <Calendar className="w-6 h-6 text-blue-500 mr-2" />
        <h2 className="text-xl font-bold text-gray-800">Daily Tasks</h2>
      </div>
      
      <div className="space-y-3">
        {sortedTasks.map((task) => {
          const progress = Math.min(task.progress, task.goal);
          const progressPercent = (progress / task.goal) * 100;
          
          return (
            <div 
              key={task.id}
              className={`border rounded-lg p-3 transition-all duration-300
                         ${task.completed ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200'}`}
            >
              <div className="flex justify-between mb-2">
                <h3 className="font-medium text-gray-800">{task.name}</h3>
                {task.completed && (
                  <CheckSquare className="w-5 h-5 text-emerald-500" />
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{task.description}</p>
              
              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                <div 
                  className="h-full rounded-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 mb-3">
                <span>{progress} / {task.goal}</span>
                <span>Expires today at midnight</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-sm mr-1 font-medium">Reward:</span>
                  <span className="text-sm">
                    {formatNumber(task.reward.amount)} {task.reward.type === 'Wood' ? '🪵' : task.reward.type === 'Leaves' ? '🍃' : '💧'}
                  </span>
                </div>
                
                <button 
                  className={`text-xs px-3 py-1 rounded font-medium
                            ${task.completed 
                              ? 'bg-blue-500 text-white hover:bg-blue-600' 
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                  disabled={!task.completed}
                  onClick={() => task.completed && collectTaskReward(task.id)}
                >
                  {task.completed ? 'Collect' : 'In Progress'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyTasks;