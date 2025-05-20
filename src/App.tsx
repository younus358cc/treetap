import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GameLayout from './layouts/GameLayout';
import GamePage from './pages/GamePage';
import UpgradesPage from './pages/UpgradesPage';
import LeaderboardPage from './pages/LeaderboardPage';
import useGameStore from './store/gameStore';

function App() {
  const { initializePlayer } = useGameStore();
  
  useEffect(() => {
    // Initialize the game state when the app loads
    initializePlayer();
  }, [initializePlayer]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameLayout />}>
          <Route index element={<GamePage />} />
          <Route path="upgrades" element={<UpgradesPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;