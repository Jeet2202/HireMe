import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, MapPin, Star, Filter, UserPlus, Info, Users, 
  X, ShieldCheck, Briefcase, Clock, Award, Wrench, 
  ChevronRight, ExternalLink, Loader2
} from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const API_BASE = 'http://localhost:8000/api/labourer';

/* ─── Region data with coordinates ─────────────────────── */
const regionData = [
  { id: 'r1',  name: 'Downtown Core',    lat: 19.076,  lng: 72.8777, count: 84  },
  { id: 'r2',  name: 'Andheri Zone',     lat: 19.1136, lng: 72.8697, count: 62  },
  { id: 'r3',  name: 'Bandra Belt',      lat: 19.0544, lng: 72.8402, count: 47  },
  { id: 'r4',  name: 'Thane Industrial', lat: 19.2183, lng: 72.9781, count: 115 },
  { id: 'r5',  name: 'Navi Mumbai Hub',  lat: 19.0330, lng: 73.0297, count: 93  },
  { id: 'r6',  name: 'Powai Tech Park',  lat: 19.1176, lng: 72.9060, count: 38  },
  { id: 'r7',  name: 'Dadar Central',    lat: 19.0178, lng: 72.8478, count: 56  },
  { id: 'r8',  name: 'Borivali North',   lat: 19.2307, lng: 72.8567, count: 71  },
  { id: 'r9',  name: 'Kurla East',       lat: 19.0726, lng: 72.8845, count: 44  },
  { id: 'r10', name: 'Vikhroli Ind.',    lat: 19.1067, lng: 72.9273, count: 52  },
];

function getRadius(count) {
  return Math.max(14, Math.min(50, count * 0.4));
}

function getColor(count) {
  if (count >= 80) return '#000000';
  if (count >= 40) return '#3f3f46';
  return '#71717a';
}

/* ─── Hardcoded fallback labourers ─────────────────────── */
const fallbackLabourers = [
  { id: 'f1', name: 'David Chen',       role: 'Master Electrician',   rating: 4.9, location: 'Mumbai, MH',   region: 'Downtown Core',    avatar: 'DC', skills: ['Electrical Wiring', 'Panel Setup', 'Solar Install'], skill_level: 'Master / Expert', experience_years: 14, jobs_completed: 189, hourly_rate: '$48/hr', bio: 'Certified master electrician with 14 years of commercial and residential project experience.', is_verified: true, available: true, past_projects: [{ name: 'City Tower Electrical', year: '2025', role: 'Lead Electrician' }, { name: 'Harbor Complex Wiring', year: '2024', role: 'Senior Tech' }] },
  { id: 'f2', name: 'Sarah Miller',     role: 'Senior Plumber',       rating: 4.7, location: 'Mumbai, MH',   region: 'Andheri Zone',     avatar: 'SM', skills: ['Pipe Fitting', 'Drainage', 'Water Treatment'], skill_level: 'Journeyman', experience_years: 8, jobs_completed: 112, hourly_rate: '$42/hr', bio: 'Skilled plumber specializing in complex drainage systems and industrial water projects.', is_verified: true, available: true, past_projects: [{ name: 'Mall Plumbing Overhaul', year: '2025', role: 'Lead Plumber' }, { name: 'Residential Complex', year: '2024', role: 'Plumber' }] },
  { id: 'f3', name: 'Robert Wilson',    role: 'Landscape Architect',  rating: 5.0, location: 'Mumbai, MH',   region: 'Bandra Belt',      avatar: 'RW', skills: ['Garden Design', 'Irrigation', 'Hardscaping'], skill_level: 'Master / Expert', experience_years: 16, jobs_completed: 234, hourly_rate: '$55/hr', bio: 'Award-winning landscape architect who transforms outdoor spaces with sustainable design.', is_verified: true, available: true, past_projects: [{ name: 'Luxury Estate Garden', year: '2025', role: 'Lead Designer' }, { name: 'City Park Renovation', year: '2024', role: 'Architect' }] },
  { id: 'f4', name: 'Elena Rodriguez',  role: 'HVAC Specialist',      rating: 4.8, location: 'Mumbai, MH',   region: 'Thane Industrial', avatar: 'ER', skills: ['AC Installation', 'Duct Work', 'Refrigeration'], skill_level: 'Journeyman', experience_years: 10, jobs_completed: 145, hourly_rate: '$46/hr', bio: 'Experienced HVAC technician delivering energy-efficient climate systems for commercial buildings.', is_verified: false, available: true, past_projects: [{ name: 'Office Tower HVAC', year: '2025', role: 'Lead Tech' }, { name: 'Hospital Cooling', year: '2024', role: 'HVAC Tech' }] },
  { id: 'f5', name: 'Amir Khan',        role: 'Structural Welder',    rating: 4.6, location: 'Mumbai, MH',   region: 'Navi Mumbai Hub',  avatar: 'AK', skills: ['MIG Welding', 'TIG Welding', 'Steel Fabrication'], skill_level: 'Journeyman', experience_years: 7, jobs_completed: 98, hourly_rate: '$44/hr', bio: 'Certified structural welder with expertise in heavy steel fabrication and bridge construction.', is_verified: true, available: true, past_projects: [{ name: 'Bridge Reinforcement', year: '2025', role: 'Welder' }, { name: 'Factory Frame Build', year: '2024', role: 'Lead Welder' }] },
  { id: 'f6', name: 'Priya Sharma',     role: 'Carpentry Expert',     rating: 4.9, location: 'Mumbai, MH',   region: 'Powai Tech Park',  avatar: 'PS', skills: ['Fine Woodwork', 'Framing', 'Cabinet Making'], skill_level: 'Master / Expert', experience_years: 12, jobs_completed: 176, hourly_rate: '$50/hr', bio: 'Master carpenter specializing in custom cabinetry and precision woodwork for luxury interiors.', is_verified: true, available: false, past_projects: [{ name: 'Penthouse Interior', year: '2025', role: 'Master Carpenter' }, { name: 'Restaurant Fit-out', year: '2024', role: 'Carpenter' }] },
];

/* ─── Fly-to helper ────────────────────────────────────── */
function FlyToRegion({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 13, { duration: 1.2 });
  }, [center, map]);
  return null;
}

/* ─── Worker Profile Modal ─────────────────────────────── */
function WorkerProfileModal({ worker, onClose }) {
  if (!worker) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 fade-in duration-300 no-scrollbar">
        {/* Close */}
        <button onClick={onClose} className="absolute top-5 right-5 z-10 w-10 h-10 bg-surface-container-high rounded-full flex items-center justify-center hover:bg-surface-container-highest transition-colors">
          <X size={18} className="text-on-surface" />
        </button>

        {/* Header */}
        <div className="bg-primary p-10 rounded-t-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-bl-full" />
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white text-black flex items-center justify-center text-3xl font-bold shadow-xl shrink-0">
              {worker.avatar || worker.name?.split(' ').map(n => n[0]).join('').slice(0,2)}
            </div>
            <div className="text-white">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold">{worker.name}</h2>
                {worker.is_verified && (
                  <div className="bg-white/20 p-1 rounded-full"><ShieldCheck size={16} className="text-white" /></div>
                )}
              </div>
              <p className="text-white/80 font-medium">{worker.role}</p>
              <p className="text-white/50 text-sm mt-1">{worker.location}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-7">
          {/* Bio */}
          <div>
            <h4 className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em] mb-2">About</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">{worker.bio || 'No bio provided.'}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: <Star size={16} />, val: worker.rating, label: 'Rating' },
              { icon: <Briefcase size={16} />, val: worker.jobs_completed, label: 'Jobs' },
              { icon: <Clock size={16} />, val: `${worker.experience_years}yr`, label: 'Experience' },
              { icon: <Wrench size={16} />, val: worker.hourly_rate || '—', label: 'Rate' },
            ].map((s, i) => (
              <div key={i} className="bg-surface-container-low p-4 rounded-2xl text-center">
                <div className="text-on-surface-variant mx-auto w-fit mb-1.5">{s.icon}</div>
                <p className="text-lg font-bold text-on-surface">{s.val}</p>
                <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div>
            <h4 className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em] mb-3">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {(worker.skills || []).map(skill => (
                <span key={skill} className="px-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-xs font-bold text-on-surface">
                  {skill}
                </span>
              ))}
              {(!worker.skills || worker.skills.length === 0) && (
                <span className="text-sm text-on-surface-variant">No skills listed.</span>
              )}
            </div>
          </div>

          {/* Skill Level & Availability */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Skill Level</p>
              <p className="text-sm font-bold text-on-surface">{worker.skill_level}</p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Availability</p>
              <p className={`text-sm font-bold ${worker.available ? 'text-green-600' : 'text-on-surface-variant'}`}>
                {worker.available ? '✓ Available Now' : '✗ Currently Busy'}
              </p>
            </div>
          </div>

          {/* Past Projects */}
          {worker.past_projects && worker.past_projects.length > 0 && (
            <div>
              <h4 className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em] mb-3">Recent Projects</h4>
              <div className="space-y-2">
                {worker.past_projects.map((proj, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl border border-outline-variant">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white shrink-0"><Award size={16} /></div>
                      <div>
                        <p className="font-bold text-sm text-on-surface">{proj.name}</p>
                        <p className="text-[10px] text-on-surface-variant">{proj.role}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-full">{proj.year}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────── */
const ContractorFindLabourers = () => {
  const [workers, setWorkers] = useState(fallbackLabourers);
  const [selectedLabourers, setSelectedLabourers] = useState([]);
  const [flyTarget, setFlyTarget] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usingDb, setUsingDb] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterSkillLevel, setFilterSkillLevel] = useState('');
  const [filterRegion, setFilterRegion] = useState('');

  /* Fetch workers from API */
  const fetchWorkers = async (params = {}) => {
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      if (params.q) qs.set('q', params.q);
      if (params.skill) qs.set('skill', params.skill);
      if (params.region) qs.set('region', params.region);
      if (params.skill_level) qs.set('skill_level', params.skill_level);

      const res = await fetch(`${API_BASE}/workers?${qs.toString()}`);
      const data = await res.json();

      if (data.workers && data.workers.length > 0) {
        setWorkers(data.workers);
        setUsingDb(true);
      } else {
        // Fallback: apply local filters to hardcoded data
        let filtered = [...fallbackLabourers];
        if (params.q) {
          const q = params.q.toLowerCase();
          filtered = filtered.filter(w =>
            w.name.toLowerCase().includes(q) ||
            w.role.toLowerCase().includes(q) ||
            w.skills.some(s => s.toLowerCase().includes(q))
          );
        }
        if (params.skill) {
          const s = params.skill.toLowerCase();
          filtered = filtered.filter(w => w.skills.some(sk => sk.toLowerCase().includes(s)));
        }
        if (params.region) {
          filtered = filtered.filter(w => w.region === params.region);
        }
        if (params.skill_level) {
          filtered = filtered.filter(w => w.skill_level === params.skill_level);
        }
        setWorkers(filtered);
        setUsingDb(false);
      }
    } catch (err) {
      console.log('API unavailable, using hardcoded workers.');
      setWorkers(fallbackLabourers);
      setUsingDb(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWorkers(); }, []);

  const handleApplyFilters = () => {
    fetchWorkers({
      q: searchQuery || undefined,
      skill: filterCategory || undefined,
      region: filterRegion || undefined,
      skill_level: filterSkillLevel || undefined,
    });
  };

  const handleReset = () => {
    setSearchQuery('');
    setFilterCategory('');
    setFilterSkillLevel('');
    setFilterRegion('');
    fetchWorkers();
  };

  const toggleLabourer = (id) => {
    setSelectedLabourers(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleRegionClick = (region) => {
    setFlyTarget([region.lat, region.lng]);
    setHoveredRegion(region.id);
    setFilterRegion(region.name);
  };

  const totalLabourers = regionData.reduce((sum, r) => sum + r.count, 0);

  return (
    <div className="flex-1 min-h-screen pb-10">
      <header className="flex justify-between items-center px-10 py-6 mb-8 bg-transparent">
        <h2 className="text-3xl font-bold text-on-surface">Find Labourers</h2>
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface" size={18} />
            <input
              type="text"
              placeholder="Search by name, role, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
              className="pl-10 pr-4 py-2 bg-white rounded-xl border-none focus:ring-2 focus:ring-brand-primary/20 w-80 shadow-sm"
            />
          </div>
        </div>
      </header>

      <main className="px-10">
        <div className="flex justify-between items-center mb-10">
          <p className="text-sm text-on-surface-variant font-medium tracking-tight">
            Showing <span className="font-bold text-on-surface">{workers.length}</span> labourers
            {!usingDb && ' (demo data)'}
          </p>
          <button 
            disabled={selectedLabourers.length === 0}
            className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
              selectedLabourers.length > 0 ? 'bg-brand-primary text-white active:scale-95' : 'bg-gray-200 text-on-surface cursor-not-allowed'
            }`}
          >
            <UserPlus size={20} />
            Hire Selected ({selectedLabourers.length})
          </button>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-grow space-y-8">
            
            {/* Map */}
            <div className="w-full rounded-2xl overflow-hidden card-shadow border border-outline-variant relative">
              <div className="absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-outline-variant">
                <p className="text-[9px] font-black text-on-surface uppercase tracking-[0.2em] mb-3">Labour Density</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-black"></div><span className="text-[10px] text-on-surface-variant font-medium">High (80+)</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#3f3f46]"></div><span className="text-[10px] text-on-surface-variant font-medium">Medium (40–80)</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#71717a]"></div><span className="text-[10px] text-on-surface-variant font-medium">Low (&lt;40)</span></div>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 z-[1000] bg-black/80 backdrop-blur-md rounded-xl px-5 py-3 flex items-center gap-6">
                <div className="flex items-center gap-2"><Users size={14} className="text-white/70" /><span className="text-white text-xs font-bold">{totalLabourers} Workers</span></div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="flex items-center gap-2"><MapPin size={14} className="text-white/70" /><span className="text-white text-xs font-bold">{regionData.length} Regions</span></div>
              </div>
              <MapContainer center={[19.076, 72.8777]} zoom={11} scrollWheelZoom={true} style={{ height: '420px', width: '100%' }} className="rounded-2xl" zoomControl={false}>
                <TileLayer attribution='&copy; CARTO' url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                <FlyToRegion center={flyTarget} />
                {regionData.map(region => (
                  <CircleMarker
                    key={region.id}
                    center={[region.lat, region.lng]}
                    radius={getRadius(region.count)}
                    pathOptions={{
                      color: hoveredRegion === region.id ? '#000' : getColor(region.count),
                      fillColor: getColor(region.count),
                      fillOpacity: hoveredRegion === region.id ? 0.7 : 0.45,
                      weight: hoveredRegion === region.id ? 3 : 1.5,
                    }}
                    eventHandlers={{
                      click: () => handleRegionClick(region),
                      mouseover: () => setHoveredRegion(region.id),
                      mouseout: () => setHoveredRegion(null),
                    }}
                  >
                    <Popup>
                      <div className="text-center min-w-[140px]">
                        <p className="font-bold text-sm text-on-surface mb-1">{region.name}</p>
                        <div className="flex items-center justify-center gap-1.5 text-on-surface-variant">
                          <Users size={13} /><span className="text-xs font-bold">{region.count} labourers</span>
                        </div>
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>

            {/* Region Chips */}
            <div className="flex flex-wrap gap-2">
              {regionData.sort((a, b) => b.count - a.count).map(region => (
                <button
                  key={region.id}
                  onClick={() => handleRegionClick(region)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                    filterRegion === region.name
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-on-surface border-outline-variant hover:border-black'
                  }`}
                >
                  {region.name} · <span className="font-black">{region.count}</span>
                </button>
              ))}
            </div>

            {/* Workers Grid */}
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center">
                <Loader2 size={32} className="animate-spin text-on-surface-variant mb-4" />
                <p className="text-sm text-on-surface-variant font-medium">Loading workers...</p>
              </div>
            ) : workers.length > 0 ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {workers.map((worker) => (
                  <motion.div key={worker.id} whileHover={{ y: -4 }} className="bg-white p-6 rounded-2xl card-shadow border border-gray-50 flex flex-col gap-5 group">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center text-xl font-bold shadow-sm shrink-0 border border-outline-variant">
                          {worker.avatar || worker.name?.split(' ').map(n => n[0]).join('').slice(0,2)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-on-surface">{worker.name}</h3>
                            {worker.is_verified && <ShieldCheck size={16} className="text-on-surface" />}
                          </div>
                          <p className="text-sm text-on-surface-variant mb-2">{worker.role}</p>
                          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-wider">
                            <div className="flex items-center gap-1 text-amber-500"><Star size={14} fill="currentColor" /> {worker.rating}</div>
                            <div className="flex items-center gap-1 text-on-surface-variant"><MapPin size={14} /> {worker.region || worker.location}</div>
                            <div className="flex items-center gap-1 text-on-surface-variant"><Clock size={14} /> {worker.experience_years}yr</div>
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

                    {/* Skills Preview */}
                    {worker.skills && worker.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {worker.skills.slice(0, 3).map(s => (
                          <span key={s} className="px-3 py-1 bg-surface-container-low rounded-full text-[10px] font-bold text-on-surface-variant border border-outline-variant">{s}</span>
                        ))}
                        {worker.skills.length > 3 && (
                          <span className="px-3 py-1 bg-surface-container-low rounded-full text-[10px] font-bold text-on-surface-variant">+{worker.skills.length - 3}</span>
                        )}
                      </div>
                    )}

                    <div className="flex gap-3 pt-4 border-t border-gray-50">
                      <button 
                        onClick={() => setSelectedWorker(worker)}
                        className="flex-1 px-4 py-2.5 bg-white text-on-surface rounded-xl text-sm font-bold hover:bg-surface-container-low transition-colors border border-outline-variant flex items-center justify-center gap-2"
                      >
                        View Profile <ChevronRight size={14} />
                      </button>
                      <button className="flex-1 px-4 py-2.5 bg-brand-primary text-white rounded-xl text-sm font-bold shadow-sm hover:opacity-90 transition-opacity">
                        Hire
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-outline-variant">
                <Users size={48} className="mx-auto text-on-surface opacity-20 mb-4" />
                <p className="text-on-surface font-medium">No workers found matching your filters.</p>
                <button onClick={handleReset} className="mt-4 text-sm font-bold text-primary underline underline-offset-4">Reset Filters</button>
              </div>
            )}
          </div>

          {/* Filter Panel */}
          <aside className="w-80 shrink-0">
            <div className="bg-white p-8 rounded-2xl card-shadow sticky top-10 border border-gray-50">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-on-surface flex items-center gap-2"><Filter size={18} /> Filters</h3>
                <button onClick={handleReset} className="text-[10px] font-black text-on-surface uppercase tracking-widest hover:underline">Reset</button>
              </div>
              <div className="space-y-7">
                {/* Skill / Category Search */}
                <div>
                  <label className="block text-[10px] font-black text-on-surface uppercase tracking-widest mb-3">Skill / Category</label>
                  <input
                    type="text"
                    value={filterCategory}
                    onChange={e => setFilterCategory(e.target.value)}
                    placeholder="e.g. Electrical, Plumbing..."
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-brand-primary/20 placeholder:text-on-surface-variant"
                  />
                </div>

                {/* Skill Level */}
                <div>
                  <label className="block text-[10px] font-black text-on-surface uppercase tracking-widest mb-3">Skill Level</label>
                  <div className="space-y-3">
                    {['Master / Expert', 'Journeyman', 'Apprentice'].map((level) => (
                      <label key={level} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="skillLevel"
                          checked={filterSkillLevel === level}
                          onChange={() => setFilterSkillLevel(filterSkillLevel === level ? '' : level)}
                          className="w-5 h-5 rounded border-gray-200 text-on-surface focus:ring-brand-primary" 
                        />
                        <span className="text-sm font-medium text-on-surface group-hover:text-on-surface transition-colors">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Region */}
                <div>
                  <label className="block text-[10px] font-black text-on-surface uppercase tracking-widest mb-3">Region</label>
                  <select 
                    value={filterRegion}
                    onChange={e => setFilterRegion(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-brand-primary/20"
                  >
                    <option value="">All Regions</option>
                    {regionData.sort((a,b) => b.count - a.count).map(r => (
                      <option key={r.id} value={r.name}>{r.name} ({r.count})</option>
                    ))}
                  </select>
                </div>

                <div className="bg-surface-container-low p-4 rounded-xl flex items-start gap-3 border border-outline-variant">
                  <Info className="text-on-surface-variant shrink-0 mt-0.5" size={14} />
                  <p className="text-[11px] font-medium text-on-surface-variant leading-relaxed">
                    Search by skill name or click a region on the map, then hit Apply to filter results from the database.
                  </p>
                </div>

                <button 
                  onClick={handleApplyFilters}
                  className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                  Apply Filters
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Worker Profile Modal */}
      {selectedWorker && (
        <WorkerProfileModal worker={selectedWorker} onClose={() => setSelectedWorker(null)} />
      )}
    </div>
  );
};

export default ContractorFindLabourers;
