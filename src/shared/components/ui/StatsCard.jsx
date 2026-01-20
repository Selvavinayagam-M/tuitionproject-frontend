import React from 'react';
import Card from './Card';
import GlassCard from './GlassCard';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const StatsCard = ({
    title,
    value,
    icon: Icon,
    trend,
    trendType = "neutral", // up, down, neutral
    subtitle,
    variant = "default" // default, glass
}) => {
    const Component = variant === 'glass' ? GlassCard : Card;

    const trendColors = {
        up: "text-green-600 bg-green-50",
        down: "text-red-600 bg-red-50",
        neutral: "text-secondary-500 bg-secondary-50"
    };

    return (
        <Component hover={true} className="p-6 relative overflow-hidden group">
            {/* Decorative Background Blob */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="flex justify-between items-start relative z-10">
                <div>
                    <p className="text-secondary-500 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-secondary-900 tracking-tight">{value}</h3>
                    {subtitle && <p className="text-xs text-secondary-400 mt-1">{subtitle}</p>}
                </div>
                {Icon && (
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-secondary-100 text-primary-600 flex items-center justify-center text-xl relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
                        <div className="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Icon className="relative z-10" />
                    </div>
                )}
            </div>

            {trend && (
                <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mt-4 ${trendColors[trendType]}`}>
                    {trendType === 'up' && <FiTrendingUp />}
                    {trendType === 'down' && <FiTrendingDown />}
                    {trend}
                </div>
            )}
        </Component>
    );
};

export default StatsCard;
