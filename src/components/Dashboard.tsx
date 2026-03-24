import React from 'react';
import { PlusCircle, Users, ClipboardList, ShieldCheck, TrendingUp, Search, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardProps {
  onAction: (action: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onAction }) => {
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <div className="relative h-48 bg-[#006a4e] rounded-b-[2.5rem] p-6 text-white overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold">Selam, User!</h2>
          <p className="opacity-90 mt-1">Resolve disputes fairly and traditionally.</p>
          <div className="mt-6 flex bg-white/20 backdrop-blur-md rounded-xl p-3 items-center gap-2">
            <Search size={20} className="text-white/70" />
            <input 
              type="text" 
              placeholder="Search mediators or cases..." 
              className="bg-transparent border-none focus:ring-0 text-white placeholder-white/50 w-full text-sm"
            />
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-2 gap-4 p-6 -mt-6">
        {[
          { id: 'submit-case', label: 'Submit Case', icon: PlusCircle, color: 'bg-green-50 text-green-700' },
          { id: 'mediators', label: 'Find Mediator', icon: Users, color: 'bg-blue-50 text-blue-700' },
          { id: 'cases', label: 'My Cases', icon: ClipboardList, color: 'bg-orange-50 text-orange-700' },
          { id: 'lawyers', label: 'Consult Lawyer', icon: ShieldCheck, color: 'bg-purple-50 text-purple-700' },
        ].map((item, idx) => (
          <motion.button
            key={item.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAction(item.id)}
            className={`${item.color} p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 font-semibold`}
          >
            <item.icon size={28} />
            <span className="text-sm">{item.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Announcements / Status */}
      <div className="px-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Recent Activity</h3>
          <button className="text-[#006a4e] text-sm font-medium">View All</button>
        </div>
        
        <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-[#006a4e]">
            <TrendingUp size={24} />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">Case Resolution High!</h4>
            <p className="text-xs text-gray-500">85% of land disputes were resolved this week via Shimgilina.</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-[#fcd116]/20 rounded-full flex items-center justify-center text-[#006a4e]">
            <Bell size={24} />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">New Mediator Verified</h4>
            <p className="text-xs text-gray-500">Gashe Solomon has joined the platform as a Senior Mediator.</p>
          </div>
        </div>
      </div>
    </div>
  );
};