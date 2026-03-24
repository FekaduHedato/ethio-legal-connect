import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Language } from '@/lib/translations';

interface LanguageSectionProps {
  onLanguageSelect: (lang: Language) => void;
  currentLanguage: Language;
}

export const LanguageSection: React.FC<LanguageSectionProps> = ({ onLanguageSelect, currentLanguage }) => {
  const languages = [
    { code: 'en' as const, name: 'English', nativeName: 'English', desc: 'Global Business & International Law' },
    { code: 'am' as const, name: 'Amharic', nativeName: 'አማርኛ', desc: 'Ethiopian Official & Civil Administration' },
    { code: 'om' as const, name: 'Afaan Oromo', nativeName: 'Afaan Oromo', desc: 'Regional Cultural & Judicial Context' },
  ];

  return (
    <section id="languages" className="py-24 bg-slate-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter italic">Localized Justice</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-16">
          Resolving disputes in the language you speak best. We support English, Amharic, and Afaan Oromo for all legal proceedings.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {languages.map((lang) => (
            <Card 
              key={lang.code}
              className={`cursor-pointer transition-all duration-300 border-2 overflow-hidden ${
                currentLanguage === lang.code 
                ? 'border-blue-600 ring-4 ring-blue-600/10 scale-105' 
                : 'border-border hover:border-blue-500/50 hover:shadow-xl'
              }`}
              onClick={() => onLanguageSelect(lang.code)}
            >
              <CardContent className="p-10 space-y-4">
                <div className={`text-4xl font-black mb-4 ${currentLanguage === lang.code ? 'text-blue-600' : 'text-slate-400'}`}>
                  {lang.nativeName}
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight">{lang.name}</h3>
                <p className="text-sm text-muted-foreground">{lang.desc}</p>
                {currentLanguage === lang.code && (
                  <div className="pt-4 flex justify-center">
                    <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Selected</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};