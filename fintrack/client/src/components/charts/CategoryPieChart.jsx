import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { categoryColors } from '../../utils/categoryColors';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ transactions }) => {
    const expenses = transactions.filter(t => t.type === 'expense');
    
    const categoryTotals = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
    }, {});

    const labels = Object.keys(categoryTotals);
    const dataVals = Object.values(categoryTotals);
    const bgColors = labels.map(label => categoryColors[label] || '#9CA3AF');
    const borderColors = labels.map(label => categoryColors[label] || '#9CA3AF');

    const data = {
        labels,
        datasets: [
            {
                data: dataVals,
                backgroundColor: bgColors.map(color => color + '99'),
                borderColor: borderColors,
                borderWidth: 2,
                hoverOffset: 15,
                hoverBorderColor: '#fff',
                hoverBorderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#D1D5DB',
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        family: "'Outfit', sans-serif",
                        size: 11,
                        weight: '600'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(26, 26, 46, 0.95)',
                titleColor: '#F3F4F6',
                bodyColor: '#D1D5DB',
                borderColor: 'rgba(99, 102, 241, 0.4)',
                borderWidth: 1,
                padding: 12,
                boxPadding: 8,
                usePointStyle: true,
                backdropFilter: 'blur(10px)'
            }
        },
        cutout: '75%',
        animation: {
            animateRotate: true,
            animateScale: true
        }
    };

    if (expenses.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500 font-medium italic tracking-widest animate-pulse">
                SCANNING SYSTEM DATA...
            </div>
        );
    }

    return (
        <div className="relative h-64 w-full scanning-overlay group">
            <Doughnut data={data} options={options} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none group-hover:scale-110 transition-transform duration-500">
                <span className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">Burn Rate</span>
                <span className="text-white font-black text-2xl font-digital glow-indigo">
                    ₹{dataVals.reduce((a, b) => a + b, 0).toLocaleString()}
                </span>
            </div>
            
            {/* Visual Scan Line Simulation */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan z-20 pointer-events-none" />
        </div>
    );
};

export default CategoryPieChart;
