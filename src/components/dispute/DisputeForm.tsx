import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Send, HelpCircle, Scale, Globe, HeartOff, LayoutGrid, Users, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, translations } from '@/lib/translations';

export interface DivorceFields {
  grounds: string;
  assetDivision: string;
  childCustody: string;
  financialSupport: string;
  parties: {
    husband: string;
    wife: string;
  };
}

export interface DisputeFormData {
  type: 'general' | 'divorce';
  facts: string;
  isMediatorInvolved: boolean;
  divorceDetails?: DivorceFields;
}

interface DisputeFormProps {
  onSubmit: (data: DisputeFormData) => void;
  language: Language;
}

export const DisputeForm: React.FC<DisputeFormProps> = ({ onSubmit, language }) => {
  const [type, setType] = useState<'general' | 'divorce'>('general');
  const [facts, setFacts] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isMediatorInvolved, setIsMediatorInvolved] = useState(false);
  const [divorceDetails, setDivorceDetails] = useState<DivorceFields>({
    grounds: '',
    assetDivision: '',
    childCustody: '',
    financialSupport: '',
    parties: { husband: '', wife: '' }
  });
  const [recognition, setRecognition] = useState<any>(null);

  const t = translations[language];

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = true;
      recog.interimResults = true;
      recog.lang = language === 'am' ? 'am-ET' : language === 'om' ? 'en-US' : 'en-US';

      recog.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        setFacts(prev => prev + ' ' + finalTranscript);
      };

      recog.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast.error(t.dispute.voiceError);
      };

      recog.onend = () => {
        setIsListening(false);
      };

      setRecognition(recog);
    }
  }, [language, t.dispute.voiceError]);

  const toggleListening = () => {
    if (!recognition) {
      toast.error('Voice recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
      setIsListening(true);
      toast.info(t.dispute.voiceListening);
    }
  };

  const handleDivorceDetailChange = (field: keyof DivorceFields, value: string) => {
    setDivorceDetails(prev => ({ ...prev, [field]: value }));
  };

  const handlePartyChange = (party: 'husband' | 'wife', value: string) => {
    setDivorceDetails(prev => ({
      ...prev,
      parties: { ...prev.parties, [party]: value }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facts.trim() && type === 'general') {
      toast.error(t.dispute.error);
      return;
    }

    if (type === 'divorce') {
      const { grounds, assetDivision, parties } = divorceDetails;
      if (!grounds || !assetDivision || !parties.husband || !parties.wife) {
        toast.error(t.dispute.incompleteDivorce);
        return;
      }
    }

    onSubmit({ 
      type, 
      facts, 
      isMediatorInvolved, 
      divorceDetails: type === 'divorce' ? divorceDetails : undefined 
    });
    toast.success(t.dispute.success);
  };

  return (
    <Card className="shadow-lg border-2 border-primary/10">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Scale className="text-primary h-6 w-6" />
              {t.dispute.title}
            </CardTitle>
            <CardDescription>
              {t.dispute.description}
            </CardDescription>
          </div>
          <HelpCircle className="text-muted-foreground h-5 w-5 cursor-help" />
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t.dispute.category}</Label>
            <RadioGroup 
              defaultValue="general" 
              onValueChange={(v) => setType(v as 'general' | 'divorce')}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="general" id="general" className="peer sr-only" />
                <Label
                  htmlFor="general"
                  className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                >
                  <LayoutGrid className="mb-3 h-6 w-6" />
                  <span className="font-bold">{t.dispute.general}</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="divorce" id="divorce" className="peer sr-only" />
                <Label
                  htmlFor="divorce"
                  className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                >
                  <HeartOff className="mb-3 h-6 w-6 text-red-500" />
                  <span className="font-bold">{t.dispute.divorce}</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <AnimatePresence mode="wait">
            {type === 'divorce' && (
              <motion.div
                key="divorce-parties"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid md:grid-cols-2 gap-4 p-4 bg-red-50/50 dark:bg-red-950/10 rounded-xl border border-red-100 dark:border-red-900/30"
              >
                <div className="space-y-2">
                  <Label>{t.dispute.husbandName}</Label>
                  <Input 
                    placeholder={t.dispute.husbandPlaceholder} 
                    value={divorceDetails.parties.husband}
                    onChange={(e) => handlePartyChange('husband', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t.dispute.wifeName}</Label>
                  <Input 
                    placeholder={t.dispute.wifePlaceholder} 
                    value={divorceDetails.parties.wife}
                    onChange={(e) => handlePartyChange('wife', e.target.value)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2 relative">
            <div className="flex justify-between items-center">
              <Label htmlFor="facts" className="text-sm font-medium">
                {type === 'divorce' ? t.dispute.divorceFactsLabel : t.dispute.factsLabel}
              </Label>
              <div className="flex gap-2">
                 <Button
                  type="button"
                  variant={isListening ? "destructive" : "secondary"}
                  size="sm"
                  onClick={toggleListening}
                  className="rounded-full gap-2 transition-all"
                >
                  {isListening ? (
                    <><MicOff className="h-4 w-4 animate-pulse" /> {t.dispute.voiceOff}</>
                  ) : (
                    <><Mic className="h-4 w-4" /> {t.dispute.voiceOn}</>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <Textarea
                id="facts"
                placeholder={type === 'divorce' ? t.dispute.divorceFactsPlaceholder : t.dispute.factsPlaceholder} 
                className="min-h-[150px] text-lg p-4 transition-all focus:ring-primary/20"
                value={facts}
                onChange={(e) => setFacts(e.target.value)}
              />
              <AnimatePresence>
                {isListening && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-4 right-4"
                  >
                    <div className="flex gap-1">
                      <span className="h-2 w-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <span className="h-2 w-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <span className="h-2 w-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence>
            {type === 'divorce' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6 overflow-hidden border-l-4 border-red-500 pl-4"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-primary" /> {t.dispute.grounds}
                    </Label>
                    <Input 
                      placeholder={t.dispute.groundsPlaceholder}
                      value={divorceDetails.grounds}
                      onChange={(e) => handleDivorceDetailChange('grounds', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-primary" /> {t.dispute.assets}
                    </Label>
                    <Input 
                      placeholder={t.dispute.assetsPlaceholder}
                      value={divorceDetails.assetDivision}
                      onChange={(e) => handleDivorceDetailChange('assetDivision', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" /> {t.dispute.custody}
                    </Label>
                    <Input 
                      placeholder={t.dispute.custodyPlaceholder}
                      value={divorceDetails.childCustody}
                      onChange={(e) => handleDivorceDetailChange('childCustody', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Scale className="h-4 w-4 text-primary" /> {t.dispute.support}
                    </Label>
                    <Input 
                      placeholder={t.dispute.supportPlaceholder}
                      value={divorceDetails.financialSupport}
                      onChange={(e) => handleDivorceDetailChange('financialSupport', e.target.value)}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-xl border border-dashed border-primary/20">
            <Checkbox 
              id="mediator" 
              checked={isMediatorInvolved}
              onCheckedChange={(checked) => setIsMediatorInvolved(checked as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="mediator"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t.dispute.authorize}
              </label>
              <p className="text-xs text-muted-foreground">
                {t.dispute.compliance}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button type="submit" className="w-full h-14 text-lg font-bold gap-2 shadow-lg hover:shadow-xl transition-all">
              {type === 'divorce' ? t.dispute.submitDivorce : t.dispute.submitGeneral} <Send className="h-5 w-5" />
            </Button>
            
            <div className="flex justify-center items-center gap-6 text-[10px] uppercase tracking-widest text-muted-foreground font-black">
              <span className="flex items-center gap-1"><Globe className="h-3 w-3 text-primary" /> Ethiopian Civil Code 1960</span>
              <span className="flex items-center gap-1"><Scale className="h-3 w-3 text-primary" /> Revised Family Code</span>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};