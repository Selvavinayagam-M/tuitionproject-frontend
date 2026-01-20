import React from 'react';
import { childrenData } from '../data/parent.data';
import { FiUser, FiInfo } from 'react-icons/fi';

const ParentChildren = () => {
    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-gray-900">My Children</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {childrenData.map((child) => (
                    <div key={child.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4 mb-6">
                            <img src={child.avatar} alt={child.name} className="w-16 h-16 rounded-full border-4 border-gray-50" />
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{child.name}</h2>
                                <p className="text-gray-500">{child.grade} • {child.batch}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="text-gray-500 text-sm font-medium">Student ID</span>
                                <span className="text-gray-900 font-bold text-sm">{child.id}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="text-gray-500 text-sm font-medium">Attendance</span>
                                <span className="text-green-600 font-bold text-sm">{child.attendance}%</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="text-gray-500 text-sm font-medium">Tuition Fees</span>
                                <span className={`font-bold text-sm ${child.pendingFees > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                    {child.pendingFees > 0 ? `₹${child.pendingFees} Pending` : 'Paid'}
                                </span>
                            </div>
                        </div>

                        <button className="w-full mt-6 flex items-center justify-center gap-2 border border-gray-200 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                            <FiInfo /> View Full Academic Report
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParentChildren;
