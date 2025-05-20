import React from 'react';
import { Outlet } from 'react-router-dom';
import { TreePine, TentTree as TreeEvergreen, Package, Trophy, Settings, HelpCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const GameLayout: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <TreePine className="w-8 h-8 text-emerald-600 mr-2" />
              <h1 className="text-2xl font-bold text-emerald-800">TreeTap</h1>
            </div>
            
            <nav className="hidden md:flex space-x-1">
              {[
                { path: '/', label: 'Play', icon: <TreeEvergreen className="w-5 h-5" /> },
                { path: '/upgrades', label: 'Upgrades', icon: <Package className="w-5 h-5" /> },
                { path: '/leaderboard', label: 'Leaderboard', icon: <Trophy className="w-5 h-5" /> },
              ].map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center
                            ${isActive(item.path) 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                >
                  {React.cloneElement(item.icon, { className: 'w-5 h-5 mr-1' })}
                  {item.label}
                </Link>
              ))}
            </nav>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
                <HelpCircle className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4">
        <Outlet />
      </main>
      
      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around">
          {[
            { path: '/', label: 'Play', icon: <TreeEvergreen className="w-6 h-6" /> },
            { path: '/upgrades', label: 'Upgrades', icon: <Package className="w-6 h-6" /> },
            { path: '/leaderboard', label: 'Leaderboard', icon: <Trophy className="w-6 h-6" /> },
          ].map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-3 px-4
                        ${isActive(item.path) 
                          ? 'text-emerald-600' 
                          : 'text-gray-500'}`}
            >
              {React.cloneElement(item.icon, { 
                className: isActive(item.path) ? 'w-6 h-6 text-emerald-600' : 'w-6 h-6 text-gray-500' 
              })}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default GameLayout;