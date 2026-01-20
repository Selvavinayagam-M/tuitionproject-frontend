import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className = '', width = 'auto', type = 'button' }) => {
    const baseStyles = "inline-flex items-center justify-center font-bold rounded-full transition-all duration-300 focus:outline-none";

    const variants = {
        primary: "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/30 border border-transparent",
        secondary: "bg-blue-900 text-white hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-900/30 border border-transparent",
        outline: "bg-transparent border-2 border-current hover:bg-white/10",
        ghost: "bg-transparent text-blue-900 hover:bg-blue-50",
        white: "bg-white text-blue-900 hover:bg-gray-100 shadow-md"
    };

    const widthStyles = width === 'full' ? 'w-full' : '';

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${widthStyles} ${className} px-6 py-3`}
        >
            {children}
        </motion.button>
    );
};

export default Button;
