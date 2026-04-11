import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, fetchMonthlyData, addTransaction } from '../features/transactions/transactionThunks';
import { getAiAdviceApi } from '../api/aiApi';
import { getSuggestionsApi, saveSuggestionApi, deleteSuggestionApi } from '../api/suggestionApi';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import CategoryPieChart from '../components/charts/CategoryPieChart';
import MonthlyBarChart from '../components/charts/MonthlyBarChart';
import TransactionItem from '../components/transactions/TransactionItem';
import SuggestionCard from '../components/ui/SuggestionCard';
import Modal from '../components/ui/Modal';
import { Wallet, TrendingUp, TrendingDown, Sparkles, Map, ListChecks, Goal, Target, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const dispatch = useDispatch();
    const { user, role } = useSelector(state => state.auth);
    const { entries, monthlyData, loading } = useSelector(state => state.transactions);
    const { budgetGoal } = useSelector(state => state.goal);
    
    const isAdmin = role === 'admin';
    const [aiAdvice, setAiAdvice] = useState('');
    const [aiLoading, setAiLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    
    // Custom context states
    const [customIncome, setCustomIncome] = useState('');
    const [customExpense, setCustomExpense] = useState('');
    const [additionalContext, setAdditionalContext] = useState('');

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
    
    // For admin, show all current month transactions; for user, filter by their transactions (already filtered via API but being extra safe here or if we want to add local filtering logic)
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
            // Find top 3 expense categories
            const expenses = entries.filter(t => t.type === 'expense');
            const categoryTotals = expenses.reduce((acc, curr) => {
                acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
                return acc;
            }, {});
            
            const topCategories = Object.entries(categoryTotals)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(item => item[0]);
            
            const reqCategories = topCategories.length > 0 ? topCategories : ['General'];
            
            const incomeToPass = customIncome ? Number(customIncome) : totalIncome;
            const expenseToPass = customExpense ? Number(customExpense) : totalExpense;
            const balanceToPass = incomeToPass - expenseToPass;

            const data = await getAiAdviceApi({ 
                categories: reqCategories, 
                income: incomeToPass, 
                expense: expenseToPass, 
                balance: balanceToPass,
                context: additionalContext
            });
            setAiAdvice(data.advice);
        } catch (error) {
            console.error(error);
            setAiAdvice('Unable to get advice right now. Check your API key.');
        } finally {
            setAiLoading(false);
        }
    };

    const handleReflectAdvice = async () => {
        if (!aiAdvice) return;
        
        try {
            // Parse segments
            const lines = aiAdvice.split('\n');
            let adviceText = "";
            let planText = "";
            let goalText = "";
            
            let currentSection = "";
            lines.forEach(line => {
                if (line.trim().startsWith('ADVICE:-')) {
                    currentSection = "advice";
                    adviceText += line.replace('ADVICE:-', '').trim() + "\n";
                } else if (line.trim().startsWith('PLAN:-')) {
                    currentSection = "plan";
                    planText += line.replace('PLAN:-', '').trim() + "\n";
                } else if (line.trim().startsWith('GOAL:-')) {
                    currentSection = "goal";
                    goalText += line.replace('GOAL:-', '').trim() + "\n";
                } else if (currentSection === "advice") {
                    adviceText += line.trim() + "\n";
                } else if (currentSection === "plan") {
                    planText += line.trim() + "\n";
                } else if (currentSection === "goal") {
                    goalText += line.trim() + "\n";
                }
            });

            // Fallback for parsing if markers are missing
            if (!adviceText.trim() && !planText.trim() && !goalText.trim()) {
                adviceText = aiAdvice;
                planText = "Execution plan included in advice above.";
                goalText = "See advice for goal details.";
            }

            // 1. Save to Suggestions (The Roadmap)
            await saveSuggestionApi({
                context: additionalContext || 'Monthly Optimization',
                income: customIncome ? Number(customIncome) : totalIncome,
                expense: customExpense ? Number(customExpense) : totalExpense,
                suggestionText: adviceText.trim() || "Advice saved",
                executionPlan: planText.trim() || "Plan saved",
                monthlyGoal: goalText.trim() || "Goal saved"
            });

            // 2. Create the Transaction (Investment)
            const balanceToPass = (customIncome ? Number(customIncome) : totalIncome) - (customExpense ? Number(customExpense) : totalExpense);
            if (balanceToPass > 0) {
                await dispatch(addTransaction({
                    text: 'Mutual Fund Investment (AI Guided)',
                    amount: balanceToPass,
                    type: 'expense',
                    category: 'Investment',
                    date: new Date().toISOString()
                })).unwrap();
            }
            
            // Refresh
            loadSuggestions();
            dispatch(fetchTransactions());
            alert('Advice reflected in your Roadmap and transaction history!');
            setAiAdvice(''); 
        } catch (error) {
            console.error(error);
            alert('Failed to reflect advice.');
        }
    };

    const handleDeleteSuggestion = async (id) => {
        if (!window.confirm('Remove this insight from your roadmap?')) return;
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
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {isAdmin ? 'Platform Dashboard' : 'My Dashboard'}
                    </h1>
                    <p className="text-gray-400">
                        {isAdmin 
                            ? 'Overview of platform-wide financial activity.' 
                            : "Welcome back. Here's your financial overview for this month."}
                    </p>
                </div>
                <Link to="/transactions">
                    <Button variant="primary">Add Transaction</Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    title="Total Balance" 
                    value={`₹${balance.toLocaleString('en-US', {minimumFractionDigits: 2})}`}
                    icon={Wallet}
                />
                <StatCard 
                    title="Income" 
                    value={`₹${totalIncome.toLocaleString('en-US', {minimumFractionDigits: 2})}`}
                    icon={TrendingUp}
                    trend={5.2}
                />
                <StatCard 
                    title="Expenses" 
                    value={`₹${totalExpense.toLocaleString('en-US', {minimumFractionDigits: 2})}`}
                    icon={TrendingDown}
                    trend={-2.4}
                />
            </div>

            {budgetGoal > 0 && (
                 <Card className="w-full">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-300 font-medium">Monthly Budget Goal (₹{budgetGoal})</span>
                        <span className={`${totalExpense > budgetGoal ? 'text-red-400' : 'text-emerald-400'}`}>
                            {formatProgress()}%
                        </span>
                    </div>
                    <div className="w-full bg-[#0F0F1A] rounded-full h-2.5">
                        <div 
                            className={`h-2.5 rounded-full ${totalExpense > budgetGoal ? 'bg-red-500' : 'bg-primary'}`}
                            style={{width: `${formatProgress()}%`}}
                        ></div>
                    </div>
                 </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <h3 className="text-lg font-semibold text-white mb-6">Income vs Expenses</h3>
                    <MonthlyBarChart monthlyData={monthlyData} />
                </Card>
                
                <Card>
                    <h3 className="text-lg font-semibold text-white mb-6">Expense Breakdown</h3>
                    <CategoryPieChart transactions={entries} />
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="col-span-1 lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-white">
                            {isAdmin ? 'Recent Platform Activity' : 'Recent Transactions'}
                        </h3>
                        <Link to="/transactions" className="text-sm border-b border-gray-600 text-gray-400 hover:text-white transition">View All</Link>
                    </div>
                    <div className="space-y-1">
                        {loading ? (
                            <p className="text-gray-500 animate-pulse">Loading...</p>
                        ) : entries.slice(0, 5).map(t => (
                            <TransactionItem key={t._id} transaction={t} />
                        ))}
                        {entries.length === 0 && !loading && (
                            <p className="text-gray-500 text-center py-4">No transactions yet.</p>
                        )}
                    </div>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-900/30 to-surface border-indigo-500/20 lg:col-span-1">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-indigo-500 bg-opacity-20 rounded-lg">
                            <Sparkles className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">AI Financial Advisor</h3>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-6">
                        Get personalized insights based on your spending habits from NVIDIA DeepSeek AI.
                    </p>

                    {aiAdvice ? (
                        <div className="prose prose-invert prose-sm">
                            <div className="bg-[#0F0F1A] border border-[#2D2D4A] rounded p-4 mb-6 max-h-[400px] overflow-y-auto custom-scrollbar">
                                {aiAdvice.split('\n').map((line, i) => {
                                    if (line.trim() === '') return null;
                                    const isHighlight = line.startsWith('ADVICE:-') || line.startsWith('PLAN:-') || line.startsWith('GOAL:-');
                                    return (
                                        <div key={i} className={`mb-1 ${isHighlight ? 'text-indigo-300 font-bold border-t border-[#2D2D4A] pt-4 first:border-0 first:pt-0 mt-4 first:mt-0' : 'text-gray-300'}`}>
                                            {line.replace('ADVICE:-', '').replace('PLAN:-', '').replace('GOAL:-', '')}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="flex gap-3">
                                <Button onClick={handleGetAdvice} variant="ghost" className="flex-1 text-sm bg-[#2D2D4A] hover:bg-gray-700" disabled={aiLoading}>
                                    {aiLoading ? 'Analyzing...' : 'Refresh Advice'}
                                </Button>
                                <Button onClick={handleReflectAdvice} variant="primary" className="flex-1 text-sm bg-emerald-600 hover:bg-emerald-500">
                                    Save to Roadmap
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="space-y-3 mb-4">
                                <div>
                                    <label className="text-xs text-gray-400 mb-1 block">Monthly Salary (Optional Override)</label>
                                    <input type="number" placeholder={`Currently ₹${totalIncome}`} value={customIncome} onChange={e => setCustomIncome(e.target.value)} className="w-full bg-[#0F0F1A]/50 border border-[#2D2D4A] rounded-lg p-2 text-white text-sm focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 mb-1 block">Expected Expenses (Optional Override)</label>
                                    <input type="number" placeholder={`Currently ₹${totalExpense}`} value={customExpense} onChange={e => setCustomExpense(e.target.value)} className="w-full bg-[#0F0F1A]/50 border border-[#2D2D4A] rounded-lg p-2 text-white text-sm focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 mb-1 block">Personal Context & Goals</label>
                                    <textarea placeholder="e.g. Save up for a new car..." value={additionalContext} onChange={e => setAdditionalContext(e.target.value)} className="w-full bg-[#0F0F1A]/50 border border-[#2D2D4A] rounded-lg p-2 text-white text-sm h-16 focus:outline-none focus:border-indigo-500" />
                                </div>
                            </div>
                            <Button onClick={handleGetAdvice} variant="primary" className="w-full" disabled={aiLoading || (entries.length === 0 && !customIncome)}>
                                {aiLoading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        {additionalContext ? `Analyzing: ${additionalContext}...` : 'Making your best financial advice...'}
                                    </span>
                                ) : 'Get AI Advice'}
                            </Button>
                        </div>
                    )}
                </Card>

                <Card className="col-span-1 lg:col-span-3">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                            <Map className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Your Financial Roadmap</h3>
                    </div>
                    {suggestions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {suggestions.map(s => (
                                <SuggestionCard 
                                    key={s._id} 
                                    suggestion={s} 
                                    onDelete={handleDeleteSuggestion} 
                                    onClick={() => setSelectedSuggestion(s)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-[#0F0F1A]/30 rounded-xl border border-dashed border-[#2D2D4A]">
                            <p className="text-gray-500 text-sm">No suggestions saved yet. Get AI advice and click "Reflect" to start your roadmap.</p>
                        </div>
                    )}
                </Card>
            </div>

            {/* Suggestion Detail Modal */}
            <Modal 
                isOpen={!!selectedSuggestion} 
                onClose={() => setSelectedSuggestion(null)}
                title="Financial Strategy Detail"
            >
                {selectedSuggestion && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-500/20 rounded-lg">
                                    <Target className="w-6 h-6 text-indigo-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg capitalize">{selectedSuggestion.context}</h4>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>Saved on {new Date(selectedSuggestion.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-[#0F0F1A] rounded-xl border border-[#2D2D4A]">
                                <span className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Context Salary</span>
                                <span className="text-white font-bold">₹{selectedSuggestion.income?.toLocaleString()}</span>
                            </div>
                            <div className="p-4 bg-[#0F0F1A] rounded-xl border border-[#2D2D4A]">
                                <span className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Context Expense</span>
                                <span className="text-white font-bold">₹{selectedSuggestion.expense?.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-3 px-1">
                                    <Sparkles className="w-4 h-4 text-indigo-400" />
                                    <h5 className="text-white font-bold text-sm">Advice & Insights</h5>
                                </div>
                                <div className="text-sm text-gray-300 bg-[#0F0F1A] p-5 rounded-2xl border border-[#2D2D4A] leading-relaxed whitespace-pre-line h-full min-h-[150px]">
                                    {selectedSuggestion.suggestionText}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 mb-3 px-1">
                                    <ListChecks className="w-4 h-4 text-emerald-400" />
                                    <h5 className="text-white font-bold text-sm">Execution Roadmap</h5>
                                </div>
                                <div className="text-sm text-gray-300 bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/10 leading-relaxed whitespace-pre-line h-full min-h-[150px]">
                                    {selectedSuggestion.executionPlan}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-gradient-to-r from-amber-500/5 to-amber-500/[0.02] rounded-2xl border border-amber-500/10 flex items-center justify-between shadow-inner">
                            <div className="flex items-center gap-2">
                                <Goal className="w-5 h-5 text-amber-400" />
                                <span className="text-white font-bold">Monthly Target</span>
                            </div>
                            <span className="text-lg font-black text-amber-400">{selectedSuggestion.monthlyGoal}</span>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default DashboardPage;
