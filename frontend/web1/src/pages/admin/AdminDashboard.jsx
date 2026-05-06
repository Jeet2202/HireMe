import React from 'react';
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
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { TrendingUp, Users, Briefcase, CheckCircle2, Info } from 'lucide-react';

const growthData = [
  { name: 'Jan', workers: 1200 },
  { name: 'Feb', workers: 1900 },
  { name: 'Mar', workers: 1500 },
  { name: 'Apr', workers: 2800 },
  { name: 'May', workers: 3200 },
  { name: 'Jun', workers: 2400 },
  { name: 'Jul', workers: 4200 },
];

const skillData = [
  { name: 'Specialized Tech', value: 42, color: '#1a1c1d' },
  { name: 'General Labor', value: 38, color: '#1a1c1d' },
  { name: 'Administration', value: 20, color: '#cec3d0' },
];

const AdminDashboard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-on-surface tracking-tight">Platform Overview</h2>
        <p className="text-on-surface-variant mt-2 text-lg">Real-time performance metrics and service delivery analytics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Workers', value: '12,482', trend: '+12%', icon: Users },
          { label: 'Total Contractors', value: '843', trend: '+5.2%', icon: Users },
          { label: 'Total Jobs', value: '45,102', trend: '98% Success', icon: Briefcase },
          { label: 'Active Bookings', value: '1,240', trend: 'Live Now', icon: CheckCircle2 },
        ].map((stat, i) => (
          <div key={i} className="bg-surface p-6 rounded-xl custom-card-shadow border-none">
            <div className="flex items-center justify-between mb-4">
              <stat.icon size={24} className="text-on-surface" />
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{stat.label.split(' ')[1]}</span>
            </div>
            <h3 className="text-3xl font-bold text-on-surface">{stat.value}</h3>
            <p className="text-sm font-bold text-on-surface mt-4 pt-4 border-t border-secondary-container/30">{stat.trend} from last period</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-surface p-8 rounded-xl custom-card-shadow">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="text-xl font-bold text-on-surface">Worker Growth Trends</h4>
              <p className="text-sm text-on-surface-variant">Monthly registration and onboarding velocity</p>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#efeded" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#4c444e', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#4c444e', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  cursor={{ fill: '#f4d9ff', opacity: 0.4 }}
                />
                <Bar dataKey="workers" fill="#1a1c1d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-surface p-8 rounded-xl custom-card-shadow">
          <h4 className="text-xl font-bold text-on-surface mb-2">Skill Distribution</h4>
          <p className="text-sm text-on-surface-variant mb-8">Workforce expertise breakdown</p>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skillData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {skillData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {skillData.map((skill, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: skill.color }}></div>
                  <span className="text-xs font-medium text-on-surface-variant">{skill.name}</span>
                </div>
                <span className="text-xs font-bold text-on-surface">{skill.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-primary p-8 rounded-xl custom-card-shadow text-white">
          <h4 className="text-xl font-bold mb-2">Success Velocity</h4>
          <p className="text-sm opacity-70 mb-8">Percentage of jobs completed without intervention</p>
          <div className="flex items-center justify-between">
            <div className="h-24 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <Line type="monotone" dataKey="workers" stroke="#ffffff" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-right">
              <span className="text-5xl font-bold block">99.4%</span>
              <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Active Rate</span>
            </div>
          </div>
          <div className="mt-8 flex gap-4">
            <button className="flex-1 py-3 bg-on-primary text-on-surface font-bold rounded-xl active:scale-95 transition-transform hover:bg-secondary-container">Download Report</button>
            <button className="flex-1 py-3 border border-on-primary text-on-surface font-bold rounded-xl active:scale-95 transition-transform hover:bg-white/10">View Details</button>
          </div>
        </div>

        <div className="bg-surface p-8 rounded-xl custom-card-shadow flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp size={32} className="text-on-surface" />
            <h3 className="text-xl font-bold text-on-surface">Platform Insights</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-secondary-container/30 bg-background-page/10">
              <p className="text-sm font-bold text-on-surface-variant uppercase mb-2">Supply Efficiency</p>
              <p className="text-sm text-on-background">Fulfillment speed increased by <span className="font-bold text-on-surface text-lg">14m</span> via matching engine.</p>
            </div>
            <div className="flex items-center gap-3 text-white bg-primary/5 p-4 rounded-xl">
              <Info size={20} />
              <p className="text-sm font-medium">Verification backlog reaching critical status. Review suggested.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;


