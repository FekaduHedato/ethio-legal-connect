import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Share2, CheckCircle, ArrowLeft } from 'lucide-react';
import { DisputeFormData } from './DisputeForm';
import { Language } from '@/lib/translations';

interface ResolutionPreviewProps {
  data: DisputeFormData;
  onReset: () => void;
  language: Language;
}

export const ResolutionPreview: React.FC<ResolutionPreviewProps> = ({ data, onReset, language }) => {
  return (
    <Card className="border-2 border-primary/20 shadow-xl overflow-hidden bg-white dark:bg-zinc-950">
      <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />
      <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b">
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={onReset} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Edit
          </Button>
          <div className="flex gap-2">
             <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" /> PDF
            </Button>
             <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" /> Share
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        <div className="flex flex-col items-center text-center space-y-4 py-8">
          <div className="h-20 w-20 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tight uppercase italic">Case Summary Generated</h2>
            <p className="text-muted-foreground">Reference ID: SHM-{Math.floor(Math.random() * 1000000)}</p>
          </div>
        </div>

        <div className="grid gap-8 border-t pt-8">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <FileText className="h-4 w-4" /> Case Facts
            </h3>
            <div className="p-6 bg-slate-50 dark:bg-zinc-900 rounded-2xl border border-border italic text-lg leading-relaxed">
              "{data.facts || 'No facts provided.'}"
            </div>
          </div>

          {data.type === 'divorce' && data.divorceDetails && (
            <div className="space-y-4">
               <h3 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                🏠 Family Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border bg-white dark:bg-zinc-900">
                  <span className="text-xs font-bold opacity-50 block uppercase">Husband</span>
                  <span className="text-lg font-bold">{data.divorceDetails.parties.husband}</span>
                </div>
                <div className="p-4 rounded-xl border bg-white dark:bg-zinc-900">
                  <span className="text-xs font-bold opacity-50 block uppercase">Wife</span>
                  <span className="text-lg font-bold">{data.divorceDetails.parties.wife}</span>
                </div>
                <div className="p-4 rounded-xl border bg-white dark:bg-zinc-900 md:col-span-2">
                  <span className="text-xs font-bold opacity-50 block uppercase">Grounds</span>
                  <span className="font-medium">{data.divorceDetails.grounds}</span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-600/5 dark:bg-blue-600/10 p-6 rounded-2xl border border-blue-600/20">
            <h4 className="font-bold text-blue-600 mb-2">Next Steps</h4>
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Our AI mediators are now analyzing your case against the Ethiopian Civil Code. A formal resolution draft will be sent to your email within 24 hours.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};