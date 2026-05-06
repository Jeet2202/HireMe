import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle, 
  Users, 
  CheckCircle2, 
  TrendingUp, 
  Info,
  DollarSign,
  Send,
  Search,
  Briefcase
} from 'lucide-react';

const mockJobs = [
  { 
    id: 'JOB-8842', 
    title: 'Main Warehouse Logistics', 
    allocation: 42, 
    required: 120, 
    description: 'Handling high-volume inventory intake, sorting, and dispatch coordination for the Q4 retail surge.',
    matches: 51,
    wage: '$22.50 / hr',
    timeToFill: '4.2 Days (Est)',
    status: 'Alert'
  },
  { 
    id: 'JOB-9210', 
    title: 'Terminal C Site Crew', 
    allocation: 92, 
    required: 45, 
    description: 'Ground support for terminal construction and waste management during expansion phase.',
    matches: 41,
    wage: '$19.00 / hr',
    timeToFill: '1.2 Days (Est)',
    status: 'Healthy'
  },
  { 
    id: 'JOB-7731', 
    title: 'Data Center Infrastructure', 
    allocation: 68, 
    required: 200, 
    description: 'Hardware deployment and cabling for Tier-3 data center facility expansion.',
    matches: 136,
    wage: '$31.00 / hr',
    timeToFill: '5.8 Days (Est)',
    status: 'Active'
  },
];

const AdminJobManagement = () => {
  const [expandedJob, setExpandedJob] = useState('JOB-8842');

  const stats = [
    { label: 'Active Jobs', value: '24', icon: Briefcase, bg: 'bg-primary/10', color: 'text-on-surface' },
    { label: 'Total Workers', value: '1,402', icon: Users, bg: 'bg-secondary/10', color: 'text-on-surface' },
    { label: 'Fulfillment Rate', value: '82%', icon: CheckCircle2, bg: 'bg-primary-container/10', color: 'text-on-surface-container' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-bold text-on-surface tracking-tight">Job Management</h2>
          <p className="text-on-surface-variant mt-2 text-lg">Monitor and manage operational worker allocation across active contracts.</p>
        </div>
        <button className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-primary-container hover:text-white">
          <Plus size={20} />
          Create New Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface p-6 rounded-xl custom-card-shadow flex items-center gap-4">
            <div className={`p-3 rounded-full ${stat.bg} ${stat.color}`}>
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-bold text-on-surface leading-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {mockJobs.map((job) => (
          <div 
            key={job.id} 
            className={`bg-surface rounded-xl custom-card-shadow overflow-hidden transition-all duration-300 border-l-4 ${job.allocation < 50 ? 'border-black border-dashed' : 'border-primary'}`}
          >
            <div 
              onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
              className="p-6 cursor-pointer flex items-center justify-between"
            >
              <div className="flex-1 grid grid-cols-4 gap-4 items-center">
                <div>
                  <h3 className="font-bold text-on-surface">{job.title}</h3>
                  <p className="text-xs text-on-surface-variant">ID: #{job.id}</p>
                </div>
                <div className="px-4">
                  <div className="flex justify-between text-[10px] font-bold text-on-surface-variant mb-1 uppercase">
                    <span>Allocation</span>
                    <span className="text-on-surface">{job.allocation}%</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${job.allocation}%` }}
                      className={`h-full rounded-full ${job.allocation < 50 ? 'bg-black/60' : 'bg-primary'}`}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-outline uppercase tracking-wider">Required</p>
                  <p className="text-lg font-bold text-on-surface">{job.required}</p>
                </div>
                <div className="flex justify-center">
                  {job.allocation < 50 ? (
                    <div className="flex items-center gap-2 px-4 py-2 border border-outline rounded-lg bg-white text-black font-bold">
                      <AlertCircle size={16} />
                      <span className="text-xs font-bold uppercase">Worker Shortage Detected</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 border border-secondary-container/30 rounded-lg bg-surface-bright text-on-surface-variant">
                      <CheckCircle2 size={16} className="text-on-surface" />
                      <span className="text-xs font-bold uppercase">{job.allocation >= 90 ? 'Target Reached' : 'Hiring Active'}</span>
                    </div>
                  )}
                </div>
              </div>
              {expandedJob === job.id ? <ChevronUp size={20} className="text-outline" /> : <ChevronDown size={20} className="text-outline" />}
            </div>

            <AnimatePresence>
              {expandedJob === job.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-surface-container bg-surface-bright/50"
                >
                  <div className="p-8 grid grid-cols-12 gap-8">
                    <div className="col-span-8 space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-xl border border-secondary-container/20">
                          <p className="text-[10px] font-bold text-outline uppercase mb-3">Job Description</p>
                          <p className="text-sm text-on-surface leading-relaxed">{job.description}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-secondary-container/20">
                          <p className="text-[10px] font-bold text-outline uppercase mb-3 text-right">Activity Status</p>
                          <div className="flex justify-end -space-x-3 overflow-hidden mb-4">
                            {[1, 2, 3, 4, 5].map(i => (
                              <div key={i} className="w-8 h-8 rounded-full bg-primary-container border-2 border-white flex items-center justify-center text-[10px] text-white">W{i}</div>
                            ))}
                          </div>
                          <p className="text-xs font-medium text-on-surface-variant text-right">{job.matches} matches found in the vicinity.</p>
                        </div>
                      </div>
                      <div className="flex gap-4 pt-4">
                        <button className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold flex items-center gap-2 hover:bg-primary-container hover:text-white">
                          <DollarSign size={18} />
                          Increase Wage (+15%)
                        </button>
                        <button className="px-6 py-3 border border-primary text-white rounded-xl font-bold flex items-center gap-2 hover:bg-primary/5 hover:text-white">
                          <Send size={18} />
                          Notify Available Workers
                        </button>
                      </div>
                    </div>
                    <div className="col-span-4 flex flex-col gap-4">
                      <div className="bg-primary text-on-primary p-6 rounded-xl shadow-xl flex-1">
                        <h4 className="text-xs font-bold mb-6 flex items-center gap-2 uppercase opacity-60">
                          <TrendingUp size={16} />
                          Real-time Monitoring
                        </h4>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-sm">
                            <span className="opacity-70">Shift Fulfillment:</span>
                            <span className={`font-bold text-white`}>{job.allocation < 50 ? 'Critical' : 'Healthy'}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="opacity-70">Current Wage:</span>
                            <span className="font-bold">{job.wage}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="opacity-70">Time to Fill:</span>
                            <span className="font-bold">{job.timeToFill}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="bg-primary text-on-primary px-8 py-4 rounded-full custom-card-shadow flex justify-between items-center">
        <div className="flex gap-8 items-center">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Status Indicators</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <span className="text-xs">Critical Shortage (&lt;50%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary-container"></div>
            <span className="text-xs">Healthy Deployment</span>
          </div>
        </div>
        <div className="flex items-center gap-2 opacity-60 text-xs">
          <Info size={14} />
          <span>System updated 2 minutes ago</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminJobManagement;


