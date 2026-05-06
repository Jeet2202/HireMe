import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, User, GraduationCap, Settings, Bell, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard',       path: '/contractor-dashboard',       icon: <LayoutDashboard size={20} /> },
    { name: 'Find Labourers',  path: '/contractor/find-labourers',  icon: <Users size={20} /> },
    { name: 'Job Posts',       path: '/contractor/job-posts',       icon: <Briefcase size={20} /> },
    { name: 'Profile',         path: '/contractor/profile',         icon: <User size={20} /> },
    { name: 'Verification',    path: '/contractor/verification',    icon: <GraduationCap size={20} /> },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 left-6 z-[60] p-3 bg-brand-primary text-white rounded-xl shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-brand-primary/40 backdrop-blur-sm z-[55] lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className="fixed left-0 top-0 h-screen w-[280px] bg-brand-primary text-white p-6 flex flex-col z-[58]">
        <div className="mb-10 px-4 mt-12 lg:mt-0">
          <h1 className="text-2xl font-bold tracking-tight">HireMe Services</h1>
          <p className="text-xs text-white/70 mt-1">Contractor Portal</p>
        </div>

        <nav className="flex-grow space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? 'bg-brand-surface text-on-surface font-bold'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`
              }
            >
              <span className="shrink-0">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold shrink-0">
              MS
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate text-white">Marcus Sterling</p>
              <p className="text-[10px] text-white/70 truncate">Verified Contractor</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;


