import React, { useState } from 'react';
import { 
  MapPin, 
  Star, 
  CheckCircle2, 
  Mail, 
  Briefcase, 
  Hammer, 
  Target, 
  History, 
  ChevronDown, 
  ChevronUp, 
  Image as ImageIcon,
  ArrowRight,
  ShieldCheck,
  Trophy
} from 'lucide-react';

function ExperienceItem({ title, company, period, isOpen, onToggle, description, outcomes }) {
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-[#c9a8f1] bg-[#c9a8f1]/5' : 'border-[#c9a8f1] bg-white'}`}>
      <button 
        onClick={onToggle}
        className={`w-full p-6 flex justify-between items-center transition-colors ${isOpen ? 'bg-[#c9a8f1] text-[#391053]' : 'hover:bg-white'}`}
      >
        <div className="flex gap-4 items-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isOpen ? 'bg-white/20' : 'bg-[#efeded]'}`}>
            <Briefcase size={20} className={isOpen ? 'text-[#391053]' : 'text-[#7d747f]'} />
          </div>
          <div className="text-left">
            <h5 className="font-bold text-lg">{title}</h5>
            <p className={`text-sm ${isOpen ? 'text-[#391053]/70' : 'text-[#391053]'}`}>{company} • {period}</p>
          </div>
        </div>
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>
      
      {isOpen && (
        <div className="p-8 space-y-6 animate-in slide-in-from-top-4 duration-300">
          <p className="text-base text-[#1b1c1c] leading-relaxed">{description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {outcomes.map((outcome, idx) => (
              <div key={idx} className="p-4 bg-white rounded-xl border border-[#c9a8f1] shadow-sm">
                <p className="text-[10px] text-[#7d747f] font-bold uppercase tracking-widest mb-1">Key Outcome</p>
                <p className="font-bold text-[#391053]">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function LabourerProfile() {
  const [openIndex, setOpenIndex] = useState(0);

  const skills = ['Bricklaying', 'Concrete Pouring', 'Scaffolding', 'Demolition', 'Blueprint Reading'];
  const tools = ['Jackhammer', 'Angle Grinder', 'Laser Level'];

  return (
    <div className="flex-1 p-8 space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-[#391053]">Labourer Profile</h1>
        <div className="flex items-center gap-4">
          <button className="bg-[#c9a8f1] text-[#391053] px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-md">Edit Profile</button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl p-10 shadow-sm border border-[#c9a8f1]/30 flex flex-col md:flex-row gap-10">
          <div className="relative shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=300&h=300&auto=format&fit=crop" 
              alt="Robert Miller" 
              className="w-56 h-56 rounded-2xl object-cover shadow-xl grayscale"
            />
            <div className="absolute -bottom-4 -right-4 bg-[#c9a8f1] text-[#391053] p-3 rounded-full flex items-center gap-2 shadow-2xl border-4 border-white">
              <Star size={18} className="fill-[#fcdfa9] text-[#fcdfa9]" />
              <span className="font-bold text-sm">4.9</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-5xl font-bold text-[#391053] tracking-tight">Robert Miller</h2>
              <p className="text-[#391053] text-xl font-medium mt-1">Expert Mason &amp; Civil Labourer</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#391053]">
                <MapPin size={20} className="text-[#391053]" />
                <span className="text-base">Manchester, United Kingdom</span>
              </div>
              <p className="text-base text-[#1b1c1c] leading-relaxed max-w-xl">
                Dedicated and highly skilled labourer with over 12 years of experience in masonry, structural reinforcement, and heavy equipment operation. Proven track record of safety compliance and high-efficiency project completion in complex urban development environments.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <span className="bg-[#c9a8f1] text-[#2e0349] px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-[#e4b5ff]">Verified Labourer</span>
              <span className="bg-[#fcdfa9] text-[#261a00] px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-[#dec38f]">Top Rated</span>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl p-10 shadow-sm border border-[#c9a8f1]/30 h-full flex flex-col">
          <h3 className="text-2xl font-bold text-[#391053] mb-8">Performance</h3>
          <div className="space-y-8 flex-1">
            <div className="flex justify-between items-end border-b border-[#efeded] pb-6">
              <div>
                <p className="text-[10px] text-[#7d747f] font-bold uppercase tracking-widest mb-1">Jobs Completed</p>
                <p className="text-5xl font-bold text-[#391053]">142</p>
              </div>
              <Trophy size={40} className="text-[#391053] opacity-10" />
            </div>
            <div className="flex justify-between items-end border-b border-[#efeded] pb-6">
              <div>
                <p className="text-[10px] text-[#7d747f] font-bold uppercase tracking-widest mb-1">Years Experience</p>
                <p className="text-5xl font-bold text-[#391053]">12+</p>
              </div>
              <ShieldCheck size={40} className="text-[#391053] opacity-10" />
            </div>
          </div>
          <button className="w-full bg-[#c9a8f1] text-[#391053] py-4 rounded-xl font-bold mt-10 hover:opacity-90 transition-all flex items-center justify-center gap-3">
            <Mail size={20} />
            Direct Message
          </button>
        </div>
      </div>

      {/* Details & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-[#c9a8f1]/30">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-white rounded-xl text-[#391053]">
              <Target size={24} />
            </div>
            <h4 className="text-xl font-bold text-[#391053]">Personal Details</h4>
          </div>
          <div className="grid grid-cols-2 gap-y-8">
            <div>
              <p className="text-[10px] text-[#7d747f] font-bold uppercase tracking-widest mb-1">Age</p>
              <p className="font-bold text-[#1b1c1c]">42 Years</p>
            </div>
            <div>
              <p className="text-[10px] text-[#7d747f] font-bold uppercase tracking-widest mb-1">Gender</p>
              <p className="font-bold text-[#1b1c1c]">Male</p>
            </div>
            <div>
              <p className="text-[10px] text-[#7d747f] font-bold uppercase tracking-widest mb-1">Languages</p>
              <p className="font-bold text-[#1b1c1c]">English, Polish</p>
            </div>
            <div>
              <p className="text-[10px] text-[#7d747f] font-bold uppercase tracking-widest mb-1">Primary Role</p>
              <p className="font-bold text-[#1b1c1c]">Senior Mason</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] text-[#7d747f] font-bold uppercase tracking-widest mb-1">Availability</p>
              <p className="font-bold text-[#1b1c1c]">Full-time (Mon - Sat)</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-10 shadow-sm border border-[#c9a8f1]/30">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-white rounded-xl text-[#391053]">
              <Hammer size={24} />
            </div>
            <h4 className="text-xl font-bold text-[#391053]">Skills &amp; Mastery</h4>
          </div>
          <div className="space-y-8">
            <div>
              <p className="text-[10px] text-[#7d747f] font-bold uppercase tracking-widest mb-4">Core Skills</p>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill} className="px-5 py-2.5 bg-white border border-[#c9a8f1] rounded-xl text-sm font-bold text-[#391053] shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] text-[#7d747f] font-bold uppercase tracking-widest mb-4">Tools Mastery</p>
              <div className="flex flex-wrap gap-3">
                {tools.map(tool => (
                  <span key={tool} className="px-5 py-2.5 bg-white rounded-xl text-sm font-bold text-[#391053] flex items-center gap-2 border border-[#c9a8f1]/30">
                    <Target size={14} className="text-[#391053]" />
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="bg-white rounded-2xl p-10 shadow-sm border border-[#c9a8f1]/30">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-white rounded-xl text-[#391053]">
            <History size={24} />
          </div>
          <h4 className="text-xl font-bold text-[#391053]">Work Experience</h4>
        </div>
        <div className="space-y-4">
          <ExperienceItem 
            title="Senior Site Mason"
            company="Skyline Developments"
            period="2019 - Present"
            isOpen={openIndex === 0}
            onToggle={() => setOpenIndex(openIndex === 0 ? null : 0)}
            description="Leading a team of 8 labourers on luxury residential high-rise projects. Responsible for precise stone cladding, foundation stability monitoring, and ensuring adherence to zero-accident safety protocols."
            outcomes={['Zero downtime over 3 years', 'Natural Stone Façades', 'OSHA 30 Certified']}
          />
          <ExperienceItem 
            title="Civil Labourer"
            company="City Infrastructure Group"
            period="2015 - 2019"
            isOpen={openIndex === 1}
            onToggle={() => setOpenIndex(openIndex === 1 ? null : 1)}
            description="Ensured precision in foundation work and trenching for municipal utility projects. Specialized in heavy material logistics and subterranean structural reinforcement."
            outcomes={['100% Safety Rating', 'Rapid Deployment Team', 'Drainage Expert']}
          />
          <ExperienceItem 
            title="Apprentice Mason"
            company="Traditional Stone Works"
            period="2011 - 2015"
            isOpen={openIndex === 2}
            onToggle={() => setOpenIndex(openIndex === 2 ? null : 2)}
            description="Underwent rigorous training in heritage stonework and modern masonry techniques. Assisted on over 50 restoration projects across Western Europe."
            outcomes={['First Class Certification', 'Stonework Excellence', 'Client Recognition']}
          />
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="bg-white rounded-2xl p-10 shadow-sm border border-[#c9a8f1]/30">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl text-[#391053]">
              <ImageIcon size={24} />
            </div>
            <h4 className="text-xl font-bold text-[#391053]">Project Portfolio &amp; Certifications</h4>
          </div>
          <button className="text-[#391053] font-bold text-sm flex items-center gap-2 hover:underline">
            View All Documents <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(idx => (
            <div key={idx} className="aspect-video rounded-2xl overflow-hidden bg-[#efeded] group relative cursor-pointer">
              <img 
                src={`https://images.unsplash.com/photo-${1500000000000 + idx * 100000}?q=80&w=400&h=300&auto=format&fit=crop`} 
                alt={`Project ${idx}`} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#c9a8f1]/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                <span className="text-[#391053] font-bold text-[10px] uppercase tracking-widest px-4 py-2 border border-white/30 rounded-full backdrop-blur-sm">View Project</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


