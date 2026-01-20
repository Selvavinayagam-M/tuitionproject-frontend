import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = "", onClick }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 ${className}`}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
};

export default Card;
