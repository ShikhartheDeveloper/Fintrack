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
            <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Neural Engine v4.0 Active</span>
                        </motion.div>
                        
                        <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black text-white font-digital leading-[0.9] tracking-tighter">
                            THE FUTURE OF <br />
                            <span className="holographic-text">QUANTUM WEALTH</span>
                        </motion.h1>
                        
                        <motion.p variants={itemVariants} className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed font-medium">
                            Experience the next evolution of financial management. Real-time cognitive tracking, predictive burn analysis, and neural roadmap archiving.
                        </motion.p>
                        
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link to="/register">
                                <Button className="!px-10 !py-4 text-sm font-black uppercase tracking-widest shadow-neon">Initialize Protocol</Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="ghost" className="!px-10 !py-4 text-sm font-black uppercase tracking-widest">View Capabilities</Button>
                            </Link>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex items-center gap-8 pt-8 opacity-50">
                            <div className="text-center">
                                <p className="text-white font-black text-2xl font-digital">99.9%</p>
                                <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mt-1">Uptime</p>
                            </div>
                            <div className="w-[1px] h-10 bg-white/10" />
                            <div className="text-center">
                                <p className="text-white font-black text-2xl font-digital">256-BIT</p>
                                <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mt-1">Encryption</p>
                            </div>
                            <div className="w-[1px] h-10 bg-white/10" />
                            <div className="text-center">
                                <p className="text-white font-black text-2xl font-digital">100K+</p>
                                <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mt-1">Nodes</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative hidden lg:block"
                    >
                        {/* Abstract Hero Image / SVG */}
                        <div className="relative z-10 w-full aspect-square bg-gradient-to-br from-primary/20 to-surface border border-white/10 rounded-3xl overflow-hidden group shadow-[0_0_100px_rgba(99,102,241,0.1)]">
                            <div className="absolute inset-0 bg-mesh opacity-50 animate-blob" />
                            <div className="absolute inset-x-0 top-0 h-1 bg-primary/40 animate-scan" />
                            
                            {/* Mock Dashboard Element */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] bg-[#0F0F1A]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 flex flex-col gap-6 shadow-2xl">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                                    </div>
                                    <div className="h-4 w-24 bg-white/5 rounded-full" />
                                </div>
                                <div className="space-y-4">
                                    <div className="h-8 w-full bg-primary/10 rounded-lg animate-pulse" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-20 bg-white/5 rounded-lg border border-white/5" />
                                        <div className="h-20 bg-white/5 rounded-lg border border-white/5" />
                                    </div>
                                    <div className="flex-1 h-32 bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden relative">
                                        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-primary/20" style={{ clipPath: 'polygon(0 100%, 0 30%, 20% 50%, 40% 10%, 60% 40%, 80% 20%, 100% 40%, 100% 100%)' }} />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Floating Stats */}
                            <motion.div 
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-10 -right-10 p-4 bg-surface border border-primary/40 rounded-2xl shadow-neon z-20"
                            >
                                <Zap className="w-6 h-6 text-primary mb-2" />
                                <p className="text-[10px] font-black text-primary uppercase">Revenue Influx</p>
                                <p className="text-xl font-digital text-white">+84.2%</p>
                            </motion.div>
                        </div>
                        
                        {/* Background Rings */}
                        <div className="absolute -inset-20 border border-primary/5 rounded-full animate-spin-slow" />
                        <div className="absolute -inset-40 border border-purple-500/5 rounded-full animate-spin-slow [animation-direction:reverse]" />
                    </motion.div>
                </div>
            </section>

            {/* Feature Section */}
            <section className="relative z-10 py-32 px-6 bg-surface/30 border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Command & Control</h2>
                        <h3 className="text-4xl font-black text-white font-digital tracking-tight">PLATFORM CAPABILITIES</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Brain, title: "Cognitive AI", desc: "Neural forecasting using NVIDIA DeepSeek NIM protocols for maximum precision." },
                            { icon: Shield, title: "Quantum Lock", desc: "Military-grade encryption for every byte of your financial sequence." },
                            { icon: Layers, title: "Flow Mapping", desc: "Deep sector breakdown of your revenue and burn rate streams." },
                            { icon: Globe, title: "Universal Sync", desc: "Connect your entire financial ecosystem through a single neural link." },
                        ].map((feature, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-surface border border-white/5 rounded-3xl hover:border-primary/30 transition-all group"
                            >
                                <div className="p-3 bg-white/5 rounded-2xl w-fit group-hover:bg-primary/20 group-hover:scale-110 transition-all mb-6">
                                    <feature.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h4 className="text-lg font-black text-white font-digital mb-2 tracking-tight uppercase">{feature.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed font-medium">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 py-32 px-6">
                <div className="max-w-5xl mx-auto p-12 bg-gradient-to-br from-indigo-600 to-primary rounded-[3rem] overflow-hidden relative group text-center shadow-[0_0_100px_rgba(99,102,241,0.2)]">
                    <div className="absolute inset-0 bg-mesh opacity-20 animate-blob" />
                    <div className="relative z-10 space-y-8">
                        <h3 className="text-4xl md:text-6xl font-black text-white font-digital tracking-tighter leading-none uppercase">
                            READY TO INHERIT <br /> THE FUTURE?
                        </h3>
                        <p className="text-white/80 text-lg max-w-lg mx-auto font-medium">
                            Join 10,000+ pioneers managing their digital assets with quantum precision.
                        </p>
                        <div className="pt-6">
                            <Link to="/register">
                                <Button className="!bg-white !text-primary !px-12 !py-5 text-lg font-black uppercase tracking-widest hover:!scale-105 transition-transform shadow-2xl">
                                    ESTABLISH LINK <ChevronRight className="w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-12 px-6 text-center border-t border-white/5">
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
