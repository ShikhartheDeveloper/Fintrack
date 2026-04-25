import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyBarChart = ({ monthlyData }) => {
    const monthMap = {};

    monthlyData.forEach(item => {
        const { month, year, type } = item._id;
        const key = `${year}-${month.toString().padStart(2, '0')}`;
        
        if (!monthMap[key]) {
            monthMap[key] = { income: 0, expense: 0 };
        }
        monthMap[key][type] += item.total;
    });

    const sortedKeys = Object.keys(monthMap).sort();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const labels = sortedKeys.map(key => {
        const [year, month] = key.split('-');
        return `${monthNames[parseInt(month) - 1]} ${year.substring(2)}`;
    });

    const incomeData = sortedKeys.map(key => monthMap[key].income);
    const expenseData = sortedKeys.map(key => monthMap[key].expense);

    const data = {
        labels,
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: 'rgba(16, 185, 129, 0.6)',
                borderColor: '#10B981',
                borderWidth: 2,
                borderRadius: 8,
                barPercentage: 0.6,
                categoryPercentage: 0.8,
                hoverBackgroundColor: '#10B981',
            },
            {
                label: 'Expense',
                data: expenseData,
                backgroundColor: 'rgba(239, 68, 68, 0.6)',
                borderColor: '#EF4444',
                borderWidth: 2,
                borderRadius: 8,
                barPercentage: 0.6,
                categoryPercentage: 0.8,
                hoverBackgroundColor: '#EF4444',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    color: '#D1D5DB',
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        family: "'Outfit', sans-serif",
                        size: 12,
                        weight: '600'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(26, 26, 46, 0.95)',
                titleColor: '#F3F4F6',
                bodyColor: '#D1D5DB',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                padding: 12,
                usePointStyle: true,
                backdropFilter: 'blur(10px)'
            }
        },
        scales: {
            y: {
                grid: {
                    color: 'rgba(45, 45, 74, 0.5)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#9CA3AF',
                    font: { family: "'Orbitron', sans-serif", size: 10 },
                    callback: (value) => '₹' + value.toLocaleString()
                }
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#9CA3AF',
                    font: { family: "'Outfit', sans-serif", size: 11 }
                }
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeOutElastic'
        }
    };

    if (sortedKeys.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 italic">
                <div className="w-12 h-12 border-4 border-t-indigo-500 border-gray-800 rounded-full animate-spin mb-4" />
                Initializing Cognitive Streams...
            </div>
        );
    }

    return (
        <div className="relative h-64 w-full scanning-overlay group">
            <Bar data={data} options={options} />
            <div className="absolute top-2 left-2 flex items-center gap-2 px-2 py-1 bg-white/5 rounded border border-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Live Neural Projection</span>
            </div>
        </div>
    );
};

export default MonthlyBarChart;
