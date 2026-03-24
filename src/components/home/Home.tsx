import React from 'react';
import { Hero } from './Hero';
import { CultureCard } from '../dispute/CultureCard';
import { PricingPlans } from '../pricing/PricingPlans';
import { useLanguage } from '../../lib/LanguageContext';

const LANDING_BG = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/0edc293f-a0fb-408a-8e48-d357bbdabc58/landing-bg-0dd5ed0a-1773947003683.webp";
const STORE_BADGES = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/0edc293f-a0fb-408a-8e48-d357bbdabc58/app-store-badges-1b8572fd-1774039251203.webp";

export const Home = () => {
  const { language } = useLanguage();

  return (
    <div>
      <Hero 
        onStart={() => {}} 
        backgroundImage={LANDING_BG} 
        storeBadgesUrl={STORE_BADGES} 
        language={language} 
      />
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Our Approach' : language === 'am' ? 'የእኛ አቀራረብ' : 'Akkaataa Keenya'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'en' ? 'We combine traditional Ethiopian values with digital efficiency.' : 
             language === 'am' ? 'ባህላዊ የኢትዮጵያ እሴቶችን ከዲጂታል ቅልጥፍና ጋር እናጣጥማለን።' : 
             'Duudhaalee Itoophiyaa aadaa saffisa dijitaalaa waliin walitti makuun hojjenna.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CultureCard language={language} />
          <div className="p-8 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-4">Shimagelle System</h3>
            <p className="text-muted-foreground mb-4">The traditional elders council that has maintained peace for centuries.</p>
          </div>
          <div className="p-8 rounded-2xl bg-secondary/5 border border-secondary/10 flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-4">Modern Protection</h3>
            <p className="text-muted-foreground mb-4">Secure digital logging and legal verification for all resolutions.</p>
          </div>
        </div>
      </div>
      <PricingPlans />
    </div>
  );
};