import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, UserPlus, Filter, Download, Star, MoreVertical, X, Mail, Phone, MapPin, ShieldCheck, AlertTriangle, Ban } from 'lucide-react';

const mockContractors = [
  { id: 1, name: 'Julian Thorne', email: 'julian.thorne@example.com', company: 'Thorne Structural Ltd.', rating: 4.9, status: 'Active', category: 'Priority' },
  { id: 2, name: 'Elena Rodriguez', email: 'elena.r@urbanpeak.io', company: 'Urban Peak Devs', rating: 4.8, status: 'Active', category: 'Priority' },
  { id: 3, name: 'Markus Vane', email: 'vane.m@construct.com', company: 'Vane Constructions', rating: 3.2, status: 'Under Review', category: 'Suspicious' },
  { id: 4, name: 'Sarah Jenkins', email: 'sarah.j@build.io', company: 'Elite Build Co.', rating: 4.5, status: 'Pending', category: 'Main' },
  { id: 5, name: 'Arthur Lexington', email: 'arthur.l@lex.com', company: 'Lexington Group', rating: 4.2, status: 'Active', category: 'Main' },
  { id: 6, name: 'Vector Solutions', email: 'contact@vector.io', company: 'Vector Solutions', rating: 2.1, status: 'Blocked', category: 'Blocked' },
];

const AdminContractorManagement = () => {
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [contractors, setContractors] = useState(mockContractors);

  const moveContractor = (id, newCategory) => {
    setContractors(prev => prev.map(c => c.id === id ? { ...c, category: newCategory } : c));
    if (selectedContractor?.id === id) {
      setSelectedContractor(prev => ({ ...prev, category: newCategory }));
    }
  };

  const categories = [
    { title: 'Priority', icon: Star, color: 'text-on-surface' },
    { title: 'Main', icon: ShieldCheck, color: 'text-on-surface' },
    { title: 'Suspicious', icon: AlertTriangle, color: 'text-orange-600' },
    { title: 'Blocked', icon: Ban, color: 'text-red-600' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8 pb-20"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-bold text-on-surface tracking-tight">Contractor Management</h2>
          <p className="text-on-surface-variant mt-2 text-lg">Oversee, verify, and organize your workforce network.</p>
        </div>
        <button className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-primary-container transition-all hover:text-white">
          <UserPlus size={20} />
          ADD NEW CONTRACTOR
        </button>
      </div>

      {categories.map((cat) => (
        <div key={cat.title} className="bg-surface p-8 rounded-xl custom-card-shadow">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-on-surface flex items-center gap-2">
              <cat.icon size={24} className={cat.color} />
              {cat.title} Contractors
            </h3>
            <span className="text-xs font-bold px-3 py-1 bg-background-page/20 border border-outline-variant rounded-full uppercase tracking-tighter">
              {contractors.filter(c => c.category === cat.title).length} Records
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-surface-container">
                  <th className="py-4 font-bold text-xs text-outline uppercase tracking-wider">Contractor</th>
                  <th className="py-4 font-bold text-xs text-outline uppercase tracking-wider">Company</th>
                  <th className="py-4 font-bold text-xs text-outline uppercase tracking-wider">Rating</th>
                  <th className="py-4 font-bold text-xs text-outline uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {contractors.filter(c => c.category === cat.title).map((c) => (
                  <tr key={c.id} className="hover:bg-background-page/5 transition-colors">
                    <td className="py-4 font-semibold text-on-surface">{c.name}</td>
                    <td className="py-4 text-on-surface-variant text-sm">{c.company}</td>
                    <td className="py-4">
                      <div className="flex items-center text-on-surface font-bold text-sm">
                        <Star size={14} className="fill-primary" />
                        <span className="ml-1">{c.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <button 
                        onClick={() => setSelectedContractor(c)}
                        className="text-on-surface font-bold text-sm hover:underline"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {contractors.filter(c => c.category === cat.title).length === 0 && (
              <p className="py-8 text-center text-on-surface-variant italic text-sm">No contractors in this category.</p>
            )}
          </div>
        </div>
      ))}

      <AnimatePresence>
        {selectedContractor && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedContractor(null)}
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-surface w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative z-10"
            >
              <div className="bg-primary p-8 text-white">
                <button 
                  onClick={() => setSelectedContractor(null)}
                  className="absolute top-6 right-6 text-on-surface-variant hover:text-on-surface"
                >
                  <X size={24} />
                </button>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shadow-xl">
                    <UserPlus size={48} className="opacity-50" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{selectedContractor.name}</h2>
                    <p className="opacity-80">{selectedContractor.company}</p>
                    <div className="mt-4 flex gap-2">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase">{selectedContractor.status}</span>
                      <span className="bg-white text-on-surface px-3 py-1 rounded-full text-[10px] font-bold uppercase">{selectedContractor.category}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold text-outline uppercase mb-2">Contact Info</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-on-surface font-medium text-sm">
                        <Mail size={16} /> {selectedContractor.email}
                      </div>
                      <div className="flex items-center gap-2 text-on-surface font-medium text-sm">
                        <Phone size={16} /> +1 (555) 000-0000
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-outline uppercase mb-2">Location</p>
                    <div className="flex items-center gap-2 text-on-surface font-medium text-sm">
                      <MapPin size={16} /> Metropolitan Sector B
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold text-outline uppercase mb-2">Status Actions</p>
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => moveContractor(selectedContractor.id, 'Priority')}
                        className="w-full py-2 bg-primary/5 text-white rounded-lg font-bold text-xs hover:bg-primary/10 hover:text-white"
                      >
                        Flag as Priority
                      </button>
                      <button 
                        onClick={() => moveContractor(selectedContractor.id, 'Suspicious')}
                        className="w-full py-2 bg-orange-50 text-orange-600 rounded-lg font-bold text-xs hover:bg-orange-100"
                      >
                        Mark Suspicious
                      </button>
                      <button 
                        onClick={() => moveContractor(selectedContractor.id, 'Blocked')}
                        className="w-full py-2 bg-red-50 text-red-600 rounded-lg font-bold text-xs hover:bg-red-100"
                      >
                        Block Contractor
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-surface-bright border-t border-secondary-container/30 flex justify-end">
                <button 
                  onClick={() => setSelectedContractor(null)}
                  className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-primary-container hover:text-white"
                >
                  SAVE CHANGES
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminContractorManagement;


