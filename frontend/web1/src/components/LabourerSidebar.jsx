import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  User, 
  ShieldCheck,
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
    <aside className="fixed left-0 top-0 h-full w-[280px] flex flex-col bg-[#c9a8f1] z-50 overflow-y-auto">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-[#391053] tracking-tight">HireMe Services</h1>
        <p className="text-[#391053]/60 text-xs uppercase tracking-wider mt-1">Labourer Module</p>
      </div>

      <nav className="flex-1 px-4 mt-8 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-white text-[#391053] font-bold shadow-lg scale-95' 
                  : 'text-[#391053]/70 hover:text-[#391053] hover:bg-white/10'
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
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&h=120&auto=format&fit=crop" 
            alt="User" 
            className="w-10 h-10 rounded-full border-2 border-[#f4d9ff] object-cover"
          />
          <div className="overflow-hidden">
            <p className="text-[#391053] font-bold text-sm truncate">Marcus Thorne</p>
            <p className="text-[#391053]/50 text-xs truncate">Senior Mason</p>
          </div>
        </div>
        <button className="flex items-center gap-2 text-[#391053]/50 hover:text-[#391053] text-xs mt-6 px-2 transition-colors">
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}


