import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({
    children,
    className = "",
    hover = false,
    interactive = false,
    ...props
}) => {
    return (
        <motion.div
            className={`
                relative overflow-hidden rounded-2xl 
                bg-white/40 backdrop-blur-xl border border-white/50 shadow-soft
                dark:bg-gray-900/40 dark:border-white/10
                ${interactive ? 'cursor-pointer' : ''}
                ${className}
            `}
            whileHover={hover ? {
                y: -5,
                boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)",
                borderColor: "rgba(255,255,255,0.8)"
            } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            {...props}
        >
            {/* Subtle gradient overlay for 'premium' feel */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default GlassCard;
