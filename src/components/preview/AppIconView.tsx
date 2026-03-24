import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2, Download, Copy, CheckCircle, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface AppIconViewProps {
  onBack: () => void;
  iconUrl: string;
}

export const AppIconView: React.FC<AppIconViewProps> = ({ onBack, iconUrl }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(iconUrl);
        setIsCopied(true);
        toast.success("Icon URL copied to clipboard!");
        setTimeout(() => setIsCopied(false), 2000);
      } else {
        // Fallback
        const textArea = document.createElement("textarea");
        textArea.value = iconUrl;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          setIsCopied(true);
          toast.success("Icon URL copied to clipboard!");
          setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
          toast.error("Failed to copy URL. Please try right-clicking the icon and 'Copy Image Link'.");
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      toast.error("Failed to copy URL");
    }
  };

  const handleDownloadPack = () => {
    setIsExporting(true);
    toast.info("Compiling high-resolution assets...");
    
    setTimeout(() => {
      setIsExporting(false);
      toast.success("Asset pack (v1.0.1) ready for download!");
      // Simulate download
      const link = document.createElement('a');
      link.href = iconUrl;
      link.download = 'shimgelina-icon-pack.png';
      document.body.appendChild(link);
      // link.click(); // Prevent actual download in preview
      document.body.removeChild(link);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col items-center py-12 md:py-20 px-4">
       <div className="w-full max-w-6xl mb-12 flex justify-start">
        <Button variant="ghost" onClick={onBack} className="gap-2 font-bold group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Brand Assets
        </Button>
      </div>

      <div className="max-w-4xl w-full space-y-16">
        <div className="text-center space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 text-blue-600 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-4"
          >
            <Sparkles className="h-3 w-3" /> Visual Identity System
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">Global <span className="text-blue-600">Iconography</span></h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">The iconic representation of Shimgelina ODR, designed for high visibility across global app stores.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative group"
          >
            <div className="absolute -inset-6 bg-blue-600/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 p-4 bg-white dark:bg-zinc-900 rounded-[32%] shadow-2xl border border-border">
              <img 
                src={iconUrl} 
                alt="Shimgelina ODR High Res Icon" 
                className="w-full aspect-square rounded-[28.5%] shadow-[0_40px_80px_-15px_rgba(59,130,246,0.3)] relative z-10 border-4 border-white dark:border-zinc-800" 
              />
            </div>
            <div className="absolute top-8 right-8 z-20 bg-blue-600 text-white p-3 rounded-full shadow-2xl border-4 border-white dark:border-zinc-900 animate-pulse">
              <ImageIcon className="h-6 w-6" />
            </div>
          </motion.div>

          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-2">
                <div className="h-1 w-8 bg-blue-600" /> Technical Specs
              </h2>
              <div className="space-y-1">
                {[
                  { label: "Resolution", value: "1024 x 1024 px" },
                  { label: "Format", value: "WebP / PNG-24" },
                  { label: "Corner Radius", value: "22.5% (App Store Std)" },
                  { label: "Color Space", value: "P3 Display Wide" }
                ].map((spec) => (
                  <div key={spec.label} className="flex justify-between items-center py-4 border-b border-border/50 group hover:bg-slate-100/50 dark:hover:bg-zinc-900/50 px-2 transition-colors rounded-lg">
                    <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{spec.label}</span>
                    <span className="font-black text-sm">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button 
                onClick={handleCopy} 
                className="h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 font-black gap-3 text-lg shadow-xl shadow-blue-500/20 transition-all active:scale-95"
              >
                {isCopied ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                {isCopied ? "URL Copied!" : "Copy Asset URL"}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleDownloadPack}
                disabled={isExporting}
                className="h-16 rounded-2xl font-black gap-3 text-lg border-2 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-all active:scale-95 disabled:opacity-50"
              >
                {isExporting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
                {isExporting ? "Compiling..." : "Download Export Pack"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};