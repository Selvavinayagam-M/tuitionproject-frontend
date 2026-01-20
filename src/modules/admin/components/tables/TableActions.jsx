import React from 'react';
import { FiPlus, FiDownload } from 'react-icons/fi';

const TableActions = ({ onAdd, onExport, addLabel = "Add New" }) => {
    return (
        <div className="flex gap-2">
            {onExport && (
                <button
                    onClick={onExport}
                    className="flex items-center justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                    <FiDownload className="w-4 h-4 mr-2" />
                    Export
                </button>
            )}
            {onAdd && (
                <button
                    onClick={onAdd}
                    className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    <FiPlus className="w-4 h-4 mr-2" />
                    {addLabel}
                </button>
            )}
        </div>
    );
};

export default TableActions;
