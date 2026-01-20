import React from 'react';

const StatusBadge = ({ status }) => {
    const statusStyles = {
        active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        paid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        inactive: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        unpaid: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        enrolled: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        graduated: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    };

    const defaultStyle = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    const normalizedStatus = status?.toLowerCase() || 'unknown';

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusStyles[normalizedStatus] || defaultStyle}`}>
            {status}
        </span>
    );
};

export default StatusBadge;
