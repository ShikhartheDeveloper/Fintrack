import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  PieChart, 
  Target, 
  ChevronRight,
  Wallet,
  Sparkles,
  X,
  CheckCircle,
  Lock,
  Activity,
  Server,
  Cpu,
  Database
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import hero3d from '../assets/hero_3d.png';
import analytics3d from '../assets/analytics_3d.png';
import security3d from '../assets/security_3d.png';

/* ─── Privacy Modal ─────────────────────────────────────────── */
const PrivacyModal = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    onClick={onClose}
  >
    <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      onClick={(e) => e.stopPropagation()}
      className="relative z-10 w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-[#0F0F1A] border border-white/10 rounded-3xl p-8 shadow-2xl shadow-primary/10"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight">Privacy Protocol</h2>
            <p className="text-xs font-mono text-gray-500">v2.0.5 // CLASSIFIED</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6 text-sm text-gray-400 leading-relaxed">
        {[
          { title: '01. DATA COLLECTION', body: 'FinTrack collects only the minimum data required to power your financial insights — email, encrypted credentials, and transaction metadata you choose to import. We never sell, rent, or trade your personal data.' },
          { title: '02. ENCRYPTION LAYER', body: 'All data is encrypted at rest with AES-256 and in transit using TLS 1.3. Your financial records are stored in isolated, air-gapped data partitions accessible only to you.' },
          { title: '03. THIRD PARTIES', body: 'We do not share your data with third-party advertisers. Integrations (e.g. bank APIs) are only activated with your explicit consent and can be revoked at any time.' },
          { title: '04. YOUR RIGHTS', body: 'You have the right to access, export, or permanently delete all your data at any time. Deletion is irreversible and processed within 72 hours.' },
          { title: '05. COOKIES', body: 'We use session cookies for authentication only. No tracking or analytics cookies are deployed across our platform.' },
          { title: '06. CONTACT', body: 'Privacy inquiries can be directed to privacy@fintrack.io. Our Data Protection Officer responds within 48 hours.' },
        ].map((s) => (
          <div key={s.title}>
            <h3 className="text-xs font-bold font-mono text-primary tracking-widest mb-2">{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 text-center">
        <button
          onClick={onClose}
          className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 active:scale-95 transition-all text-sm"
        >
          Acknowledged
        </button>
      </div>
    </motion.div>
  </motion.div>
);

/* ─── OS Status Modal ────────────────────────────────────────── */
const systems = [
  { name: 'Authentication API',   status: 'OPERATIONAL', icon: Lock,     latency: '12ms'  },
  { name: 'Transaction Engine',   status: 'OPERATIONAL', icon: Activity,  latency: '8ms'   },
  { name: 'Data Sync Service',    status: 'OPERATIONAL', icon: Database,  latency: '23ms'  },
  { name: 'Analytics Core',       status: 'OPERATIONAL', icon: Cpu,       latency: '15ms'  },
  { name: 'Realtime Websocket',   status: 'DEGRADED',    icon: Server,    latency: '180ms' },
  { name: 'Notification Service', status: 'OPERATIONAL', icon: Zap,       latency: '11ms'  },
];

const StatusModal = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    onClick={onClose}
  >
    <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      onClick={(e) => e.stopPropagation()}
      className="relative z-10 w-full max-w-xl bg-[#0F0F1A] border border-white/10 rounded-3xl p-8 shadow-2xl shadow-primary/10"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center">
            <Activity className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight">OS Status</h2>
            <p className="text-xs font-mono text-gray-500">LIVE // {new Date().toUTCString().toUpperCase()}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-6 p-4 rounded-2xl bg-green-400/5 border border-green-400/20 flex items-center space-x-3">
        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
        <div>
          <p className="text-sm font-bold text-green-400">All Core Systems Nominal</p>
          <p className="text-xs text-gray-500">1 minor service with elevated latency</p>
        </div>
      </div>

      <div className="space-y-3">
        {systems.map((sys, idx) => (
          <motion.div
            key={sys.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <sys.icon className={`w-4 h-4 ${sys.status === 'OPERATIONAL' ? 'text-gray-400' : 'text-yellow-400'}`} />
              <span className="text-sm font-medium">{sys.name}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono text-gray-500">{sys.latency}</span>
              <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest ${
                sys.status === 'OPERATIONAL' ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${sys.status === 'OPERATIONAL' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                <span>{sys.status}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-3 gap-4 text-center">
        {[{ label: 'Uptime', value: '99.98%' }, { label: 'Incidents (30d)', value: '0' }, { label: 'Avg Latency', value: '14ms' }].map((m) => (
          <div key={m.label}>
            <p className="text-lg font-black text-white">{m.value}</p>
            <p className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">{m.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

/* ─── Feature Card (3D Tilt) ─────────────────────────────────── */
const FeatureCard = ({ feature, idx }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="glass-card p-8 rounded-[2rem] group relative overflow-hidden"
    >
      <div style={{ transform: 'translateZ(50px)' }} className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
        <feature.icon className={`w-7 h-7 ${feature.color}`} />
      </div>
      <h3 style={{ transform: 'translateZ(40px)' }} className="text-xl font-bold mb-4">{feature.title}</h3>
      <p style={{ transform: 'translateZ(30px)' }} className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
    </motion.div>
  );
};

/* ─── Main Landing Page ──────────────────────────────────────── */
const LandingPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const featuresRef = useRef(null);

  const [modal, setModal] = useState(null); // 'privacy' | 'status' | null

  // Parallax
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const blobY1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const blobY3 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Mouse HUD Glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const handleMouseMove = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };

  // Launch Protocol → smooth scroll to features section
  const handleLaunchProtocol = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const features = [
    { title: 'Smart Budgeting',    description: 'AI-powered insights that categorize your spending and suggest optimizations automatically.', icon: Zap,        color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { title: 'Goal Tracking',      description: 'Visualize your path to financial freedom with dynamic progress bars and milestone alerts.',  icon: Target,     color: 'text-primary',    bg: 'bg-primary/10'     },
    { title: 'Advanced Security',  description: 'Bank-grade encryption ensures your sensitive financial data stays private and protected.',    icon: ShieldCheck,color: 'text-green-400',  bg: 'bg-green-400/10'  },
    { title: 'Real-time Analytics',description: 'Interactive charts and graphs provide a birds-eye view of your entire financial ecosystem.', icon: PieChart,   color: 'text-purple-400', bg: 'bg-purple-400/10'  },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-bg text-white font-sans selection:bg-primary/30 overflow-hidden"
    >
      <Navbar />

      {/* ── Modals ──────────────────────────────────────────── */}
      <AnimatePresence>
        {modal === 'privacy' && <PrivacyModal onClose={() => setModal(null)} />}
        {modal === 'status'  && <StatusModal  onClose={() => setModal(null)} />}
      </AnimatePresence>

      {/* Futuristic Grid + Scan Line */}
      <div className="fixed inset-0 futuristic-grid pointer-events-none opacity-20 -z-20" />
      <div className="scanning-line" />

      {/* Mouse Glow */}
      <motion.div
        className="fixed w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none -z-10"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none">
          <motion.div style={{ y: blobY1 }} className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-blob" />
          <motion.div style={{ y: blobY2 }} className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
          <motion.div style={{ y: blobY3 }} className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-left max-w-4xl mx-auto lg:mx-0">

            {/* Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass border border-white/10 mb-8 cursor-pointer group"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold tracking-wider uppercase text-primary">System Online: v2.0.5</span>
              <Sparkles className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1]"
            >
              Master Your Money <br />
              <span className="text-gradient">With Precision.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              The Next Generation of Financial Intelligence. Track, Analyze, and Scale your wealth with an interface from the future.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <button
                onClick={() => navigate('/register')}
                className="group w-full sm:w-auto px-10 py-5 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>Initialize Account</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleLaunchProtocol}
                className="w-full sm:w-auto px-10 py-5 glass text-white font-bold rounded-2xl transition-all hover:bg-white/10 active:scale-95 flex items-center justify-center space-x-2 group"
              >
                <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                <span>Launch Protocol</span>
              </button>
            </motion.div>

            {/* Tech Tags */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              className="mt-12 flex flex-wrap justify-start items-center gap-8 text-[10px] font-mono tracking-[0.3em] text-gray-500"
            >
              <span>ENCRYPTED</span>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <span>DECENTRALIZED</span>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <span>REALTIME</span>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="hidden lg:block relative"
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotateZ: [0, 2, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative z-10"
            >
              <img 
                src={hero3d} 
                alt="FinTrack Future" 
                className="w-full h-auto drop-shadow-[0_0_50px_rgba(var(--color-primary),0.3)]"
              />
            </motion.div>
            
            {/* Decorative rings around image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-primary/10 rounded-full -z-10 animate-ping opacity-20" style={{ animationDuration: '4s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-purple-500/5 rounded-full -z-10 animate-ping opacity-10" style={{ animationDuration: '6s' }} />
          </motion.div>
        </div>
      </div>
    </section>

      {/* ── Features / Core Modules ──────────────────────────── */}
      <section ref={featuresRef} id="features" className="py-24 lg:py-40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 italic tracking-tight">
              Core <span className="text-primary text-gradient">Modules</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, idx) => <FeatureCard key={f.title} feature={f} idx={idx} />)}
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Active Signals',   value: '150K+' },
              { label: 'Capital Managed',  value: '$2.4B' },
              { label: 'Data Points/Sec',  value: '1.2M+' },
              { label: 'Uptime',           value: '99.98%' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 glass rounded-3xl border border-transparent hover:border-white/10 transition-all cursor-default"
              >
                <p className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Analytics Section ─────────────────────────────────── */}
      <section id="analytics" className="py-24 lg:py-40 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — copy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass border border-purple-500/30 mb-6">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-xs font-bold tracking-widest uppercase text-purple-400">Real-time Analytics</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Every number, <br /><span className="text-gradient">at a glance.</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                FinTrack's analytics engine processes your transactions in real time, surfacing patterns and insights before you even notice them.
              </p>

              {/* Feature list */}
              <div className="space-y-4">
                {[
                  { label: 'Spending Heatmaps',    sub: 'See exactly where money flows each week'     },
                  { label: 'Trend Forecasting',    sub: 'AI predictions based on 90-day rolling data' },
                  { label: 'Category Breakdown',   sub: 'Auto-tagged with 40+ spending categories'     },
                  { label: 'Monthly Reports',      sub: 'PDF exports with executive-level summaries'   },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start space-x-4 p-4 glass-card rounded-2xl group hover:border-purple-500/40 transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <PieChart className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — animated bar chart */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-card rounded-3xl p-8 relative overflow-hidden"
            >
              {/* Image background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 -translate-y-1/2 translate-x-1/2 opacity-20 pointer-events-none">
                <img src={analytics3d} alt="" className="w-full h-full object-contain animate-pulse" />
              </div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-xs font-mono text-gray-500 tracking-widest uppercase">Spending Overview</p>
                  <p className="text-2xl font-black text-white">$4,821.50</p>
                </div>
                <div className="px-3 py-1 glass rounded-full text-xs font-bold text-green-400 border border-green-400/20 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span>↓ 12% vs last month</span>
                </div>
              </div>

              {/* Animated bars */}
              <div className="space-y-4">
                {[
                  { label: 'Housing',   pct: 38, color: 'bg-primary',       amount: '$1,832' },
                  { label: 'Food',      pct: 22, color: 'bg-yellow-400',    amount: '$1,061' },
                  { label: 'Transport', pct: 14, color: 'bg-purple-400',    amount: '$675'   },
                  { label: 'Shopping',  pct: 16, color: 'bg-pink-400',      amount: '$771'   },
                  { label: 'Savings',   pct: 10, color: 'bg-green-400',     amount: '$482'   },
                ].map((bar, i) => (
                  <div key={bar.label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-400 font-medium">{bar.label}</span>
                      <span className="text-white font-bold">{bar.amount}</span>
                    </div>
                    <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${bar.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
                        className={`h-full ${bar.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom mini chart — sparkline effect with boxes */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-4">Daily Transactions — Last 14 days</p>
                <div className="flex items-end space-x-1.5 h-12">
                  {[30,55,40,70,45,90,60,75,50,85,40,95,65,100].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 + 0.5, duration: 0.5 }}
                      className="flex-1 bg-primary/50 rounded-t-sm hover:bg-primary transition-colors cursor-default"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Security Section ──────────────────────────────────── */}
      <section id="security" className="py-24 lg:py-40 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-green-500/8 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — security shield card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              {/* Shield visual */}
              <div className="glass-card rounded-3xl p-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-green-400/10 flex items-center justify-center relative overflow-hidden">
                    <img src={security3d} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 scale-150 animate-spin-slow" />
                    <ShieldCheck className="w-9 h-9 text-green-400 relative z-10" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-white">Security Score</p>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-4xl font-black text-green-400">98</span>
                      <span className="text-lg font-bold text-green-400">/100</span>
                    </div>
                  </div>
                </div>

                {/* Security checklist with staggered animation */}
                <div className="space-y-3">
                  {[
                    { label: 'AES-256 Encryption at Rest',          done: true  },
                    { label: 'TLS 1.3 In-Transit Security',         done: true  },
                    { label: 'Zero-Knowledge Architecture',         done: true  },
                    { label: 'Biometric / 2FA Authentication',      done: true  },
                    { label: 'SOC 2 Type II Compliance',            done: true  },
                    { label: 'PCI-DSS Level 1 Certified',           done: true  },
                    { label: 'GDPR & CCPA Compliant',               done: true  },
                    { label: 'Real-time Intrusion Detection',       done: true  },
                    { label: 'Quantum-Resistant Key Exchange',      done: false },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center space-x-3 py-2.5 border-b border-white/5 last:border-0"
                    >
                      <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center ${item.done ? 'bg-green-400/15' : 'bg-yellow-400/10'}`}>
                        {item.done
                          ? <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                          : <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                        }
                      </div>
                      <span className={`text-sm font-medium ${item.done ? 'text-white' : 'text-yellow-300/70'}`}>{item.label}</span>
                      {!item.done && <span className="ml-auto text-[10px] font-bold text-yellow-400 tracking-widest border border-yellow-400/20 px-2 py-0.5 rounded-full">SOON</span>}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right — copy */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass border border-green-500/30 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-bold tracking-widest uppercase text-green-400">Enterprise-Grade Security</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Your money, <br /><span className="text-gradient">perfectly protected.</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                FinTrack is built from the ground up with a zero-trust security model. Every layer is designed to ensure your financial data is never exposed — not even to us.
              </p>

              {/* Key stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '0',         label: 'Breaches since launch'    },
                  { value: 'AES-256',   label: 'Encryption standard'      },
                  { value: '72h',       label: 'Threat response SLA'       },
                  { value: '24/7',      label: 'Security monitoring'       },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card rounded-2xl p-5 hover:border-green-500/30 transition-all"
                  >
                    <p className="text-2xl font-black text-green-400">{s.value}</p>
                    <p className="text-xs text-gray-500 mt-1 font-medium">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="py-20 border-t border-white/5 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <Wallet className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white uppercase italic">FinTrack</span>
          </div>

          {/* Footer Links — all wired */}
          <div className="flex items-center space-x-10 text-xs font-bold text-gray-500 tracking-widest uppercase">
            {/* Privacy → modal */}
            <button
              onClick={() => setModal('privacy')}
              className="hover:text-primary transition-colors"
            >
              Privacy
            </button>

            {/* OS Status → modal with live green dot */}
            <button
              onClick={() => setModal('status')}
              className="hover:text-green-400 transition-colors flex items-center space-x-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span>OS Status</span>
            </button>

            {/* Log → /login */}
            <button
              onClick={() => navigate('/login')}
              className="hover:text-primary transition-colors"
            >
              Log In
            </button>
          </div>

          {/* Build stamp */}
          <div className="text-[10px] font-mono text-gray-600">
            SYSTEM_ESTABLISHED // 2026
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
