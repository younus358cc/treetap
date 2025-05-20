import React, { useState, useEffect } from 'react';
import { Trophy, Users } from 'lucide-react';
import { LeaderboardEntry } from '../types';

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'global' | 'friends'>('global');

  useEffect(() => {
    // Simulate loading leaderboard data
    setTimeout(() => {
      const mockLeaderboard: LeaderboardEntry[] = [
        { userId: '1', username: 'TreeMaster', taps: 1245, resources: 7800, rank: 1 },
        { userId: '2', username: 'ForestKing', taps: 1120, resources: 7200, rank: 2 },
        { userId: '3', username: 'WoodHarvester', taps: 980, resources: 6500, rank: 3 },
        { userId: '4', username: 'LeafCollector', taps: 840, resources: 5900, rank: 4 },
        { userId: '5', username: 'SapGatherer', taps: 750, resources: 5200, rank: 5 },
        { userId: '6', username: 'TreeTapper', taps: 450, resources: 3100, rank: 6 },
        { userId: '7', username: 'GreenThumb', taps: 320, resources: 2400, rank: 7 },
      ];
      
      setLeaderboard(mockLeaderboard);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Render medal or rank number
  const renderRank = (rank: number) => {
    switch (rank) {
      case 1:
        return <div className="text-xl text-yellow-500">🥇</div>;
      case 2:
        return <div className="text-xl text-gray-400">🥈</div>;
      case 3:
        return <div className="text-xl text-amber-600">🥉</div>;
      default:
        return <div className="text-sm font-medium text-gray-500">#{rank}</div>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4">
        <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
        <h2 className="text-xl font-bold text-gray-800">Leaderboard</h2>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button 
          className={`py-2 px-4 text-sm font-medium border-b-2 ${
            activeTab === 'global' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('global')}
        >
          <Trophy className="w-4 h-4 inline mr-1" />
          Global
        </button>
        <button 
          className={`py-2 px-4 text-sm font-medium border-b-2 ${
            activeTab === 'friends' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('friends')}
        >
          <Users className="w-4 h-4 inline mr-1" />
          Friends
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : activeTab === 'global' ? (
        <div className="space-y-2">
          {leaderboard.map((entry) => (
            <div 
              key={entry.userId}
              className={`flex items-center p-3 rounded-lg transition-all duration-200
                        ${entry.rank <= 3 ? 'bg-amber-50' : 'bg-gray-50'}`}
            >
              <div className="w-10 flex justify-center mr-3">
                {renderRank(entry.rank)}
              </div>
              
              <div className="flex-1">
                <div className="font-medium text-gray-800">{entry.username}</div>
                <div className="text-xs text-gray-500">
                  {entry.taps} taps · {entry.resources} resources
                </div>
              </div>
              
              {entry.rank === 6 && (
                <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  You
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
          <Users className="w-12 h-12 mb-3 text-gray-300" />
          <p className="mb-1">Add friends to see them here</p>
          <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
            Invite Friends
          </button>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;