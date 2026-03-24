import React, { useState } from 'react';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck,
  Globe,
  Lock,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, translations } from '@/lib/translations';

interface NavbarProps {
  user: { email: string } | null;
  onLogout: () => void;
  onLoginClick: () => void;
  onPublishClick: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  user, 
  onLogout, 
  onLoginClick, 
  onPublishClick,
  language,
  onLanguageChange
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[language];

  const navLinks = [
    { name: t.nav.solutions, href: '#solutions' },
    { name: t.nav.pricing, href: '#pricing' },
    { name: t.nav.culture, href: '#culture' },
    { name: t.nav.adr, href: '#adr' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 text-slate-900 dark:text-zinc-100 uppercase tracking-tighter font-bold text-xs">
        {/* Minimalist Top Indicator */}
        <div className="flex justify-between py-1 opacity-40">
          <div className="flex gap-4">
            <span>Network: SECURE</span>
            <span>Latency: 24ms</span>
          </div>
          <div className="flex gap-3">
             <button onClick={() => onLanguageChange('en')} className={`${language === 'en' ? 'text-blue-600' : ''}`}>EN</button>
             <button onClick={() => onLanguageChange('am')} className={`${language === 'am' ? 'text-blue-600' : ''}`}>አማ</button>
             <button onClick={() => onLanguageChange('om')} className={`${language === 'om' ? 'text-blue-600' : ''}`}>OM</button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 border-t border-border/50">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Logo />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="h-6 w-px bg-border mx-2" />

            <div className="flex items-center gap-3">
              {!user && (
                <Button 
                  variant="ghost" 
                  className="gap-2 text-blue-600 dark:text-blue-400 font-bold"
                  onClick={onPublishClick}
                >
                  <Rocket className="h-4 w-4" /> {t.nav.publish}
                </Button>
              )}

              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-medium text-muted-foreground">Logged in as</span>
                    <span className="text-sm font-bold text-foreground">{user.email.split('@')[0]}</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={onLogout} className="rounded-full">
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Button variant="ghost" onClick={onLoginClick}>{t.nav.signIn}</Button>
                  <Button onClick={onLoginClick} className="gap-2 shadow-lg shadow-blue-500/20">
                    {t.nav.getStarted} <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            {!user && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-blue-600"
                onClick={onPublishClick}
              >
                <Rocket className="h-5 w-5" />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <div className="flex justify-center gap-6 mb-4 pb-4 border-b">
                 <button onClick={() => { onLanguageChange('en'); setIsMenuOpen(false); }} className={`${language === 'en' ? 'text-blue-600 font-bold' : ''}`}>English</button>
                 <button onClick={() => { onLanguageChange('am'); setIsMenuOpen(false); }} className={`${language === 'am' ? 'text-blue-600 font-bold' : ''}`}>አማርኛ</button>
                 <button onClick={() => { onLanguageChange('om'); setIsMenuOpen(false); }} className={`${language === 'om' ? 'text-blue-600 font-bold' : ''}`}>Afaan Oromo</button>
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-medium hover:text-primary"
                >
                  {link.name}
                </a>
              ))}
              <hr />
              {user ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <Button variant="outline" className="w-full justify-start gap-2" onClick={onLogout}>
                    <LogOut className="h-4 w-4" /> {t.nav.logout}
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Button variant="outline" className="w-full" onClick={onLoginClick}>{t.nav.signIn}</Button>
                  <Button className="w-full" onClick={onLoginClick}>{t.nav.getStarted}</Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Standards Bar */}
      <div className="bg-primary/5 py-1.5 px-4 hidden sm:block">
        <div className="container mx-auto flex justify-center gap-8 text-[10px] uppercase font-bold tracking-widest text-primary/60">
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Confidentiality</span>
          <span className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> UNCITRAL Compliant</span>
          <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> Secure Records</span>
        </div>
      </div>
    </nav>
  );
};