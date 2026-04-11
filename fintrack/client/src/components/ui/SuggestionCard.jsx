import React from 'react';
import Card from './Card';
import { Target, ListChecks, Goal, Trash2, Calendar } from 'lucide-react';

const SuggestionCard = ({ suggestion, onDelete, onClick }) => {
    const formattedDate = new Date(suggestion.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <Card 
            onClick={onClick}
            className="border-indigo-500/10 hover:border-indigo-500/40 hover:bg-indigo-500/[0.02] transition-all duration-300 cursor-pointer group"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-indigo-500/10 rounded-lg">
                        <Target className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                        <h4 className="text-white font-semibold text-sm capitalize">{suggestion.context || 'Financial Strategy'}</h4>
                        <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-0.5">
                            <Calendar className="w-3 h-3" />
                            <span>{formattedDate}</span>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={() => onDelete(suggestion._id)}
                    className="p-1 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                    title="Remove Suggestion"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                        <ListChecks className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Execution Plan</span>
                    </div>
                    <div className="text-xs text-gray-300 bg-[#0F0F1A]/40 rounded-lg p-2.5 border border-[#2D2D4A]/50 whitespace-pre-line leading-relaxed">
                        {suggestion.executionPlan}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#2D2D4A]/50">
                    <div className="flex items-center gap-1.5">
                        <Goal className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-[11px] font-bold text-gray-400 uppercase">Monthly Goal</span>
                    </div>
                    <span className="text-xs font-bold text-amber-400">{suggestion.monthlyGoal}</span>
                </div>
            </div>
        </Card>
    );
};

export default SuggestionCard;
