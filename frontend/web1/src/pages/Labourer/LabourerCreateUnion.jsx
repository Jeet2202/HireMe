import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Plus,
  Minus,
  Search,
  Star,
  MapPin,
  Shield,
  Settings,
  UserPlus,
  Trash2,
  Edit3,
  ChevronRight,
  Info,
  Crown,
  Award,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';

/* ── Mock Data ─────────────────────────────────────────────── */

const existingUnions = [
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

const availableHelpers = [
  { id: 101, name: 'James Wright', skill: 'Mason', rating: 4.5, location: 'Seattle, WA', available: true },
  { id: 102, name: 'Lena Petrova', skill: 'Carpenter', rating: 4.9, location: 'Tacoma, WA', available: true },
  { id: 103, name: 'Carlos Mendez', skill: 'Electrician', rating: 4.7, location: 'Bellevue, WA', available: true },
  { id: 104, name: 'Aisha Patel', skill: 'Plumber', rating: 4.3, location: 'Seattle, WA', available: false },
  { id: 105, name: 'Tom Harris', skill: 'General Labour', rating: 4.6, location: 'Portland, OR', available: true },
  { id: 106, name: 'Nina Chen', skill: 'HVAC Tech', rating: 4.8, location: 'Seattle, WA', available: true },
];

/* ── Component ─────────────────────────────────────────────── */

export default function LabourerCreateUnion() {
  const [activeTab, setActiveTab] = useState('my-unions'); // 'my-unions' | 'create'
  const [unionName, setUnionName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [maxCapacity, setMaxCapacity] = useState(10);
  const [location, setLocation] = useState('');
  const [selectedHelpers, setSelectedHelpers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleHelper = (id) => {
    setSelectedHelpers((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
  };

  const filteredHelpers = availableHelpers.filter(
    (h) =>
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateUnion = () => {
    if (!unionName.trim()) return;
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setActiveTab('my-unions');
      setUnionName('');
      setSpecialization('');
      setMaxCapacity(10);
      setLocation('');
      setSelectedHelpers([]);
    }, 2500);
  };

  return (
    <div className="flex-1 p-8 space-y-8 animate-in fade-in duration-500 bg-gradient-to-br from-white to-[#f4f4f5] min-h-screen">
      {/* ── Header ──────────────────────────────────────────── */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-on-surface">Union Portal</h1>
          <p className="text-on-surface mt-1">
            Create and manage your helper groups. Contractors can request helpers from your unions.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant rounded-full shadow-sm">
            <Users size={16} className="text-on-surface" />
            <span className="text-xs font-bold text-on-surface">
              {existingUnions.reduce((s, u) => s + u.members, 0)} Total Members
            </span>
          </div>
        </div>
      </header>

      {/* ── Tab Switcher ────────────────────────────────────── */}
      <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-outline-variant w-fit card-shadow">
        {[
          { key: 'my-unions', label: 'My Unions' },
          { key: 'create', label: 'Create New Union' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
              activeTab === tab.key
                ? 'bg-primary text-white shadow-lg'
                : 'text-on-surface hover:bg-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── My Unions Tab ───────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {activeTab === 'my-unions' && (
          <motion.div
            key="my-unions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* KPI Strip */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-outline-variant card-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-primary rounded-xl">
                    <Users className="text-white" size={22} />
                  </div>
                </div>
                <p className="text-xs font-medium text-on-surface uppercase tracking-wider">Active Unions</p>
                <h3 className="text-3xl font-bold text-on-surface mt-1">{existingUnions.length}</h3>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-outline-variant card-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-surface-container-high rounded-xl">
                    <UserPlus className="text-on-surface" size={22} />
                  </div>
                  <span className="bg-surface-container-high text-on-surface text-xs font-bold px-3 py-1 rounded-full">
                    +4 This Week
                  </span>
                </div>
                <p className="text-xs font-medium text-on-surface uppercase tracking-wider">Total Members</p>
                <h3 className="text-3xl font-bold text-on-surface mt-1">
                  {existingUnions.reduce((s, u) => s + u.members, 0)}
                </h3>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-outline-variant card-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-[#fcdfa9] rounded-xl">
                    <TrendingUp className="text-[#180f00]" size={22} />
                  </div>
                </div>
                <p className="text-xs font-medium text-on-surface uppercase tracking-wider">Pending Requests</p>
                <h3 className="text-3xl font-bold text-on-surface mt-1">
                  {existingUnions.reduce((s, u) => s + u.pendingRequests, 0)}
                </h3>
              </div>

              <div className="bg-primary text-white p-6 rounded-2xl card-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Award className="text-white" size={22} />
                  </div>
                </div>
                <p className="text-xs font-medium text-white/70 uppercase tracking-wider">Completed Jobs</p>
                <h3 className="text-3xl font-bold mt-1">
                  {existingUnions.reduce((s, u) => s + u.completedJobs, 0)}
                </h3>
              </div>
            </div>

            {/* Union Cards */}
            <div className="space-y-6">
              {existingUnions.map((union) => (
                <motion.div
                  key={union.id}
                  whileHover={{ y: -2 }}
                  className="bg-white p-8 rounded-2xl border border-outline-variant card-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-6">
                      <div className="w-20 h-20 rounded-2xl bg-primary text-white flex items-center justify-center text-2xl font-bold shrink-0">
                        {union.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .substring(0, 2)}
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
          </motion.div>
        )}

        {/* ── Create New Union Tab ──────────────────────────── */}
        {activeTab === 'create' && (
          <motion.div
            key="create"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            <div className="flex gap-8">
              {/* Form Panel */}
              <div className="flex-grow space-y-6">
                <div className="bg-white p-8 rounded-2xl border border-outline-variant card-shadow">
                  <h3 className="text-xl font-bold text-on-surface mb-6">Union Details</h3>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-black text-on-surface uppercase tracking-widest mb-3">
                        Union Name
                      </label>
                      <input
                        type="text"
                        value={unionName}
                        onChange={(e) => setUnionName(e.target.value)}
                        placeholder="e.g. Downtown Builders Collective"
                        className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-on-surface uppercase tracking-widest mb-3">
                          Specialization
                        </label>
                        <select
                          value={specialization}
                          onChange={(e) => setSpecialization(e.target.value)}
                          className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="">Select Specialization</option>
                          <option>General Construction</option>
                          <option>Electrical</option>
                          <option>Plumbing</option>
                          <option>Masonry</option>
                          <option>Carpentry</option>
                          <option>HVAC</option>
                          <option>Landscaping</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-on-surface uppercase tracking-widest mb-3">
                          Location
                        </label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. Seattle, WA"
                          className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-on-surface uppercase tracking-widest mb-3">
                        Maximum Capacity (How many helpers can you provide?)
                      </label>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setMaxCapacity((p) => Math.max(1, p - 1))}
                          className="w-12 h-12 flex items-center justify-center bg-white border border-outline-variant rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <Minus size={18} />
                        </button>
                        <div className="flex-1 bg-white border border-outline-variant rounded-xl px-6 py-3.5 text-center">
                          <span className="text-3xl font-bold text-on-surface">{maxCapacity}</span>
                          <p className="text-[10px] font-bold text-on-surface uppercase tracking-widest mt-1">Helpers</p>
                        </div>
                        <button
                          onClick={() => setMaxCapacity((p) => Math.min(100, p + 1))}
                          className="w-12 h-12 flex items-center justify-center bg-white border border-outline-variant rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                      {/* Quick set buttons */}
                      <div className="flex gap-2 mt-3">
                        {[5, 10, 20, 50].map((n) => (
                          <button
                            key={n}
                            onClick={() => setMaxCapacity(n)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                              maxCapacity === n
                                ? 'bg-primary text-white'
                                : 'bg-white border border-outline-variant text-on-surface hover:bg-gray-50'
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add Members Section */}
                <div className="bg-white p-8 rounded-2xl border border-outline-variant card-shadow">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-on-surface">Add Members</h3>
                    <span className="text-sm font-bold text-on-surface">
                      {selectedHelpers.length} / {maxCapacity} selected
                    </span>
                  </div>

                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface" size={18} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search helpers by name or skill..."
                      className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>

                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {filteredHelpers.map((helper) => {
                      const isSelected = selectedHelpers.includes(helper.id);
                      const isDisabled = !helper.available;
                      return (
                        <motion.div
                          key={helper.id}
                          whileHover={{ x: isDisabled ? 0 : 4 }}
                          onClick={() => !isDisabled && toggleHelper(helper.id)}
                          className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                            isDisabled
                              ? 'opacity-40 cursor-not-allowed border-outline-variant bg-gray-50'
                              : isSelected
                              ? 'border-primary bg-primary/5'
                              : 'border-outline-variant bg-white hover:border-primary/30'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                                isSelected
                                  ? 'bg-primary text-white'
                                  : 'bg-surface-container-high text-on-surface'
                              }`}
                            >
                              {helper.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </div>
                            <div>
                              <p className="font-bold text-on-surface">{helper.name}</p>
                              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-wider mt-1">
                                <span className="text-on-surface">{helper.skill}</span>
                                <span className="flex items-center gap-1 text-amber-500">
                                  <Star size={10} fill="currentColor" /> {helper.rating}
                                </span>
                                <span className="flex items-center gap-1 text-on-surface">
                                  <MapPin size={10} /> {helper.location}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div>
                            {isDisabled ? (
                              <span className="text-[10px] font-bold uppercase text-on-surface">Unavailable</span>
                            ) : isSelected ? (
                              <CheckCircle size={22} className="text-primary" />
                            ) : (
                              <Plus size={22} className="text-on-surface" />
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Summary Sidebar */}
              <aside className="w-80 shrink-0">
                <div className="bg-white p-8 rounded-2xl border border-outline-variant card-shadow sticky top-10 space-y-6">
                  <h3 className="text-lg font-bold text-on-surface">Union Summary</h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-on-surface">Name</span>
                      <span className="font-bold text-on-surface truncate max-w-[160px]">
                        {unionName || '—'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-on-surface">Specialization</span>
                      <span className="font-bold text-on-surface">{specialization || '—'}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-on-surface">Location</span>
                      <span className="font-bold text-on-surface">{location || '—'}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-on-surface">Max Capacity</span>
                      <span className="font-bold text-on-surface">{maxCapacity} helpers</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-on-surface">Members Added</span>
                      <span className="font-bold text-primary">{selectedHelpers.length}</span>
                    </div>
                  </div>

                  <div className="border-t border-outline-variant pt-6">
                    <p className="text-[10px] font-black text-on-surface uppercase tracking-widest mb-3">
                      Capacity Preview
                    </p>
                    <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{
                          width: `${(selectedHelpers.length / maxCapacity) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-on-surface mt-2">
                      {maxCapacity - selectedHelpers.length} slots remaining for contractor requests
                    </p>
                  </div>

                  <div className="bg-primary/5 p-4 rounded-xl flex items-start gap-3">
                    <Info className="text-on-surface shrink-0 mt-0.5" size={16} />
                    <p className="text-[11px] font-medium text-on-surface leading-relaxed opacity-80">
                      Contractors will see your union and can request up to{' '}
                      <strong>{maxCapacity - selectedHelpers.length}</strong> helpers. You'll receive
                      notifications for each request.
                    </p>
                  </div>

                  <button
                    onClick={handleCreateUnion}
                    disabled={!unionName.trim()}
                    className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${
                      unionName.trim()
                        ? 'bg-primary text-white shadow-lg active:scale-95'
                        : 'bg-surface-container-high text-on-surface cursor-not-allowed'
                    }`}
                  >
                    Create Union
                  </button>
                </div>
              </aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Success Toast ───────────────────────────────────── */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="fixed bottom-8 right-8 bg-primary text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-4 z-50"
          >
            <CheckCircle size={24} />
            <div>
              <p className="font-bold">Union Created Successfully!</p>
              <p className="text-sm text-white/70">Your union is now visible to contractors.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
