import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, CheckCircle, Clock, Download, Search, Settings, Bell, Building2, Briefcase } from 'lucide-react';

const ContractorDashboard = () => {
  const kpis = [
    { title: 'Active Jobs', value: '24', trend: '+12%', icon: <Clock className="text-[#391053]" />, color: 'bg-brand-secondary/10' },
    { title: 'Workers Hired', value: '156', trend: 'Stable', icon: <Users className="text-[#391053]" />, color: 'bg-brand-secondary/10' },
    { title: 'Completed Projects', value: '89', trend: '+5', icon: <CheckCircle className="text-[#391053]" />, color: 'bg-brand-secondary/10' },
  ];

  const recentPayments = [
    { date: 'Oct 12, 2023', description: 'Payroll - Site B Construction', amount: '$12,450.00', status: 'COMPLETED' },
    { date: 'Oct 10, 2023', description: 'Equipments Rental Fee', amount: '$2,100.00', status: 'COMPLETED' },
    { date: 'Oct 08, 2023', description: 'Contractor Platform Fee', amount: '$450.00', status: 'PENDING' },
  ];

  return (
    <div className="flex-1 min-h-screen pb-10">
      {/* Top Bar */}
      <header className="flex justify-between items-center px-10 py-6 mb-8">
        <h2 className="text-3xl font-bold text-[#391053]">Dashboard Overview</h2>
        <div className="flex items-center gap-6">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#391053]" size={18} />
            <input
              type="text"
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2 bg-white rounded-xl border-none focus:ring-2 focus:ring-brand-primary/20 w-64 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-4 text-[#391053]">
            <button className="p-2 hover:bg-white rounded-lg transition-colors"><Bell size={20} /></button>
            <button className="p-2 hover:bg-white rounded-lg transition-colors"><Settings size={20} /></button>
          </div>
        </div>
      </header>

      <div className="px-10 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((kpi, idx) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-xl card-shadow flex flex-col justify-between h-44"
            >
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-lg ${kpi.color}`}>{kpi.icon}</div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${kpi.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-brand-background text-[#391053]'}`}>
                  {kpi.trend}
                </span>
              </div>
              <div>
                <p className="text-[#391053] font-medium text-sm mb-1">{kpi.title}</p>
                <p className="text-4xl font-bold text-[#391053]">{kpi.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Middle Section: Profile & Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Company Profile Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 bg-white p-8 rounded-xl card-shadow"
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-[#391053]">
              <Building2 size={20} /> Company Profile
            </h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-brand-primary rounded-xl flex items-center justify-center text-[#391053] font-bold text-2xl">HS</div>
                <div>
                  <p className="font-bold text-[#391053]">HireMe Solutions Ltd.</p>
                  <p className="text-xs text-[#391053]">Enterprise Contractor</p>
                </div>
              </div>
              <div className="space-y-4 border-t border-gray-100 pt-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#391053] uppercase tracking-widest text-[10px] font-bold">Founder</span>
                  <span className="font-semibold text-[#391053]">Julian V. Hireme</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#391053] uppercase tracking-widest text-[10px] font-bold">Contact</span>
                  <span className="font-semibold text-[#391053]">j.hireme@corp.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#391053] uppercase tracking-widest text-[10px] font-bold">Status</span>
                  <span className="text-[10px] font-black text-[#391053] bg-brand-background px-2 py-0.5 rounded">VERIFIED</span>
                </div>
              </div>
              <button className="w-full mt-4 py-3 bg-brand-primary text-[#391053] rounded-xl font-bold hover:opacity-90 transition-opacity">Edit Profile</button>
            </div>
          </motion.div>

          {/* Jobs & Pipeline Summary */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-xl card-shadow flex-grow"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[#391053]">Live Job Pipeline</h3>
                <button className="text-xs font-bold text-[#391053] underline underline-offset-4">Manage All</button>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Senior Site Supervisor', status: 'ACTIVE', workers: '3/5', color: 'bg-green-100 text-green-700' },
                  { title: 'Electrical Re-wiring', status: 'PENDING', workers: '0/2', color: 'bg-amber-100 text-amber-700' },
                  { title: 'Concrete Masonry', status: 'IN PROGRESS', workers: '8/8', color: 'bg-brand-background text-[#391053]' },
                ].map((job, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl hover:bg-white transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#391053] shadow-sm group-hover:scale-110 transition-transform">
                        <Briefcase size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#391053]">{job.title}</p>
                        <p className="text-[10px] text-[#391053] font-medium">{job.workers} Workers assigned</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full ${job.color}`}>{job.status}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Payments Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl card-shadow overflow-hidden"
        >
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-[#391053]">Recent Payments</h3>
            <button className="text-[#391053] font-bold text-sm hover:underline">View All Statement</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/50">
                <tr>
                  <th className="px-8 py-4 text-[10px] font-black text-[#391053] uppercase tracking-widest">Transaction Date</th>
                  <th className="px-8 py-4 text-[10px] font-black text-[#391053] uppercase tracking-widest">Description</th>
                  <th className="px-8 py-4 text-[10px] font-black text-[#391053] uppercase tracking-widest">Amount</th>
                  <th className="px-8 py-4 text-[10px] font-black text-[#391053] uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-[10px] font-black text-[#391053] uppercase tracking-widest text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentPayments.map((payment, idx) => (
                  <tr key={idx} className="hover:bg-white transition-colors">
                    <td className="px-8 py-6 font-medium text-sm text-[#391053]">{payment.date}</td>
                    <td className="px-8 py-6 text-sm text-[#391053]">{payment.description}</td>
                    <td className="px-8 py-6 font-bold text-[#391053]">{payment.amount}</td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black ${
                        payment.status === 'COMPLETED' ? 'bg-brand-background text-[#391053]' : 'bg-white text-[#391053]'
                      }`}>
                        {payment.status === 'COMPLETED' && <CheckCircle size={10} />}
                        STATUS: {payment.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <button className="text-[#391053] hover:text-[#391053] transition-colors">
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContractorDashboard;


