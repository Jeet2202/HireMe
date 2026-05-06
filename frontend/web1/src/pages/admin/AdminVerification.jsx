import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileCheck, Search, ShieldCheck, X, CheckCircle2, XSquare, Clock, Shield, Fingerprint } from 'lucide-react';

const mockVerifications = [
  { id: 'V-99283-XLM', name: 'Rajesh Agrawal', email: 'rajesh.a@example.com', type: 'Contractor', status: 'Pending', company: 'Agrawal Logistics' },
  { id: 'V-99291-XLM', name: 'Sanya Kapoor', email: 'sanya.k@work.io', type: 'Worker', status: 'Pending', company: 'Freelance' },
  { id: 'V-99104-XLM', name: 'Michael Varma', email: 'm.varma@provider.com', type: 'Contractor', status: 'Validating', company: 'Varma Crew' },
];

const AdminVerification = () => {
  const [selectedVerification, setSelectedVerification] = useState(null);

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-bold text-on-surface tracking-tight">Identity Verification</h2>
          <p className="text-on-surface-variant mt-2 text-lg">Monitor and validate professional credentials via Aadhaar XML data.</p>
        </div>
        <div className="bg-surface px-6 py-4 rounded-xl custom-card-shadow flex items-center gap-4">
          <Clock className="text-on-surface" size={24} />
          <div>
            <p className="text-[10px] font-bold text-outline uppercase">Queue Status</p>
            <p className="text-2xl font-bold text-on-surface uppercase">24 PENDING</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-surface p-8 rounded-xl custom-card-shadow">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-bold text-on-surface">Verification Queue</h3>
            <div className="relative w-64">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 rounded-xl bg-background-page/20 border-none text-sm focus:ring-2 focus:ring-primary" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead><tr className="border-b border-surface-container"><th className="pb-4 font-bold text-xs text-outline uppercase tracking-wider">User Profile</th><th className="pb-4 font-bold text-xs text-outline uppercase tracking-wider text-right">Actions</th></tr></thead>
              <tbody className="divide-y divide-surface-container text-on-surface">
                {mockVerifications.map((v) => (
                  <tr key={v.id} className="hover:bg-background-page/5 transition-colors group">
                    <td className="py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary-container text-white flex items-center justify-center font-bold">{v.name.charAt(0)}</div>
                        <div><p className="font-bold">{v.name}</p><p className="text-xs text-on-surface-variant font-medium">{v.type} • {v.company}</p></div>
                      </div>
                    </td>
                    <td className="py-6 text-right">
                      <button onClick={() => setSelectedVerification(v)} className="bg-primary text-on-primary font-bold text-[10px] px-6 py-2 rounded-xl hover:bg-primary-container transition-all hover:text-white">REVIEW XML</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-primary text-on-primary p-8 rounded-xl shadow-xl">
            <h3 className="text-xl font-bold mb-6">Security Context</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm"><span className="opacity-70">Audited Today:</span><span className="font-bold">112</span></div>
              <div className="flex justify-between text-sm"><span className="opacity-70">Rejections:</span><span className="font-bold text-red-400">7.2%</span></div>
              <div className="pt-4 border-t border-white/20 flex items-center gap-3">
                <Fingerprint size={20} /><p className="text-sm font-bold uppercase tracking-wider">X509 Cert: Valid</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedVerification && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-24">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedVerification(null)} className="absolute inset-0 bg-primary/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} className="bg-surface-bright w-full max-w-4xl rounded-2xl shadow-2xl relative z-10 flex flex-col max-h-[85vh]">
              <div className="bg-white px-8 py-6 border-b border-outline-variant flex justify-between items-center">
                <h3 className="text-2xl font-bold text-on-surface">Identity Payload Preview</h3>
                <button onClick={() => setSelectedVerification(null)}><X size={24} className="text-outline" /></button>
              </div>
              <div className="p-10 space-y-8 bg-surface-container-low overflow-y-auto">
                <div className="bg-white p-6 rounded-2xl card-shadow border border-secondary-container/20">
                  <p className="text-[10px] font-bold text-outline uppercase mb-4 tracking-tighter">Secure Data Stream</p>
                  <pre className="bg-primary-container/5 p-4 rounded-xl font-mono text-[11px] text-white overflow-x-auto">
                    {`<UidData>
  <Poi name="${selectedVerification.name}" gender="M" dob="1984-05-15" />
  <Poa vtc="Andheri West" dist="Mumbai" state="Maharashtra" pc="400053"/>
  <Pht>[ENCRYPTED]</Pht>
</UidData>`}
                  </pre>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setSelectedVerification(null)} className="flex-1 py-4 border-2 border-outline-variant text-on-surface font-bold rounded-2xl hover:bg-surface-container-low uppercase text-xs">Reject</button>
                  <button onClick={() => setSelectedVerification(null)} className="flex-2 py-4 bg-primary text-on-primary font-bold rounded-2xl hover:bg-primary-container shadow-xl active:scale-95 uppercase text-xs hover:text-white">Approve Verification</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminVerification;


