import React from 'react';
import { FiFilter, FiCalendar } from 'react-icons/fi';

const ReportFilters = ({ onFilter, onDateChange, filters }) => {
    return (
        <div className="flex flex-col md:flex-row items-end gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 mb-6">

            <div className="flex-1 w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Report Type</label>
                <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    onChange={(e) => onFilter('type', e.target.value)}
                >
                    <option value="summary">Summary Report</option>
                    <option value="detailed">Detailed Analysis</option>
                    <option value="financial">Financial</option>
                    <option value="academic">Academic Performance</option>
                </select>
            </div>

            <div className="flex-1 w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Range</label>
                <div className="flex items-center gap-2">
                    <input
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        onChange={(e) => onDateChange('start', e.target.value)}
                    />
                    <span className="text-gray-500">to</span>
                    <input
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        onChange={(e) => onDateChange('end', e.target.value)}
                    />
                </div>
            </div>

            <button
                onClick={() => onFilter('apply')}
                className="w-full md:w-auto px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
                <div className="flex items-center justify-center">
                    <FiFilter className="w-4 h-4 mr-2" />
                    Apply Filters
                </div>
            </button>
        </div>
    );
};

export default ReportFilters;
