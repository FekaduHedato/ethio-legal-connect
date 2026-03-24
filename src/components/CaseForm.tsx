import React, { useState } from 'react';
import { toast } from 'sonner';
import { ArrowLeft, Upload, CheckCircle2 } from 'lucide-react';

interface CaseFormProps {
  onBack: () => void;
  onSubmit: () => void;
}

export const CaseForm: React.FC<CaseFormProps> = ({ onBack, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Family',
    description: '',
    location: '',
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => step > 1 ? setStep(step - 1) : onBack();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Case submitted successfully!');
    onSubmit();
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="p-4 border-b flex items-center gap-4">
        <button onClick={handleBack}><ArrowLeft size={24} /></button>
        <h2 className="text-xl font-bold">Submit a Case</h2>
      </div>

      <div className="p-6">
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${step >= i ? 'bg-[#006a4e]' : 'bg-gray-100'}`} />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-in slide-in-from-right duration-300">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <div>
                <label className="text-sm font-medium text-gray-700">Case Title</label>
                <input
                  type="text"
                  placeholder="e.g. Neighbor dispute over wall"
                  className="mt-1 block w-full p-3 border rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select className="mt-1 block w-full p-3 border rounded-xl">
                  <option>Family</option>
                  <option>Marriage</option>
                  <option>Land</option>
                  <option>Business</option>
                </select>
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-[#006a4e] text-white py-4 rounded-xl font-bold mt-8"
              >
                Next Step
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in slide-in-from-right duration-300">
              <h3 className="text-lg font-semibold">Case Details</h3>
              <div>
                <label className="text-sm font-medium text-gray-700">Full Description</label>
                <textarea
                  rows={4}
                  placeholder="Explain the situation in detail..."
                  className="mt-1 block w-full p-3 border rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Location (City/Subcity)</label>
                <input
                  type="text"
                  placeholder="e.g. Addis Ababa, Bole"
                  className="mt-1 block w-full p-3 border rounded-xl"
                />
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-[#006a4e] text-white py-4 rounded-xl font-bold mt-8"
              >
                Next Step
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in slide-in-from-right duration-300">
              <h3 className="text-lg font-semibold">Review & Evidence</h3>
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center gap-3">
                <Upload size={32} className="text-gray-400" />
                <div className="text-center">
                  <p className="text-sm font-medium">Upload relevant documents</p>
                  <p className="text-xs text-gray-400">Photos of land titles, agreements, etc.</p>
                </div>
                <button type="button" className="text-[#006a4e] text-sm font-semibold">Select Files</button>
              </div>

              <div className="bg-green-50 p-4 rounded-xl flex items-start gap-3">
                <CheckCircle2 className="text-[#006a4e]" size={20} />
                <p className="text-xs text-[#006a4e]">
                  By submitting, you agree to our terms of Shimgilina and that you provide truthful information.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#006a4e] text-white py-4 rounded-xl font-bold mt-8 shadow-lg"
              >
                Submit Case
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};