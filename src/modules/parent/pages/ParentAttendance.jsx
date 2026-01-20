import React, { useState } from 'react';
import { childrenData, attendanceData } from '../data/parent.data';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const ParentAttendance = () => {
    const [selectedChildId, setSelectedChildId] = useState(childrenData[0].id);
    const selectedChild = childrenData.find(c => c.id === selectedChildId);
    const history = attendanceData[selectedChildId] || [];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Attendance Log</h1>
                <select
                    className="p-2 border border-gray-200 rounded-lg bg-white text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-orange-500"
                    value={selectedChildId}
                    onChange={(e) => setSelectedChildId(e.target.value)}
                >
                    {childrenData.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="mb-6 flex items-end gap-3">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Attendance Rate</p>
                        <h2 className="text-4xl font-bold text-gray-900">{selectedChild.attendance}%</h2>
                    </div>
                    <div className="h-2 flex-grow bg-gray-100 rounded-full mb-3 overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${selectedChild.attendance}%` }}></div>
                    </div>
                </div>

                <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Recent History</h3>
                <div className="space-y-3">
                    {history.map((record, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                            <span className="font-medium text-gray-700">{record.date}</span>
                            <div className="flex items-center gap-2">
                                <span className={`text-sm font-bold uppercase ${record.status === 'present' ? 'text-green-600' : 'text-red-500'}`}>{record.status}</span>
                                {record.status === 'present' ? <FiCheckCircle className="text-green-500" /> : <FiXCircle className="text-red-500" />}
                            </div>
                        </div>
                    ))}
                    <div className="pt-4 text-center">
                        <button className="text-blue-600 font-medium text-sm hover:underline">View Full Calendar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentAttendance;
