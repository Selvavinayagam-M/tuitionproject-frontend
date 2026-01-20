import React from 'react';
import { feeDetails } from '../data/parent.data';
import { FiDownload } from 'react-icons/fi';

const ParentFees = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Fees & Payments</h1>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 text-left text-xs font-bold text-gray-500 uppercase">
                        <tr>
                            <th className="px-6 py-4">Student</th>
                            <th className="px-6 py-4">Month</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {feeDetails.map((fee) => (
                            <tr key={fee.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-800">{fee.child}</td>
                                <td className="px-6 py-4 text-gray-600 font-medium">{fee.month}</td>
                                <td className="px-6 py-4 text-gray-800">₹{fee.amount}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${fee.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {fee.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{fee.paidDate || <span className="text-red-500 font-medium">Due: {fee.dueDate}</span>}</td>
                                <td className="px-6 py-4">
                                    {fee.status === 'paid' ? (
                                        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors">
                                            <FiDownload /> Invoice
                                        </button>
                                    ) : (
                                        <button className="bg-orange-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-orange-700 transition-colors shadow-sm">
                                            Pay Now
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ParentFees;
