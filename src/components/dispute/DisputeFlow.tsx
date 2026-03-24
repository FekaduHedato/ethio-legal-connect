import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { translations, Language } from '../../lib/translations';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/card';
import { Mic, Send, ArrowLeft, Loader2, Scale, Heart, ScrollText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const DisputeFlow: React.FC = () => {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const t = translations[lang as Language] || translations.en;

  const [step, setStep] = useState<'form' | 'processing' | 'result'>('form');
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description) {
      toast.error('Please fill all fields');
      return;
    }
    setStep('processing');
    setTimeout(() => {
      setStep('result');
      toast.success(t.successMessage);
    }, 3000);
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      const suffix = lang === 'am' ? ' ይህ በድምፅ የተቀረፀ ፅሁፍ ነው።' : lang === 'om' ? ' Kun barreeffama sagaleen waraabame dha.' : ' This is a simulated voice input.';
      setFormData(prev => ({ 
        ...prev, 
        description: prev.description + suffix 
      }));
      toast.info('Voice recognition complete');
    }, 2000);
  };

  const getCulturalResolution = () => {
    if (lang === 'am') return 'ይህ ጉዳይ በባህላዊ ሽምግልና ታይቶ በሁለቱም ወገኖች ስምምነት እንዲያልቅ ይመከራል። እንደ ሀገር በቀል እውቀታችን እርቅ ከቅጣት ይበልጣል።';
    if (lang === 'om') return 'Dhimmi kun sirna jaarsummaa aadaatiin ilaalamee akka furmaata argatu gorfama. Akka beekumsa keenya dhalootaatti, araarri adabbii caala.';
    return 'This matter is best settled through traditional mediation where both parties reach a mutual agreement. Peace is prioritized over punishment.';
  };

  const getLegalBasisCode = () => {
    if (lang === 'am') return 'ኢትዮጵያ የፍትሐ ብሔር ሕግ አንቀጽ 3307';
    if (lang === 'om') return 'Koodii Hariiroo Hawaasaa Itoophiyaa Keewwata 3307';
    return 'Ethiopian Civil Code Art. 3307';
  };

  const getLegalResolution = () => {
    if (lang === 'am') return 'በሕግ ረገድ፣ የቀረበው አቤቱታ በውል ስምምነት ወይም በፍትሐ ብሔር ሕግ መሠረት የሚዳኝ ነው። በሰላማዊ መንገድ ካልተፈታ ወደ ፍርድ ቤት ማምራት ይቻላል።';
    if (lang === 'om') return "Karaa seeraatiin, iyyannoon dhiyaate bu'uura waliigaltee ykn seera hariiroo hawaasaatiin ilaalamuu qaba. Karaa nagaatiin yoo hin fureemne gara mana murtii deemuun ni danda'ama.";
    return 'Legally, this claim falls under contract law or civil code. If mediation fails, the matter can be escalated to a formal court of law.';
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> {t.back}
        </Button>
        <div className="text-right">
          <h2 className="text-xl font-bold text-primary">{t.title}</h2>
          <p className="text-xs text-muted-foreground">{t.languageNames[lang as Language]}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">{t.presentCase}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.fullName}</Label>
                  <Input 
                    id="name" 
                    placeholder={t.placeholderName}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="description">{t.caseDescription}</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      className={`gap-2 ${isListening ? 'animate-pulse bg-red-50 border-red-200 text-red-600' : ''}`}
                      onClick={handleVoiceInput}
                    >
                      <Mic className="w-4 h-4" /> {t.voiceInput}
                    </Button>
                  </div>
                  <Textarea 
                    id="description" 
                    className="min-h-[150px]"
                    placeholder={t.placeholderDescription}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2 h-12 text-lg" onClick={handleSubmit}>
                  <Send className="w-5 h-5" /> {t.submit}
                </Button>
              </CardFooter>
            </Card>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col items-center text-center space-y-3">
                <img 
                  src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/0edc293f-a0fb-408a-8e48-d357bbdabc58/traditional-resolution-9cca5907-1774043939059.webp" 
                  alt="Traditional" 
                  className="w-full h-40 object-cover rounded-lg mb-2 shadow-sm"
                />
                <Scale className="w-8 h-8 text-primary" />
                <h3 className="font-bold">{t.traditionalLaw}</h3>
                <p className="text-sm text-muted-foreground">{t.shimagilleQuote}</p>
              </div>
              <div className="p-6 rounded-2xl bg-secondary/5 border border-secondary/10 flex flex-col items-center text-center space-y-3">
                <img 
                  src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/0edc293f-a0fb-408a-8e48-d357bbdabc58/app-ui-preview-bd910b78-1774043939117.webp" 
                  alt="Modern" 
                  className="w-full h-40 object-cover rounded-lg mb-2 shadow-sm"
                />
                <ScrollText className="w-8 h-8 text-secondary" />
                <h3 className="font-bold">{t.modernLaw}</h3>
                <p className="text-sm text-muted-foreground">{t.legalBasis}</p>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6"
          >
            <Loader2 className="w-16 h-16 text-primary animate-spin" />
            <h2 className="text-2xl font-bold animate-pulse">{t.resolving}</h2>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 text-green-600 justify-center">
              <CheckCircle2 className="w-8 h-8" />
              <h2 className="text-3xl font-bold">{t.resolutionTitle}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-primary overflow-hidden">
                <div className="h-32 bg-primary/5 relative overflow-hidden">
                  <img 
                    src={lang === 'om' ? 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/0edc293f-a0fb-408a-8e48-d357bbdabc58/oromo-culture-552007e6-1774043939059.webp' : 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/0edc293f-a0fb-408a-8e48-d357bbdabc58/amhara-culture-25dd5859-1774043938725.webp'}
                    alt="Cultural"
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Heart className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{t.culturalContext}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground italic">"{t.shimagilleQuote}"</p>
                  <p className="leading-relaxed">{getCulturalResolution()}</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-secondary overflow-hidden">
                <div className="h-32 bg-secondary/5 flex items-center justify-center">
                  <Scale className="w-10 h-10 text-secondary" />
                </div>
                <CardHeader>
                  <CardTitle>{t.legalBasis}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm font-mono bg-secondary/10 p-2 rounded">
                    {getLegalBasisCode()}
                  </p>
                  <p className="leading-relaxed">{getLegalResolution()}</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center pt-8">
              <Button size="lg" variant="outline" onClick={() => setStep('form')}>
                {t.back}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DisputeFlow;