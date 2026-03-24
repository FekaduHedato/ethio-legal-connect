import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export const PricingPlans: React.FC = () => {
  const plans = [
    {
      name: 'Single Case',
      price: '$49',
      description: 'Perfect for personal or one-time family disputes.',
      features: ['24h Response Time', 'Draft Resolution Document', 'AI Elder Analysis', 'Legal Code Citations'],
      cta: 'Pay per Case',
      popular: false
    },
    {
      name: 'Professional',
      price: '$199',
      description: 'Ideal for small businesses and commercial contracts.',
      features: ['Priority Support', 'Unlimited Cases', 'Lawyer Verification', 'Certified e-Signatures'],
      cta: 'Start Pro Plan',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'White-labeled solutions for law firms and agencies.',
      features: ['Dedicated Arbitrator', 'Custom AI Training', 'API Integration', 'Full Compliance Audit'],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-16 uppercase tracking-tighter italic">Accessible Justice.</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative flex flex-col p-8 rounded-[2.5rem] border-2 transition-all duration-300 ${
                plan.popular 
                ? 'border-blue-600 shadow-2xl shadow-blue-500/20 scale-105 z-10' 
                : 'border-border hover:border-blue-500/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                  Most Trusted
                </div>
              )}
              <CardHeader className="p-0 mb-8 space-y-4 text-left">
                <CardTitle className="text-2xl font-black uppercase tracking-tighter italic">{plan.name}</CardTitle>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tight">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-muted-foreground font-bold">/month</span>}
                </div>
                <CardDescription className="text-base leading-relaxed">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-8 flex-grow">
                <div className="space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-left">
                      <div className="h-5 w-5 bg-blue-600/10 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  className={`w-full h-16 text-lg font-black rounded-2xl ${
                    plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'variant-outline'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};