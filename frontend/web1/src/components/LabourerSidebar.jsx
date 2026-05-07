import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  User, 
  ShieldCheck,
  Users,
  LogOut
} from 'lucide-react';

export default function LabourerSidebar() {
  const navItems = [
    { name: 'Dashboard',    path: '/labour/dashboard',       icon: LayoutDashboard },
    { name: 'Job Requests', path: '/labourer/job-requests',  icon: Briefcase },
    { name: 'Profile',      path: '/labourer/profile',       icon: User },
    { name: 'Verification', path: '/labourer/verification',  icon: ShieldCheck },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] flex flex-col bg-primary z-50 overflow-y-auto">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">HireMe Services</h1>
        <p className="text-white/70 text-xs uppercase tracking-wider mt-1">Labourer Module</p>
      </div>

      <nav className="flex-1 px-4 mt-8 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-white text-on-surface font-bold shadow-lg scale-95' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`
            }
          >
            <item.icon size={20} />
            <span className="text-base">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 mt-auto">
        <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/10">
          <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold shrink-0">
            MT
          </div>
          <div className="overflow-hidden">
            <p className="text-white font-bold text-sm truncate">Marcus Thorne</p>
            <p className="text-white/70 text-xs truncate">Senior Mason</p>
          </div>
        </div>
        <button className="flex items-center gap-2 text-white/70 hover:text-white text-xs mt-6 px-2 transition-colors">
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}


