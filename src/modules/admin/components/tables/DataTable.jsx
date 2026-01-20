import React from 'react';
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';

const DataTable = ({ columns, data, onEdit, onDelete, onView, isLoading }) => {
    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Loading...</div>;
    }

    if (!data || data.length === 0) {
        return <div className="p-8 text-center text-gray-500">No data available</div>;
    }

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} scope="col" className="px-6 py-3">
                                {col.label}
                            </th>
                        ))}
                        {(onEdit || onDelete || onView) && (
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            {columns.map((col) => (
                                <td key={`${index}-${col.key}`} className="px-6 py-4">
                                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                                </td>
                            ))}
                            {(onEdit || onDelete || onView) && (
                                <td className="px-6 py-4 flex gap-2">
                                    {onView && (
                                        <button
                                            onClick={() => onView(row)}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline p-1"
                                            title="View"
                                        >
                                            <FiEye className="w-5 h-5" />
                                        </button>
                                    )}
                                    {onEdit && (
                                        <button
                                            onClick={() => onEdit(row)}
                                            className="font-medium text-indigo-600 dark:text-indigo-500 hover:underline p-1"
                                            title="Edit"
                                        >
                                            <FiEdit2 className="w-5 h-5" />
                                        </button>
                                    )}
                                    {onDelete && (
                                        <button
                                            onClick={() => onDelete(row)}
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline p-1"
                                            title="Delete"
                                        >
                                            <FiTrash2 className="w-5 h-5" />
                                        </button>
                                    )}
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
