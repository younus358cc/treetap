import React from 'react';
import ResourceDisplay from '../components/ResourceDisplay';
import Leaderboard from '../components/Leaderboard';

const LeaderboardPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Resource Display */}
      <ResourceDisplay />
      
      <div className="mt-6">
        <Leaderboard />
      </div>
      
      {/* Friend Invite Section */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Invite Friends</h2>
        
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-4">
            Share your referral code with friends to earn bonus resources when they join!
          </p>
          
          <div className="flex items-center space-x-2">
            <div className="bg-gray-100 px-4 py-2 rounded border flex-1 text-center font-mono">
              TREETAP1
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;