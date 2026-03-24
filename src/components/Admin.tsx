import React from 'react';
import { BarChart3, Users, ClipboardList, Wallet, CheckCircle, XCircle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Cases', value: '1,284', icon: ClipboardList, color: 'text-blue-600' },
    { label: 'Active Mediators', value: '42', icon: Users, color: 'text-green-600' },
    { label: 'Platform Earnings', value: '64.2k ETB', icon: Wallet, color: 'text-[#006a4e]' },
    { label: 'Success Rate', value: '92%', icon: BarChart3, color: 'text-orange-600' },
  ];

  return (
    <div className="p-6 pb-24">
      <h2 className="text-2xl font-bold">Admin Console</h2>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <s.icon size={20} className={`${s.color} mb-2`} />
            <div className="text-xl font-black">{s.value}</div>
            <div className="text-[10px] text-gray-500 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="font-bold mb-4">Pending Verifications</h3>
        <div className="space-y-4">
          {[
            { name: 'Dr. Belayneh Akilu', role: 'Mediator', id: 'v1' },
            { name: 'Hana Girma', role: 'Lawyer', id: 'v2' },
          ].map((v) => (
            <div key={v.id} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between">
              <div>
                <div className="font-bold text-sm">{v.name}</div>
                <div className="text-[10px] text-gray-500">{v.role}</div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-red-50 text-red-600 rounded-lg"><XCircle size={18} /></button>
                <button className="p-2 bg-green-50 text-green-600 rounded-lg"><CheckCircle size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-bold mb-4">Commission Logistics</h3>
        <div className="bg-[#006a4e] text-white p-6 rounded-2xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-sm opacity-80">This Month's Payouts</div>
            <div className="text-3xl font-black mt-1">12,450 ETB</div>
            <button className="mt-4 bg-white text-[#006a4e] px-4 py-2 rounded-lg text-xs font-bold">Manage Payouts</button>
          </div>
          <Wallet className="absolute -bottom-4 -right-4 w-24 h-24 opacity-10" />
        </div>
      </div>
    </div>
  );
};