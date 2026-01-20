import React, { useState } from 'react';
import Button from '../../../shared/components/Button';
import { FaCalendarPlus, FaEdit, FaTrash, FaCheckCircle, FaFileAlt } from 'react-icons/fa';

const ExamManager = () => {
    // Mock Exams
    const [exams, setExams] = useState([
        { id: 1, name: 'Half-Yearly Maths', date: '2026-03-10', class: 'Class 10', status: 'Scheduled' },
        { id: 2, name: 'Physics Unit Test 1', date: '2026-02-15', class: 'Class 12', status: 'Completed' },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Exam Management</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Schedule exams, assign marks, and publish results.</p>
                </div>
                <Button className="w-full md:w-auto flex justify-center items-center">
                    <FaCalendarPlus className="mr-2" /> Schedule Exam
                </Button>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden grid grid-cols-1 gap-4">
                {exams.map(e => (
                    <div key={e.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col gap-4">
                        <div className="flex items-start gap-3">
                            <div className={`p-2.5 rounded-lg shrink-0 ${e.status === 'Completed' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                <FaFileAlt size={18} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 dark:text-white leading-tight">{e.name}</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${e.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                        {e.status}
                                    </span>
                                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                        {e.class}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Date</p>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{new Date(e.date).toLocaleDateString()}</p>
                            </div>
                            <div className="flex gap-2">
                                {e.status === 'Completed' ? (
                                    <button className="text-sm bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 px-3 py-1.5 rounded-lg font-bold">
                                        View Results
                                    </button>
                                ) : (
                                    <>
                                        <button className="p-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 rounded-lg transition-colors">
                                            <FaEdit size={16} />
                                        </button>
                                        <button className="p-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 rounded-lg transition-colors">
                                            <FaTrash size={16} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table (Hidden on Mobile) */}
            <div className="hidden md:block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                        <tr>
                            <th className="p-4 font-bold text-gray-600 dark:text-gray-300">Exam Name</th>
                            <th className="p-4 font-bold text-gray-600 dark:text-gray-300">Date</th>
                            <th className="p-4 font-bold text-gray-600 dark:text-gray-300">Class</th>
                            <th className="p-4 font-bold text-gray-600 dark:text-gray-300">Status</th>
                            <th className="p-4 font-bold text-gray-600 dark:text-gray-300 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exams.map(e => (
                            <tr key={e.id} className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-700/50">
                                <td className="p-4 font-medium text-gray-800 dark:text-white flex items-center">
                                    <FaFileAlt className="text-gray-400 dark:text-gray-500 mr-2" />
                                    {e.name}
                                </td>
                                <td className="p-4 text-gray-600 dark:text-gray-300">{e.date}</td>
                                <td className="p-4 font-bold text-gray-700 dark:text-gray-200">{e.class}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs font-bold rounded ${e.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                        {e.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    {e.status === 'Completed' ? (
                                        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-bold">View Results</button>
                                    ) : (
                                        <>
                                            <button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"><FaEdit /></button>
                                            <button className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"><FaTrash /></button>
                                        </>
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

export default ExamManager;
