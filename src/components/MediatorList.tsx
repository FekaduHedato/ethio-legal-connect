import React from 'react';
import { MOCK_MEDIATORS } from '../data';
import { Star, ShieldCheck, MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface MediatorListProps {
  onSelect: (id: string) => void;
}

export const MediatorList: React.FC<MediatorListProps> = ({ onSelect }) => {
  return (
    <div className="pb-24">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900">Experts</h2>
        <p className="text-gray-500 text-sm">Choose a trusted mediator or lawyer</p>
        
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or specialty..." 
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#006a4e] focus:bg-white"
          />
        </div>
      </div>

      <div className="px-6 space-y-4">
        {MOCK_MEDIATORS.map((mediator) => (
          <motion.div
            key={mediator.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(mediator.id)}
            className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex gap-4"
          >
            <div className="relative">
              <img 
                src={mediator.avatar} 
                alt={mediator.name} 
                className="w-20 h-20 rounded-xl object-cover"
              />
              {mediator.isVerified && (
                <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5">
                  <ShieldCheck size={18} className="text-[#006a4e] fill-[#006a4e]/10" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900">{mediator.name}</h3>
                <div className="flex items-center gap-1 text-[#fcd116]">
                  <Star size={14} className="fill-current" />
                  <span className="text-xs font-bold text-gray-700">{mediator.rating}</span>
                </div>
              </div>
              <p className="text-xs text-[#006a4e] font-semibold">{mediator.role} • {mediator.experience}</p>
              <div className="flex items-center gap-1 mt-2 text-gray-400">
                <MapPin size={12} />
                <span className="text-[10px]">{mediator.location}</span>
              </div>
              
              <div className="mt-3 flex gap-2">
                <button className="flex-1 py-1.5 text-[10px] font-bold border border-[#006a4e] text-[#006a4e] rounded-lg">Profile</button>
                <button className="flex-1 py-1.5 text-[10px] font-bold bg-[#006a4e] text-white rounded-lg">Request</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};