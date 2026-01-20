import React from 'react';
import Card from './Card';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const StatsCard = ({
    title,
    value,
    icon: Icon,
    trend,
    trendType = "neutral", // up, down, neutral
    subtitle
}) => {
    const trendColors = {
        up: "text-green-600 bg-green-50",
        down: "text-red-600 bg-red-50",
        neutral: "text-secondary-500 bg-secondary-50"
    };

    return (
        <Card hover className="relative overflow-hidden">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-secondary-500 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-secondary-900">{value}</h3>
                    {subtitle && <p className="text-xs text-secondary-400 mt-1">{subtitle}</p>}
                </div>
                {Icon && (
                    <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center text-xl">
                        <Icon />
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
        </Card>
    );
};

export default StatsCard;
