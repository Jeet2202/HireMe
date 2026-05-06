import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MoreVertical, MapPin, Calendar, Users, DollarSign, CheckCircle2, XCircle, ChevronRight, Plus, Clock } from 'lucide-react';

const ContractorJobPosts = () => {
  const [activeTab, setActiveTab] = useState('Active');
  const [jobsData, setJobsData] = useState({
    'Active': [
      { id: 1, title: 'Senior Site Supervisor', category: 'Construction', location: 'North Harbor', wage: '$45.00/hr', range: 'Oct 12 - Oct 28', workers: '3 / 5 Filled' },
      { id: 2, title: 'Exterior Painting Team', category: 'Maintenance', location: 'Riverside Park', wage: '$32.00/hr', range: 'Nov 01 - Nov 05', workers: '0 / 4 Filled' },
    ],
    'Pending Applications': [
      { id: 3, title: 'Electrical Re-wiring', category: 'Electrical', location: 'Old Town', wage: '$40.00/hr', range: 'Oct 15 - Oct 20', applicants: 12 },
    ],
    'In Progress': [
      { id: 4, title: 'Concrete Masonry', category: 'Construction', location: 'Highway 101', wage: '$38.50/hr', progress: 75, deadline: '4 Days left' },
    ],
    'Completed': [],
    'Cancelled': []
  });

  const tabs = ['Active', 'Pending Applications', 'In Progress', 'Completed', 'Cancelled'];

  const moveJob = (jobId, fromStage, toStage) => {
    const jobToMove = jobsData[fromStage].find(j => j.id === jobId);
    if (!jobToMove) return;

    setJobsData(prev => ({
      ...prev,
      [fromStage]: prev[fromStage].filter(j => j.id !== jobId),
      [toStage]: [...prev[toStage], { ...jobToMove, progress: toStage === 'In Progress' ? 0 : undefined }]
    }));
    setActiveTab(toStage);
  };

  return (
    <div className="flex-1 min-h-screen pb-10">
      <header className="flex justify-between items-center px-10 py-6 mb-8">
        <h2 className="text-3xl font-bold text-on-surface">Job Posts</h2>
        <button className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:opacity-90 active:scale-95 transition-all">
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
          {/* Main Pipeline List */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                {(jobsData[activeTab] || []).length > 0 ? (
                  jobsData[activeTab].map((job) => (
                    <div key={job.id} className="bg-white rounded-2xl p-8 card-shadow flex flex-col gap-6 group hover:border-brand-primary/20 border border-transparent transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-brand-background text-on-surface text-[10px] font-black uppercase tracking-widest rounded-full">{job.category}</span>
                            <span className="text-[10px] font-bold text-on-surface">Job ID: #{1000 + job.id}</span>
                          </div>
                          <h3 className="text-2xl font-bold text-on-surface">{job.title}</h3>
                        </div>
                        <button className="text-on-surface hover:text-on-surface transition-colors">
                          <MoreVertical size={20} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-gray-50">
                        <InfoItem label="Daily Wage" value={job.wage} />
                        <InfoItem label="Location" value={job.location} />
                        {job.range && <InfoItem label="Date Range" value={job.range} />}
                        {job.workers && <InfoItem label="Workers" value={job.workers} />}
                        {job.deadline && <InfoItem label="Remaining" value={job.deadline} />}
                        {job.applicants && <InfoItem label="Applicants" value={job.applicants} />}
                      </div>

                      {job.progress !== undefined ? (
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-on-surface uppercase tracking-tighter">Project Completion</span>
                            <span className="text-on-surface">{job.progress}%</span>
                          </div>
                          <div className="h-2 w-full bg-white rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${job.progress}%` }}
                              className="h-full bg-brand-primary rounded-full transition-all duration-1000" 
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex -space-x-3">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold bg-black text-white shadow-sm shrink-0">
                                W{i}
                              </div>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-white bg-brand-background flex items-center justify-center text-[10px] font-black text-on-surface">+2</div>
                          </div>
                          <div className="flex gap-3">
                            {activeTab === 'Pending Applications' ? (
                              <>
                                <button onClick={() => moveJob(job.id, activeTab, 'Cancelled')} className="px-6 py-2 border border-gray-100 rounded-xl text-xs font-bold text-on-surface hover:bg-white transition-colors uppercase tracking-widest">Reject All</button>
                                <button onClick={() => moveJob(job.id, activeTab, 'In Progress')} className="px-6 py-2 bg-brand-primary text-white rounded-xl text-xs font-bold shadow-sm hover:opacity-90 transition-opacity uppercase tracking-widest">Approve Applications</button>
                              </>
                            ) : (
                              <button className="px-6 py-2 bg-white text-on-surface rounded-xl text-xs font-bold hover:bg-white transition-colors uppercase tracking-widest">Manage Post</button>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {activeTab === 'In Progress' && (
                        <div className="flex justify-end pt-2">
                           <button onClick={() => moveJob(job.id, activeTab, 'Completed')} className="px-8 py-3 bg-brand-primary text-white rounded-xl font-bold text-sm shadow-md hover:bg-brand-primary/95 transition-all hover:text-white">MARK COMPLETED</button>
                        </div>
                      )}
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
            <div className="bg-white rounded-2xl p-8 card-shadow card-shadow">
              <h4 className="text-lg font-bold text-on-surface mb-8 underline decoration-brand-background decoration-4 underline-offset-8">Pipeline Overview</h4>
              <div className="space-y-4">
                <StatRow icon={<CheckCircle2 className="text-on-surface" />} label="New Applicants" value="24" color="bg-brand-background" />
                <StatRow icon={<Clock className="text-on-surface" />} label="Active Tasks" value="08" color="bg-white" />
                <StatRow icon={<DollarSign className="text-on-surface" />} label="Ready to Payout" value="12" color="bg-brand-background" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 card-shadow card-shadow flex-grow">
              <h4 className="text-lg font-bold text-on-surface mb-8 underline decoration-brand-background decoration-4 underline-offset-8">Recent Activity</h4>
              <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white">
                <ActivityItem icon={<UserSearch className="text-on-surface" size={12} />} text="Marc S. applied for Masonry" time="15 minutes ago" color="border-brand-primary" />
                <ActivityItem icon={<CheckCircle2 className="text-green-500" size={12} />} text="Roofing project marked completed" time="2 hours ago" color="border-green-500" />
                <ActivityItem icon={<XCircle className="text-red-500" size={12} />} text="Job cancelled: Interior Painting" time="Yesterday" color="border-red-500" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-[10px] font-black text-on-surface uppercase tracking-widest mb-1">{label}</span>
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

const ActivityItem = ({ icon, text, time, color }) => (
  <div className="flex gap-6 relative z-10">
    <div className={`w-10 h-10 rounded-full bg-white border-2 ${color} flex items-center justify-center shadow-sm`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-bold text-on-surface">{text}</p>
      <p className="text-[10px] font-semibold text-on-surface uppercase tracking-tighter">{time}</p>
    </div>
  </div>
);

const UserSearch = ({ ...props }) => <Users {...props} />;

export default ContractorJobPosts;


