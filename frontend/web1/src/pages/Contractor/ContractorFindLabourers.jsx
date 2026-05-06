import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Star, Filter, UserSearch, UserPlus, Info } from 'lucide-react';

const ContractorFindLabourers = () => {
  const [selectedLabourers, setSelectedLabourers] = useState([]);

  const labourers = [
    { id: 1, name: 'David Chen', role: 'Master Electrician', rating: 4.9, location: 'Seattle, WA', image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=150&h=150&auto=format&fit=crop' },
    { id: 2, name: 'Sarah Miller', role: 'Senior Plumber', rating: 4.7, location: 'Portland, OR', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&h=150&auto=format&fit=crop' },
    { id: 3, name: 'Robert J. Wilson', role: 'Landscape Architect', rating: 5.0, location: 'Bellevue, WA', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop' },
    { id: 4, name: 'Elena Rodriguez', role: 'HVAC Specialist', rating: 4.8, location: 'Tacoma, WA', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&h=150&auto=format&fit=crop' },
  ];

  const toggleLabourer = (id) => {
    setSelectedLabourers(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex-1 min-h-screen pb-10">
      {/* Top Bar */}
      <header className="flex justify-between items-center px-10 py-6 mb-8 bg-transparent">
        <h2 className="text-3xl font-bold text-on-surface">Find Labourers</h2>
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface" size={18} />
            <input
              type="text"
              placeholder="Search talent..."
              className="pl-10 pr-4 py-2 bg-white rounded-xl border-none focus:ring-2 focus:ring-brand-primary/20 w-64 shadow-sm"
            />
          </div>
        </div>
      </header>

      <main className="px-10">
        <div className="flex justify-between items-center mb-10">
          <p className="text-sm text-on-surface-variant font-medium tracking-tight">
            Showing 24 available labourers in your region
          </p>
          <button 
            disabled={selectedLabourers.length === 0}
            className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
              selectedLabourers.length > 0 ? 'bg-brand-primary text-on-surface active:scale-95' : 'bg-gray-200 text-on-surface cursor-not-allowed'
            }`}
          >
            <UserPlus size={20} />
            Hire Selected ({selectedLabourers.length})
          </button>
        </div>

        <div className="flex gap-8">
          {/* Main List Section */}
          <div className="flex-grow space-y-8">
            {/* Interactive Map Placeholder */}
            <div className="w-full h-80 bg-white rounded-2xl relative overflow-hidden card-shadow group border-4 border-white">
              <div className="w-full h-full bg-[#e4e4e7] opacity-40 border-b border-outline-variant" />
              <div className="absolute inset-0 bg-brand-primary/10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-10 text-center">
                <MapPin className="text-on-surface mb-4 animate-bounce" size={48} />
                <h4 className="text-xl font-bold text-on-surface mb-2">Live Labourer Map</h4>
                <p className="text-sm text-on-surface-variant max-w-xs">Track real-time location and availability of workers across the region.</p>
              </div>
              <button className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-brand-primary text-on-surface rounded-full text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                Enter Map View
              </button>
            </div>

            {/* Labourer Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {labourers.map((worker) => (
                <motion.div
                  key={worker.id}
                  whileHover={{ y: -4 }}
                  className="bg-white p-6 rounded-2xl card-shadow border border-gray-50 flex flex-col gap-6 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-2xl bg-black text-white flex items-center justify-center text-2xl font-bold shadow-sm shrink-0 border border-outline-variant">
                        {worker.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-on-surface">{worker.name}</h3>
                        <p className="text-sm text-on-surface mb-2">{worker.role}</p>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-wider">
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star size={14} fill="currentColor" /> {worker.rating}
                          </div>
                          <div className="flex items-center gap-1 text-on-surface">
                            <MapPin size={14} /> {worker.location}
                          </div>
                        </div>
                      </div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={selectedLabourers.includes(worker.id)}
                      onChange={() => toggleLabourer(worker.id)}
                      className="w-6 h-6 rounded-lg border-gray-200 text-on-surface focus:ring-brand-primary cursor-pointer"
                    />
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-50">
                    <button className="flex-1 px-4 py-2.5 bg-white text-on-surface rounded-xl text-sm font-bold hover:bg-white transition-colors">
                      View Profile
                    </button>
                    <button className="flex-1 px-4 py-2.5 bg-brand-primary text-on-surface rounded-xl text-sm font-bold shadow-sm hover:opacity-90 transition-opacity">
                      Hire
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Filter Panel */}
          <aside className="w-80 shrink-0">
            <div className="bg-white p-8 rounded-2xl card-shadow sticky top-10 border border-gray-50">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                  <Filter size={18} /> Filters
                </h3>
                <button className="text-[10px] font-black text-on-surface uppercase tracking-widest hover:underline">Reset</button>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black text-on-surface uppercase tracking-widest mb-4">Category</label>
                  <select className="w-full bg-white border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-brand-primary/20">
                    <option>All Categories</option>
                    <option>Electrical</option>
                    <option>Plumbing</option>
                    <option>Construction</option>
                    <option>Landscaping</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-on-surface uppercase tracking-widest mb-4">Skill Level</label>
                  <div className="space-y-3">
                    {['Master / Expert', 'Journeyman', 'Apprentice'].map((level) => (
                      <label key={level} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-5 h-5 rounded border-gray-200 text-on-surface focus:ring-brand-primary" />
                        <span className="text-sm font-medium text-on-surface group-hover:text-on-surface transition-colors">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-on-surface uppercase tracking-widest mb-4">Availability</label>
                  <input type="date" className="w-full bg-white border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-brand-primary/20" />
                </div>

                <div className="bg-brand-background p-4 rounded-xl flex items-start gap-3">
                  <Info className="text-on-surface shrink-0" size={16} />
                  <p className="text-[11px] font-medium text-on-surface leading-relaxed opacity-80">
                    Applying filters helps you find the most qualified candidates for specialized projects.
                  </p>
                </div>

                <button className="w-full bg-brand-primary text-on-surface py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-all text-sm uppercase tracking-widest">
                  Apply Filters
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ContractorFindLabourers;


