import { Link } from "react-router-dom";
import { CheckCircle, Zap, Shield, Users, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface-stage">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-outline-variant sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-on-surface text-xl font-bold tracking-tighter">HireMe</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors">Features</a>
            <a href="#about" className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors">About</a>
            <Link to="/login" className="text-sm font-bold text-on-surface hover:underline">Login</Link>
            <Link to="/signup" className="primary-button !py-2 !px-6 !text-sm">Get Started</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-16 space-y-24">
        {/* Hero Section */}
        <section className="executive-card p-0 overflow-hidden flex flex-col md:flex-row items-stretch">
          <div className="flex-1 p-12 md:p-16 flex flex-col justify-center space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold text-on-surface tracking-tight"
            >
              Connecting Contractors with Skilled Labourers
            </motion.h1>
            <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">
              The ultimate high-performance workspace for the construction industry. Verify, match, and deploy skilled talent with enterprise-grade precision and real-time operational oversight.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/signup" className="primary-button flex items-center gap-2">
                Get Started <ArrowRight size={20} />
              </Link>
              <button className="secondary-button">Learn More</button>
            </div>
          </div>
          <div className="flex-1 min-h-[400px] bg-surface-container-high relative overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-on-surface to-transparent translate-x-1/4 translate-y-1/4 scale-150 rounded-full" />
             <div className="z-10 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-outline-variant">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white">
                  <Shield size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">Verified Worker</p>
                  <p className="text-xs text-on-surface-variant">Active Ready</p>
                </div>
             </div>
          </div>
        </section>

        {/* Platform Features */}
        <section id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Secure Verification", icon: Shield, desc: "Rigorous credential auditing and background checks to ensure compliance." },
            { title: "Smart Matching", icon: Zap, iconColor: "text-on-surface", desc: "Algorithmic allocation based on proximity, certification, and performance." },
            { title: "Real-Time Updates", icon: ArrowRight, desc: "Instant synchronization of timelines, shifts, and safety protocols." },
            { title: "Role-Based Access", icon: Users, desc: "Granular permission management for administrators and contractors." }
          ].map((feature, idx) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="executive-card !p-8 border-l-4 border-primary space-y-4"
            >
              <div className="w-12 h-12 bg-surface-stage/20 flex items-center justify-center rounded-lg">
                <feature.icon className="text-on-surface" size={24} />
              </div>
              <h3 className="text-lg font-bold text-on-surface">{feature.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Statistics Section */}
        <section className="bg-primary text-on-primary rounded-xl overflow-hidden shadow-executive">
          <div className="p-12 md:p-16 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl font-bold tracking-tight">The Trusted Standard for Industrial Manpower</h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                HireMe Services serves as the structural backbone for large-scale construction enterprises. We bridge the gap between complex infrastructure projects and specialized talent.
              </p>
              <div className="grid grid-cols-2 gap-12 pt-8">
                <div>
                  <div className="text-5xl font-black tracking-tighter">12,500+</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-1">Verified Workers</div>
                </div>
                <div>
                  <div className="text-5xl font-black tracking-tighter">850+</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-1">Active Contractors</div>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full aspect-[4/3] relative rounded-xl shadow-2xl bg-white overflow-hidden flex items-center justify-center border border-outline-variant">
               <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(45deg,black_25%,transparent_25%,transparent_50%,black_50%,black_75%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
               <Users size={80} className="text-[#e4e4e7]" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="executive-card text-center py-16 space-y-8">
          <h2 className="text-4xl font-bold text-on-surface tracking-tight">Join HireMe Today</h2>
          <p className="max-w-2xl mx-auto text-lg text-on-surface-variant">
            Scale your workforce with confidence. Experience the power of professional matching and secure laborer verification in one centralized workspace.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup?role=contractor" className="primary-button">Sign Up as Contractor</Link>
            <Link to="/signup?role=labourer" className="secondary-button">Register as Labourer</Link>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-8 py-12 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-on-surface-variant text-sm">
          © 2026 HireMe Services. All rights reserved.
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-sm font-medium text-on-surface-variant hover:text-on-surface">Privacy Policy</a>
          <a href="#" className="text-sm font-medium text-on-surface-variant hover:text-on-surface">Terms of Service</a>
          <a href="#" className="text-sm font-medium text-on-surface-variant hover:text-on-surface">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}


