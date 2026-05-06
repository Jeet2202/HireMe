import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Upload, 
  Camera, 
  ArrowRight, 
  CheckCircle2, 
  Info, 
  Timer, 
  HelpCircle, 
  Award,
  Bell,
  Search,
  LayoutGrid
} from 'lucide-react';

export default function LabourerVerification() {
  const [currentStep, setCurrentStep] = useState(1);

  const renderStepNav = () => (
    <div className="bg-white p-6 rounded-2xl card-shadow border border-outline-variant space-y-8">
      <div className="space-y-6">
        <div className={`flex items-start gap-4 transition-opacity ${currentStep >= 1 ? 'opacity-100' : 'opacity-40'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep === 1 ? 'bg-primary text-on-primary' : 'bg-green-500 text-on-surface'}`}>
            {currentStep > 1 ? <CheckCircle2 size={16} /> : '1'}
          </div>
          <div>
            <p className="font-bold text-on-surface">KYC Upload</p>
            <p className="text-[10px] text-on-surface font-medium uppercase tracking-wider">Identity Documents</p>
          </div>
        </div>

        <div className={`flex items-start gap-4 transition-opacity ${currentStep >= 2 ? 'opacity-100' : 'opacity-40'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep === 2 ? 'bg-primary text-on-primary' : currentStep > 2 ? 'bg-green-500 text-on-surface' : 'bg-white text-on-surface'}`}>
            {currentStep > 2 ? <CheckCircle2 size={16} /> : '2'}
          </div>
          <div>
            <p className={`font-bold ${currentStep >= 2 ? 'text-on-surface' : 'text-on-surface'}`}>Screening Form</p>
            <p className="text-[10px] text-on-surface font-medium uppercase tracking-wider">Background Details</p>
          </div>
        </div>

        <div className={`flex items-start gap-4 transition-opacity ${currentStep >= 3 ? 'opacity-100' : 'opacity-40'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep === 3 ? 'bg-primary text-on-primary' : 'bg-white text-on-surface'}`}>
            3
          </div>
          <div>
            <p className={`font-bold ${currentStep >= 3 ? 'text-on-surface' : 'text-on-surface'}`}>Completion</p>
            <p className="text-[10px] text-on-surface font-medium uppercase tracking-wider">Access Dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 p-8 space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-on-surface tracking-tight">Identity Verification</h1>
          <p className="text-on-surface mt-2">Complete these steps to unlock premium job opportunities.</p>
        </div>
        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white card-shadow border border-outline-variant hover:bg-white transition-colors">
          <Bell className="text-on-surface" size={20} />
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Step Progress & Privacy Info */}
        <div className="lg:col-span-3 space-y-6">
          {renderStepNav()}
          
          <div className="bg-primary p-8 rounded-2xl shadow-lg text-white">
            <ShieldCheck size={32} className="mb-4 opacity-50" />
            <h4 className="text-lg font-bold mb-2">Data Privacy</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Your documents are encrypted and only accessible by authorized verification officers.
            </p>
          </div>
        </div>

        {/* Right: Step Content */}
        <div className="lg:col-span-9">
          {currentStep === 1 && (
            <div className="bg-white p-10 rounded-2xl card-shadow border border-outline-variant min-h-[600px] flex flex-col animate-in slide-in-from-right-4 duration-500">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-on-surface mb-2">Step 1: KYC Document Upload</h2>
                <p className="text-on-surface">Please provide high-resolution images of your Government Issued ID.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
                <div className="border-2 border-dashed border-outline-variant rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:border-black transition-all cursor-pointer group bg-surface-container-lowest">
                  <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mb-6 text-on-surface group-hover:bg-primary group-hover:text-white transition-colors shadow-inner border border-outline-variant/30">
                    <Camera size={32} />
                  </div>
                  <h5 className="text-lg font-bold text-on-surface">Front Side of ID</h5>
                  <p className="text-xs text-on-surface mt-2 font-medium">JPEG, PNG or PDF (Max 5MB)</p>
                </div>

                <div className="border-2 border-dashed border-outline-variant rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:border-black transition-all cursor-pointer group bg-surface-container-lowest">
                  <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mb-6 text-on-surface group-hover:bg-primary group-hover:text-white transition-colors shadow-inner border border-outline-variant/30">
                    <Camera size={32} />
                  </div>
                  <h5 className="text-lg font-bold text-on-surface">Back Side of ID</h5>
                  <p className="text-xs text-on-surface mt-2 font-medium">JPEG, PNG or PDF (Max 5MB)</p>
                </div>
              </div>

              <div className="mt-12 flex justify-between items-center pt-8 border-t border-outline-variant">
                <button className="px-10 py-4 rounded-xl border border-outline-variant font-bold text-on-surface hover:bg-white transition-all">
                  Cancel
                </button>
                <button 
                  onClick={() => setCurrentStep(2)}
                  className="px-10 py-4 bg-primary text-on-primary rounded-xl font-bold flex items-center gap-3 hover:opacity-90 transition-all shadow-md active:scale-95"
                >
                  Continue to Step 2
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-white p-10 rounded-2xl card-shadow border border-outline-variant min-h-[600px] flex flex-col animate-in slide-in-from-right-4 duration-500">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-on-surface mb-2">Step 2: Screening Form</h2>
                <p className="text-on-surface">Please answer a few questions about your professional background.</p>
              </div>

              <div className="space-y-8 flex-1">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-on-surface uppercase tracking-widest">Primary Skillset</label>
                  <input 
                    type="text" 
                    placeholder="Carpentry, Plumbing, Electrical..."
                    className="w-full p-5 border border-outline-variant rounded-2xl bg-white focus:ring-2 focus:ring-[#000000] focus:border-transparent transition-all outline-none font-medium"
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-on-surface uppercase tracking-widest">Years of Experience</label>
                  <select className="w-full p-5 border border-outline-variant rounded-2xl bg-white focus:ring-2 focus:ring-[#000000] focus:border-transparent transition-all outline-none font-medium">
                    <option>Select experience</option>
                    <option>0-1 Years</option>
                    <option>2-5 Years</option>
                    <option>5-10 Years</option>
                    <option>10+ Years</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-on-surface uppercase tracking-widest">About You</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us about your work history..."
                    className="w-full p-5 border border-outline-variant rounded-2xl bg-white focus:ring-2 focus:ring-[#000000] focus:border-transparent transition-all outline-none font-medium"
                  />
                </div>
              </div>

              <div className="mt-12 flex justify-between items-center pt-8 border-t border-outline-variant">
                <button 
                  onClick={() => setCurrentStep(1)}
                  className="px-10 py-4 rounded-xl border border-outline-variant font-bold text-on-surface hover:bg-white transition-all"
                >
                  Back
                </button>
                <button 
                  onClick={() => setCurrentStep(3)}
                  className="px-10 py-4 bg-primary text-on-primary rounded-xl font-bold flex items-center gap-3 hover:opacity-90 transition-all shadow-md active:scale-95"
                >
                  Complete Verification
                  <CheckCircle2 size={20} />
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="bg-white p-16 rounded-2xl card-shadow border border-outline-variant min-h-[600px] flex flex-col items-center text-center justify-center animate-in zoom-in-95 duration-500">
              <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mb-10 shadow-inner">
                <ShieldCheck className="text-white fill-surface-container-high" size={64} />
              </div>
              <h2 className="text-4xl font-bold text-on-surface mb-4">Verification Completed</h2>
              <p className="text-lg text-on-surface max-w-lg mb-12">
                Your identity has been successfully verified. You can now start accepting high-value job requests in your area.
              </p>
              <button 
                onClick={() => window.location.href = '/'}
                className="w-full max-w-sm bg-primary text-on-primary py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-4 hover:opacity-90 transition-all shadow-xl active:scale-95"
              >
                <LayoutGrid size={24} />
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <section className="pt-20 pb-12">
        <h3 className="text-3xl font-bold text-on-surface mb-10">Verification FAQ</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl card-shadow border border-outline-variant hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 text-on-surface">
              <Timer size={24} />
            </div>
            <h5 className="text-lg font-bold text-on-surface mb-3">Turnaround Time</h5>
            <p className="text-sm text-on-surface leading-relaxed">
              Standard verification takes 24-48 business hours after document submission.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl card-shadow border border-outline-variant hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 text-on-surface">
              <HelpCircle size={24} />
            </div>
            <h5 className="text-lg font-bold text-on-surface mb-3">Rejected Documents</h5>
            <p className="text-sm text-on-surface leading-relaxed">
              If your ID is blurry or expired, we will request a re-upload via email notification.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl card-shadow border border-outline-variant hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 text-on-surface">
              <Award size={24} />
            </div>
            <h5 className="text-lg font-bold text-on-surface mb-3">Premium Perks</h5>
            <p className="text-sm text-on-surface leading-relaxed">
              Verified labourers receive a 25% higher visibility score in client search results.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}


