import React from 'react';

const variants = {
    primary: "bg-primary-50 text-primary-700 border-primary-100",
    success: "bg-green-50 text-green-700 border-green-100",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-100",
    error: "bg-red-50 text-red-700 border-red-100",
    neutral: "bg-secondary-50 text-secondary-600 border-secondary-100",
};

const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-sm",
};

const Badge = ({
    children,
    variant = "neutral",
    size = "sm",
    className = "",
    ...props
}) => {
    return (
        <span
            className={`
                inline-flex items-center font-medium rounded-full border
                ${variants[variant]} 
                ${sizes[size]} 
                ${className}
            `}
            {...props}
        >
            {children}
        </span>
    );
};

export default Badge;
