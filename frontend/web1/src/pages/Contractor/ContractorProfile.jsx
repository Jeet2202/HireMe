import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, Download, Star, Briefcase, Clock, Building2, LayoutGrid } from 'lucide-react';

const ContractorProfile = () => {
  const profileDetails = {
    name: 'Alex Rivera',
    title: 'Principal Logistics & Site Coordinator',
    location: 'San Francisco, CA',
    email: 'rivera.contracting@hireme.com',
    phone: '+1 (555) 902-3481',
    company: 'Rivera Infrastructure Group LLC',
    gst: 'GST-9920-X8842-P1',
    license: 'LIC-CA-938102-Z',
    registeredDate: 'OCT 12, 2018'
  };

  const metrics = [
    { label: 'Success Rate', value: '98%', icon: <ShieldCheck className="text-[#391053]" /> },
    { label: 'Active Jobs', value: '42', icon: <Briefcase className="text-[#391053]" /> },
    { label: 'Client Rating', value: '4.9', icon: <Star className="text-[#391053]" /> },
    { label: 'Hours Logged', value: '12k', icon: <Clock className="text-[#391053]" /> },
  ];

  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop', title: 'Harbor Bridge Logistics Center', size: 'large' },
    { src: 'https://images.unsplash.com/photo-1503387762-592dea58ef01?q=80&w=400&auto=format&fit=crop', title: 'Skyline Tower Phase 1', size: 'small' },
    { src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop', title: 'Corporate Plaza Interior', size: 'small' },
    { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=400&auto=format&fit=crop', title: 'Westside Pipeline Renewal', size: 'small' },
    { src: 'https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=400&auto=format&fit=crop', title: 'Concrete Foundation Project X', size: 'small' },
  ];

  return (
    <div className="flex-1 min-h-screen pb-10">
      <header className="flex justify-between items-center px-10 py-6 mb-8">
        <h2 className="text-3xl font-bold text-[#391053]">Contractor Profile</h2>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-brand-primary text-[#391053] font-bold rounded-xl shadow-lg active:scale-95 transition-all uppercase tracking-widest text-xs">Edit Portfolio</button>
          <button className="px-6 py-3 bg-white border border-gray-100 text-[#391053] font-bold rounded-xl hover:bg-white active:scale-95 transition-all shadow-sm flex items-center gap-2 uppercase tracking-widest text-xs">
            <Download size={14} /> Download CV
          </button>
        </div>
      </header>

      <main className="px-10 space-y-8">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-2xl card-shadow flex flex-col md:flex-row gap-10 items-start overflow-hidden relative"
        >
          <div className="relative shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&h=300&auto=format&fit=crop" 
              alt={profileDetails.name} 
              className="w-40 h-40 rounded-2xl object-cover grayscale brightness-110 shadow-xl border-4 border-white"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-2 -right-2 bg-brand-primary text-[#391053] p-2 rounded-xl shadow-lg ring-4 ring-white">
              <ShieldCheck size={20} />
            </div>
          </div>

          <div className="flex-grow space-y-6">
            <div>
              <h3 className="text-4xl font-bold text-[#391053] tracking-tight">{profileDetails.name}</h3>
              <p className="text-lg font-semibold text-[#391053] mt-1">{profileDetails.title}</p>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <ContactInfo icon={<MapPin size={16} />} text={profileDetails.location} />
              <ContactInfo icon={<Mail size={16} />} text={profileDetails.email} />
              <ContactInfo icon={<Phone size={16} />} text={profileDetails.phone} />
            </div>
          </div>

          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-background/20 rounded-bl-full -z-0" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Company Details Column */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-2xl card-shadow h-full"
            >
              <h4 className="text-[10px] font-black text-[#391053] uppercase tracking-[0.2em] mb-8 border-b border-gray-50 pb-4">Company Verification</h4>
              <div className="space-y-8">
                <VerticalDetail label="Entity Name" value={profileDetails.company} />
                <VerticalDetail label="GST / Tax Identification" value={profileDetails.gst} />
                <VerticalDetail label="Operating License ID" value={profileDetails.license} />
                <VerticalDetail label="Registration Date" value={profileDetails.registeredDate} />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl card-shadow"
            >
              <h4 className="text-[10px] font-black text-[#391053] uppercase tracking-[0.2em] mb-8 border-b border-gray-50 pb-4">Performance Metrics</h4>
              <div className="grid grid-cols-2 gap-6">
                {metrics.map((metric, i) => (
                  <div key={i} className="text-center p-6 bg-white rounded-2xl flex flex-col items-center gap-2 group hover:bg-brand-background transition-colors">
                    <div className="bg-white p-2 rounded-lg shadow-sm group-hover:scale-110 transition-transform">{metric.icon}</div>
                    <p className="text-2xl font-black text-[#391053]">{metric.value}</p>
                    <p className="text-[10px] font-black text-[#391053] uppercase tracking-tighter">{metric.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Project Gallery Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-8 bg-white p-8 rounded-2xl card-shadow"
          >
            <div className="flex justify-between items-center mb-10 border-b border-gray-50 pb-4">
              <h4 className="text-[10px] font-black text-[#391053] uppercase tracking-[0.2em]">Project Showcase</h4>
              <button className="text-[10px] font-black text-[#391053] uppercase tracking-widest flex items-center gap-2 group">
                View All <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[200px]">
              {galleryImages.map((img, i) => (
                <div 
                  key={i} 
                  className={`relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg active:scale-[0.98] transition-all ${
                    img.size === 'large' ? 'col-span-2 row-span-2' : ''
                  }`}
                >
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-[#391053] text-xs font-bold uppercase tracking-widest">{img.title}</p>
                  </div>
                  {img.size === 'large' && (
                    <div className="absolute top-4 right-4 bg-brand-primary/80 backdrop-blur-md px-4 py-1.5 rounded-full">
                       <span className="text-[10px] font-black text-[#391053] uppercase tracking-widest">Featured Project</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

const ContactInfo = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-[#391053]/80 font-semibold text-sm">
    <span className="p-2 bg-brand-background rounded-lg">{icon}</span>
    <span>{text}</span>
  </div>
);

const VerticalDetail = ({ label, value }) => (
  <div>
    <p className="text-[10px] font-black text-[#391053] uppercase tracking-widest mb-1.5">{label}</p>
    <p className="text-sm font-bold text-[#391053] leading-tight">{value}</p>
  </div>
);

export default ContractorProfile;


