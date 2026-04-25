import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyle = "relative overflow-hidden px-6 py-2.5 font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 disabled:opacity-50 flex items-center justify-center gap-2 group";
    
    const variants = {
        primary: "bg-primary text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] active:scale-95",
        ghost: "bg-transparent border border-primary/50 text-indigo-400 hover:bg-primary/10 hover:border-primary active:scale-95",
        danger: "bg-danger text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-95",
    };

    return (
        <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {/* Holographic Shine Effect */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine" />
            
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
};

export default Button;
