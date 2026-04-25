import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    Zap, 
    Shield, 
    Smartphone, 
    Globe, 
    TrendingUp, 
    BarChart3, 
    Cpu, 
    Lock, 
    CheckCircle,
    ArrowRight,
    Sparkles,
    Brain,
    Layers,
    ChevronRight
} from 'lucide-react';
import Button from '../components/ui/Button';

const LandingPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="relative min-h-screen bg-bg overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-primary/10 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-purple-500/10 blur-[100px] animate-pulse [animation-delay:2s]" />
                <div className="absolute top-0 left-0 w-full h-full futuristic-grid opacity-30" />
            </div>

            {/* Navbar Placeholder - Integrated for seamless look */}
            <nav className="relative z-50 flex items-center justify-between px-6 py-8 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary rounded-xl shadow-neon">
                        <Cpu className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-black text-white font-digital tracking-tighter">FINTRACK <span className="text-primary font-sans text-xs align-top">2057</span></span>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    {['Intelligence', 'Security', 'Protocols', 'Network'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-[0.2em]">{item}</a>
                    ))}
                    <Link to="/login">
                        <Button variant="ghost" className="!px-6 !py-2 !text-xs !font-black uppercase tracking-widest">Connect Link</Button>
                    </Link>
                </div>
            </nav>
 
            {/* Hero Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16">
                <div className="text-center space-y-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Quantum Ecosystem v8.0</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-9xl font-black text-white font-digital leading-[0.8] tracking-tighter"
                    >
                        WEALTH <br />
                        <span className="holographic-text">ARCHITECT</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium"
                    >
                        The premier neural intelligence interface for asset optimization and predictive financial trajectory mapping. Designed for the 2057 economy.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
                    >
                        <Link to="/register">
                            <Button className="!px-12 !py-5 text-sm font-black uppercase tracking-widest shadow-neon">Initialize Protocol</Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="ghost" className="!px-12 !py-5 text-sm font-black uppercase tracking-widest">Connect ID</Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Intelligence Section */}
            <section id="intelligence" className="relative z-10 max-w-7xl mx-auto px-6 py-24 scroll-mt-24 border-b border-white/5">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                            <Brain className="w-3.5 h-3.5 text-primary" />
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Neural Intelligence Active</span>
                        </motion.div>
                        
                        <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-black text-white font-digital leading-none tracking-tighter">
                            COGNITIVE <br />
                            <span className="text-primary italic">FINANCIAL ENGINE</span>
                        </motion.h2>
                        
                        <motion.p variants={itemVariants} className="text-gray-400 text-lg leading-relaxed font-medium">
                            Our proprietary neural engine identifies patterns in your spending that humans overlook. Using advanced deep-learning protocols, FinTrack predicts future cash flow with 98.4% accuracy, allowing you to intercept financial friction before it manifests.
                        </motion.p>

                        <div className="grid grid-cols-2 gap-6 pt-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            <div className="space-y-2">
                                <CheckCircle className="w-4 h-4 text-primary" />
                                <p>Real-time Pattern Recognition</p>
                            </div>
                            <div className="space-y-2">
                                <CheckCircle className="w-4 h-4 text-primary" />
                                <p>Automated Macro-Strategy</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="relative p-1 bg-gradient-to-br from-primary/30 to-transparent rounded-3xl"
                    >
                        <div className="bg-surface rounded-[22px] p-8 border border-white/5 space-y-6">
                            <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                <span className="text-xs font-black text-white font-digital tracking-widest uppercase">Intelligence Stream</span>
                                <span className="flex items-center gap-2 text-[10px] text-primary animate-pulse">● LIVE SYNC</span>
                            </div>
                            <div className="space-y-4">
                                {[85, 62, 45].map((w, i) => (
                                    <div key={i} className="h-10 bg-white/5 rounded-xl flex items-center px-4 justify-between">
                                        <div className="h-2 bg-primary/30 rounded-full" style={{ width: `${w}%` }} />
                                        <span className="text-[10px] font-digital text-white/50">{w}.2% Match</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Security Section */}
            <section id="security" className="relative z-10 py-32 px-6 bg-[#0B0B14] scroll-mt-24">
                <div className="max-w-7xl mx-auto text-center space-y-8 mb-20">
                    <div className="inline-block p-4 bg-primary/20 rounded-3xl mb-4">
                        <Lock className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-5xl font-black text-white font-digital tracking-tight">SECURITY PROTOCOLS</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        FinTrack operates on a Zero-Knowledge architecture. Every byte of data is encrypted with 512-bit quantum-resistant algorithms before it leaves your local node.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {[
                        { title: "End-to-End Vault", desc: "Military-grade AES-512 encryption levels for every transaction entry." },
                        { title: "Hardware-Locked", desc: "Optional biometric multi-factor authentication for high-value vault actions." },
                        { title: "Privacy First", desc: "No data reselling. Your financial map is visible only to your neural link." }
                    ].map((s, i) => (
                        <div key={i} className="p-10 bg-surface/50 border border-white/5 rounded-[2rem] hover:border-primary/50 transition-all group">
                            <h4 className="text-xl font-black text-white font-digital mb-4 uppercase">{s.title}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Protocols Section */}
            <section id="protocols" className="relative z-10 py-32 px-6 border-t border-white/5 scroll-mt-24">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1 relative aspect-video bg-surface rounded-3xl border border-white/5 overflow-hidden">
                        <div className="absolute inset-0 futuristic-grid opacity-20" />
                        <div className="absolute inset-10 flex flex-col justify-end">
                            <div className="p-6 bg-[#0A0A12]/80 backdrop-blur-md rounded-2xl border border-white/10 space-y-4">
                                <h5 className="text-[10px] font-black text-primary uppercase">Protocol Execution View</h5>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} whileInView={{ width: '70%' }} className="h-full bg-primary" />
                                </div>
                                <div className="flex justify-between text-[8px] font-bold text-gray-500 uppercase">
                                    <span>Optimization</span>
                                    <span>70% Complete</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 space-y-8">
                        <h2 className="text-5xl font-black text-white font-digital leading-none tracking-tighter">FINANCIAL <br /> <span className="holographic-text">PROTOCOLS</span></h2>
                        <p className="text-gray-400 text-lg leading-relaxed font-medium">
                            Standard banking is reactive. FinTrack Protocols are proactive. Define automated goals, set 'Wealth Guard' limits, and establish neural roadmap archiving to visualize your 10-year financial trajectory.
                        </p>
                        <div className="space-y-4">
                            {['Neural Roadmap Archiing', 'Predictive Burn Analysis', 'Automated Wealth Guard'].map((p, i) => (
                                <div key={i} className="flex items-center gap-4 text-white font-black font-digital text-sm tracking-widest uppercase">
                                    <span className="w-8 h-[1px] bg-primary" /> {p}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Network Section */}
            <section id="network" className="relative z-10 py-32 px-6 bg-gradient-to-b from-transparent to-primary/5 scroll-mt-24">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <Globe className="w-16 h-16 text-primary mx-auto opacity-50" />
                    <h2 className="text-5xl font-black text-white font-digital tracking-tight">GLOBAL NETWORK</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg mb-12">
                        FinTrack is more than an app; it's a global infrastructure syncing across 100K+ nodes. Join a community of pioneers who have already established their financial sequence in the 2057 ecosystem.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['Node Status: Active', 'Protocols Syncing: 100%', 'Regional Coverage: Global'].map((stat, i) => (
                            <span key={i} className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat}</span>
                        ))}
                    </div>
                </div>
            </section>
            <footer className="relative z-10 py-12 px-6 border-t border-white/5 text-center">
                <div className="flex items-center justify-center gap-2 opacity-50 mb-6">
                    <Cpu className="w-4 h-4 text-white" />
                    <span className="text-sm font-black text-white font-digital tracking-tighter uppercase">FinTrack Neural Network</span>
                </div>
                <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">
                    &copy; 2057 ALL SYSTEMS OPERATIONAL. NO DATA LEFT UNMAPPED.
                </p>
            </footer>
        </div>
    );
};

export default LandingPage;
