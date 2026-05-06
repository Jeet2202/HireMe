import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Info, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { loginUser, getDashboardRoute } from "../../services/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { user } = await loginUser({ email, password });
      // Persist user info for the session
      localStorage.setItem("user", JSON.stringify(user));
      navigate(getDashboardRoute(user.role));
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-stage flex flex-col items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[480px] space-y-8"
      >
        <div className="executive-card !p-12 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-on-surface tracking-tight">Login</h1>
            <p className="text-on-surface-variant text-sm">Access your professional workspace</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-50" size={18} />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-4 border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Password</label>
                <a href="#" className="text-[10px] font-bold text-on-surface hover:underline">Forgot Password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-50" size={18} />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-on-surface-variant px-1 animate-in fade-in slide-in-from-top-1">
                <Info size={16} />
                <p className="text-xs font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="primary-button w-full flex items-center justify-center gap-2 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> Logging in…</>
              ) : (
                <>Login to HireMe <ArrowRight size={20} /></>
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-on-surface-variant">
              Don't have an account? <Link to="/signup" className="font-bold text-on-surface hover:underline">Signup</Link>
            </p>
          </div>
        </div>

        <div className="text-center pt-4">
          <div className="flex items-center justify-center gap-2 text-on-surface-variant font-bold tracking-tight">
            <span className="text-xl">HireMe</span>
            <span className="text-[10px] uppercase tracking-[0.2em] pt-1">Services</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


