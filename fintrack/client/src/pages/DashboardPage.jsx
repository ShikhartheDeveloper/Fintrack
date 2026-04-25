import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, fetchMonthlyData } from '../features/transactions/transactionThunks';
import { getAiAdviceApi } from '../api/aiApi';
import { getSuggestionsApi, deleteSuggestionApi } from '../api/suggestionApi';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import CategoryPieChart from '../components/charts/CategoryPieChart';
import MonthlyBarChart from '../components/charts/MonthlyBarChart';
import TransactionItem from '../components/transactions/TransactionItem';
import SuggestionCard from '../components/ui/SuggestionCard';
import Modal from '../components/ui/Modal';
import AIAssistantModal from '../components/ui/AIAssistantModal';
import { Wallet, TrendingUp, TrendingDown, Sparkles, Map, ListChecks, Goal, Target, Calendar, Brain, Search, Terminal, Zap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardPage = () => {
    const dispatch = useDispatch();
    const { role } = useSelector(state => state.auth);
    const { entries, monthlyData, loading } = useSelector(state => state.transactions);
    const { budgetGoal } = useSelector(state => state.goal);
    
    const isAdmin = role === 'admin';
    const [aiAdvice, setAiAdvice] = useState([]);
    const [aiLoading, setAiLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchTransactions());
        dispatch(fetchMonthlyData());
        loadSuggestions();
    }, [dispatch]);

    const loadSuggestions = async () => {
        try {
            const data = await getSuggestionsApi();
            setSuggestions(data);
        } catch (error) {
            console.error('Error loading suggestions:', error);
        }
    };

    // Calculate totals
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    
    let totalIncome = 0;
    let totalExpense = 0;
    
    const currentMonthTransactions = entries.filter(t => {
        const d = new Date(t.date);
        return d.getMonth() + 1 === currentMonth && d.getFullYear() === currentYear;
    });

    currentMonthTransactions.forEach(t => {
        if (t.type === 'income') totalIncome += t.amount;
        if (t.type === 'expense') totalExpense += t.amount;
    });

    const balance = totalIncome - totalExpense;
    
    const handleGetAdvice = async () => {
        if (entries.length === 0) return;
        
        setAiLoading(true);
        try {
            const expenses = entries.filter(t => t.type === 'expense');
            const categoryTotals = expenses.reduce((acc, curr) => {
                acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
                return acc;
            }, {});
            
            const topCategories = Object.entries(categoryTotals)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(item => item[0]);
            
            const reqCategories = topCategories.length > 0 ? topCategories : ['General Spending'];

            const data = await getAiAdviceApi({ 
                categories: reqCategories, 
                income: totalIncome, 
                expense: totalExpense, 
                balance: balance,
                context: "GIVE_SHORT_TIPS" // Specialized signal
            });

            // Parse bullet points from AI response
            // Assuming the AI returns points starting with - or *
            const tips = data.advice
                .split('\n')
                .map(line => line.trim().replace(/^[-*•]\s?/, ''))
                .filter(line => line.length > 3)
                .slice(0, 3);
            
            setAiAdvice(tips);
        } catch (error) {
            console.error(error);
            setAiAdvice(['System synchronization error. Please retry.']);
        } finally {
            setAiLoading(false);
        }
    };

    const handleDeleteSuggestion = async (id) => {
        if (!window.confirm('Delete this neural roadmap entry?')) return;
        try {
            await deleteSuggestionApi(id);
            loadSuggestions();
        } catch (error) {
            console.error(error);
        }
    };

    const formatProgress = () => {
        if(budgetGoal === 0) return 0;
        return Math.min((totalExpense / budgetGoal) * 100, 100).toFixed(1);
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl font-black text-white mb-2 font-digital tracking-tight holographic-text"
                    >
                        {isAdmin ? 'ADMIN CONTROL CENTER' : 'FINANCIAL INTEL HUB'}
                    </motion.h1>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-500/10 rounded border border-blue-500/20">
                            <Zap className="w-3 h-3 text-blue-400" />
                            <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Active Link</span>
                        </div>
                        <p className="text-gray-500 text-sm font-medium">
                            System time: {new Date().toLocaleTimeString()}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button onClick={() => setIsAssistantOpen(true)} variant="ghost" className="bg-primary/5">
                        <Brain className="w-4 h-4" />
                        AI Assistant
                    </Button>
                    <Link to="/transactions">
                        <Button variant="primary">Add Transaction</Button>
                    </Link>
                </div>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    title="Liquid Balance" 
                    value={`₹${balance.toLocaleString('en-US')}`}
                    icon={Wallet}
                />
                <StatCard 
                    title="Revenue Influx" 
                    value={`₹${totalIncome.toLocaleString('en-US')}`}
                    icon={TrendingUp}
                    trend={5.2}
                />
                <StatCard 
                    title="System Burn" 
                    value={`₹${totalExpense.toLocaleString('en-US')}`}
                    icon={TrendingDown}
                    trend={-2.4}
                />
            </div>

            {/* Budget Goal Section */}
            {budgetGoal > 0 && (
                 <Card className="w-full relative overflow-hidden group">
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-primary/40 animate-scan pointer-events-none" />
                    
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1 block">Constraint Monitoring</span>
                            <h4 className="text-white font-bold">Monthly Budget Compliance</h4>
                        </div>
                        <div className="text-right">
                            <span className={`text-2xl font-digital font-black ${totalExpense > budgetGoal ? 'text-red-400 glow-red' : 'text-emerald-400 glow-emerald'}`}>
                                {formatProgress()}%
                            </span>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Threshold: ₹{budgetGoal.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="w-full bg-[#0F0F1A] rounded-full h-3 border border-white/5 p-0.5">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${formatProgress()}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className={`h-full rounded-full relative ${
                                totalExpense > budgetGoal 
                                ? 'bg-gradient-to-r from-red-600 to-red-400' 
                                : 'bg-gradient-to-r from-indigo-600 to-indigo-400'
                            }`}
                        >
                            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                        </motion.div>
                    </div>
                 </Card>
            )}

            {/* AI ADVISOR Section - REFACTORED PER USER REQUEST */}
            <div className="flex flex-col gap-6">
                <div className="flex justify-center">
                    <Button 
                        onClick={handleGetAdvice} 
                        variant="primary" 
                        disabled={aiLoading}
                        className="!px-12 !py-4 shadow-neon group"
                    >
                        {aiLoading ? (
                            <span className="flex items-center gap-2">
                                <Brain className="w-5 h-5 animate-pulse" />
                                SYNCHRONIZING NEURAL STREAMS...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 group-hover:animate-spin" />
                                GET AI ADVICE
                            </span>
                        )}
                    </Button>
                </div>

                <AnimatePresence>
                    {aiAdvice.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <Card className="bg-[#1A1A2E]/80 backdrop-blur-3xl border-primary/30 max-w-2xl mx-auto shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-primary/20 rounded-xl">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-black text-white font-digital tracking-widest uppercase">Practical Wealth Insights</h3>
                                </div>
                                <div className="space-y-4">
                                    {aiAdvice.map((tip, idx) => (
                                        <motion.div 
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="flex gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/[0.08] transition-colors"
                                        >
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs font-digital border border-primary/20">
                                                0{idx + 1}
                                            </div>
                                            <p className="text-gray-300 text-sm font-medium leading-relaxed">
                                                {tip}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="mt-8 flex justify-center opacity-40">
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-3 h-3 text-primary" />
                                        <span className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">Cognitive Protocol Active</span>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                        </div>
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Flow Analysis: Revenue vs Burn</h3>
                    </div>
                    <div className="h-72">
                        <MonthlyBarChart monthlyData={monthlyData} />
                    </div>
                </Card>
                
                <Card className="relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                            <Search className="w-4 h-4 text-indigo-400" />
                        </div>
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Sector Allocation</h3>
                    </div>
                    <div className="h-72">
                        <CategoryPieChart transactions={entries} />
                    </div>
                </Card>
            </div>

            {/* Activity Center */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <Card className="col-span-1 lg:col-span-2">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                                <Terminal className="w-4 h-4 text-gray-400" />
                            </div>
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Recent Activity Log</h3>
                        </div>
                        <Link to="/transactions">
                            <Button variant="ghost" className="text-[10px] py-1 h-fit">VIEW FULL LOG</Button>
                        </Link>
                    </div>
                    <div className="space-y-2">
                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-12 bg-white/5 border border-white/5 rounded-xl animate-pulse" />
                                ))}
                            </div>
                        ) : entries.slice(0, 5).map(t => (
                            <TransactionItem key={t._id} transaction={t} />
                        ))}
                    </div>
                </Card>

                {/* ROADMAP SECTION */}
                <div className="col-span-1 h-full flex flex-col">
                    <Card className="flex-1">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                <Map className="w-5 h-5 text-emerald-400" />
                            </div>
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Saved Protocols</h3>
                        </div>
                        {suggestions.length > 0 ? (
                            <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                                {suggestions.map(s => (
                                    <div 
                                        key={s._id} 
                                        onClick={() => setSelectedSuggestion(s)}
                                        className="p-4 bg-white/5 border border-white/5 rounded-2xl cursor-pointer hover:border-primary/30 transition-all flex justify-between items-center group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Target className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
                                            <div>
                                                <p className="text-xs font-bold text-gray-300 uppercase truncate max-w-[120px]">{s.context}</p>
                                                <p className="text-[10px] text-gray-500 font-medium">Saved {new Date(s.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center opacity-30 italic">
                                <Target className="w-10 h-10 mb-2" />
                                <p className="text-xs font-bold tracking-widest">VOID</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>

            {/* Modals */}
            <AIAssistantModal 
                isOpen={isAssistantOpen} 
                onClose={() => setIsAssistantOpen(false)}
                contextData={{ balance, income: totalIncome, expense: totalExpense }}
            />

            <Modal 
                isOpen={!!selectedSuggestion} 
                onClose={() => setSelectedSuggestion(null)}
                title="STRATEGY PROTOCOL"
            >
                {selectedSuggestion && (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl border border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/20 rounded-xl">
                                    <Target className="w-6 h-6 text-primary shadow-neon" />
                                </div>
                                <div>
                                    <h4 className="text-white font-black text-xl font-digital uppercase">{selectedSuggestion.context}</h4>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>INITIALIZED: {new Date(selectedSuggestion.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-sm text-gray-300 bg-[#0F0F1A] p-6 rounded-2xl border border-white/5 leading-relaxed whitespace-pre-line">
                            {selectedSuggestion.suggestionText}
                            {selectedSuggestion.executionPlan && (
                                <div className="mt-4 pt-4 border-t border-white/5">
                                    <h5 className="text-[10px] font-black text-primary uppercase mb-2">Roadmap</h5>
                                    {selectedSuggestion.executionPlan}
                                </div>
                            )}
                        </div>
                        <div className="p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-center justify-between">
                            <span className="text-white font-black tracking-widest uppercase text-sm font-digital">Monthly Target</span>
                            <span className="text-2xl font-black text-emerald-400 font-digital">{selectedSuggestion.monthlyGoal}</span>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default DashboardPage;
