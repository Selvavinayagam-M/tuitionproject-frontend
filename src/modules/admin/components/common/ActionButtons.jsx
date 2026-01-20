import React from 'react';
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';

const ActionButtons = ({ onEdit, onDelete, onView, id }) => {
    return (
        <div className="flex items-center space-x-2">
            {onView && (
                <button
                    onClick={() => onView(id)}
                    className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                    title="View Details"
                >
                    <FiEye className="w-4 h-4" />
                </button>
            )}
            {onEdit && (
                <button
                    onClick={() => onEdit(id)}
                    className="p-1.5 text-indigo-600 hover:bg-indigo-100 rounded-md dark:text-indigo-400 dark:hover:bg-indigo-900/30 transition-colors"
                    title="Edit"
                >
                    <FiEdit className="w-4 h-4" />
                </button>
            )}
            {onDelete && (
                <button
                    onClick={() => onDelete(id)}
                    className="p-1.5 text-red-600 hover:bg-red-100 rounded-md dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                    title="Delete"
                >
                    <FiTrash2 className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

export default ActionButtons;
