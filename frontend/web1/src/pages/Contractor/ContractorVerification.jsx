import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UploadCloud, Fingerprint, Lock, ShieldCheck, CheckCircle2, ChevronRight, Info, AlertCircle } from 'lucide-react';

const ContractorVerification = () => {
  const [step, setStep] = useState(1); // 1: Upload, 2: Processing, 3: Success
  const [shareCode, setShareCode] = useState('');

  const handleBeginVerification = () => {
    if (shareCode.length === 4) {
      setStep(2);
      setTimeout(() => setStep(3), 3000);
    }
  };

  return (
    <div className="flex-1 min-h-screen pb-10">
      <header className="flex justify-between items-center px-10 py-6 mb-8">
        <h2 className="text-3xl font-bold text-on-surface">Identity Verification</h2>
      </header>

      <main className="max-w-5xl mx-auto px-10">
        {/* Stepper */}
        <div className="flex items-center justify-between px-16 mb-16 relative">
          <div className="absolute top-5 left-16 right-16 h-0.5 bg-white -z-10" />
          <StepIndicator current={step} step={1} label="Upload" />
          <StepIndicator current={step} step={2} label="Process" />
          <StepIndicator current={step} step={3} label="Success" />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              <div className="lg:col-span-8 flex flex-col gap-8">
                <div className="bg-white p-10 rounded-2xl card-shadow border border-gray-50">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-brand-background rounded-2xl text-on-surface">
                      <Fingerprint size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-on-surface tracking-tight">Aadhaar XML Verification</h3>
                      <p className="text-sm text-on-surface">Securely verify your identity via UIDAI Paperless Offline e-KYC.</p>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-gray-100 rounded-3xl p-16 flex flex-col items-center justify-center text-center hover:border-brand-primary transition-all cursor-pointer group bg-white/50">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-6">
                      <UploadCloud className="text-on-surface" size={32} />
                    </div>
                    <p className="text-lg font-bold text-on-surface mb-1">Click to upload your .xml file</p>
                    <p className="text-xs font-bold text-on-surface uppercase tracking-widest">Max file size: 5MB (Zip/XML supported)</p>
                  </div>

                  <div className="mt-10 space-y-6">
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em] ml-2">Share Code (4-digit)</label>
                      <input 
                        type="password" 
                        maxLength={4}
                        value={shareCode}
                        onChange={(e) => setShareCode(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-white border-none rounded-2xl p-5 text-xl font-black tracking-[1em] focus:ring-2 focus:ring-brand-primary/20 text-center"
                        placeholder="••••"
                      />
                    </div>
                    <button 
                      onClick={handleBeginVerification}
                      disabled={shareCode.length < 4}
                      className={`w-full py-5 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all uppercase tracking-widest text-sm ${
                        shareCode.length === 4 ? 'bg-brand-primary text-white' : 'bg-white text-on-surface cursor-not-allowed'
                      }`}
                    >
                      Begin Verification Process <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-8">
                <div className="bg-white p-8 rounded-2xl card-shadow border border-gray-50">
                  <h4 className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em] mb-6">Instructions</h4>
                  <ul className="space-y-6">
                    <InstructionItem icon={<Info size={16} />} text={<>Visit <a href="#" className="text-on-surface font-black underline underline-offset-4">UIDAI Portal</a> to download your Offline XML file.</>} />
                    <InstructionItem icon={<Lock size={16} />} text="Set a 4-digit share code during download for encryption." />
                    <InstructionItem icon={<ShieldCheck size={16} />} text="We do not store your Aadhaar number, only the verified metadata." />
                  </ul>
                </div>

                <div className="bg-brand-primary p-8 rounded-2xl card-shadow text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="text-lg font-bold mb-3">Need Help?</h4>
                    <p className="text-xs text-white/70 leading-relaxed font-medium mb-6">Contact our verification support team if you encounter issues with the XML file structure or share code encryption.</p>
                    <button className="w-full py-3 bg-white text-on-surface font-black rounded-xl text-[10px] uppercase tracking-[0.2em] shadow-lg">Chat Support</button>
                  </div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-20 rounded-2xl card-shadow flex flex-col items-center justify-center text-center space-y-8"
            >
              <div className="relative">
                <div className="w-24 h-24 border-4 border-brand-primary/10 border-t-brand-primary rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <ShieldCheck className="text-on-surface opacity-50" size={32} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-on-surface tracking-tight">Verification Processing</h3>
                <p className="text-on-surface mt-2 max-w-sm font-medium">Please do not close this window. We are validating your document against official records with our security partners.</p>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-20 rounded-2xl card-shadow flex flex-col items-center justify-center text-center space-y-8"
            >
              <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center shadow-inner">
                <CheckCircle2 size={48} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-on-surface tracking-tight">Verification Successful</h3>
                <p className="text-on-surface mt-2 max-w-sm font-medium mx-auto">Your identity has been verified. A gold badge has been added to your profile across the platform.</p>
              </div>
              <button onClick={() => setStep(1)} className="px-10 py-4 bg-brand-primary text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all">
                Return to Dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Stats Bento */}
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            <div className="bg-white p-8 rounded-2xl card-shadow border border-gray-50">
               <p className="text-[10px] font-black text-on-surface uppercase tracking-widest mb-4">Partner Security</p>
               <div className="flex gap-4 opacity-30 grayscale">
                 <ShieldCheck size={24} />
                 <Fingerprint size={24} />
                 <AlertCircle size={24} />
               </div>
            </div>
            <div className="bg-white p-8 rounded-2xl card-shadow border border-gray-50 flex flex-col items-center text-center">
               <p className="text-3xl font-bold text-on-surface">99.9%</p>
               <p className="text-[10px] font-black text-on-surface uppercase tracking-widest mt-1">Uptime SLA</p>
            </div>
            <div className="bg-white p-8 rounded-2xl card-shadow border border-gray-50 flex flex-col items-center text-center">
               <p className="text-3xl font-bold text-on-surface">&lt; 2min</p>
               <p className="text-[10px] font-black text-on-surface uppercase tracking-widest mt-1">Avg. Processing</p>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

const StepIndicator = ({ current, step, label }) => {
  const isCompleted = current > step;
  const isActive = current === step;

  return (
    <div className="flex flex-col items-center gap-3 relative z-10 group">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-500 ${
        isCompleted ? 'bg-brand-primary text-white' : 
        isActive ? 'bg-brand-primary text-white shadow-xl scale-110' : 
        'bg-white text-on-surface border-2 border-gray-50'
      }`}>
        {isCompleted ? <CheckCircle2 size={24} /> : step}
      </div>
      <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
        isActive ? 'text-on-surface' : 'text-on-surface'
      }`}>{label}</span>
    </div>
  );
};

const InstructionItem = ({ icon, text }) => (
  <li className="flex gap-4 items-start group">
    <div className="p-2 bg-brand-background rounded-lg text-on-surface group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <p className="text-xs font-bold text-on-surface leading-relaxed">{text}</p>
  </li>
);

export default ContractorVerification;


