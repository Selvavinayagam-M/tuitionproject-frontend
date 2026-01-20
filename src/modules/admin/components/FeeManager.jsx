import React, { useState } from 'react';
import { FaFileInvoiceDollar, FaDownload, FaHistory, FaSearch } from 'react-icons/fa';
import Button from '../../../shared/components/Button';

// Mock Transaction Data
const transactions = [
    { id: 'INV-001', student: 'Rahul Singh', date: '2026-01-05', amount: 5000, type: 'Tuition Fee', status: 'Paid' },
    { id: 'INV-002', student: 'Priya Sharma', date: '2026-01-06', amount: 2500, type: 'Exam Fee', status: 'Pending' },
    { id: 'INV-003', student: 'Amit Kumar', date: '2026-01-07', amount: 12000, type: 'Annual Fee', status: 'Paid' },
];

const FeeManager = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Fees & Invoicing</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Track payments, generate invoices, and manage dues.</p>
                </div>
                <Button className="w-full md:w-auto flex justify-center items-center">
                    <FaFileInvoiceDollar className="mr-2" /> CREATE INVOICE
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center flex flex-col items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wide">Total Collected</p>
                    <h3 className="text-3xl font-black text-green-600 dark:text-green-400 mt-2">₹8.5L</h3>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center flex flex-col items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wide">Pending Dues</p>
                    <h3 className="text-3xl font-black text-red-500 dark:text-red-400 mt-2">₹1.2L</h3>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center flex flex-col items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wide">Overdue Invoices</p>
                    <h3 className="text-3xl font-black text-orange-500 dark:text-orange-400 mt-2">14</h3>
                </div>
            </div>

            {/* Transaction List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h3 className="font-bold text-gray-700 dark:text-white flex items-center md:text-lg">
                        <FaHistory className="mr-2 text-blue-500" /> Recent Transactions
                    </h3>
                    <div className="relative w-full md:w-64">
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="Search invoice..."
                        />
                    </div>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden grid grid-cols-1 gap-4 p-4">
                    {transactions.map(t => (
                        <div key={t.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">{t.student}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-0.5">{t.id}</p>
                                </div>
                                <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${t.status === 'Paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                    {t.status}
                                </span>
                            </div>

                            <div className="flex justify-between items-center border-t border-gray-50 dark:border-gray-700/50 pt-3 mt-1">
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 uppercase font-bold">{t.date}</p>
                                    <p className="text-lg font-black text-gray-800 dark:text-white">₹{t.amount.toLocaleString()}</p>
                                </div>
                                <button className="p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 font-medium text-sm">
                                    <FaDownload /> Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Table */}
                <table className="w-full text-left hidden md:table">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                        <tr>
                            <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Invoice #</th>
                            <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Student</th>
                            <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Date</th>
                            <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Amount</th>
                            <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                            <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase text-right">Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(t => (
                            <tr key={t.id} className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-700/50">
                                <td className="p-4 font-mono text-sm text-gray-600 dark:text-gray-400">{t.id}</td>
                                <td className="p-4 font-bold text-gray-800 dark:text-white">{t.student}</td>
                                <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{t.date}</td>
                                <td className="p-4 font-bold text-gray-800 dark:text-white">₹{t.amount}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs font-bold rounded ${t.status === 'Paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                        {t.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 p-2 transition-colors" title="Download Invoice">
                                        <FaDownload />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeeManager;
