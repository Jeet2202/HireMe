import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Star, Filter, Info, Users, Plus, Minus } from 'lucide-react';

const ContractorFindHelpers = () => {
  const [helperGroups, setHelperGroups] = useState([
    { id: 1, name: 'Seattle Builders Union', leader: 'David Chen', rating: 4.9, location: 'Seattle, WA', available: 45, requested: 0, image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=150&h=150&auto=format&fit=crop' },
    { id: 2, name: 'Northwest Plumbers Group', leader: 'Sarah Miller', rating: 4.7, location: 'Portland, OR', available: 12, requested: 0, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&h=150&auto=format&fit=crop' },
    { id: 3, name: 'Bellevue Landscapers', leader: 'Robert J. Wilson', rating: 5.0, location: 'Bellevue, WA', available: 28, requested: 0, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop' },
    { id: 4, name: 'Tacoma HVAC Experts', leader: 'Elena Rodriguez', rating: 4.8, location: 'Tacoma, WA', available: 18, requested: 0, image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&h=150&auto=format&fit=crop' },
  ]);

  const updateRequested = (id, amount) => {
    setHelperGroups(prev => prev.map(group => {
      if (group.id === id) {
        let newReq = group.requested + amount;
        if (newReq < 0) newReq = 0;
        if (newReq > group.available) newReq = group.available;
        return { ...group, requested: newReq };
      }
      return group;
    }));
  };

  const handleHire = (group) => {
    if (group.requested > 0) {
      alert(`Requested ${group.requested} helpers from ${group.name}`);
    } else {
      alert('Please specify the number of helpers to hire.');
    }
  };

  return (
    <div className="flex-1 min-h-screen pb-10">
      {/* Top Bar */}
      <header className="flex justify-between items-center px-10 py-6 mb-8 bg-transparent">
        <h2 className="text-3xl font-bold text-on-surface">Find Helpers (Union)</h2>
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface" size={18} />
            <input
              type="text"
              placeholder="Search helper groups..."
              className="pl-10 pr-4 py-2 bg-white rounded-xl border-none focus:ring-2 focus:ring-brand-primary/20 w-64 shadow-sm"
            />
          </div>
        </div>
      </header>

      <main className="px-10">
        <div className="flex justify-between items-center mb-10">
          <p className="text-sm text-on-surface-variant font-medium tracking-tight">
            Showing {helperGroups.length} available helper unions in your region
          </p>
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
                <h4 className="text-xl font-bold text-on-surface mb-2">Live Union Map</h4>
                <p className="text-sm text-on-surface-variant max-w-xs">Track real-time location and availability of helper groups across the region.</p>
              </div>
              <button className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-brand-primary text-white rounded-full text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                Enter Map View
              </button>
            </div>

            {/* Helper Groups Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {helperGroups.map((group) => (
                <motion.div
                  key={group.id}
                  whileHover={{ y: -4 }}
                  className="bg-white p-6 rounded-2xl card-shadow border border-gray-50 flex flex-col gap-6 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-2xl bg-black text-white flex items-center justify-center text-2xl font-bold shadow-sm shrink-0 border border-outline-variant">
                        {group.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-on-surface">{group.name}</h3>
                        <p className="text-sm text-on-surface mb-2">Leader: {group.leader}</p>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-wider">
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star size={14} fill="currentColor" /> {group.rating}
                          </div>
                          <div className="flex items-center gap-1 text-on-surface">
                            <MapPin size={14} /> {group.location}
                          </div>
                          <div className="flex items-center gap-1 text-on-surface">
                            <Users size={14} /> Available: {group.available}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Helpers Request Section */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-50 mt-2">
                    <p className="text-sm font-bold text-on-surface">Request Helpers:</p>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateRequested(group.id, -1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg text-on-surface hover:bg-gray-200 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-bold text-lg">{group.requested}</span>
                      <button 
                        onClick={() => updateRequested(group.id, 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg text-on-surface hover:bg-gray-200 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-50">
                    <button className="flex-1 px-4 py-2.5 bg-white text-on-surface rounded-xl text-sm font-bold border border-gray-200 hover:bg-gray-50 transition-colors">
                      View Group Profile
                    </button>
                    <button 
                      onClick={() => handleHire(group)}
                      className="flex-1 px-4 py-2.5 bg-brand-primary text-white rounded-xl text-sm font-bold shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Request {group.requested > 0 ? `${group.requested} Helpers` : 'Helpers'}
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
                  <label className="block text-[10px] font-black text-on-surface uppercase tracking-widest mb-4">Group Specialization</label>
                  <select className="w-full bg-white border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-brand-primary/20">
                    <option>All Specializations</option>
                    <option>General Labour</option>
                    <option>Construction</option>
                    <option>Electrical</option>
                    <option>Plumbing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-on-surface uppercase tracking-widest mb-4">Minimum Available Helpers</label>
                  <div className="space-y-3">
                    {['1 - 10 Helpers', '11 - 50 Helpers', '50+ Helpers'].map((level) => (
                      <label key={level} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-5 h-5 rounded border-gray-200 text-on-surface focus:ring-brand-primary" />
                        <span className="text-sm font-medium text-on-surface group-hover:text-on-surface transition-colors">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-on-surface uppercase tracking-widest mb-4">Needed By</label>
                  <input type="date" className="w-full bg-white border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-brand-primary/20" />
                </div>

                <div className="bg-brand-background p-4 rounded-xl flex items-start gap-3">
                  <Info className="text-on-surface shrink-0" size={16} />
                  <p className="text-[11px] font-medium text-on-surface leading-relaxed opacity-80">
                    Filtering helps you find unions that can fulfill your exact manpower requirements on time.
                  </p>
                </div>

                <button className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-all text-sm uppercase tracking-widest">
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

export default ContractorFindHelpers;
