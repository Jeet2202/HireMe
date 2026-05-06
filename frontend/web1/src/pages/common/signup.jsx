import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { User, Mail, Phone, BadgeHelp, Lock, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function SignupPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: searchParams.get("role") || "",
    password: ""
  });

  const handleSignup = (e) => {
    e.preventDefault();
    // Simulate signup and onboard
    if (formData.role === "contractor") navigate("/onboarding/contractor");
    else navigate("/onboarding/labourer");
  };

  return (
    <div className="min-h-screen bg-surface-stage flex flex-col items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[520px] space-y-8"
      >
        <div className="executive-card !p-12 space-y-8">
          <header className="text-center space-y-4">
            <div className="text-on-surface font-bold text-xl tracking-tight">HireMe</div>
            <h1 className="text-4xl font-bold text-on-surface tracking-tight">Create Account</h1>
            <p className="text-on-surface-variant text-sm">Join our professional network and start growing your service business today.</p>
          </header>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-50" size={18} />
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-4 border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-50" size={18} />
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-4 border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-50" size={18} />
                <input 
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-12 pr-4 py-4 border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-1">Register As</label>
              <div className="relative">
                <BadgeHelp className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-50" size={18} />
                <select 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full pl-12 pr-10 py-4 border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm appearance-none bg-white"
                  required
                >
                  <option value="" disabled>Select your role</option>
                  <option value="labourer">Labourer</option>
                  <option value="contractor">Contractor</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-50" size={18} />
                <input 
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Min. 8 characters"
                  className="w-full pl-12 pr-4 py-4 border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  required
                />
              </div>
            </div>

            <button type="submit" className="primary-button w-full flex items-center justify-center gap-2 !py-5 mt-6">
              Sign Up <ArrowRight size={20} />
            </button>
          </form>

          <footer className="pt-8 border-t border-outline-variant text-center">
            <p className="text-sm text-on-surface-variant">
              Already have account? <Link to="/login" className="font-bold text-on-surface hover:underline">Login</Link>
            </p>
          </footer>
        </div>

        <div className="flex justify-center gap-8 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          <a href="#" className="hover:text-on-surface transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-on-surface transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-on-surface transition-colors">Contact Us</a>
        </div>
      </motion.div>
    </div>
  );
}


