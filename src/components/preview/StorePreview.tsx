import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Smartphone, ShieldCheck, Star, Download, PlaySquare, Apple, ExternalLink, Share2, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface StorePreviewProps {
  onBack: () => void;
  iconUrl: string;
  screenshots: string[];
}

export const StorePreview: React.FC<StorePreviewProps> = ({ onBack, iconUrl, screenshots }) => {
  const [isCreating, setIsCreating] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsCreating(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleGet = () => {
    toast.success("Shimgelina ODR is being added to your library!");
  };

  const handleDownload = (platform: string) => {
    setDownloading(platform);
    setTimeout(() => {
      setDownloading(null);
      toast.success(`Shimgelina ODR ${platform} installer downloaded successfully.`);
    }, 2000);
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
        toast.success("App Store Preview link copied to clipboard!");
      } else {
        // Fallback for non-secure contexts or missing clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          toast.success("App Store Preview link copied to clipboard!");
        } catch (err) {
          toast.error("Failed to copy link. Please copy the URL from your browser address bar.");
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      toast.error("Failed to copy link. Please copy the URL from your browser address bar.");
    }
  };

  if (isCreating) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col items-center justify-center space-y-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="h-12 w-12 text-blue-600" />
        </motion.div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Initializing Preview</h2>
          <p className="text-muted-foreground text-sm font-mono">RENDERING_STORE_ASSETS_V1...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-zinc-950">
      {/* App Store Header */}
      <header className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="gap-2 font-bold">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <div className="hidden sm:flex h-8 w-px bg-border mx-2" />
            <span className="hidden sm:block text-xs font-black uppercase tracking-widest opacity-40">Store Preview</span>
          </div>
          <div className="flex gap-3">
             <Button variant="ghost" size="icon" onClick={handleShare} className="rounded-full">
                <Share2 className="h-4 w-4" />
             </Button>
             <Button onClick={handleGet} className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-500/20">GET</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <img src={iconUrl} alt="App Icon" className="w-32 h-32 md:w-40 md:h-40 rounded-[22.5%] shadow-2xl border-4 border-white dark:border-zinc-800" />
            <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-full shadow-lg border-2 border-white dark:border-zinc-900">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </motion.div>
          
          <div className="space-y-4 pt-4 flex-1">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none">Shimgelina ODR</h1>
            <p className="text-lg md:text-xl text-blue-600 font-bold uppercase tracking-widest">Global Resolution Center</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 items-center pt-2">
              <div className="text-center md:text-left">
                <span className="text-2xl font-black block">4.9 <Star className="inline h-5 w-5 fill-current" /></span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 text-muted-foreground">24.5K Ratings</span>
              </div>
              <div className="h-10 w-px bg-border hidden md:block" />
              <div className="text-center md:text-left">
                <span className="text-2xl font-black block">4+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 text-muted-foreground">Age</span>
              </div>
              <div className="h-10 w-px bg-border hidden md:block" />
              <div className="text-center md:text-left">
                <span className="text-2xl font-black block">#1</span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 text-muted-foreground">In Legal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Screenshots */}
        <div className="mt-16 md:mt-24">
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
            {screenshots.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="shrink-0 snap-center"
              >
                <img 
                  src={s} 
                  alt={`Screenshot ${i+1}`} 
                  className="h-[500px] md:h-[600px] w-auto rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border-4 md:border-8 border-slate-900/5 hover:scale-[1.02] transition-transform duration-500" 
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mt-16 md:mt-20 grid md:grid-cols-3 gap-12 md:gap-16 pb-20">
          <div className="md:col-span-2 space-y-8">
            <div className="space-y-4">
               <h2 className="text-2xl font-black uppercase italic tracking-tighter border-b-2 border-blue-600 w-fit pb-1">Description</h2>
               <p className="text-muted-foreground leading-relaxed text-lg">
                Shimgelina ODR is the official online dispute resolution platform that blends traditional Ethiopian wisdom with global legal frameworks. Resolve civil and family disputes in record time with AI-powered Shimgelina.
               </p>
               <Button variant="link" className="p-0 text-blue-600 font-bold flex items-center gap-1">
                 more <ExternalLink className="h-3 w-3" />
               </Button>
            </div>
            <div className="p-8 bg-white dark:bg-zinc-900 rounded-[2rem] border border-border space-y-4 shadow-sm">
               <div className="flex items-center gap-3 text-blue-600">
                  <ShieldCheck className="h-6 w-6" />
                  <span className="font-black uppercase italic tracking-tighter">Verified & Secure</span>
               </div>
               <p className="text-sm opacity-80 leading-relaxed text-muted-foreground">End-to-end encryption for all case records and communications. Fully compliant with UNCITRAL model laws and Ethiopian Civil Code 3307.</p>
            </div>
          </div>
          <div className="space-y-6">
             <div className="p-6 bg-slate-200/50 dark:bg-zinc-800 rounded-3xl space-y-4 border border-transparent hover:border-blue-500/20 transition-colors">
                <h3 className="font-black uppercase text-[10px] tracking-[0.2em] opacity-40">App Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Provider</span>
                    <span className="font-bold">Shimgelina Global</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Size</span>
                    <span className="font-bold">124.5 MB</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Languages</span>
                    <span className="font-bold">EN, AM, OM</span>
                  </div>
                </div>
             </div>
             <div className="flex flex-col gap-3">
               <Button 
                onClick={() => handleDownload('iOS')}
                disabled={downloading !== null}
                className="h-14 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-black gap-3 w-full shadow-xl"
               >
                 {downloading === 'iOS' ? <Loader2 className="animate-spin h-5 w-5" /> : <Apple className="h-5 w-5" />}
                 {downloading === 'iOS' ? 'Preparing...' : 'Download for iOS'}
               </Button>
               <Button 
                onClick={() => handleDownload('Android')}
                disabled={downloading !== null}
                variant="outline"
                className="h-14 rounded-2xl font-black gap-3 w-full border-2 border-zinc-900 dark:border-white"
               >
                 {downloading === 'Android' ? <Loader2 className="animate-spin h-5 w-5" /> : <PlaySquare className="h-5 w-5" />}
                 {downloading === 'Android' ? 'Preparing...' : 'Download for Android'}
               </Button>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};