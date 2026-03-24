import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Smartphone, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const InstallPrompt: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[200] max-w-sm w-[calc(100vw-3rem)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-zinc-900 text-white p-6 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-2">
          <button onClick={() => setShow(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex gap-4 items-start">
          <div className="h-14 w-14 bg-blue-600 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Smartphone className="h-8 w-8" />
          </div>
          <div className="space-y-1 pr-4">
            <h4 className="font-black uppercase tracking-tight italic">Install Shimgelina</h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-medium">
              Add Shimgelina ODR to your home screen for the full mobile resolution experience.
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <Button className="w-full h-12 bg-white text-zinc-900 hover:bg-zinc-200 font-black rounded-xl gap-2">
            <Download className="h-4 w-4" /> Install App
          </Button>
        </div>
      </motion.div>
    </div>
  );
};