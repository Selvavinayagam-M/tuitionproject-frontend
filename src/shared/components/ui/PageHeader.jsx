import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({
    title,
    subtitle,
    user,
    actions,
    className = ""
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 ${className}`}
        >
            <div>
                {user && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-primary-600 font-semibold mb-1"
                    >
                        Good Morning, {user.split(' ')[0]} 👋
                    </motion.p>
                )}
                <h1 className="text-3xl font-bold text-secondary-900 tracking-tight">{title}</h1>
                {subtitle && <p className="text-secondary-500 mt-1">{subtitle}</p>}
            </div>
            {actions && (
                <div className="flex items-center gap-3">
                    {actions}
                </div>
            )}
        </motion.div>
    );
};

export default PageHeader;
