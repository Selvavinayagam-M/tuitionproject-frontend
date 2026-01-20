import React from 'react';
import { FiInbox } from 'react-icons/fi';

const EmptyState = ({ message = "No data available", subMessage = "There are no records to display currently.", action }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg border border-dashed border-gray-300 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/20 mb-4">
                <FiInbox className="w-8 h-8 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{message}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-sm">{subMessage}</p>
            {action && (
                <div>
                    {action}
                </div>
            )}
        </div>
    );
};

export default EmptyState;
