import React, { useEffect, useState } from 'react';
import { FaPhoneAlt, FaWhatsapp, FaPlus, FaCheckCircle, FaUserClock, FaHistory } from 'react-icons/fa';
import { mockService } from '../../../../services/api';

const KanbanColumn = ({ status, items, color, onStatusUpdate }) => (
    <div className={`flex flex-col bg-gray-100 dark:bg-gray-800 rounded-xl h-full w-full`}>
        {/* Column Header */}
        <div className={`p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center rounded-t-xl bg-${color}-50 dark:bg-${color}-900/20`}>
            <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full bg-${color}-500 mr-2`}></div>
                <h3 className="font-bold text-gray-700 dark:text-gray-200">{status}</h3>
            </div>
            <span className="text-xs font-bold bg-white dark:bg-gray-700 px-2 py-1 rounded text-gray-500 dark:text-gray-400">{items.length}</span>
        </div>

        {/* Scrollable Items Area */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar min-h-[200px]">
            {items.map(item => (
                <div key={item.id} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow cursor-grab">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">{item.class}</span>
                        <span className="text-xs text-gray-400">{item.date}</span>
                    </div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1">{item.name}</h4>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">{item.source}</div>

                    {/* Action Bar */}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-50 dark:border-gray-600 mt-2">
                        <div className="flex space-x-2">
                            <a href={`tel:${item.phone}`} className="p-2 text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 bg-gray-50 dark:bg-gray-600 rounded-full hover:bg-green-50 dark:hover:bg-green-900/30 transition">
                                <FaPhoneAlt size={12} />
                            </a>
                            <a href={`https://wa.me/${item.phone}`} target="_blank" className="p-2 text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 bg-gray-50 dark:bg-gray-600 rounded-full hover:bg-green-50 dark:hover:bg-green-900/30 transition">
                                <FaWhatsapp size={14} />
                            </a>
                        </div>
                        {status !== 'Enrolled' && (
                            <button
                                onClick={() => onStatusUpdate(item.id, 'Enrolled')}
                                title="Convert to Student"
                                className="text-xs bg-blue-900 dark:bg-blue-700 text-white px-3 py-1.5 rounded hover:bg-blue-800 dark:hover:bg-blue-600 transition"
                            >
                                Enroll
                            </button>
                        )}
                    </div>
                </div>
            ))}
            {items.length === 0 && <div className="text-center text-sm text-gray-400 py-8">No enquiries</div>}
        </div>
    </div>
);

const EnquiryKanban = ({ enquiries, onStatusUpdate }) => {

    // Internal state removed - controlled by parent

    const columns = [
        { id: 'New', color: 'blue', label: 'New Lead' },
        { id: 'Counselling', color: 'yellow', label: 'Counselling' },
        { id: 'Ready to Pay', color: 'orange', label: 'Ready to Pay' },
        { id: 'Enrolled', color: 'green', label: 'Enrolled' },
    ];

    return (
        <div className="h-full overflow-y-auto pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 h-full min-h-0">
                {columns.map(col => (
                    <KanbanColumn
                        key={col.id}
                        status={col.id}
                        color={col.color}
                        items={enquiries.filter(e => e.status === col.id)}
                        onStatusUpdate={onStatusUpdate}
                    />
                ))}
            </div>
        </div>
    );
};

export default EnquiryKanban;
