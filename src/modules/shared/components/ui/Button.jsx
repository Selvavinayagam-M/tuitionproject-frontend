import React from 'react';
import { motion } from 'framer-motion';

const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-200 border-transparent",
    secondary: "bg-white text-secondary-700 border-secondary-200 hover:bg-secondary-50 hover:border-secondary-300",
    ghost: "bg-transparent text-secondary-600 hover:bg-secondary-100 border-transparent",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border-red-100",
};

const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
};

const Button = ({
    children,
    variant = "primary",
    size = "md",
    className = "",
    icon: Icon,
    isLoading = false,
    disabled = false,
    onClick,
    type = "button",
    ...props
}) => {
    return (
        <motion.button
            whileTap={{ scale: 0.97 }}
            type={type}
            disabled={disabled || isLoading}
            onClick={onClick}
            className={`
                flex items-center justify-center gap-2 font-medium rounded-xl border transition-all duration-200
                ${variants[variant]} 
                ${sizes[size]} 
                ${disabled || isLoading ? "opacity-60 cursor-not-allowed" : ""}
                ${className}
            `}
            {...props}
        >
            {isLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : Icon ? (
                <Icon className={children ? "text-lg" : "text-xl"} />
            ) : null}
            {children}
        </motion.button>
    );
};

export default Button;
