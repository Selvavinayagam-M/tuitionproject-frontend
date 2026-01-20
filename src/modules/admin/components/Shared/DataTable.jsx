import React from 'react';
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const DataTable = ({
    columns,
    data,
    isLoading,
    sortConfig,
    onSort,
    actions,
    onAction
}) => {
    if (isLoading) {
        return <div className="p-10 text-center text-gray-500">Loading data...</div>;
    }

    if (!data || data.length === 0) {
        return <div className="p-10 text-center text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">No records found matching criteria.</div>;
    }

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full text-left text-sm text-gray-600 bg-white">
                <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500 border-b border-gray-200">
                    <tr>
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className={`px-6 py-4 cursor-pointer hover:bg-gray-100 transition ${col.className || ''}`}
                                onClick={() => col.sortable && onSort(col.accessor)}
                            >
                                <div className="flex items-center gap-2">
                                    {col.header}
                                    {col.sortable && (
                                        <span className="text-gray-400">
                                            {sortConfig?.key === col.accessor ? (
                                                sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />
                                            ) : <FaSort size={10} />}
                                        </span>
                                    )}
                                </div>
                            </th>
                        ))}
                        {actions && <th className="px-6 py-4 text-right">Actions</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-blue-50/50 transition duration-150">
                            {columns.map((col, colIndex) => (
                                <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                                    {col.render ? col.render(row) : (
                                        <span className="text-gray-800">{row[col.accessor]}</span>
                                    )}
                                </td>
                            ))}
                            {actions && (
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {actions.map((action, actionIdx) => (
                                            <button
                                                key={actionIdx}
                                                onClick={() => onAction(action.type, row)}
                                                className={`p-2 rounded-lg transition ${action.className || 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'}`}
                                                title={action.label}
                                            >
                                                {action.icon}
                                            </button>
                                        ))}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
