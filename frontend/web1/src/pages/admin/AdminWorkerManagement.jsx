import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, UserCheck, HardHat, ShieldOff, AlertCircle, Ban, Star, MoreVertical } from 'lucide-react';

const mockWorkers = [
  { id: 'WRK-00129', name: 'Julianna Arquette', skill: 'Advanced', rating: 4.82, completed: 412, status: 'Active', category: 'Priority' },
  { id: 'WRK-00215', name: 'Samuel Tarly', skill: 'Intermediate', rating: 4.45, completed: 184, status: 'Active', category: 'Main' },
  { id: 'WRK-00104', name: 'Lena Headey', skill: 'Master', rating: 4.98, completed: 892, status: 'Active', category: 'Priority' },
  { id: 'WRK-00344', name: 'Ben Kingsley', skill: 'Novice', rating: 4.10, completed: 12, status: 'Active', category: 'Main' },
  { id: 'WRK-9902', name: 'Unknown Entity', skill: 'N/A', rating: 0, completed: 0, status: 'Suspicious', category: 'Suspicious' },
  { id: 'WRK-4412', name: 'John Doe', skill: 'Basic', rating: 2.1, completed: 5, status: 'Blocked', category: 'Blocked' },
];

const AdminWorkerManagement = () => {
  const [workers, setWorkers] = useState(mockWorkers);

  const categories = [
    { title: 'Priority', icon: Star, color: 'text-on-surface' },
    { title: 'Main', icon: HardHat, color: 'text-on-surface' },
    { title: 'Suspicious', icon: AlertCircle, color: 'text-orange-600' },
    { title: 'Blocked', icon: Ban, color: 'text-red-600' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-bold text-on-surface tracking-tight">Worker Management</h2>
          <p className="text-on-surface-variant mt-2 text-lg">Comprehensive oversight of personnel across all regions.</p>
        </div>
        <button className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-primary-container uppercase text-sm">Onboard New Worker</button>
      </div>

      <div className="grid grid-cols-12 gap-6 pb-4">
        <div className="col-span-12 lg:col-span-8 bg-surface p-8 rounded-xl custom-card-shadow flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-4">Workforce Performance</p>
            <h3 className="text-5xl font-bold text-on-surface">94.2%</h3>
            <p className="text-sm text-on-surface-variant mt-2">Overall efficiency rating across 1,240 active professionals.</p>
          </div>
          <div className="mt-8 flex gap-8">
            {['Active: 1,102', 'Training: 84', 'Off-duty: 54'].map(stat => (
              <div key={stat}><p className="text-sm font-bold text-on-surface">{stat.split(':')[0]}</p><p className="text-xl font-bold">{stat.split(':')[1]}</p></div>
            ))}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 bg-primary text-on-primary p-8 rounded-xl shadow-xl flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <UserCheck size={36} className="opacity-50" />
            <span className="text-[10px] font-bold border border-white/20 px-3 py-1 rounded-full uppercase tracking-tighter">Live Feed</span>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Security Screening</h4>
            <div className="space-y-2 opacity-80 text-sm">
              <p>• 24 Verifications Passed</p>
              <p>• 2 Suspension Alerts</p>
              <p>• Audit Updated 2m ago</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {categories.map(cat => (
          <div key={cat.title} className="bg-surface p-6 rounded-xl custom-card-shadow border-t-4 border-primary">
            <h5 className="font-bold text-on-surface mb-4 flex items-center justify-between">
              {cat.title}
              <cat.icon size={18} className={cat.color} />
            </h5>
            <p className="text-xs text-on-surface-variant mb-6">{workers.filter(w => w.category === cat.title).length} members listed.</p>
            <button className="w-full py-2 border border-outline rounded-lg text-xs font-bold text-on-surface hover:bg-background-page/10">View List</button>
          </div>
        ))}
      </div>

      <div className="bg-surface rounded-xl custom-card-shadow overflow-hidden">
        <div className="p-8 border-b border-outline-variant flex justify-between items-center">
          <h3 className="text-xl font-bold text-on-surface">Primary Workforce Directory</h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-outline-variant rounded-xl text-xs font-bold text-on-surface-variant flex items-center gap-2">
              <Search size={14} /> FILTER
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-background-page/10">
              <tr>
                {['Name', 'Skill', 'Rating', 'Jobs', 'Actions'].map(h => (
                  <th key={h} className="px-8 py-4 text-[10px] font-bold text-outline uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {workers.slice(0, 4).map(w => (
                <tr key={w.id} className="hover:bg-background-page/5 transition-colors">
                  <td className="px-8 py-5">
                    <p className="font-bold text-on-surface">{w.name}</p>
                    <p className="text-[10px] text-on-surface-variant font-bold">ID: {w.id}</p>
                  </td>
                  <td className="px-8 py-5"><span className="px-3 py-1 bg-background-page/20 rounded-full text-[10px] font-bold uppercase">{w.skill}</span></td>
                  <td className="px-8 py-5 font-bold text-sm text-on-surface">★ {w.rating}</td>
                  <td className="px-8 py-5 text-sm font-bold text-on-surface">{w.completed}</td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-on-surface hover:text-on-surface-container"><MoreVertical size={20} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminWorkerManagement;


