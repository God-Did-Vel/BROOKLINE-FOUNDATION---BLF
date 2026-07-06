'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api';
import { Heart, CreditCard, Landmark, Check, X, ShieldAlert, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

import HeroSection from '@/components/common/HeroSection';

export default function DonatePage() {
  // Preset Amounts in NGN (Nigerian Naira)
  const presets = [5000, 10000, 25000, 50000, 100000];
  
  const [amount, setAmount] = useState<number | ''>(10000);
  const [email, setEmail] = useState('');
  const [donorName, setDonorName] = useState('');
  const [gateway, setGateway] = useState<'PAYSTACK' | 'FLUTTERWAVE' | 'BANK_TRANSFER'>('PAYSTACK');
  
  // Simulation Process States
  const [isCheckoutActive, setIsCheckoutActive] = useState(false);
  const [donationRecord, setDonationRecord] = useState<any | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  
  // Status Page States
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleDonateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0 || !email) return;

    if (gateway === 'BANK_TRANSFER') {
      // Direct transfer details display
      setSuccess(true);
      return;
    }

    // Initiate payment in backend
    const record = await api.initiateDonation({
      amount: Number(amount),
      email,
      donorName,
      paymentGateway: gateway,
    });

    setDonationRecord(record);
    setIsCheckoutActive(true);
  };

  const handleSimulateSuccess = async () => {
    if (!donationRecord) return;
    setProcessingPayment(true);

    // Call verify api
    const result = await api.verifyDonation(donationRecord.reference, gateway);

    setTimeout(() => {
      setProcessingPayment(false);
      setIsCheckoutActive(false);
      
      if (result.status === 'SUCCESSFUL') {
        setSuccess(true);
        // Trigger confetti shower
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      } else {
        setError(true);
      }
    }, 1500);
  };

  const handleSimulateFailure = () => {
    setProcessingPayment(true);
    setTimeout(() => {
      setProcessingPayment(false);
      setIsCheckoutActive(false);
      setError(true);
    }, 1200);
  };

  const resetForm = () => {
    setSuccess(false);
    setError(false);
    setAmount(10000);
    setEmail('');
    setDonorName('');
  };

  return (
    <div className="w-full bg-white">
      <HeroSection
        title="Empower a Girl. Fund a Future."
        subtitle="Your generous contributions fund STEM classes, vocational workshops, health outreach seminars, and academic scholarships."
        breadcrumb={[{ label: 'Donate', href: '/donate' }]}
        bgImage="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1920"
      />

      {/* Main Donation Area */}
      <section className="py-20 bg-soft-gray min-h-[600px] flex items-center justify-center">
        <div className="max-w-3xl mx-auto px-6 w-full">
          
          <div className="bg-white p-8 sm:p-12 rounded-[2rem] border border-slate-200/50 shadow-xl">
            
            {success ? (
              // SUCCESS SCREEN
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center gap-6 py-6"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-inner">
                  <Check className="w-10 h-10" />
                </div>
                <h3 className="font-display font-extrabold text-3xl text-navy">Thank You for Your Support!</h3>
                
                {gateway === 'BANK_TRANSFER' ? (
                  <div className="max-w-md bg-slate-50 border border-slate-200 p-6 rounded-2xl text-left flex flex-col gap-4 font-sans text-sm text-slate-700 mt-4">
                    <span className="font-display font-bold text-base text-navy">Direct Bank Transfer details:</span>
                    <div>
                      <span className="block font-semibold text-slate-400 text-[10px] uppercase">Bank Name</span>
                      <span className="block font-semibold text-navy">Brookline Foundation Trust Bank</span>
                    </div>
                    <div>
                      <span className="block font-semibold text-slate-400 text-[10px] uppercase">Account Number</span>
                      <span className="block font-semibold text-navy tracking-wider">0123-4567-8901 (NGN)</span>
                    </div>
                    <div>
                      <span className="block font-semibold text-slate-400 text-[10px] uppercase">Account Name</span>
                      <span className="block font-semibold text-navy">Brookline Foundation Development Fund</span>
                    </div>
                    <span className="text-[10px] text-slate-400 border-t border-slate-200 pt-3 mt-2 block">
                      Please send transaction receipts to payments@brooklinefoundation.org to receive audit receipts.
                    </span>
                  </div>
                ) : (
                  <p className="font-sans text-sm text-slate-500 leading-relaxed max-w-md">
                    We have successfully logged your donation of <strong>₦{Number(amount).toLocaleString()}</strong>. A secure receipt is sent to <strong>{email}</strong>.
                  </p>
                )}

                <button
                  onClick={resetForm}
                  className="mt-6 font-sans font-bold bg-navy hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl shadow-md cursor-pointer transition-colors"
                >
                  Make another Donation
                </button>
              </motion.div>
            ) : error ? (
              // FAILURE SCREEN
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center gap-6 py-6"
              >
                <div className="w-20 h-20 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shadow-inner">
                  <X className="w-10 h-10" />
                </div>
                <h3 className="font-display font-extrabold text-3xl text-navy">Donation Failed</h3>
                <p className="font-sans text-sm text-slate-500 leading-relaxed max-w-md">
                  We could not complete your transaction. No funds were debited. Please double check credit card details or bank connectivity.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-6 font-sans font-bold bg-navy hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl shadow-md cursor-pointer transition-colors"
                >
                  Try Again
                </button>
              </motion.div>
            ) : (
              // FORM SCREEN
              <form onSubmit={handleDonateSubmit} className="flex flex-col gap-6">
                <div>
                  <span className="font-sans font-bold text-xs text-primary uppercase tracking-widest">SUPPORT WORK</span>
                  <h3 className="font-display font-extrabold text-2xl text-navy mt-1">Sponsorship Form</h3>
                </div>

                <hr className="border-slate-100" />

                {/* Amount presets */}
                <div className="flex flex-col gap-2">
                  <label className="font-sans font-bold text-xs text-navy/70">Select Donation Amount (NGN)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {presets.map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setAmount(val)}
                        className={`py-3 rounded-xl font-sans font-semibold text-xs tracking-wider transition-all cursor-pointer border ${
                          amount === val
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-navy/75 hover:bg-slate-100'
                        }`}
                      >
                        ₦{val.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount input */}
                <div className="flex flex-col gap-1">
                  <label className="font-sans font-bold text-xs text-navy/70">Or Enter Custom Amount (₦)</label>
                  <input
                    type="number"
                    min="100"
                    placeholder="Enter custom amount"
                    required
                    className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-sans text-sm text-navy"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
                  />
                </div>

                {/* Donor detail fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-sans font-bold text-xs text-navy/70">Full Name (Optional)</label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:bg-white focus:border-primary outline-none transition-all font-sans text-sm text-navy"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-sans font-bold text-xs text-navy/70">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:bg-white focus:border-primary outline-none transition-all font-sans text-sm text-navy"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Gateway selection */}
                <div className="flex flex-col gap-2">
                  <label className="font-sans font-bold text-xs text-navy/70">Select Payment Gateway</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'PAYSTACK', label: 'Paystack Card/Bank', icon: <CreditCard className="w-4 h-4" /> },
                      { id: 'FLUTTERWAVE', label: 'Flutterwave Online', icon: <CreditCard className="w-4 h-4" /> },
                      { id: 'BANK_TRANSFER', label: 'Bank Transfer', icon: <Landmark className="w-4 h-4" /> },
                    ].map((gate) => (
                      <button
                        key={gate.id}
                        type="button"
                        onClick={() => setGateway(gate.id as any)}
                        className={`flex items-center gap-2.5 p-4 rounded-xl border font-sans font-semibold text-xs tracking-wider transition-all cursor-pointer ${
                          gateway === gate.id
                            ? 'bg-navy text-white border-navy shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-navy/75 hover:bg-slate-100'
                        }`}
                      >
                        {gate.icon}
                        {gate.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-slate-400 mt-2 bg-slate-50 p-4 rounded-2xl border border-slate-100 leading-relaxed">
                  <Award className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Your donation is protected by institutional SSL security. Audit certificates are generated and sent automatically.</span>
                </div>

                <button
                  type="submit"
                  className="w-full font-sans font-bold bg-gold hover:bg-gold-hover text-white py-4 rounded-xl border border-gold hover:border-gold-hover shadow-lg hover:shadow-xl transition-all cursor-pointer mt-4"
                >
                  Proceed to Secure Checkout
                </button>
              </form>
            )}

          </div>
        </div>
      </section>

      {/* Simulated Secure Checkout Overlay Modal */}
      <AnimatePresence>
        {isCheckoutActive && donationRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl flex flex-col items-center"
            >
              {/* Fake Gateway Header */}
              <div className="w-full flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <span className="font-display font-extrabold text-navy tracking-tight text-base flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  {gateway} SECURE PAY
                </span>
                <button
                  onClick={() => setIsCheckoutActive(false)}
                  disabled={processingPayment}
                  className="text-slate-400 hover:text-navy cursor-pointer disabled:opacity-50"
                  aria-label="Cancel checkout"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {processingPayment ? (
                <div className="flex flex-col items-center text-center gap-4 py-8">
                  <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-gold animate-spin" />
                  <span className="font-sans text-sm text-slate-500 font-medium">Verifying transaction authorization...</span>
                </div>
              ) : (
                <div className="w-full flex flex-col gap-6">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-sans text-sm text-slate-700 flex flex-col gap-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Merchant</span>
                      <span className="font-semibold text-navy">Brokline Foundation</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Reference</span>
                      <span className="font-mono text-xs text-navy tracking-wide">{donationRecord.reference}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-1">
                      <span className="text-slate-400">Amount</span>
                      <span className="font-display font-extrabold text-navy text-lg">₦{Number(amount).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-slate-400 bg-amber-50/50 border border-amber-100 p-3.5 rounded-xl leading-relaxed">
                    <ShieldAlert className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>This checkout is running in <strong>MOCK DEMO MODE</strong>. No actual cards or currencies will be charged. Click below to verify state flows.</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleSimulateSuccess}
                      className="w-full font-sans font-bold bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-xl shadow-md transition-colors cursor-pointer"
                    >
                      Simulate Successful Payment
                    </button>
                    <button
                      onClick={handleSimulateFailure}
                      className="w-full font-sans font-semibold border border-rose-200 hover:bg-rose-50 text-rose-500 py-3.5 rounded-xl transition-colors cursor-pointer"
                    >
                      Simulate Payment Failure
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
