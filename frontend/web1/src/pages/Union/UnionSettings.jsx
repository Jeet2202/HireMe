import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Bell,
  Shield,
  MapPin,
  Mail,
  Phone,
  Lock,
  Save,
  CheckCircle,
} from 'lucide-react';

export default function UnionSettings() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 p-8 space-y-8 animate-in fade-in duration-500 bg-gradient-to-br from-white to-[#f4f4f5] min-h-screen">
      <header>
        <h1 className="text-4xl font-bold text-on-surface">Settings</h1>
        <p className="text-on-surface mt-1">Manage your union account preferences.</p>
      </header>

      <div className="max-w-3xl space-y-6">
        {/* Profile Section */}
        <div className="bg-white p-8 rounded-2xl border border-outline-variant card-shadow">
          <h3 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
            <User size={20} /> Profile Information
          </h3>
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-on-surface uppercase tracking-widest mb-3">Full Name</label>
                <input
                  type="text"
                  defaultValue="Marcus Thorne"
                  className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-on-surface uppercase tracking-widest mb-3">Role</label>
                <input
                  type="text"
                  defaultValue="Union Leader"
                  disabled
                  className="w-full bg-gray-50 border border-outline-variant rounded-xl px-4 py-3.5 text-sm font-medium text-on-surface cursor-not-allowed"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-on-surface uppercase tracking-widest mb-3">
                  <Mail size={12} className="inline mr-1" /> Email
                </label>
                <input
                  type="email"
                  defaultValue="marcus.thorne@email.com"
                  className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-on-surface uppercase tracking-widest mb-3">
                  <Phone size={12} className="inline mr-1" /> Phone
                </label>
                <input
                  type="tel"
                  defaultValue="+1 (206) 555-0142"
                  className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-on-surface uppercase tracking-widest mb-3">
                <MapPin size={12} className="inline mr-1" /> Location
              </label>
              <input
                type="text"
                defaultValue="Seattle, WA"
                className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-8 rounded-2xl border border-outline-variant card-shadow">
          <h3 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
            <Bell size={20} /> Notifications
          </h3>
          <div className="space-y-4">
            {[
              { label: 'New helper requests', desc: 'Get notified when a contractor requests helpers', default: true },
              { label: 'Request accepted', desc: 'Notification when your helpers start a job', default: true },
              { label: 'Job completion', desc: 'Alerts when a job is completed', default: true },
              { label: 'Weekly summary email', desc: 'Receive a weekly overview of your unions', default: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-4 rounded-xl border border-outline-variant">
                <div>
                  <p className="font-bold text-sm text-on-surface">{item.label}</p>
                  <p className="text-xs text-on-surface mt-0.5">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-white p-8 rounded-2xl border border-outline-variant card-shadow">
          <h3 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
            <Lock size={20} /> Security
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-on-surface uppercase tracking-widest mb-3">Current Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-on-surface uppercase tracking-widest mb-3">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-on-surface uppercase tracking-widest mb-3">Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-4 bg-primary text-white rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          {saved ? <><CheckCircle size={18} /> Saved Successfully!</> : <><Save size={18} /> Save Changes</>}
        </button>
      </div>
    </div>
  );
}
