import React, { useEffect, useState } from 'react';
import { FiDownload, FiCreditCard, FiEye } from 'react-icons/fi';
import DataTable from '../components/tables/DataTable';
import TableFilters from '../components/tables/TableFilters';
import Pagination from '../components/tables/Pagination';
import TableActions from '../components/tables/TableActions';
import StatusBadge from '../components/common/StatusBadge';
import { feesService } from '../services/fees.service';
import { invoiceColumns } from '../data/fees.data';
import useFilters from '../hooks/useFilters';
import usePagination from '../hooks/usePagination';

const FeesPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = invoiceColumns.map(col => {
        if (col.key === 'status') {
            return { ...col, render: (val) => <StatusBadge status={val} /> };
        }
        return col;
    });

    const { filteredData, setSearchQuery } = useFilters(data, ['student', 'id']);
    const { currentData, currentPage, totalPages, goToPage } = usePagination(filteredData, 5);

    useEffect(() => {
        const fetchInvoices = async () => {
            const result = await feesService.getAllInvoices();
            setData(result);
            setLoading(false);
        };
        fetchInvoices();
    }, []);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fees & Invoices</h1>
                <TableActions onAdd={() => console.log('Create Invoice')} addLabel="Create Invoice" />
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                <TableFilters onSearch={setSearchQuery} />

                {/* Desktop View (Table) */}
                <div className="hidden md:block">
                    <DataTable
                        columns={columns}
                        data={currentData}
                        isLoading={loading}
                        onView={(row) => console.log("View Invoice", row)}
                    />
                </div>

                {/* Mobile View (Card Grid) */}
                <div className="md:hidden grid grid-cols-1 gap-4 p-4">
                    {loading ? (
                        <div className="text-center py-4">Loading...</div>
                    ) : (
                        currentData.map((invoice) => (
                            <div key={invoice.id} className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">{invoice.student}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{invoice.id}</p>
                                    </div>
                                    <StatusBadge status={invoice.status} />
                                </div>

                                <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-300">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">Date:</span>
                                        <span className="font-medium text-right">{invoice.date}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">Due Date:</span>
                                        <span className="font-medium text-right">{invoice.dueDate}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="text-gray-500 dark:text-gray-400">Amount:</span>
                                        <span className="font-bold text-xl text-gray-900 dark:text-white">₹{invoice.amount}</span>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-600 mt-1">
                                    <button onClick={() => console.log("Download", invoice)} className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors">
                                        <FiDownload size={16} /> Download
                                    </button>
                                    {invoice.status !== 'Paid' && (
                                        <button onClick={() => console.log("Pay", invoice)} className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                                            <FiCreditCard size={16} /> Pay Now
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                />
            </div>
        </div>
    );
};

export default FeesPage;
