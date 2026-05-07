import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  MapPin,
  Calendar,
  Briefcase,
} from 'lucide-react';

/* ── Mock Data ─────────────────────────────────────────────── */

const requests = [
  { id: 1, contractor: 'Sterling Builds Co.', project: 'Downtown Office Tower', helpers: 10, date: 'May 5, 2026', deadline: 'May 12, 2026', location: 'Seattle, WA', status: 'Pending', union: 'Downtown Builders Collective' },
  { id: 2, contractor: 'Pacific Construction', project: 'Harbor Bridge Repair', helpers: 5, date: 'May 4, 2026', deadline: 'May 10, 2026', location: 'Portland, OR', status: 'Pending', union: 'Pacific Mason Guild' },
  { id: 3, contractor: 'Metro Renovations', project: 'Mall Interior Rework', helpers: 8, date: 'May 2, 2026', deadline: 'May 8, 2026', location: 'Seattle, WA', status: 'Accepted', union: 'Downtown Builders Collective' },
  { id: 4, contractor: 'Cascade Developers', project: 'Residential Complex B', helpers: 3, date: 'Apr 28, 2026', deadline: 'May 5, 2026', location: 'Bellevue, WA', status: 'Completed', union: 'Pacific Mason Guild' },
  { id: 5, contractor: 'Emerald City Homes', project: 'Lakeside Villas', helpers: 12, date: 'Apr 25, 2026', deadline: 'May 2, 2026', location: 'Bellevue, WA', status: 'Completed', union: 'Downtown Builders Collective' },
];

/* ── Component ─────────────────────────────────────────────── */

export default function UnionJobRequests() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? requests : requests.filter((r) => r.status === filter);

  return (
    <div className="flex-1 p-8 space-y-8 animate-in fade-in duration-500 bg-gradient-to-br from-white to-[#f4f4f5] min-h-screen">
      {/* Header */}
      <header>
        <h1 className="text-4xl font-bold text-on-surface">Job Requests</h1>
        <p className="text-on-surface mt-1">Review and manage incoming helper requests from contractors.</p>
      </header>

      {/* Filter Tabs */}
      <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-outline-variant w-fit card-shadow">
        {['All', 'Pending', 'Accepted', 'Completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
              filter === tab
                ? 'bg-primary text-white shadow-lg'
                : 'text-on-surface hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filtered.map((req) => (
          <motion.div
            key={req.id}
            whileHover={{ y: -2 }}
            className="bg-white p-6 rounded-2xl border border-outline-variant card-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-sm shrink-0">
                  {req.contractor.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-on-surface">{req.contractor}</h3>
                  <p className="text-sm text-on-surface mb-2">{req.project}</p>
                  <div className="flex items-center gap-5 text-[10px] font-black uppercase tracking-wider">
                    <span className="flex items-center gap-1 text-on-surface">
                      <Users size={12} /> {req.helpers} Helpers
                    </span>
                    <span className="flex items-center gap-1 text-on-surface">
                      <MapPin size={12} /> {req.location}
                    </span>
                    <span className="flex items-center gap-1 text-on-surface">
                      <Calendar size={12} /> By {req.deadline}
                    </span>
                    <span className="flex items-center gap-1 text-on-surface">
                      <Briefcase size={12} /> {req.union}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${
                    req.status === 'Pending'
                      ? 'bg-amber-100 text-amber-800'
                      : req.status === 'Accepted'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {req.status}
                </span>
              </div>
            </div>

            {req.status === 'Pending' && (
              <div className="mt-5 pt-5 border-t border-outline-variant flex gap-3">
                <button className="flex-1 px-4 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 active:scale-95">
                  <CheckCircle size={16} /> Accept Request
                </button>
                <button className="flex-1 px-4 py-3 bg-white border border-outline-variant text-on-surface rounded-xl text-sm font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center justify-center gap-2">
                  <XCircle size={16} /> Decline
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
