import React, { useState, useEffect } from 'react';
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
  Check,
  X,
  ShieldCheck,
  Star,
  Building2,
  Phone,
  Mail,
  ExternalLink,
  Users,
  Award
} from 'lucide-react';

const contractorProfiles = {
  'Apex Construction Ltd.': {
    name: 'James Whitfield',
    title: 'Managing Director',
    company: 'Apex Construction Ltd.',
    location: 'North Harbor District, Manchester',
    email: 'james@apexconstruction.co.uk',
    phone: '+44 7911 234567',
    avatar: 'JW',
    verified: true,
    rating: 4.8,
    totalJobs: 215,
    yearsActive: 8,
    employees: 45,
    specialties: ['Concrete Works', 'Structural Engineering', 'Commercial Builds'],
    description: 'Apex Construction is a leading construction firm specializing in large-scale commercial and residential projects. With over 8 years of excellence, we have delivered 200+ projects across the North of England.',
    pastProjects: [
      { name: 'Harbor Bridge Extension', value: '£2.4M', year: '2025' },
      { name: 'City Center Tower Phase II', value: '£5.1M', year: '2024' },
      { name: 'Riverside Residential Complex', value: '£3.8M', year: '2023' },
    ],
    license: 'LIC-UK-29381-A',
    registeredDate: 'Mar 15, 2018',
  },
  'Urban Living Co.': {
    name: 'Sarah Chen',
    title: 'Operations Director',
    company: 'Urban Living Co.',
    location: 'East End Plaza, London',
    email: 'sarah@urbanliving.co.uk',
    phone: '+44 7922 876543',
    avatar: 'SC',
    verified: true,
    rating: 4.6,
    totalJobs: 178,
    yearsActive: 6,
    employees: 30,
    specialties: ['Residential Renovation', 'Interior Refurbishment', 'Heritage Restoration'],
    description: 'Urban Living Co. transforms residential spaces with a focus on sustainable building practices and modern design. We pride ourselves on quality craftsmanship and on-time delivery.',
    pastProjects: [
      { name: 'Victorian Terrace Renovation', value: '£850K', year: '2025' },
      { name: 'Docklands Apartment Complex', value: '£2.2M', year: '2024' },
      { name: 'Chelsea Townhouse Restoration', value: '£1.5M', year: '2023' },
    ],
    license: 'LIC-UK-44829-B',
    registeredDate: 'Jun 22, 2020',
  },
  'Logistics Pro': {
    name: 'Daniel Okafor',
    title: 'Founder & CEO',
    company: 'Logistics Pro',
    location: 'South Port Hub, Liverpool',
    email: 'daniel@logisticspro.co.uk',
    phone: '+44 7900 112233',
    avatar: 'DO',
    verified: true,
    rating: 4.5,
    totalJobs: 320,
    yearsActive: 10,
    employees: 60,
    specialties: ['Warehouse Operations', 'Supply Chain', 'Heavy Lifting'],
    description: 'Logistics Pro provides comprehensive warehousing and logistics support for construction and industrial sectors. We specialize in efficient material handling and inventory management.',
    pastProjects: [
      { name: 'Amazon Fulfillment Center Setup', value: '£4.0M', year: '2025' },
      { name: 'Port Expansion Logistics', value: '£6.5M', year: '2024' },
      { name: 'Industrial Park Relocation', value: '£1.8M', year: '2023' },
    ],
    license: 'LIC-UK-55102-C',
    registeredDate: 'Jan 10, 2016',
  },
  'ColorMasters Inc.': {
    name: 'Emily Richards',
    title: 'Creative Director',
    company: 'ColorMasters Inc.',
    location: 'West Hill Residential, Birmingham',
    email: 'emily@colormasters.co.uk',
    phone: '+44 7811 998877',
    avatar: 'ER',
    verified: false,
    rating: 4.7,
    totalJobs: 95,
    yearsActive: 4,
    employees: 15,
    specialties: ['Exterior Painting', 'Interior Design', 'Protective Coatings'],
    description: 'ColorMasters Inc. brings a creative edge to construction finishing. From residential exteriors to industrial protective coatings, we deliver premium results with attention to detail.',
    pastProjects: [
      { name: 'Luxury Estate Exterior', value: '£320K', year: '2025' },
      { name: 'Office Tower Repaint', value: '£780K', year: '2024' },
      { name: 'School Campus Renovation', value: '£450K', year: '2024' },
    ],
    license: 'LIC-UK-77201-D',
    registeredDate: 'Sep 05, 2022',
  },
};

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
    iconBg: 'bg-surface-container-high',
    iconColor: 'text-on-surface'
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
    iconBg: 'bg-primary',
    iconColor: 'text-white'
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
    iconColor: 'text-on-surface'
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
    iconBg: 'bg-surface-container-high',
    iconColor: 'text-on-surface'
  }
];

/* ─── Contractor Profile Modal ─────────────────────────── */
function ContractorProfileModal({ contractor, onClose }) {
  if (!contractor) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 fade-in duration-300 no-scrollbar">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-10 h-10 bg-surface-container-high rounded-full flex items-center justify-center hover:bg-surface-container-highest transition-colors"
        >
          <X size={18} className="text-on-surface" />
        </button>

        {/* Header */}
        <div className="bg-primary p-10 rounded-t-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-bl-full" />
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white text-black flex items-center justify-center text-3xl font-bold shadow-xl shrink-0">
              {contractor.avatar}
            </div>
            <div className="text-white">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold">{contractor.name}</h2>
                {contractor.verified && (
                  <div className="bg-white/20 p-1 rounded-full">
                    <ShieldCheck size={16} className="text-white" />
                  </div>
                )}
              </div>
              <p className="text-white/80 font-medium">{contractor.title}</p>
              <p className="text-white/60 text-sm mt-1">{contractor.company}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8">
          {/* Description */}
          <div>
            <h4 className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em] mb-3">About</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">{contractor.description}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-surface-container-low p-4 rounded-2xl text-center">
              <Star size={18} className="mx-auto text-on-surface-variant mb-2" />
              <p className="text-xl font-bold text-on-surface">{contractor.rating}</p>
              <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Rating</p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-2xl text-center">
              <Briefcase size={18} className="mx-auto text-on-surface-variant mb-2" />
              <p className="text-xl font-bold text-on-surface">{contractor.totalJobs}</p>
              <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Jobs</p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-2xl text-center">
              <Clock size={18} className="mx-auto text-on-surface-variant mb-2" />
              <p className="text-xl font-bold text-on-surface">{contractor.yearsActive}yr</p>
              <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Active</p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-2xl text-center">
              <Users size={18} className="mx-auto text-on-surface-variant mb-2" />
              <p className="text-xl font-bold text-on-surface">{contractor.employees}</p>
              <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Team</p>
            </div>
          </div>

          {/* Contact & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em]">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-surface-container-low rounded-lg"><Mail size={14} className="text-on-surface-variant" /></div>
                  <span className="text-on-surface-variant">{contractor.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-surface-container-low rounded-lg"><Phone size={14} className="text-on-surface-variant" /></div>
                  <span className="text-on-surface-variant">{contractor.phone}</span>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contractor.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm group"
                >
                  <div className="p-2 bg-surface-container-low rounded-lg"><MapPin size={14} className="text-on-surface-variant" /></div>
                  <span className="text-on-surface-variant group-hover:text-on-surface underline decoration-dashed underline-offset-4 transition-colors">{contractor.location}</span>
                  <ExternalLink size={12} className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em]">Verification</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">License</p>
                  <p className="text-sm font-bold text-on-surface">{contractor.license}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Registration Date</p>
                  <p className="text-sm font-bold text-on-surface">{contractor.registeredDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div>
            <h4 className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em] mb-3">Specialties</h4>
            <div className="flex flex-wrap gap-2">
              {contractor.specialties.map(spec => (
                <span key={spec} className="px-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-xs font-bold text-on-surface">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Past Projects */}
          <div>
            <h4 className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em] mb-4">Recent Projects</h4>
            <div className="space-y-3">
              {contractor.pastProjects.map((project, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl border border-outline-variant">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shrink-0">
                      <Award size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-on-surface">{project.name}</p>
                      <p className="text-[10px] text-on-surface-variant font-medium">{project.year}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-on-surface bg-surface-container-high px-4 py-1.5 rounded-full">{project.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const API_BASE = 'http://localhost:8000/api/labourer';

/* ─── Icon mapping for DB jobs ─────────────────────────── */
const categoryIcons = {
  route: <Route size={24} />,
  briefcase: <Briefcase size={24} />,
  clock: <Clock size={24} />,
  dollar: <DollarSign size={24} />,
  general: <Briefcase size={24} />,
};

function mapDbJobToUi(dbJob) {
  return {
    id: dbJob.id,
    title: dbJob.title,
    contractor: dbJob.contractor,
    wage: dbJob.wage,
    date: dbJob.date,
    time: dbJob.time,
    location: dbJob.location,
    distance: dbJob.distance,
    status: dbJob.status,
    categoryIcon: categoryIcons[dbJob.category] || categoryIcons.general,
    iconBg: dbJob.icon_bg || 'bg-surface-container-high',
    iconColor: dbJob.icon_color || 'text-on-surface',
    _fromDb: true,
  };
}

/* ─── Main Component ───────────────────────────────────── */
export default function LabourerJobRequests() {
  const [jobs, setJobs] = useState(initialJobs);
  const [activeTab, setActiveTab] = useState('Pending');
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [loading, setLoading] = useState(true);

  /* Fetch jobs from API on mount; fallback to hardcoded if empty */
  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch(`${API_BASE}/jobs`);
        const data = await res.json();
        if (data.jobs && data.jobs.length > 0) {
          setJobs(data.jobs.map(mapDbJobToUi));
        }
        // else: keep initialJobs (hardcoded)
      } catch (err) {
        console.log('API unavailable, using hardcoded jobs.');
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => job.status === activeTab);

  const updateJobStatus = async (id, status) => {
    // Optimistic local update
    setJobs(jobs.map(job => job.id === id ? { ...job, status } : job));

    // If it came from DB, also patch the API
    const job = jobs.find(j => j.id === id);
    if (job?._fromDb) {
      try {
        await fetch(`${API_BASE}/jobs/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status }),
        });
      } catch (err) {
        console.log('Failed to sync status to API.');
      }
    }
  };

  const openContractorProfile = (contractorName) => {
    const profile = contractorProfiles[contractorName];
    if (profile) setSelectedContractor(profile);
  };

  const openGoogleMaps = (location) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const tabs = ['Pending', 'Accepted', 'Completed', 'Rejected'];

  return (
    <div className="flex-1 p-8 space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-on-surface">Job Requests</h1>
          <p className="text-on-surface mt-1">Manage and track your active opportunities</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white border border-outline-variant p-2 rounded-full shadow-sm">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold border-2 border-outline-variant shrink-0">
              MT
            </div>
          </div>
        </div>
      </header>

      {/* Search & Filter */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl p-6 card-shadow border border-outline-variant">
          <div className="flex items-center gap-4 bg-white px-4 py-3 rounded-xl border border-outline-variant focus-within:border-outline-variant transition-all">
            <Search className="text-on-surface" size={20} />
            <input 
              type="text" 
              placeholder="Search by contractor or category..." 
              className="bg-transparent border-none focus:ring-0 w-full text-base placeholder:text-on-surface-variant"
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl p-6 card-shadow border border-outline-variant flex items-center gap-3">
          <Filter className="text-on-surface" size={20} />
          <span className="font-semibold text-on-surface">Sort by:</span>
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
                ? 'bg-primary text-on-primary shadow-lg scale-95' 
                : 'bg-white text-on-surface border border-outline-variant hover:bg-white'
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
            <div key={job.id} className={`bg-white rounded-2xl p-8 card-shadow border border-outline-variant flex flex-col justify-between transition-all hover:shadow-md ${job.status === 'Completed' ? 'opacity-75' : ''}`}>
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 ${job.iconBg} rounded-2xl flex items-center justify-center`}>
                      <div className={job.iconColor}>{job.categoryIcon}</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-on-surface">{job.title}</h3>
                      {/* Clickable Contractor Name */}
                      <button 
                        onClick={() => openContractorProfile(job.contractor)}
                        className="text-on-surface-variant font-medium hover:text-primary hover:underline underline-offset-4 transition-colors text-left flex items-center gap-1.5 group"
                      >
                        <Building2 size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                        {job.contractor}
                        <ExternalLink size={11} className="opacity-0 group-hover:opacity-60 transition-opacity" />
                      </button>
                    </div>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 ${
                    job.status === 'Pending' ? 'bg-surface-container-highest text-on-surface' :
                    job.status === 'Accepted' ? 'bg-surface-container-highest text-on-surface' :
                    job.status === 'Completed' ? 'bg-white text-on-surface' :
                    'bg-surface-container-high text-on-surface'
                  }`}>
                    {job.status === 'Pending' && <Clock size={12} />}
                    {job.status === 'Accepted' && <Check size={12} />}
                    {job.status === 'Completed' && <CheckCircle size={12} />}
                    {job.status === 'Rejected' && <XCircle size={12} />}
                    <span className="uppercase tracking-wider">{job.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 py-6 border-y border-outline-variant">
                  <div className="flex items-center gap-3">
                    <DollarSign size={18} className="text-on-surface-variant" />
                    <div>
                      <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Wage</p>
                      <p className="font-bold text-on-surface">{job.wage}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-on-surface-variant" />
                    <div>
                      <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Date/Time</p>
                      <p className="font-bold text-on-surface">{job.date} • {job.time}</p>
                    </div>
                  </div>
                  {/* Clickable Location */}
                  <button 
                    onClick={() => openGoogleMaps(job.location)}
                    className="flex items-center gap-3 text-left group"
                  >
                    <MapPin size={18} className="text-on-surface-variant group-hover:text-primary transition-colors" />
                    <div>
                      <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Location</p>
                      <p className="font-bold text-on-surface group-hover:text-primary group-hover:underline underline-offset-4 transition-colors flex items-center gap-1">
                        {job.location}
                        <ExternalLink size={11} className="opacity-0 group-hover:opacity-60 transition-opacity" />
                      </p>
                    </div>
                  </button>
                  <div className="flex items-center gap-3">
                    <Route size={18} className="text-on-surface-variant" />
                    <div>
                      <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Distance</p>
                      <p className="font-bold text-on-surface">{job.distance}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                {activeTab === 'Pending' && (
                  <div className="flex gap-3">
                    <button 
                      onClick={() => updateJobStatus(job.id, 'Accepted')}
                      className="flex-1 bg-primary text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={20} />
                      Accept Request
                    </button>
                    <button 
                      onClick={() => updateJobStatus(job.id, 'Rejected')}
                      className="px-6 border border-outline-variant text-on-surface py-4 rounded-xl font-bold hover:bg-white transition-all"
                    >
                      Reject
                    </button>
                  </div>
                )}
                {activeTab === 'Accepted' && (
                  <div className="flex gap-3">
                    <button 
                      onClick={() => updateJobStatus(job.id, 'Completed')}
                      className="flex-1 bg-primary text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={20} />
                      Mark Completed
                    </button>
                    <button 
                      onClick={() => updateJobStatus(job.id, 'Pending')}
                      className="px-6 border border-outline-variant text-on-surface py-4 rounded-xl font-bold hover:bg-white transition-all flex items-center gap-2"
                    >
                      <Undo2 size={18} />
                      Undo
                    </button>
                  </div>
                )}
                {activeTab === 'Completed' && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs font-bold text-white uppercase tracking-widest bg-primary px-4 py-2 rounded-lg">Payment Processed</span>
                  </div>
                )}
                {activeTab === 'Rejected' && (
                  <button 
                    onClick={() => updateJobStatus(job.id, 'Pending')}
                    className="w-full border border-outline-variant text-on-surface py-4 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    <Undo2 size={18} />
                    Restore Request
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-outline-variant">
            <Briefcase size={48} className="mx-auto text-on-surface opacity-20 mb-4" />
            <p className="text-on-surface font-medium">No {activeTab.toLowerCase()} job requests found.</p>
          </div>
        )}
      </div>

      {/* Contractor Profile Modal */}
      {selectedContractor && (
        <ContractorProfileModal 
          contractor={selectedContractor} 
          onClose={() => setSelectedContractor(null)} 
        />
      )}
    </div>
  );
}
