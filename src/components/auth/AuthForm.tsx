import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, LogIn, UserPlus, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

interface AuthFormProps {
  onSuccess: (user: { email: string }) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Simulate auth
    toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
    onSuccess({ email });
  };

  return (
    <Card className="w-full max-w-md shadow-2xl border-2 border-primary/10 rounded-[2.5rem] overflow-hidden">
      <div className="h-2 bg-blue-600" />
      <CardHeader className="space-y-4 py-10 px-8 text-center">
        <div className="h-16 w-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-4xl font-black uppercase tracking-tighter italic">
          {isLogin ? 'SECURE LOGIN' : 'CREATE ACCOUNT'}
        </CardTitle>
        <CardDescription>
          Access the official Shimgelina ODR resolution platform.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 px-1">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="email" 
                placeholder="email@example.com" 
                className="h-14 pl-12 rounded-2xl border-2 focus:ring-blue-600/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 px-1">Password</Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="h-14 pl-12 rounded-2xl border-2 focus:ring-blue-600/20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full h-16 text-lg font-black bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-xl shadow-blue-500/20 gap-2">
            {isLogin ? <><LogIn className="h-5 w-5" /> Sign In</> : <><UserPlus className="h-5 w-5" /> Sign Up</>}
          </Button>
          
          <button 
            type="button"
            className="w-full text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-blue-600 transition-colors"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}
          </button>
        </form>
      </CardContent>
    </Card>
  );
};