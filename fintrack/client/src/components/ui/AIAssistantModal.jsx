import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Bot, User, Brain, Zap, ShieldCheck } from 'lucide-react';
import Button from './Button';

const AIAssistantModal = ({ isOpen, onClose, contextData }) => {
    const [messages, setMessages] = useState([
        { 
            role: 'assistant', 
            content: "Neural link established. I'm your Cognitive Financial Advisor. How can I optimize your wealth today?",
            id: 1,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { 
            role: 'user', 
            content: input, 
            id: Date.now(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simple mock response for now to keep it snappy, 
        // in a real app this would call the ai service with context
        setTimeout(() => {
            const aiMsg = {
                role: 'assistant',
                content: `Analyzing "${input}" against your current balance of ₹${contextData.balance.toLocaleString()}... I recommend reallocating 15% of your entertainment budget to savings to hit your goal 12 days earlier.`,
                id: Date.now() + 1,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-bg/80 backdrop-blur-md"
                />
                
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-2xl h-[80vh] bg-surface border border-primary/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.2)] flex flex-col"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-primary/10 to-transparent">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="p-3 bg-primary/20 rounded-2xl relative z-10">
                                    <Brain className="w-6 h-6 text-primary shadow-neon" />
                                </div>
                                <div className="absolute inset-0 bg-primary blur-xl opacity-20 animate-pulse" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-white tracking-tight font-digital">Cognitive Analysis Hub</h3>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Neural Link Active</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-mesh">
                        {messages.map((msg) => (
                            <motion.div 
                                key={msg.id}
                                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`p-2 rounded-xl h-fit ${msg.role === 'user' ? 'bg-indigo-500/20' : 'bg-white/5 border border-white/10'}`}>
                                        {msg.role === 'user' ? <User className="w-4 h-4 text-indigo-400" /> : <Bot className="w-4 h-4 text-primary" />}
                                    </div>
                                    <div className={`space-y-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                                            msg.role === 'user' 
                                            ? 'bg-primary text-white rounded-tr-none shadow-neon' 
                                            : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-none backdrop-blur-md'
                                        }`}>
                                            {msg.content}
                                        </div>
                                        <span className="text-[10px] text-gray-500 font-bold mx-1">{msg.time}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="flex gap-3 max-w-[80%]">
                                    <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                                        <Bot className="w-4 h-4 text-primary animate-bounce" />
                                    </div>
                                    <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" />
                                            <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                                            <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer / Input */}
                    <div className="p-6 bg-surface/50 border-t border-white/10 backdrop-blur-xl">
                        <div className="flex gap-4 p-2 bg-[#0F0F1A] border border-white/10 rounded-2xl focus-within:border-primary/50 transition-colors">
                            <input 
                                type="text" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about your finances or request a strategy..."
                                className="flex-1 bg-transparent px-2 text-sm text-white placeholder-gray-600 focus:outline-none"
                            />
                            <Button 
                                onClick={handleSend}
                                variant="primary" 
                                className="h-10 w-10 !p-0 rounded-xl"
                                disabled={!input.trim() || isTyping}
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="mt-4 flex items-center justify-center gap-6">
                            <div className="flex items-center gap-1.5 opacity-50">
                                <Zap className="w-3 h-3 text-amber-400" />
                                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">NVIDIA NIM Processing</span>
                            </div>
                            <div className="flex items-center gap-1.5 opacity-50">
                                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">AES-256 Encrypted</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AIAssistantModal;
