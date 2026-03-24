import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, ChevronRight, Apple, PlaySquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { Language, translations } from '@/lib/translations';

interface HeroProps {
  onStart: () => void;
  backgroundImage: string;
  storeBadgesUrl: string;
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({ onStart, backgroundImage, storeBadgesUrl, language }) => {
  const t = translations[language];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-950/60 z-10" />
        <img 
          src={backgroundImage} 
          alt="Ethiopian Landscape" 
          className="w-full h-full object-cover scale-105 animate-slow-zoom" 
        />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] italic">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              Official App Store Release v1.0.1
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-[0.9] drop-shadow-2xl">
              {t.hero.title.split('.').map((part, i) => (
                <span key={i} className="block">{part}{i === 0 ? '.' : ''}</span>
              ))}
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100/80 font-medium leading-relaxed max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <Button 
              size="lg" 
              className="h-20 px-12 text-xl font-black gap-3 bg-blue-600 hover:bg-blue-700 shadow-2xl shadow-blue-500/40 rounded-[2rem] group"
              onClick={onStart}
            >
              {t.hero.cta} <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="flex flex-col items-center md:items-start gap-3">
               <img 
                src={storeBadgesUrl} 
                alt="Available on App Store and Play Store" 
                className="h-16 w-auto cursor-pointer hover:scale-105 transition-transform drop-shadow-xl" 
              />
               <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest flex items-center gap-2">
                <Apple className="h-3 w-3" /> <PlaySquare className="h-3 w-3" /> Compatible with all iOS/Android devices
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/40"
      >
        <div className="w-px h-24 bg-gradient-to-t from-transparent via-white/50 to-transparent" />
      </motion.div>
    </section>
  );
};