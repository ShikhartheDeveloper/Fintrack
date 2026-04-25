import React from 'react';
import Card from './Card';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, trend }) => {
    // Determine theme based on title
    const isIncome = title.toLowerCase().includes('income');
    const isExpense = title.toLowerCase().includes('expense');
    const isBalance = title.toLowerCase().includes('balance');

    const themeColors = {
        income: 'from-emerald-500/20 to-emerald-900/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/5',
        expense: 'from-red-500/20 to-red-900/10 text-red-400 border-red-500/20 shadow-red-500/5',
        balance: 'from-indigo-500/20 to-indigo-900/10 text-indigo-400 border-indigo-500/20 shadow-indigo-500/5',
    };

    const currentTheme = isIncome ? themeColors.income : isExpense ? themeColors.expense : themeColors.balance;

    return (
        <Card className={`relative group transition-all duration-500 bg-gradient-to-br ${currentTheme}`}>
            {/* Holographic Scan Line */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent h-[20%] w-full animate-scan pointer-events-none" />
            
            <div className="flex justify-between items-start relative z-10">
                <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1 opacity-70">{title}</p>
                    <motion.h3 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-3xl font-black text-white font-digital tracking-tight"
                    >
                        {value}
                    </motion.h3>
                </div>
                <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>

            {trend !== undefined && (
                <div className="mt-6 flex items-center relative z-10">
                    <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${trend >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                        {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}%
                    </div>
                    <span className="text-gray-500 text-[10px] font-medium ml-2 uppercase tracking-tighter">vs Last Month</span>
                </div>
            )}

            {/* Bottom Glow Decoration */}
            <div className={`absolute -bottom-1 -left-1 -right-1 h-1 blur-lg opacity-50 transition-opacity group-hover:opacity-100 ${isIncome ? 'bg-emerald-500' : isExpense ? 'bg-red-500' : 'bg-indigo-500'}`} />
        </Card>
    );
};

export default StatCard;
