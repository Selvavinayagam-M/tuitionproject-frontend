import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
    children,
    className = "",
    noPadding = false,
    hover = false,
    onClick,
    ...props
}) => {
    const baseClasses = "bg-white rounded-2xl border border-secondary-200 shadow-card overflow-hidden transition-all duration-300";
    const paddingClasses = noPadding ? "" : "p-6";
    const hoverClasses = hover ? "hover:shadow-card-hover hover:border-primary-200 cursor-pointer" : "";

    const content = (
        <div
            className={`${baseClasses} ${paddingClasses} ${hoverClasses} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );

    if (hover) {
        return (
            <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {content}
            </motion.div>
        );
    }

    return content;
};

export default Card;
