import React from 'react';
import { FaChalkboardTeacher, FaClock, FaBookOpen } from 'react-icons/fa';

const FacultyManager = () => {
    // Mock Faculty Data with Workload
    const faculty = [
        { id: 1, name: "Dr. R.K. Gupta", subject: "Mathematics", workload: 18, maxWorkload: 24, status: "Active" },
        { id: 2, name: "Mrs. S. Verma", subject: "Physics", workload: 22, maxWorkload: 24, status: "Overloaded" },
        { id: 3, name: "Mr. Amit Shah", subject: "Chemistry", workload: 12, maxWorkload: 24, status: "Available" },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Faculty Management</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {faculty.map(f => (
                    <div key={f.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 font-bold text-xl mr-4">
                                    {f.name[0]}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">{f.name}</h3>
                                    <p className="text-sm text-gray-500">{f.subject}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-1 text-xs font-bold rounded ${f.status === 'Overloaded' ? 'bg-red-100 text-red-700' :
                                    f.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                {f.status}
                            </span>
                        </div>

                        {/* Workload Progress */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold text-gray-500">
                                <span>Weekly Workload</span>
                                <span className={f.workload > 20 ? 'text-red-600' : 'text-gray-600'}>{f.workload} / {f.maxWorkload} hrs</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full ${f.workload > 20 ? 'bg-red-500' : 'bg-blue-500'}`}
                                    style={{ width: `${(f.workload / f.maxWorkload) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-50">
                            <div className="text-center">
                                <div className="text-lg font-bold text-gray-800">4</div>
                                <div className="text-xs text-gray-400">Classes</div>
                            </div>
                            <div className="text-center border-l border-gray-100">
                                <div className="text-lg font-bold text-gray-800">92%</div>
                                <div className="text-xs text-gray-400">Attendance</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FacultyManager;
