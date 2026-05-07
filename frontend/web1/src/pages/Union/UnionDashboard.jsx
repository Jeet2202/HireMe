import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Users,
  UserPlus,
  TrendingUp,
  Award,
  Bell,
  Star,
  MapPin,
  ChevronRight,
  Crown,
  Shield,
  Clock,
  Briefcase,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

/* ── Mock Data ─────────────────────────────────────────────── */

const requestsData = [
  { month: 'Jan', requests: 8 },
  { month: 'Feb', requests: 12 },
  { month: 'Mar', requests: 15 },
  { month: 'Apr', requests: 11 },
  { month: 'May', requests: 18 },
  { month: 'Jun', requests: 22 },
];

const ratingData = [
  { week: 'W1', rating: 4.5 },
  { week: 'W2', rating: 4.6 },
  { week: 'W3', rating: 4.7 },
  { week: 'W4', rating: 4.8 },
  { week: 'W5', rating: 4.85 },
];

const recentRequests = [
  { id: 1, contractor: 'Sterling Builds Co.', helpers: 10, date: '2 hours ago', status: 'Pending' },
  { id: 2, contractor: 'Pacific Construction', helpers: 5, date: '5 hours ago', status: 'Accepted' },
  { id: 3, contractor: 'Metro Renovations', helpers: 8, date: '1 day ago', status: 'Completed' },
  { id: 4, contractor: 'Cascade Developers', helpers: 3, date: '2 days ago', status: 'Completed' },
];

/* ── Component ─────────────────────────────────────────────── */

export default function UnionDashboard() {
  return (
    <div className="flex-1 p-8 space-y-8 animate-in fade-in duration-500 bg-gradient-to-br from-white to-[#f4f4f5] min-h-screen">
      {/* ── Header ──────────────────────────────────────────── */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-on-surface">Union Dashboard</h1>
          <p className="text-on-surface mt-1">Welcome back, Marcus. Manage your helper unions and incoming requests.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white card-shadow border border-outline-variant hover:bg-white transition-colors relative">
            <Bell className="text-on-surface" size={20} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant rounded-full shadow-sm">
            <Crown size={16} className="text-amber-500" />
            <span className="text-xs font-bold text-on-surface">UNION LEADER</span>
          </div>
        </div>
      </header>

      {/* ── KPI Row ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-2xl border border-outline-variant card-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary rounded-xl">
              <Users className="text-white" size={24} />
            </div>
            <span className="bg-surface-container-high text-on-surface text-xs font-bold px-3 py-1 rounded-full">Active</span>
          </div>
          <p className="text-xs font-medium text-on-surface uppercase tracking-wider">My Unions</p>
          <h3 className="text-4xl font-bold text-on-surface mt-1">2</h3>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-outline-variant card-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-surface-container-high rounded-xl">
              <UserPlus className="text-on-surface" size={24} />
            </div>
            <span className="bg-surface-container-high text-on-surface text-xs font-bold px-3 py-1 rounded-full">+4 New</span>
          </div>
          <p className="text-xs font-medium text-on-surface uppercase tracking-wider">Total Helpers</p>
          <h3 className="text-4xl font-bold text-on-surface mt-1">26</h3>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-outline-variant card-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-[#fcdfa9] rounded-xl">
              <TrendingUp className="text-[#180f00]" size={24} />
            </div>
            <span className="bg-[#dec38f]/30 text-[#180f00] text-xs font-bold px-3 py-1 rounded-full">This Month</span>
          </div>
          <p className="text-xs font-medium text-on-surface uppercase tracking-wider">Requests Received</p>
          <h3 className="text-4xl font-bold text-on-surface mt-1">18</h3>
        </div>

        <div className="bg-primary text-on-primary p-8 rounded-2xl card-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Award className="text-white" size={24} />
            </div>
          </div>
          <p className="text-xs font-medium text-white/70 uppercase tracking-wider">Jobs Completed</p>
          <h3 className="text-4xl font-bold mt-1">70</h3>
        </div>
      </div>

      {/* ── Status & Capacity Row ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Union 1 */}
        <div className="bg-white p-6 rounded-2xl border border-outline-variant card-shadow">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm">DB</div>
              <div>
                <h4 className="font-bold text-on-surface text-sm">Downtown Builders</h4>
                <p className="text-[10px] text-on-surface uppercase tracking-wider">General Construction</p>
              </div>
            </div>
            <span className="bg-green-100 text-green-800 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full">Active</span>
          </div>
          <div className="mb-2 flex justify-between text-xs font-bold text-on-surface">
            <span>18 / 30 Members</span>
            <span className="text-primary">12 Available</span>
          </div>
          <div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: '60%' }} />
          </div>
        </div>

        {/* Union 2 */}
        <div className="bg-white p-6 rounded-2xl border border-outline-variant card-shadow">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-sm">PM</div>
              <div>
                <h4 className="font-bold text-on-surface text-sm">Pacific Mason Guild</h4>
                <p className="text-[10px] text-on-surface uppercase tracking-wider">Masonry</p>
              </div>
            </div>
            <span className="bg-green-100 text-green-800 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full">Active</span>
          </div>
          <div className="mb-2 flex justify-between text-xs font-bold text-on-surface">
            <span>8 / 15 Members</span>
            <span className="text-primary">7 Available</span>
          </div>
          <div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: '53%' }} />
          </div>
        </div>

        {/* Quick Stat */}
        <div className="bg-white p-6 rounded-2xl border border-outline-variant card-shadow flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <p className="font-bold text-on-surface">Average Rating</p>
            <Star className="text-[#fcdfa9] fill-[#fcdfa9]" size={20} />
          </div>
          <div className="mt-4">
            <h4 className="text-4xl font-bold text-on-surface">4.75<span className="text-base text-on-surface ml-2">/ 5.0</span></h4>
            <p className="text-xs text-on-surface mt-1">Across all unions • 70 jobs completed</p>
          </div>
        </div>
      </div>

      {/* ── Charts & Recent Requests ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requests Chart */}
        <div className="bg-white p-8 rounded-2xl border border-outline-variant card-shadow h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-lg text-on-surface">Monthly Requests</h3>
            <select className="bg-transparent border-none text-xs font-bold text-on-surface focus:ring-0">
              <option>Last 6 Months</option>
            </select>
          </div>
          <div className="flex-1 w-full -ml-8">
            <ResponsiveContainer width="110%" height="100%">
              <BarChart data={requestsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#efeded" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#4c444e', fontSize: 12 }} dy={10} />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: '#f5f3f3' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="requests" fill="#1a1c1d" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 flex justify-between items-center pt-6 border-t border-outline-variant">
            <p className="text-sm text-on-surface">Current Month Total</p>
            <p className="font-bold text-on-surface">22 Requests</p>
          </div>
        </div>

        {/* Recent Requests Table */}
        <div className="bg-white p-8 rounded-2xl border border-outline-variant card-shadow h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-on-surface">Recent Requests</h3>
            <button className="text-[10px] font-black text-on-surface uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3">
            {recentRequests.map((req) => (
              <motion.div
                key={req.id}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-4 rounded-xl border border-outline-variant hover:border-primary/20 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-xs shrink-0">
                    {req.contractor.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-on-surface">{req.contractor}</p>
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-wider mt-0.5">
                      <span className="flex items-center gap-1 text-on-surface">
                        <Users size={10} /> {req.helpers} Helpers
                      </span>
                      <span className="flex items-center gap-1 text-on-surface">
                        <Clock size={10} /> {req.date}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                    req.status === 'Pending'
                      ? 'bg-amber-100 text-amber-800'
                      : req.status === 'Accepted'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {req.status}
                  </span>
                  <ChevronRight size={16} className="text-on-surface" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
