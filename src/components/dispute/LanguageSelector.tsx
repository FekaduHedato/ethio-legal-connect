import React from 'react';
import { useNavigate } from 'react-router-dom';
import { translations, Language } from '../../lib/translations';
import { Button } from '../ui/button';
import { Globe } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const navigate = useNavigate();

  const options: { lang: Language; label: string; sub: string }[] = [
    { lang: 'en', label: 'English', sub: 'Justice for all' },
    { lang: 'am', label: 'አማርኛ', sub: 'ፍትህ ለሁሉም' },
    { lang: 'om', label: 'Afaan Oromoo', sub: 'Haqaa hundaaf' },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 space-y-8">
      <div className="text-center space-y-2">
        <Globe className="w-12 h-12 mx-auto text-primary animate-pulse" />
        <h1 className="text-3xl font-bold tracking-tight">Choose Language</h1>
        <p className="text-muted-foreground">Select your preferred language to proceed</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {options.map((opt) => (
          <Button
            key={opt.lang}
            variant="outline"
            className="h-32 flex flex-col space-y-2 hover:border-primary hover:bg-primary/5 transition-all group"
            onClick={() => navigate(`/${opt.lang}/dispute`)}
          >
            <span className="text-xl font-bold group-hover:scale-110 transition-transform">{opt.label}</span>
            <span className="text-sm text-muted-foreground">{opt.sub}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;