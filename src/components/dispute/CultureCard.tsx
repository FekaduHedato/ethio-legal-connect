import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CULTURAL_ASSETS } from '@/lib/ethiopianData';
import { Language } from '@/lib/translations';

interface CultureCardProps {
  language: Language;
}

export const CultureCard: React.FC<CultureCardProps> = ({ language }) => {
  return (
    <div className="grid gap-6">
      {CULTURAL_ASSETS.map((asset, index) => (
        <Card key={index} className="overflow-hidden border-none shadow-xl group hover:scale-[1.02] transition-transform">
          <div className="relative h-64 overflow-hidden">
            <img 
              src={asset.image} 
              alt={asset.title[language]} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-left">
              <span className="inline-block px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-3">
                {asset.tag[language]}
              </span>
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                {asset.title[language]}
              </h3>
            </div>
          </div>
          <CardContent className="p-6 bg-white dark:bg-zinc-900 text-left">
            <p className="text-muted-foreground leading-relaxed">
              {asset.description[language]}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};