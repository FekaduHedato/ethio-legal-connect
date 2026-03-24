import React, { useState } from 'react';
import { Send, Phone, MessageCircle } from 'lucide-react';
import { MOCK_MEDIATORS } from '../data';

export const Chat: React.FC = () => {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello, I have reviewed your land dispute case.", sender: 'mediator', time: '10:00 AM' },
    { id: 2, text: "Thank you Gashe Solomon. When can we meet?", sender: 'user', time: '10:05 AM' },
    { id: 3, text: "We can schedule a video call for tomorrow afternoon.", sender: 'mediator', time: '10:06 AM' },
  ]);

  const sendMessage = () => {
    if (!msg.trim()) return;
    setMessages([...messages, { id: Date.now(), text: msg, sender: 'user', time: 'Just now' }]);
    setMsg('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      <div className="p-4 border-b flex justify-between items-center bg-white">
        <div className="flex items-center gap-3">
          <img src={MOCK_MEDIATORS[2].avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h4 className="font-bold text-sm">{MOCK_MEDIATORS[2].name}</h4>
            <span className="text-[10px] text-green-500 font-medium">Online</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="text-gray-400"><Phone size={20} /></button>
          <button className="text-[#25D366]"><MessageCircle size={20} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              m.sender === 'user' 
                ? 'bg-[#006a4e] text-white rounded-tr-none' 
                : 'bg-white text-gray-800 shadow-sm rounded-tl-none border border-gray-100'
            }`}>
              <p>{m.text}</p>
              <span className={`text-[8px] block mt-1 ${m.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                {m.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..." 
            className="flex-1 bg-gray-100 border-none rounded-full px-4 text-sm focus:ring-1 focus:ring-[#006a4e]"
          />
          <button 
            onClick={sendMessage}
            className="w-10 h-10 bg-[#006a4e] text-white rounded-full flex items-center justify-center shadow-md"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};