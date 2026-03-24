import React, { useState } from 'react';
import { Toaster } from 'sonner';
import { Auth } from './components/Auth';
import { BottomNav, Header } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { CaseForm } from './components/CaseForm';
import { MediatorList } from './components/MediatorList';
import { Chat } from './components/Chat';
import { AdminDashboard } from './components/Admin';
import { Payments } from './components/Payments';
import { UserRole } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<{ role: UserRole } | null>(null);
  const [activeTab, setActiveTab] = useState('home');

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Toaster position="top-center" richColors />
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
           <Auth onLogin={(role) => setUser({ role })} />
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard onAction={(id) => setActiveTab(id)} />;
      case 'submit-case':
        return <CaseForm onBack={() => setActiveTab('home')} onSubmit={() => setActiveTab('cases')} />;
      case 'cases':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Cases</h2>
            <div className="space-y-4">
              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Active</span>
                  <span className="text-[10px] text-gray-400">Oct 1, 2023</span>
                </div>
                <h3 className="font-bold">Land Boundary Dispute</h3>
                <p className="text-xs text-gray-500 mt-1">Mediator: Gashe Solomon</p>
                <div className="mt-4 flex gap-2">
                  <button 
                    onClick={() => setActiveTab('chat')}
                    className="flex-1 py-2 bg-[#006a4e] text-white rounded-lg text-xs font-bold"
                  >
                    Chat
                  </button>
                  <button 
                    onClick={() => setActiveTab('payments')}
                    className="flex-1 py-2 bg-[#fcd116] text-[#006a4e] rounded-lg text-xs font-bold"
                  >
                    Pay Fee
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm opacity-60">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Resolved</span>
                  <span className="text-[10px] text-gray-400">Aug 15, 2023</span>
                </div>
                <h3 className="font-bold">Family Inheritance</h3>
                <p className="text-xs text-gray-500 mt-1">Success Rate: 100%</p>
              </div>
            </div>
          </div>
        );
      case 'mediators':
      case 'lawyers':
        return <MediatorList onSelect={() => setActiveTab('payments')} />;
      case 'chat':
        return <Chat />;
      case 'payments':
        return <Payments />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Dashboard onAction={(id) => setActiveTab(id)} />;
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'home': return 'Shimgilina Odr';
      case 'cases': return 'My Cases';
      case 'mediators': return 'Mediators';
      case 'chat': return 'Messaging';
      case 'admin': return 'Admin Panel';
      default: return 'Shimgilina Odr';
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex justify-center items-center py-0 sm:py-8">
      <div className="w-full max-w-md h-screen sm:h-[844px] bg-gray-50 flex flex-col font-sans relative sm:rounded-[3rem] shadow-2xl overflow-hidden border-[8px] border-gray-900">
        <Toaster position="top-center" richColors />
        
        {activeTab !== 'submit-case' && (
          <Header title={getHeaderTitle()} onLogout={() => setUser(null)} />
        )}
        
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {renderContent()}
        </main>

        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} role={user.role} />
      </div>
    </div>
  );
};

export default App;