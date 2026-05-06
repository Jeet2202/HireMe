import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Filter, 
  LayoutDashboard, 
  Briefcase, 
  TrendingUp, 
  ShieldCheck, 
  Star,
  Clock,
  MapPin,
  ChevronRight
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
  Line
} from 'recharts';

const earningsData = [
  { month: 'Jan', amount: 3200 },
  { month: 'Feb', amount: 3800 },
  { month: 'Mar', amount: 4100 },
  { month: 'Apr', amount: 4250 },
  { month: 'May', amount: 3900 },
  { month: 'Jun', amount: 4100 },
];

const ratingData = [
  { week: 'W1', rating: 4.5 },
  { week: 'W2', rating: 4.7 },
  { week: 'W3', rating: 4.6 },
  { week: 'W4', rating: 4.8 },
  { week: 'W5', rating: 4.92 },
];

export default function LabourerDashboard() {
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <div className="flex-1 p-8 space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-[#391053]">Overview</h1>
          <p className="text-[#391053] mt-1">Welcome back, Marcus. Here's your schedule for today.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-sm border border-[#c9a8f1]/30 hover:bg-white transition-colors relative">
            <Bell className="text-[#391053]" size={20} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#c9a8f1]/30 rounded-full shadow-sm">
            <span className="text-xs font-bold text-[#391053]">STATUS: ACTIVE</span>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </div>
      </header>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#c9a8f1]/20 hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-[#c9a8f1] rounded-xl">
              <Clock className="text-[#391053]" size={24} />
            </div>
            <span className="bg-[#e4b5ff]/30 text-[#391053] text-xs font-bold px-3 py-1 rounded-full">+4 New</span>
          </div>
          <p className="text-xs font-medium text-[#391053] uppercase tracking-wider">Job Requests</p>
          <h3 className="text-4xl font-bold text-[#391053] mt-1">12</h3>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#c9a8f1]/20 hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-[#eedcff] rounded-xl">
              <Briefcase className="text-[#6e5193]" size={24} />
            </div>
            <span className="bg-[#d4b3fd]/30 text-[#6e5193] text-xs font-bold px-3 py-1 rounded-full">Ongoing</span>
          </div>
          <p className="text-xs font-medium text-[#391053] uppercase tracking-wider">Current Booking</p>
          <h3 className="text-2xl font-bold text-[#391053] mt-1 truncate">Westside Renovation</h3>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#c9a8f1]/20 hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-[#fcdfa9] rounded-xl">
              <TrendingUp className="text-[#180f00]" size={24} />
            </div>
            <span className="bg-[#dec38f]/30 text-[#180f00] text-xs font-bold px-3 py-1 rounded-full">Level 4</span>
          </div>
          <p className="text-xs font-medium text-[#391053] uppercase tracking-wider">Skill Level</p>
          <h3 className="text-2xl font-bold text-[#391053] mt-1">Expert Mason</h3>
        </div>
      </div>

      {/* Status & Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#c9a8f1]/20 flex flex-col items-center justify-center text-center">
          <ShieldCheck size={48} className="text-[#391053] fill-[#c9a8f1]/10" />
          <p className="text-lg font-bold text-[#391053] mt-4">Identity Verified</p>
          <p className="text-xs text-[#391053] mt-1">Next renewal: Oct 2024</p>
          <button className="mt-4 w-full py-2 border border-[#c9a8f1] rounded-xl text-xs font-bold hover:bg-white transition-colors">VIEW BADGE</button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#c9a8f1]/20 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <p className="font-bold text-[#391053]">Availability</p>
            <button 
              onClick={() => setIsAvailable(!isAvailable)}
              className={`w-12 h-6 rounded-full transition-colors relative ${isAvailable ? 'bg-[#c9a8f1]' : 'bg-white'}`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${isAvailable ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-[#391053] uppercase">STATUS: {isAvailable ? 'ONLINE' : 'OFFLINE'}</p>
            <p className="text-sm text-[#391053] mt-1">
              {isAvailable 
                ? 'Visible to project managers within 25km.' 
                : 'Hidden from new project searches.'}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#c9a8f1]/20 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <p className="font-bold text-[#391053]">Average Rating</p>
            <Star className="text-[#fcdfa9] fill-[#fcdfa9]" size={20} />
          </div>
          <div className="mt-4">
            <h4 className="text-4xl font-bold text-[#391053]">4.92<span className="text-base text-[#391053] ml-2">/ 5.0</span></h4>
            <p className="text-xs text-[#391053] mt-1">Based on 128 job completions</p>
          </div>
        </div>

        <div className="bg-[#c9a8f1] text-[#391053] p-6 rounded-2xl shadow-lg flex flex-col justify-between">
          <div>
            <p className="text-[10px] text-[#391053]/50 uppercase tracking-widest">Next Shift</p>
            <p className="text-lg font-bold mt-1">Tomorrow, 08:00 AM</p>
          </div>
          <div className="mt-4">
            <p className="text-sm">Downtown Site B</p>
            <p className="text-xs text-[#391053]/60 mt-1">Site Foreman: Sarah Wilson</p>
          </div>
          <button className="mt-4 w-full py-2 bg-white text-[#391053] rounded-xl text-xs font-bold hover:bg-opacity-90 transition-all">VIEW DETAILS</button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#c9a8f1]/20 h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-lg text-[#391053]">Monthly Earnings</h3>
            <select className="bg-transparent border-none text-xs font-bold text-[#391053] focus:ring-0">
              <option>Last 6 Months</option>
            </select>
          </div>
          <div className="flex-1 w-full -ml-8">
            <ResponsiveContainer width="110%" height="100%">
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#efeded" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#4c444e', fontSize: 12}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f5f3f3'}} 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="amount" fill="#1f0033" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 flex justify-between items-center pt-6 border-t border-[#efeded]">
            <p className="text-sm text-[#391053]">Current Month Projection</p>
            <p className="font-bold text-[#391053]">$4,250.00</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#c9a8f1]/20 h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-lg text-[#391053]">Rating Trend</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#c9a8f1]"></div>
              <span className="text-xs text-[#391053]">Overall Trend</span>
            </div>
          </div>
          <div className="flex-1 w-full -ml-8">
            <ResponsiveContainer width="110%" height="100%">
              <LineChart data={ratingData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#efeded" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#4c444e', fontSize: 12}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Line 
                  type="monotone" 
                  dataKey="rating" 
                  stroke="#1f0033" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#1f0033', strokeWidth: 0 }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#391053]">Top Feedback Category</span>
              <span className="font-bold text-[#391053]">Punctuality (98%)</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#391053]">Recent Improvement</span>
              <span className="font-bold text-[#391053]">Safety Compliance (+12%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


