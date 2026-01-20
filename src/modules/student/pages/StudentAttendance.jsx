import React from 'react';
import { dashboardStats } from '../data/student.data';
import { FiCheckCircle, FiXCircle, FiAlertTriangle } from 'react-icons/fi';

const StudentAttendance = () => {
    // Generate mock calendar days for a visual implementation
    const days = Array.from({ length: 30 }, (_, i) => {
        const status = Math.random() > 0.1 ? 'present' : Math.random() > 0.5 ? 'absent' : 'holiday';
        return { day: i + 1, status };
    });

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-gray-900">Attendance Tracker</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">{dashboardStats.attendancePercentage}%</div>
                    <p className="text-gray-500 text-sm">Overall Attendance</p>
                    <div className="w-full bg-gray-100 h-2 rounded-full mt-4 overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${dashboardStats.attendancePercentage}%` }}></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{dashboardStats.classesAttended}</div>
                    <p className="text-gray-500 text-sm">Classes Attended</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <div className="text-4xl font-bold text-red-500 mb-2">3</div>
                    <p className="text-gray-500 text-sm">Classes Missed</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-800">January 2026</h2>
                    <div className="flex gap-4 text-xs font-medium">
                        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-green-100 border border-green-500"></div> Present</div>
                        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-100 border border-red-500"></div> Absent</div>
                        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-yellow-100 border border-yellow-500"></div> Holiday</div>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-2 md:gap-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                        <div key={d} className="text-center text-xs font-bold text-gray-400 uppercase py-2">{d}</div>
                    ))}
                    {days.map((d, index) => (
                        <div
                            key={index}
                            className={`
                                aspect-square rounded-xl flex items-center justify-center text-sm font-bold border transition-all
                                ${d.status === 'present' ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' : ''}
                                ${d.status === 'absent' ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100' : ''}
                                ${d.status === 'holiday' ? 'bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100' : ''}
                            `}
                            title={`Day ${d.day}: ${d.status}`}
                        >
                            {d.day}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-orange-50 border border-orange-100 p-6 rounded-xl flex gap-4 items-start">
                <FiAlertTriangle className="text-orange-500 w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-bold text-orange-900">Low Attendance Alert</h4>
                    <p className="text-sm text-orange-800 mt-1">
                        Your attendance in <strong>Chemistry</strong> is 78%. Please ensure you attend the next few classes to maintain the required 85% attendance.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StudentAttendance;
