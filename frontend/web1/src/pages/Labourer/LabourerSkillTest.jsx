import React from 'react';
import { 
  ClipboardCheck, 
  Lock, 
  Info, 
  ShieldCheck, 
  BarChart3, 
  Zap,
  Bell
} from 'lucide-react';

export default function LabourerSkillTest() {
  return (
    <div className="flex-1 p-8 space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-[#391053]">Skill Test</h1>
        <div className="flex items-center gap-4">
          <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-sm border border-[#c9a8f1]/30 hover:bg-white transition-colors relative">
            <Bell className="text-[#391053]" size={20} />
          </button>
          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold text-[#391053]">Skill Assessment</p>
            <p className="text-[10px] text-[#391053] font-medium uppercase">Active Module</p>
          </div>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center min-h-[600px] py-12">
        <div className="w-full max-w-2xl bg-white p-16 rounded-3xl shadow-xl border border-[#c9a8f1]/20 text-center transform transition-transform hover:scale-[1.02]">
          <div className="w-24 h-24 bg-[#efeded] rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
            <ClipboardCheck size={48} className="text-[#391053] opacity-20" />
          </div>
          <h2 className="text-4xl font-bold text-[#391053] mb-6 tracking-tight">Skill Test Coming Soon</h2>
          <p className="text-lg text-[#391053] max-w-lg mx-auto mb-12 leading-relaxed">
            We are currently calibrating our assessment modules to provide the most accurate evaluation of your professional expertise. You will be notified as soon as tests for your trade category become available.
          </p>
          
          <div className="space-y-6">
            <button className="w-full py-5 px-10 bg-[#c9a8f1] text-[#391053] font-bold text-lg rounded-2xl cursor-not-allowed opacity-60 flex items-center justify-center gap-3 transition-all" disabled>
              <Lock size={20} />
              Begin Assessment
            </button>
            <div className="flex items-center justify-center gap-2 text-[#391053]">
              <Info size={16} />
              <p className="text-xs font-bold uppercase tracking-widest">Status: Scheduled for Q3 2026</p>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-[#c9a8f1]/30 flex items-start gap-5 hover:bg-white transition-colors">
            <div className="p-3 bg-[#c9a8f1] rounded-xl text-[#391053]">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="font-bold text-[#391053] mb-1">Certified Profiles</p>
              <p className="text-xs text-[#391053] leading-relaxed">Testing increases profile visibility by up to 40%.</p>
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-[#c9a8f1]/30 flex items-start gap-5 hover:bg-white transition-colors">
            <div className="p-3 bg-[#eedcff] rounded-xl text-[#391053]">
              <BarChart3 size={24} />
            </div>
            <div>
              <p className="font-bold text-[#391053] mb-1">Detailed Metrics</p>
              <p className="text-xs text-[#391053] leading-relaxed">Get a granular breakdown of your industry skillsets.</p>
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-[#c9a8f1]/30 flex items-start gap-5 hover:bg-white transition-colors">
            <div className="p-3 bg-[#fcdfa9] rounded-xl text-[#391053]">
              <Zap size={24} />
            </div>
            <div>
              <p className="font-bold text-[#391053] mb-1">Priority Access</p>
              <p className="text-xs text-[#391053] leading-relaxed">Top scorers get first access to premium job requests.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


