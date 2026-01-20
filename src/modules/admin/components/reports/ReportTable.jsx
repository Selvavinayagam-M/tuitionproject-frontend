import React from 'react';

const ReportTable = ({ columns, data, footerData }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} scope="col" className="px-6 py-3 font-bold border-b dark:border-gray-600">
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((row, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                {columns.map((col) => (
                                    <td key={`${index}-${col.key}`} className="px-6 py-4">
                                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-4 text-center">
                                No data available for the selected range.
                            </td>
                        </tr>
                    )}
                </tbody>
                {footerData && (
                    <tfoot className="bg-gray-50 dark:bg-gray-700 font-semibold text-gray-900 dark:text-white">
                        <tr>
                            {columns.map((col) => (
                                <td key={`footer-${col.key}`} className="px-6 py-3">
                                    {footerData[col.key] || ''}
                                </td>
                            ))}
                        </tr>
                    </tfoot>
                )}
            </table>
        </div>
    );
};

export default ReportTable;
