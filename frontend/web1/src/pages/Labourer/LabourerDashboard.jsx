import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  Filter, 
  LayoutDashboard, 
  Briefcase, 
  TrendingUp, 
  ShieldCheck, 
  Star,
  Clock,
  MapPin,
  ChevronRight,
  Mic,
  MicOff,
  Volume2,
  Loader2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const API_BASE = 'http://localhost:8000/api/labourer';

const earningsData = [
  { month: 'Jan', amount: 3200 },
  { month: 'Feb', amount: 3800 },
  { month: 'Mar', amount: 4100 },
  { month: 'Apr', amount: 4250 },
  { month: 'May', amount: 3900 },
  { month: 'Jun', amount: 4100 },
];

const ratingData = [
  { week: 'W1', rating: 4.5 },
  { week: 'W2', rating: 4.7 },
  { week: 'W3', rating: 4.6 },
  { week: 'W4', rating: 4.8 },
  { week: 'W5', rating: 4.92 },
];

/* Hardcoded fallback values */
const defaultStats = {
  job_request_count: 12,
  new_requests: 4,
  current_booking: 'Westside Renovation',
  skill_level: 'Level 4',
  skill_title: 'Expert Mason',
  is_verified: true,
  average_rating: 4.92,
  total_completions: 128,
  next_shift_time: 'Tomorrow, 08:00 AM',
  next_shift_location: 'Downtown Site B',
  next_shift_foreman: 'Sarah Wilson',
};

export default function LabourerDashboard() {
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(true);

  // ── Voice Assistant State ──────────────────────────────
  const [voicePhase, setVoicePhase] = useState('idle');
  // idle | greeting | speaking | listening | processing
  const [voiceText, setVoiceText] = useState('');
  const [liveTranscript, setLiveTranscript] = useState(''); // real-time as user speaks
  const [userTranscript, setUserTranscript] = useState(''); // confirmed after send
  const [voiceActive, setVoiceActive] = useState(false);
  const [language, setLanguage] = useState('hi');
  const [srError, setSrError] = useState('');
  const hasPlayedIntro = useRef(false);
  const audioRef = useRef(null);
  const recognitionRef = useRef(null);

  // ── Cleanup on unmount ─────────────────────────────────
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // ── Play base64 audio helper ───────────────────────────
  const playAudio = useCallback((base64Audio, onEnded) => {
    try {
      const raw = atob(base64Audio);
      const arr = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
      const blob = new Blob([arr], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => { URL.revokeObjectURL(url); audioRef.current = null; if (onEnded) onEnded(); };
      audio.onerror = () => { URL.revokeObjectURL(url); audioRef.current = null; if (onEnded) onEnded(); };
      audio.play().catch(() => { if (onEnded) onEnded(); });
    } catch { if (onEnded) onEnded(); }
  }, []);

  // ── Execute UI action from backend ─────────────────────
  const executeUiAction = useCallback((action) => {
    if (!action) return;
    if (action === 'NAVIGATE_JOB_REQUESTS') navigate('/labourer/job-requests');
    else if (action === 'NAVIGATE_PROFILE') navigate('/labourer/profile');
    else if (action === 'TOGGLE_AVAILABILITY') setIsAvailable(prev => !prev);
  }, [navigate]);

  // ── Start listening: Web Speech API for live display ───
  const startListening = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setSrError('Voice input not supported. Please use Chrome or Edge.');
      setVoiceActive(false);
      setVoicePhase('idle');
      return;
    }
    setSrError('');
    setLiveTranscript('');
    setVoicePhase('listening');

    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';

    recognition.onresult = (event) => {
      let full = '';
      for (let i = 0; i < event.results.length; i++) {
        full += event.results[i][0].transcript;
      }
      setLiveTranscript(full);
    };

    recognition.onerror = (e) => {
      if (e.error === 'not-allowed') setSrError('Mic permission denied. Allow mic in browser settings.');
      else if (e.error !== 'no-speech') setSrError(`Voice error: ${e.error}`);
    };

    recognition.onend = () => {
      // Auto-restart if still in listening phase (handles silence timeout)
      setVoicePhase(prev => {
        if (prev === 'listening' && recognitionRef.current) {
          try { recognitionRef.current.start(); } catch {}
        }
        return prev;
      });
    };

    recognitionRef.current = recognition;
    try { recognition.start(); } catch {}
  }, [language]);

  // ── Send live transcript to backend ────────────────────
  const finishListening = useCallback(async () => {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }

    const transcript = liveTranscript.trim();
    if (!transcript) {
      setVoiceText(language === 'hi' ? 'Kuch nahi suna. Dobara bolein.' : 'Nothing heard. Please try again.');
      startListening();
      return;
    }

    setVoicePhase('processing');
    setUserTranscript(transcript);
    setLiveTranscript('');

    try {
      const formData = new FormData();
      formData.append('text', transcript);
      formData.append('lang', language);
      const res = await fetch(`${API_URL}/api/voice/text-input`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();

      setVoiceText(data.text);
      if (data.ui_action) executeUiAction(data.ui_action);

      if (data.audio) {
        setVoicePhase('speaking');
        playAudio(data.audio, () => {
          if (data.intent === 'STOP') {
            setVoiceActive(false);
            setVoicePhase('idle');
          } else {
            startListening();
          }
        });
      } else {
        startListening();
      }
    } catch (err) {
      console.error('Voice API error:', err);
      setVoiceText(language === 'hi' ? 'Connection fail hua. Dobara try karein.' : 'Connection failed. Try again.');
      setVoicePhase('idle');
      setVoiceActive(false);
    }
  }, [liveTranscript, language, playAudio, startListening, executeUiAction]);

  // ── Main voice button ─────────────────────────────────
  const handleVoiceButton = useCallback(async () => {
    if (voiceActive) {
      // Stop everything
      if (recognitionRef.current) {
        recognitionRef.current.onend = null;
        recognitionRef.current.abort();
        recognitionRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setVoiceActive(false);
      setVoicePhase('idle');
      setVoiceText('');
      setUserTranscript('');
      setLiveTranscript('');
      return;
    }

    // Start new session
    setVoiceActive(true);
    setVoicePhase('greeting');
    setVoiceText(language === 'hi' ? 'Connect ho raha hai...' : 'Connecting...');
    setLiveTranscript('');
    setUserTranscript('');

    try {
      const isFirst = !hasPlayedIntro.current;
      const res = await fetch(
        `${API_URL}/api/voice/init?user_name=Marcus&is_first_time=${isFirst}&lang=${language}`
      );
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();

      hasPlayedIntro.current = true;
      setVoiceText(data.text);

      if (data.audio) {
        setVoicePhase('speaking');
        playAudio(data.audio, () => startListening());
      } else {
        startListening();
      }
    } catch (err) {
      console.error('Voice init error:', err);
      setVoiceText(language === 'hi' ? 'Connect nahi ho saka.' : 'Could not connect.');
      setVoicePhase('idle');
      setVoiceActive(false);
    }
  }, [voiceActive, playAudio, startListening, language]);

  // ── Voice phase label ──────────────────────────────────
  const getVoiceLabel = () => {
    switch (voicePhase) {
      case 'greeting': return language === 'hi' ? 'Connect ho raha hai...' : 'Connecting...';
      case 'speaking': return language === 'hi' ? 'Bol raha hai...' : 'Speaking...';
      case 'listening': return language === 'hi' ? 'Sun raha hai...' : 'Listening...';
      case 'processing': return language === 'hi' ? 'Samajh raha hai...' : 'Processing...';
      default: return '';
    }
  };
  const [stats, setStats] = useState(defaultStats);
  const [jobCount, setJobCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        /* Fetch dashboard stats */
        const statsRes = await fetch(`${API_BASE}/dashboard`);
        const statsData = await statsRes.json();
        if (statsData.stats) {
          setStats(statsData.stats);
        }

        /* Fetch job count */
        const jobsRes = await fetch(`${API_BASE}/jobs`);
        const jobsData = await jobsRes.json();
        if (jobsData.count > 0) {
          setJobCount(jobsData.count);
        }
      } catch (err) {
        console.log('API unavailable, using fallback data.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex-1 p-8 space-y-8 animate-in fade-in duration-500 bg-gradient-to-br from-white to-[#f4f4f5] min-h-screen">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-on-surface">Overview</h1>
          <p className="text-on-surface mt-1">Welcome back, Marcus. Here's your schedule for today.</p>
        </div>
        <div className="flex items-center gap-4">
          {/* ── Language Toggle ────────────────────────── */}
          <button
            onClick={() => setLanguage(prev => prev === 'hi' ? 'en' : 'hi')}
            className="px-3 py-2 rounded-xl bg-white border border-outline-variant card-shadow text-xs font-bold text-on-surface hover:bg-primary hover:text-white transition-colors"
            title="Switch language"
          >
            {language === 'hi' ? 'HI → EN' : 'EN → HI'}
          </button>

          {/* ── Voice Assistant Button ───────────────────── */}
          <button
            id="voice-assistant-btn"
            onClick={handleVoiceButton}
            className={`w-12 h-12 flex items-center justify-center rounded-xl border transition-all duration-300 relative ${
              voiceActive
                ? voicePhase === 'listening'
                  ? 'bg-red-500 border-red-400 text-white shadow-lg shadow-red-200'
                  : voicePhase === 'speaking'
                  ? 'bg-green-500 border-green-400 text-white shadow-lg shadow-green-200'
                  : 'bg-blue-500 border-blue-400 text-white shadow-lg shadow-blue-200'
                : 'bg-white border-outline-variant text-on-surface card-shadow hover:bg-primary hover:text-white hover:border-primary'
            }`}
            title={voiceActive ? 'Stop voice assistant' : 'Talk to assistant'}
          >
            {voiceActive && voicePhase === 'listening' ? (
              <MicOff size={20} />
            ) : voiceActive && voicePhase === 'speaking' ? (
              <Volume2 size={20} className="animate-pulse" />
            ) : (
              <Mic size={20} />
            )}
            {voiceActive && voicePhase === 'listening' && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
            )}
          </button>

          <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white card-shadow border border-outline-variant hover:bg-white transition-colors relative">
            <Bell className="text-on-surface" size={20} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant rounded-full shadow-sm">
            <span className="text-xs font-bold text-on-surface">STATUS: ACTIVE</span>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </div>
      </header>

      {/* ── Voice Status Bar (only visible when active) ── */}
      {voiceActive && (
        <div className={`flex flex-col gap-2 px-6 py-4 rounded-2xl border transition-all duration-300 ${
          voicePhase === 'listening'
            ? 'bg-red-50 border-red-200'
            : voicePhase === 'speaking'
            ? 'bg-green-50 border-green-200'
            : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 shrink-0">
              {voicePhase === 'listening' && (
                <>
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                    {getVoiceLabel()}
                  </span>
                </>
              )}
              {voicePhase === 'speaking' && (
                <>
                  <Volume2 size={16} className="text-green-600 animate-pulse" />
                  <span className="text-xs font-bold text-green-600 uppercase tracking-wider">
                    {getVoiceLabel()}
                  </span>
                </>
              )}
              {(voicePhase === 'processing' || voicePhase === 'greeting') && (
                <>
                  <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    {getVoiceLabel()}
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-on-surface flex-1 leading-relaxed">{voiceText}</p>
            {voicePhase === 'listening' && (
              <button
                onClick={finishListening}
                className="px-4 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600 transition-colors shrink-0"
              >
                {language === 'hi' ? 'BHEJO' : 'SEND'}
              </button>
            )}
          </div>
          {/* STT Transcript feedback */}
          {userTranscript && (
            <p className="text-xs text-on-surface/60 italic pl-6">
              {language === 'hi' ? 'Aapne bola' : 'You said'}: "{userTranscript}"
            </p>
          )}
          {/* Live transcript while speaking */}
          {voicePhase === 'listening' && liveTranscript && (
            <p className="text-sm font-medium text-on-surface pl-6 mt-1">
              🎙️ &ldquo;{liveTranscript}&rdquo;
            </p>
          )}
          {/* No-speech prompt */}
          {voicePhase === 'listening' && !liveTranscript && (
            <p className="text-xs text-on-surface/40 italic pl-6">
              {language === 'hi' ? 'Boliye... (BHEJO dabayein bhejna ke liye)' : 'Speak now... (press SEND when done)'}
            </p>
          )}
          {srError && (
            <p className="text-xs text-red-500 pl-6">{srError}</p>
          )}
        </div>
      )}

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl border border-outline-variant card-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary rounded-xl">
              <Clock className="text-white" size={24} />
            </div>
            <span className="bg-surface-container-high text-on-surface text-xs font-bold px-3 py-1 rounded-full">
              {loading ? '...' : `+${stats.new_requests} New`}
            </span>
          </div>
          <p className="text-xs font-medium text-on-surface uppercase tracking-wider">Job Requests</p>
          <h3 className="text-4xl font-bold text-on-surface mt-1">
            {loading ? <Loader2 size={28} className="animate-spin" /> : (jobCount ?? stats.job_request_count)}
          </h3>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-outline-variant card-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-surface-container-high rounded-xl">
              <Briefcase className="text-on-surface" size={24} />
            </div>
            <span className="bg-surface-container-high text-on-surface text-xs font-bold px-3 py-1 rounded-full">Ongoing</span>
          </div>
          <p className="text-xs font-medium text-on-surface uppercase tracking-wider">Current Booking</p>
          <h3 className="text-2xl font-bold text-on-surface mt-1 truncate">{stats.current_booking}</h3>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-outline-variant card-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-[#fcdfa9] rounded-xl">
              <TrendingUp className="text-[#180f00]" size={24} />
            </div>
            <span className="bg-[#dec38f]/30 text-[#180f00] text-xs font-bold px-3 py-1 rounded-full">{stats.skill_level}</span>
          </div>
          <p className="text-xs font-medium text-on-surface uppercase tracking-wider">Skill Level</p>
          <h3 className="text-2xl font-bold text-on-surface mt-1">{stats.skill_title}</h3>
        </div>
      </div>

      {/* Status & Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-outline-variant card-shadow flex flex-col items-center justify-center text-center">
          <ShieldCheck size={48} className="text-on-surface fill-surface-container-high" />
          <p className="text-lg font-bold text-on-surface mt-4">Identity Verified</p>
          <p className="text-xs text-on-surface mt-1">Next renewal: Oct 2024</p>
          <button className="mt-4 w-full py-2 border border-outline-variant rounded-xl text-xs font-bold hover:bg-white transition-colors">VIEW BADGE</button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-outline-variant card-shadow flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <p className="font-bold text-on-surface">Availability</p>
            <button 
              onClick={() => setIsAvailable(!isAvailable)}
              className={`w-12 h-6 rounded-full transition-colors relative ${isAvailable ? 'bg-primary' : 'bg-white'}`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${isAvailable ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-on-surface uppercase">STATUS: {isAvailable ? 'ONLINE' : 'OFFLINE'}</p>
            <p className="text-sm text-on-surface mt-1">
              {isAvailable 
                ? 'Visible to project managers within 25km.' 
                : 'Hidden from new project searches.'}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-outline-variant card-shadow flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <p className="font-bold text-on-surface">Average Rating</p>
            <Star className="text-[#fcdfa9] fill-[#fcdfa9]" size={20} />
          </div>
          <div className="mt-4">
            <h4 className="text-4xl font-bold text-on-surface">{stats.average_rating}<span className="text-base text-on-surface ml-2">/ 5.0</span></h4>
            <p className="text-xs text-on-surface mt-1">Based on {stats.total_completions} job completions</p>
          </div>
        </div>

        <div className="bg-primary text-on-primary p-6 rounded-2xl card-shadow flex flex-col justify-between">
          <div>
            <p className="text-[10px] text-white/70 uppercase tracking-widest">Next Shift</p>
            <p className="text-lg font-bold mt-1">{stats.next_shift_time}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm">{stats.next_shift_location}</p>
            <p className="text-xs text-white/70 mt-1">Site Foreman: {stats.next_shift_foreman}</p>
          </div>
          <button className="mt-4 w-full py-2 bg-white text-on-surface rounded-xl text-xs font-bold hover:bg-opacity-90 transition-all">VIEW DETAILS</button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
        <div className="bg-white p-8 rounded-2xl border border-outline-variant card-shadow h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-lg text-on-surface">Monthly Earnings</h3>
            <select className="bg-transparent border-none text-xs font-bold text-on-surface focus:ring-0">
              <option>Last 6 Months</option>
            </select>
          </div>
          <div className="flex-1 w-full -ml-8">
            <ResponsiveContainer width="110%" height="100%">
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#efeded" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#4c444e', fontSize: 12}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f5f3f3'}} 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="amount" fill="#1a1c1d" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 flex justify-between items-center pt-6 border-t border-outline-variant">
            <p className="text-sm text-on-surface">Current Month Projection</p>
            <p className="font-bold text-on-surface">$4,250.00</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-outline-variant card-shadow h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-lg text-on-surface">Rating Trend</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-xs text-on-surface">Overall Trend</span>
            </div>
          </div>
          <div className="flex-1 w-full -ml-8">
            <ResponsiveContainer width="110%" height="100%">
              <LineChart data={ratingData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#efeded" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#4c444e', fontSize: 12}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Line 
                  type="monotone" 
                  dataKey="rating" 
                  stroke="#1a1c1d" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#1a1c1d', strokeWidth: 0 }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-on-surface">Top Feedback Category</span>
              <span className="font-bold text-on-surface">Punctuality (98%)</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-on-surface">Recent Improvement</span>
              <span className="font-bold text-on-surface">Safety Compliance (+12%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
