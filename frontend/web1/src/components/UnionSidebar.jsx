import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus,
  Briefcase, 
  Settings,
  LogOut,
  UserCircle
} from 'lucide-react';

const UnionSidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard',       icon: LayoutDashboard, path: '/union/dashboard' },
    { name: 'My Unions',       icon: Users,           path: '/union/my-unions' },
    { name: 'Create Union',    icon: UserPlus,        path: '/union/create' },
    { name: 'Job Requests',    icon: Briefcase,       path: '/union/job-requests' },
    { name: 'Settings',        icon: Settings,        path: '/union/settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] bg-primary text-on-primary flex flex-col py-8 z-50">
      <div className="px-8 mb-10">
        <h1 className="font-bold text-2xl tracking-tight text-white">HireMe</h1>
        <p className="text-white/70 text-xs uppercase tracking-widest mt-1">Union Portal</p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/union/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 text-sm font-medium ${
                isActive
                  ? 'bg-white/15 text-white font-bold'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`
            }
          >
            <item.icon size={18} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-6 pt-6 border-t border-white/10 mt-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <UserCircle size={26} className="text-white/70" />
          </div>
          <div>
            <p className="font-bold text-sm text-white">Marcus Thorne</p>
            <p className="text-white/70 text-[10px] uppercase tracking-wider">Union Leader</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-white/70 hover:text-white text-xs transition-colors mt-2"
        >
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default UnionSidebar;
