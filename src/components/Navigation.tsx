import React, { useState } from 'react';
import { Home, ClipboardList, Users, MessageSquare, Settings, Bell, LogOut } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role: string;
}

export const BottomNav: React.FC<NavigationProps> = ({ activeTab, setActiveTab, role }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'cases', label: 'My Cases', icon: ClipboardList },
    { id: 'mediators', label: 'Mediators', icon: Users },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
  ];

  if (role === 'Admin') {
    tabs.splice(2, 0, { id: 'admin', label: 'Admin', icon: Settings });
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2 flex justify-between items-center z-50 max-w-md mx-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-[#006a4e]' : 'text-gray-400'
            }`}
          >
            <Icon size={22} />
            <span className="text-[10px] font-medium">{tab.label}</span>
            {isActive && <div className="w-1 h-1 bg-[#006a4e] rounded-full" />}
          </button>
        );
      })}
    </nav>
  );
};

export const Header: React.FC<{ title: string; onLogout: () => void }> = ({ title, onLogout }) => {
  return (
    <header className="sticky top-0 left-0 right-0 bg-white shadow-sm px-4 py-4 flex justify-between items-center z-40 max-w-md mx-auto">
      <h1 className="text-xl font-bold text-[#006a4e]">Shimgilina Odr</h1>
      <div className="flex items-center gap-3">
        <button className="relative text-gray-600">
          <Bell size={22} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button onClick={onLogout} className="text-gray-400 hover:text-red-500">
          <LogOut size={20} />
        </button>
        <div className="w-8 h-8 rounded-full bg-[#fcd116] flex items-center justify-center font-bold text-[#006a4e] text-xs">
          JD
        </div>
      </div>
    </header>
  );
};