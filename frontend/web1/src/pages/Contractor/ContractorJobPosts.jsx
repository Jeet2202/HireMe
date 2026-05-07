import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MoreVertical, MapPin, Calendar, Users, DollarSign,
  CheckCircle2, XCircle, ChevronRight, Plus, Clock,
  X, Briefcase, Loader2, AlertTriangle, Zap, Tag, Wrench
} from 'lucide-react';
import { createJob, getContractorJobs, updateJob, deleteJob } from '../../services/api';

/* ─── Skill options for the multi-select ─────────────────── */
const SKILL_OPTIONS = [
  'masonry', 'concrete', 'painting', 'tiling', 'carpentry',
  'welding', 'plumbing', 'electrical', 'roofing', 'scaffolding',
  'demolition', 'landscaping', 'flooring', 'drywall', 'HVAC',
];

/* ─── Create Job Modal ───────────────────────────────────── */
function CreateJobModal({ onClose, onCreated }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Construction',
    required_skills: [],
    required_skill_level: 'intermediate',
    workers_needed: 1,
    budget_per_day: '',
    urgency: 'medium',
    location: '',
    latitude: 19.076,
    longitude: 72.8777,
    date_range: '',
    start_time: '08:00 AM',
  });

  const toggleSkill = (skill) => {
    setForm(prev => ({
      ...prev,
      required_skills: prev.required_skills.includes(skill)
        ? prev.required_skills.filter(s => s !== skill)
        : [...prev.required_skills, skill],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (form.required_skills.length === 0) {
      setError('Select at least one required skill.');
      return;
    }

    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const payload = {
        ...form,
        required_skills: form.required_skills.join(', '),
        budget_per_day: parseFloat(form.budget_per_day),
        contractor_id: user.id || '',
        contractor_name: user.name || '',
      };
      const result = await createJob(payload);
      onCreated(result.job);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create job.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar"
      >
        {/* Header */}
        <div className="bg-primary p-8 rounded-t-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full" />
          <button onClick={onClose} className="absolute top-5 right-5 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
            <X size={18} className="text-white" />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <Briefcase size={24} className="text-white" />
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">Post New Job</h2>
              <p className="text-white/70 text-sm">Fill in the details to find the perfect workers</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em]">Job Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Main Site Concrete Pour"
              className="w-full px-4 py-3.5 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em]">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the work, safety requirements, tools provided..."
              rows={3}
              className="w-full px-4 py-3.5 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm resize-none"
            />
          </div>

          {/* Category + Skill Level row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em]">Category</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3.5 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 text-sm bg-white"
              >
                <option value="Construction">Construction</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Electrical">Electrical</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Painting">Painting</option>
                <option value="Landscaping">Landscaping</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em]">Required Skill Level</label>
              <select
                value={form.required_skill_level}
                onChange={e => setForm({ ...form, required_skill_level: e.target.value })}
                className="w-full px-4 py-3.5 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 text-sm bg-white"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>

          {/* Required Skills — chip selector */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em]">Required Skills * <span className="text-on-surface-variant normal-case tracking-normal font-medium">(select all that apply)</span></label>
            <div className="flex flex-wrap gap-2">
              {SKILL_OPTIONS.map(skill => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                    form.required_skills.includes(skill)
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-on-surface border-outline-variant hover:border-black'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Workers needed + Budget row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em]">Workers Needed</label>
              <input
                type="number"
                min={1}
                max={50}
                value={form.workers_needed}
                onChange={e => setForm({ ...form, workers_needed: parseInt(e.target.value) || 1 })}
                className="w-full px-4 py-3.5 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em]">Budget / Day (INR) *</label>
              <input
                type="number"
                min={100}
                value={form.budget_per_day}
                onChange={e => setForm({ ...form, budget_per_day: e.target.value })}
                placeholder="e.g. 800"
                className="w-full px-4 py-3.5 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 text-sm"
                required
              />
            </div>
          </div>

          {/* Urgency */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em]">Urgency</label>
            <div className="flex gap-3">
              {[
                { value: 'low', label: 'Low', color: 'text-green-600 border-green-200 bg-green-50' },
                { value: 'medium', label: 'Medium', color: 'text-amber-600 border-amber-200 bg-amber-50' },
                { value: 'high', label: 'Urgent', color: 'text-red-600 border-red-200 bg-red-50' },
              ].map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm({ ...form, urgency: opt.value })}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${
                    form.urgency === opt.value
                      ? opt.color + ' ring-2 ring-current/20'
                      : 'text-on-surface-variant border-outline-variant bg-white hover:bg-surface-container-low'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em]">Location *</label>
            <input
              type="text"
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. North Harbor District, Mumbai"
              className="w-full px-4 py-3.5 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 text-sm"
              required
            />
          </div>

          {/* Date Range + Start Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em]">Date Range</label>
              <input
                type="text"
                value={form.date_range}
                onChange={e => setForm({ ...form, date_range: e.target.value })}
                placeholder="e.g. Oct 12 - Oct 28"
                className="w-full px-4 py-3.5 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em]">Start Time</label>
              <input
                type="text"
                value={form.start_time}
                onChange={e => setForm({ ...form, start_time: e.target.value })}
                placeholder="e.g. 08:00 AM"
                className="w-full px-4 py-3.5 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-xl">
              <AlertTriangle size={16} /> {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg active:scale-[0.98] transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? <><Loader2 size={18} className="animate-spin" /> Posting...</> : <><Plus size={18} /> Post Job</>}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

/* ─── Urgency Badge Component ────────────────────────────── */
function UrgencyBadge({ urgency }) {
  const styles = {
    low: 'bg-green-50 text-green-700',
    medium: 'bg-amber-50 text-amber-700',
    high: 'bg-red-50 text-red-700',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[urgency] || styles.medium}`}>
      {urgency === 'high' ? 'Urgent' : urgency}
    </span>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
const ContractorJobPosts = () => {
  const [activeTab, setActiveTab] = useState('Active');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allJobs, setAllJobs] = useState([]);

  const tabs = ['Active', 'In Progress', 'Completed', 'Cancelled'];

  /* Fetch contractor's jobs from API */
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user.id) {
        setAllJobs([]);
        return;
      }
      const data = await getContractorJobs(user.id);
      setAllJobs(data.jobs || []);
    } catch (err) {
      console.log('Failed to fetch jobs:', err.message);
      setAllJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  /* Filter by active tab — map tab names to status values */
  const statusMap = {
    'Active': 'Active',
    'In Progress': 'In Progress',
    'Completed': 'Completed',
    'Cancelled': 'Cancelled',
  };
  const filteredJobs = allJobs.filter(j => j.status === statusMap[activeTab]);

  /* Move a job to a different status */
  const moveJob = async (jobId, toStatus) => {
    try {
      await updateJob(jobId, { status: toStatus });
      setAllJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: toStatus } : j));
    } catch (err) {
      console.log('Failed to update job:', err.message);
    }
  };

  /* Handle new job created */
  const handleJobCreated = (newJob) => {
    setAllJobs(prev => [newJob, ...prev]);
    setActiveTab('Active');
  };

  /* Pipeline stats */
  const stats = {
    active: allJobs.filter(j => j.status === 'Active').length,
    inProgress: allJobs.filter(j => j.status === 'In Progress').length,
    completed: allJobs.filter(j => j.status === 'Completed').length,
  };

  return (
    <div className="flex-1 min-h-screen pb-10">
      <header className="flex justify-between items-center px-10 py-6 mb-8">
        <h2 className="text-3xl font-bold text-on-surface">Job Posts</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:opacity-90 active:scale-95 transition-all"
        >
          <Plus size={20} /> POST NEW JOB
        </button>
      </header>

      <main className="px-10 space-y-8">
        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-100 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold tracking-tight whitespace-nowrap transition-all relative ${
                activeTab === tab ? 'text-on-surface' : 'text-on-surface hover:text-on-surface-variant'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Main Job List */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                {loading ? (
                  <div className="py-20 flex flex-col items-center justify-center">
                    <Loader2 size={32} className="animate-spin text-on-surface-variant mb-4" />
                    <p className="text-sm text-on-surface-variant font-medium">Loading jobs...</p>
                  </div>
                ) : filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <div key={job.id} className="bg-white rounded-2xl p-8 card-shadow flex flex-col gap-6 group hover:border-brand-primary/20 border border-transparent transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-brand-background text-on-surface text-[10px] font-black uppercase tracking-widest rounded-full">{job.category}</span>
                            <UrgencyBadge urgency={job.urgency} />
                          </div>
                          <h3 className="text-2xl font-bold text-on-surface">{job.title}</h3>
                          {job.description && (
                            <p className="text-sm text-on-surface-variant mt-1 line-clamp-2">{job.description}</p>
                          )}
                        </div>
                        <button className="text-on-surface hover:text-on-surface transition-colors">
                          <MoreVertical size={20} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-gray-50">
                        <InfoItem icon={<DollarSign size={14} />} label="Budget/Day" value={`₹${job.budget_per_day}`} />
                        <InfoItem icon={<MapPin size={14} />} label="Location" value={job.location} />
                        {job.date_range && <InfoItem icon={<Calendar size={14} />} label="Date Range" value={job.date_range} />}
                        <InfoItem icon={<Users size={14} />} label="Workers" value={`${job.workers_filled || 0} / ${job.workers_needed} Filled`} />
                      </div>

                      {/* Skills */}
                      {job.required_skills && (
                        <div className="flex flex-wrap gap-1.5">
                          {job.required_skills.split(',').map(s => s.trim()).filter(Boolean).map(skill => (
                            <span key={skill} className="px-3 py-1 bg-surface-container-low rounded-full text-[10px] font-bold text-on-surface-variant border border-outline-variant">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center justify-end gap-3">
                        {activeTab === 'Active' && (
                          <>
                            <button onClick={() => moveJob(job.id, 'Cancelled')} className="px-6 py-2 border border-gray-100 rounded-xl text-xs font-bold text-on-surface hover:bg-white transition-colors uppercase tracking-widest">Cancel</button>
                            <button onClick={() => moveJob(job.id, 'In Progress')} className="px-6 py-2 bg-brand-primary text-white rounded-xl text-xs font-bold shadow-sm hover:opacity-90 transition-opacity uppercase tracking-widest">Start</button>
                          </>
                        )}
                        {activeTab === 'In Progress' && (
                          <button onClick={() => moveJob(job.id, 'Completed')} className="px-8 py-3 bg-brand-primary text-white rounded-xl font-bold text-sm shadow-md hover:bg-brand-primary/95 transition-all hover:text-white">MARK COMPLETED</button>
                        )}
                        {activeTab === 'Cancelled' && (
                          <button onClick={() => moveJob(job.id, 'Active')} className="px-6 py-2 border border-gray-100 rounded-xl text-xs font-bold text-on-surface hover:bg-white transition-colors uppercase tracking-widest">Restore</button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white/50 rounded-2xl p-20 flex flex-col items-center justify-center text-center opacity-50">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 text-on-surface">
                       <Plus size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-on-surface">No Jobs in this Stage</h3>
                    <p className="text-sm text-on-surface mt-2">Create a new post to populate your pipeline overview.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pipeline Stats Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-8 card-shadow">
              <h4 className="text-lg font-bold text-on-surface mb-8 underline decoration-brand-background decoration-4 underline-offset-8">Pipeline Overview</h4>
              <div className="space-y-4">
                <StatRow icon={<Briefcase className="text-on-surface" />} label="Active Posts" value={String(stats.active).padStart(2, '0')} color="bg-brand-background" />
                <StatRow icon={<Clock className="text-on-surface" />} label="In Progress" value={String(stats.inProgress).padStart(2, '0')} color="bg-white" />
                <StatRow icon={<CheckCircle2 className="text-on-surface" />} label="Completed" value={String(stats.completed).padStart(2, '0')} color="bg-brand-background" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 card-shadow flex-grow">
              <h4 className="text-lg font-bold text-on-surface mb-8 underline decoration-brand-background decoration-4 underline-offset-8">Quick Actions</h4>
              <div className="space-y-3">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="w-full p-4 bg-primary text-white rounded-2xl font-bold text-sm flex items-center gap-3 hover:opacity-90 transition-opacity"
                >
                  <Plus size={18} /> Post New Job
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Create Job Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <CreateJobModal
            onClose={() => setShowCreateModal(false)}
            onCreated={handleJobCreated}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex flex-col">
    <span className="text-[10px] font-black text-on-surface uppercase tracking-widest mb-1 flex items-center gap-1.5">{icon}{label}</span>
    <span className="text-sm font-bold text-on-surface">{value}</span>
  </div>
);

const StatRow = ({ icon, label, value, color }) => (
  <div className={`p-4 rounded-2xl flex items-center justify-between ${color}`}>
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <span className="text-sm font-bold text-on-surface">{label}</span>
    </div>
    <span className="text-lg font-black text-on-surface">{value}</span>
  </div>
);

export default ContractorJobPosts;
