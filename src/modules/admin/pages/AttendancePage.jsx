import React, { useEffect, useState } from 'react';
import { FiCalendar, FiCheck, FiX } from 'react-icons/fi';

const AttendancePage = () => {
    // Mock Data for UI Dev
    const [selectedClass, setSelectedClass] = useState('Class 10 - Batch A');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceData, setAttendanceData] = useState([
        { id: 101, name: 'Rahul Singh', status: 'present' },
        { id: 102, name: 'Priya Sharma', status: 'absent' },
        { id: 103, name: 'Amit Kumar', status: 'present' },
        { id: 104, name: 'Sneha Gupta', status: 'present' },
        { id: 105, name: 'Vikram Malhotra', status: 'pending' },
    ]);

    const stats = {
        present: attendanceData.filter(s => s.status === 'present').length,
        absent: attendanceData.filter(s => s.status === 'absent').length
    };

    const toggleStatus = (id, status) => {
        setAttendanceData(attendanceData.map(s =>
            s.id === id ? { ...s, status: s.status === status ? 'pending' : status } : s
        ));
    };

    return (
        <div className="space-y-4 max-w-2xl mx-auto md:max-w-none">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Attendance Register</h1>
                    <p className="text-sm text-gray-500">Mark daily attendance for students.</p>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <FiCalendar className="text-gray-500" />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-transparent border-none focus:ring-0 text-sm font-medium text-gray-900 dark:text-white p-0"
                    />
                </div>
            </div>

            {/* Controls & Stats */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-bold focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                    >
                        <option>Class 10 - Batch A</option>
                        <option>Class 10 - Batch B</option>
                        <option>Class 12 - Science</option>
                    </select>

                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800 flex flex-col items-center justify-center gap-1">
                            <span className="text-green-700 dark:text-green-400 font-medium text-sm flex items-center gap-1.5 uppercase tracking-wide">
                                <FiCheck size={16} /> Present
                            </span>
                            <span className="text-3xl font-extrabold text-green-700 dark:text-green-400">{stats.present}</span>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-800 flex flex-col items-center justify-center gap-1">
                            <span className="text-red-700 dark:text-red-400 font-medium text-sm flex items-center gap-1.5 uppercase tracking-wide">
                                <FiX size={16} /> Absent
                            </span>
                            <span className="text-3xl font-extrabold text-red-700 dark:text-red-400">{stats.absent}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Student List */}
            <div className="space-y-3">
                {attendanceData.map((student) => (
                    <div
                        key={student.id}
                        className={`p-4 rounded-xl shadow-sm border transition-all duration-200 flex items-center justify-between
                            ${student.status === 'present' ? 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800' :
                                student.status === 'absent' ? 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800' :
                                    'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}
                    >
                        <div className="flex flex-col">
                            <span className="font-bold text-gray-900 dark:text-white text-base">{student.name}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">ID: {student.id}</span>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => toggleStatus(student.id, 'absent')}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm
                                    ${student.status === 'absent' ? 'bg-red-500 text-white ring-2 ring-red-200' : 'bg-white dark:bg-gray-700 text-red-500 border border-gray-200 hover:bg-red-50'}`}
                            >
                                <FiX size={20} />
                            </button>
                            <button
                                onClick={() => toggleStatus(student.id, 'present')}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm
                                    ${student.status === 'present' ? 'bg-green-500 text-white ring-2 ring-green-200' : 'bg-white dark:bg-gray-700 text-green-500 border border-gray-200 hover:bg-green-50'}`}
                            >
                                <FiCheck size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Save Button */}
            <div className="pt-4 sticky bottom-4 z-10 w-full">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-colors flex justify-center items-center gap-2">
                    <FiCheck size={20} /> Save Attendance
                </button>
            </div>
        </div>
    );
};

export default AttendancePage;
