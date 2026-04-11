import React, { useState } from 'react';
import Card from './Card';
import { Target, ListChecks, Goal, Trash2, Calendar, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

const SuggestionCard = ({ suggestion, onDelete, onClick }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const formattedDate = new Date(suggestion.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    const isPlaceholderPlan = suggestion.executionPlan === "Execution plan included in advice above.";
    const isPlaceholderGoal = suggestion.monthlyGoal === "See advice for goal details.";

    // Function to handle card click without triggering the delete button
    const handleCardClick = (e) => {
        // If the click was on the toggle button or delete button, don't trigger the modal
        if (e.target.closest('.no-modal-trigger')) return;
        onClick();
    };

    return (
        <Card 
            onClick={handleCardClick}
            className="border-indigo-500/10 hover:border-indigo-500/40 hover:bg-indigo-500/[0.02] transition-all duration-300 cursor-pointer group flex flex-col h-full"
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
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(suggestion._id);
                    }}
                    className="p-1 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors no-modal-trigger"
                    title="Remove Suggestion"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 space-y-4">
                {/* Advice Section - The "Full Details" part */}
                <div className="advice-section">
                    <div className="flex items-center gap-1.5 mb-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Advice & Insights</span>
                    </div>
                    <div className={`text-xs text-gray-300 bg-indigo-500/5 rounded-lg p-2.5 border border-indigo-500/10 whitespace-pre-line leading-relaxed ${!isExpanded ? 'max-h-24 overflow-hidden relative' : ''}`}>
                        {suggestion.suggestionText}
                        {!isExpanded && suggestion.suggestionText.length > 150 && (
                            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#151521] to-transparent pointer-events-none"></div>
                        )}
                    </div>
                    {suggestion.suggestionText.length > 150 && (
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(!isExpanded);
                            }}
                            className="mt-1 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5 no-modal-trigger transition-colors"
                        >
                            {isExpanded ? (
                                <>Show Less <ChevronUp className="w-3 h-3" /></>
                            ) : (
                                <>Read More <ChevronDown className="w-3 h-3" /></>
                            )}
                        </button>
                    )}
                </div>

                {/* Execution Plan - Only show if not placeholder or if expanded */}
                {(!isPlaceholderPlan || isExpanded) && (
                    <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                            <ListChecks className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Execution Plan</span>
                        </div>
                        <div className="text-xs text-gray-300 bg-[#0F0F1A]/40 rounded-lg p-2.5 border border-[#2D2D4A]/50 whitespace-pre-line leading-relaxed">
                            {suggestion.executionPlan}
                        </div>
                    </div>
                )}

                {/* Monthly Goal - Only show if not placeholder or if expanded */}
                {(!isPlaceholderGoal || isExpanded) && (
                    <div className="flex items-center justify-between pt-2 border-t border-[#2D2D4A]/50">
                        <div className="flex items-center gap-1.5">
                            <Goal className="w-3.5 h-3.5 text-amber-400" />
                            <span className="text-[11px] font-bold text-gray-400 uppercase">Monthly Goal</span>
                        </div>
                        <span className="text-xs font-bold text-amber-400">{suggestion.monthlyGoal}</span>
                    </div>
                )}
            </div>
            
            <div className="mt-4 pt-3 border-t border-white/5 text-center">
                <span className="text-[9px] text-gray-600 uppercase tracking-widest font-bold">Click for full strategy details</span>
            </div>
        </Card>
    );
};

export default SuggestionCard;
