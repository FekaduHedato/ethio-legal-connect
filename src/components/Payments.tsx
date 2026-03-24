import React, { useState } from 'react';
import { toast } from 'sonner';
import { Smartphone, Building2, ShieldCheck, Check } from 'lucide-react';

export const Payments: React.FC = () => {
  const [selected, setSelected] = useState('telebirr');

  const handlePay = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: 'Processing payment...',
      success: 'Payment successful! Your consultation is confirmed.',
      error: 'Payment failed.',
    });
  };

  return (
    <div className="p-6 pb-24">
      <h2 className="text-2xl font-bold">Checkout</h2>
      <p className="text-gray-500 text-sm">Payment for: Marriage Mediation Service</p>

      <div className="mt-8 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-500">Service Fee</span>
          <span className="font-bold">500 ETB</span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-500">Platform Commission (10%)</span>
          <span className="font-bold">50 ETB</span>
        </div>
        <div className="h-px bg-gray-100 my-4" />
        <div className="flex justify-between items-center">
          <span className="font-bold">Total Amount</span>
          <span className="text-2xl font-black text-[#006a4e]">550 ETB</span>
        </div>
      </div>

      <h3 className="mt-8 mb-4 font-bold">Select Payment Method</h3>
      <div className="space-y-3">
        {[
          { id: 'telebirr', name: 'Telebirr', icon: Smartphone, color: 'text-blue-600' },
          { id: 'cbebirr', name: 'CBE Birr', icon: Building2, color: 'text-purple-600' },
        ].map((method) => (
          <button
            key={method.id}
            onClick={() => setSelected(method.id)}
            className={`w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all ${
              selected === method.id ? 'border-[#006a4e] bg-[#006a4e]/5' : 'border-gray-100'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm ${method.color}`}>
                <method.icon size={20} />
              </div>
              <span className="font-bold">{method.name}</span>
            </div>
            {selected === method.id && <Check size={20} className="text-[#006a4e]" />}
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-xl flex items-start gap-3">
        <ShieldCheck className="text-blue-600" size={20} />
        <p className="text-[10px] text-blue-700">
          Your payment is secured by our escrow system. Funds are only released to the mediator after the case is successfully processed.
        </p>
      </div>

      <button
        onClick={handlePay}
        className="w-full mt-8 bg-[#006a4e] text-white py-4 rounded-xl font-bold shadow-lg"
      >
        Confirm & Pay Now
      </button>
    </div>
  );
};