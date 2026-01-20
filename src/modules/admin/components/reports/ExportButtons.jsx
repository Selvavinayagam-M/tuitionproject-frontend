import React from 'react';
import { FiDownload, FiPrinter, FiFileText } from 'react-icons/fi';

const ExportButtons = ({ onExportCSV, onExportPDF, onPrint }) => {
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            <button
                onClick={onExportCSV}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
            >
                <FiFileText className="w-4 h-4 mr-2 text-green-600" />
                Export CSV
            </button>
            <button
                onClick={onExportPDF}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
            >
                <FiDownload className="w-4 h-4 mr-2 text-red-600" />
                Export PDF
            </button>
            <button
                onClick={onPrint}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
            >
                <FiPrinter className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-300" />
                Print
            </button>
        </div>
    );
};

export default ExportButtons;
