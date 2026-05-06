import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  Route,
  CheckCircle,
  XCircle,
  Undo2,
  Check
} from 'lucide-react';

const initialJobs = [
  {
    id: '1',
    title: 'Main Site Concrete Pour',
    contractor: 'Apex Construction Ltd.',
    wage: '$45.00 / hr',
    date: 'Oct 24',
    time: '08:00 AM',
    location: 'North Harbor District',
    distance: '4.2 miles away',
    status: 'Pending',
    categoryIcon: <Route size={24} />,
    iconBg: 'bg-[#eedcff]',
    iconColor: 'text-[#28084b]'
  },
  {
    id: '2',
    title: 'Bricklaying Refurbishment',
    contractor: 'Urban Living Co.',
    wage: '$38.50 / hr',
    date: 'Oct 26',
    time: '09:30 AM',
    location: 'East End Plaza',
    distance: '1.8 miles away',
    status: 'Accepted',
    categoryIcon: <Briefcase size={24} />,
    iconBg: 'bg-[#c9a8f1]',
    iconColor: 'text-[#2e0349]'
  },
  {
    id: '3',
    title: 'Warehouse Inventory Support',
    contractor: 'Logistics Pro',
    wage: '$32.00 / hr',
    date: 'Oct 18',
    time: '10:00 AM',
    location: 'South Port Hub',
    distance: '5.5 miles away',
    status: 'Completed',
    categoryIcon: <Clock size={24} />,
    iconBg: 'bg-white',
    iconColor: 'text-[#391053]'
  },
  {
    id: '4',
    title: 'Exterior Wall Painting',
    contractor: 'ColorMasters Inc.',
    wage: '$40.00 / hr',
    date: 'Oct 25',
    time: '07:00 AM',
    location: 'West Hill Residential',
    distance: '2.4 miles away',
    status: 'Pending',
    categoryIcon: <DollarSign size={24} />,
    iconBg: 'bg-[#fcdfa9]',
    iconColor: 'text-[#261a00]'
  }
];

export default function LabourerJobRequests() {
  const [jobs, setJobs] = useState(initialJobs);
  const [activeTab, setActiveTab] = useState('Pending');

  const filteredJobs = jobs.filter(job => job.status === activeTab);

  const updateJobStatus = (id, status) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, status } : job));
  };

  const tabs = ['Pending', 'Accepted', 'Completed', 'Rejected'];

  return (
    <div className="flex-1 p-8 space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-[#391053]">Job Requests</h1>
          <p className="text-[#391053] mt-1">Manage and track your active opportunities</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white border border-[#c9a8f1]/30 p-2 rounded-full shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=40&h=40&auto=format&fit=crop" 
              alt="Profile" 
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Search & Filter */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl p-6 shadow-sm border border-[#c9a8f1]/30">
          <div className="flex items-center gap-4 bg-white px-4 py-3 rounded-xl border border-[#c9a8f1]/50 focus-within:border-[#c9a8f1] transition-all">
            <Search className="text-[#391053]" size={20} />
            <input 
              type="text" 
              placeholder="Search by contractor or category..." 
              className="bg-transparent border-none focus:ring-0 w-full text-base placeholder:text-[#391053]/60"
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-[#c9a8f1]/30 flex items-center gap-3">
          <Filter className="text-[#391053]" size={20} />
          <span className="font-semibold text-[#391053]">Sort by:</span>
          <select className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium">
            <option>Newest First</option>
            <option>Highest Wage</option>
            <option>Nearest Distance</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 rounded-full font-bold transition-all whitespace-nowrap ${
              activeTab === tab 
                ? 'bg-[#c9a8f1] text-[#391053] shadow-lg scale-95' 
                : 'bg-white text-[#391053] border border-[#c9a8f1] hover:bg-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Job Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className={`bg-white rounded-2xl p-8 shadow-sm border border-[#c9a8f1]/30 flex flex-col justify-between transition-all hover:shadow-md ${job.status === 'Completed' ? 'opacity-75' : ''}`}>
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 ${job.iconBg} rounded-2xl flex items-center justify-center`}>
                      <div className={job.iconColor}>{job.categoryIcon}</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#391053]">{job.title}</h3>
                      <p className="text-[#391053] font-medium">{job.contractor}</p>
                    </div>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 ${
                    job.status === 'Pending' ? 'bg-[#fcdfa9] text-[#261a00]' :
                    job.status === 'Accepted' ? 'bg-[#d4b3fd] text-[#2e0349]' :
                    job.status === 'Completed' ? 'bg-white text-[#391053]' :
                    'bg-[#ffdad6] text-[#ba1a1a]'
                  }`}>
                    {job.status === 'Pending' && <Clock size={12} />}
                    {job.status === 'Accepted' && <Check size={12} />}
                    {job.status === 'Completed' && <CheckCircle size={12} />}
                    {job.status === 'Rejected' && <XCircle size={12} />}
                    <span className="uppercase tracking-wider">{job.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 py-6 border-y border-[#efeded]">
                  <div className="flex items-center gap-3">
                    <DollarSign size={18} className="text-[#7d747f]" />
                    <div>
                      <p className="text-[10px] text-[#7d747f] font-bold uppercase tracking-wider">Wage</p>
                      <p className="font-bold text-[#391053]">{job.wage}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-[#7d747f]" />
                    <div>
                      <p className="text-[10px] text-[#7d747f] font-bold uppercase tracking-wider">Date/Time</p>
                      <p className="font-bold text-[#391053]">{job.date} • {job.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-[#7d747f]" />
                    <div>
                      <p className="text-[10px] text-[#7d747f] font-bold uppercase tracking-wider">Location</p>
                      <p className="font-bold text-[#391053]">{job.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Route size={18} className="text-[#7d747f]" />
                    <div>
                      <p className="text-[10px] text-[#7d747f] font-bold uppercase tracking-wider">Distance</p>
                      <p className="font-bold text-[#391053]">{job.distance}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                {activeTab === 'Pending' && (
                  <div className="flex gap-3">
                    <button 
                      onClick={() => updateJobStatus(job.id, 'Accepted')}
                      className="flex-1 bg-[#c9a8f1] text-[#391053] py-4 rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={20} />
                      Accept Request
                    </button>
                    <button 
                      onClick={() => updateJobStatus(job.id, 'Rejected')}
                      className="px-6 border border-[#c9a8f1] text-[#391053] py-4 rounded-xl font-bold hover:bg-white transition-all"
                    >
                      Reject
                    </button>
                  </div>
                )}
                {activeTab === 'Accepted' && (
                  <div className="flex gap-3">
                    <button 
                      onClick={() => updateJobStatus(job.id, 'Completed')}
                      className="flex-1 bg-[#c9a8f1] text-[#391053] py-4 rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={20} />
                      Mark Completed
                    </button>
                    <button 
                      onClick={() => updateJobStatus(job.id, 'Pending')}
                      className="px-6 border border-[#c9a8f1] text-[#391053] py-4 rounded-xl font-bold hover:bg-white transition-all flex items-center gap-2"
                    >
                      <Undo2 size={18} />
                      Undo
                    </button>
                  </div>
                )}
                {activeTab === 'Completed' && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs font-bold text-[#391053] uppercase tracking-widest bg-[#c9a8f1] px-4 py-2 rounded-lg">Payment Processed</span>
                  </div>
                )}
                {activeTab === 'Rejected' && (
                  <button 
                    onClick={() => updateJobStatus(job.id, 'Pending')}
                    className="w-full border border-[#c9a8f1] text-[#391053] py-4 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    <Undo2 size={18} />
                    Restore Request
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-[#c9a8f1]">
            <Briefcase size={48} className="mx-auto text-[#391053] opacity-20 mb-4" />
            <p className="text-[#391053] font-medium">No {activeTab.toLowerCase()} job requests found.</p>
          </div>
        )}
      </div>
    </div>
  );
}


