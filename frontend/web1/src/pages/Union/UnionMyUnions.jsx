import React from 'react';
import { motion } from 'motion/react';
import {
  Users,
  Star,
  MapPin,
  Shield,
  Settings,
  Edit3,
  Trash2,
  ChevronRight,
  Crown,
  UserPlus,
} from 'lucide-react';

/* ── Mock Data ─────────────────────────────────────────────── */

const unions = [
  {
    id: 1,
    name: 'Downtown Builders Collective',
    leader: 'Marcus Thorne',
    members: 18,
    maxCapacity: 30,
    rating: 4.8,
    location: 'Seattle, WA',
    specialization: 'General Construction',
    status: 'Active',
    pendingRequests: 3,
    completedJobs: 47,
  },
  {
    id: 2,
    name: 'Pacific Mason Guild',
    leader: 'Marcus Thorne',
    members: 8,
    maxCapacity: 15,
    rating: 4.6,
    location: 'Portland, OR',
    specialization: 'Masonry',
    status: 'Active',
    pendingRequests: 1,
    completedJobs: 23,
  },
];

/* ── Component ─────────────────────────────────────────────── */

export default function UnionMyUnions() {
  return (
    <div className="flex-1 p-8 space-y-8 animate-in fade-in duration-500 bg-gradient-to-br from-white to-[#f4f4f5] min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-on-surface">My Unions</h1>
          <p className="text-on-surface mt-1">Manage your helper groups and track capacity.</p>
        </div>
        <a
          href="/union/create"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition-opacity active:scale-95"
        >
          <UserPlus size={18} /> Create New Union
        </a>
      </header>

      {/* Union Cards */}
      <div className="space-y-6">
        {unions.map((union) => (
          <motion.div
            key={union.id}
            whileHover={{ y: -2 }}
            className="bg-white p-8 rounded-2xl border border-outline-variant card-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-6">
                <div className="w-20 h-20 rounded-2xl bg-primary text-white flex items-center justify-center text-2xl font-bold shrink-0">
                  {union.name.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-on-surface">{union.name}</h3>
                    <span className="bg-green-100 text-green-800 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      {union.status}
                    </span>
                  </div>
                  <p className="text-sm text-on-surface mb-3">
                    <Crown size={14} className="inline mr-1 text-amber-500" />
                    Leader: {union.leader}
                  </p>
                  <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-wider">
                    <div className="flex items-center gap-1.5 text-amber-500">
                      <Star size={14} fill="currentColor" /> {union.rating}
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface">
                      <MapPin size={14} /> {union.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface">
                      <Shield size={14} /> {union.specialization}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-3 bg-white border border-outline-variant rounded-xl hover:bg-gray-50 transition-colors">
                  <Edit3 size={16} className="text-on-surface" />
                </button>
                <button className="p-3 bg-white border border-outline-variant rounded-xl hover:bg-red-50 transition-colors">
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            </div>

            {/* Capacity Bar */}
            <div className="mt-6 pt-6 border-t border-outline-variant">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-bold text-on-surface">
                  Members: {union.members} / {union.maxCapacity}
                </p>
                <p className="text-sm font-bold text-on-surface">
                  Can Provide: <span className="text-primary">{union.maxCapacity - union.members} Helpers</span>
                </p>
              </div>
              <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${(union.members / union.maxCapacity) * 100}%` }}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex gap-3">
              <button className="flex-1 px-4 py-3 bg-white border border-outline-variant text-on-surface rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Users size={16} /> View Members
              </button>
              <button className="flex-1 px-4 py-3 bg-white border border-outline-variant text-on-surface rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Settings size={16} /> Manage
              </button>
              {union.pendingRequests > 0 && (
                <button className="flex-1 px-4 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  {union.pendingRequests} Pending Requests <ChevronRight size={16} />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
