import React from 'react';
import { exams } from '../data/teacher.data';
import { FiCalendar, FiCheckCircle, FiClock, FiLayers, FiSettings } from 'react-icons/fi';

const TeacherExams = () => (
    <div className="space-y-6 pb-20 md:pb-0 animate-fadeIn">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Examinations 📝</h1>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
            <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                    <tr>
                        <th className="px-6 py-4">Title</th>
                        <th className="px-6 py-4">Class</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Marks</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {exams.map(exam => (
                        <tr key={exam.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4 font-bold text-gray-800 dark:text-white">{exam.title}</td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{exam.class}</td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{exam.date}</td>
                            <td className="px-6 py-4 text-gray-800 dark:text-white font-medium">{exam.marks}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${exam.status === 'Scheduled' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                                    }`}>
                                    {exam.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <button className="text-blue-600 dark:text-blue-400 font-bold text-xs hover:underline flex items-center gap-1">
                                    <FiSettings /> Manage
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden grid grid-cols-1 gap-4">
            {exams.map(exam => (
                <div key={exam.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">{exam.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded flex items-center gap-1">
                                    <FiLayers size={10} /> {exam.class}
                                </span>
                            </div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${exam.status === 'Scheduled' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                            }`}>
                            {exam.status}
                        </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm border-t border-gray-100 dark:border-gray-700 pt-3 text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-1.5">
                            <FiCalendar className="text-gray-400" />
                            <span>{exam.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <FiCheckCircle className="text-gray-400" />
                            <span className="font-medium">Marks: {exam.marks}</span>
                        </div>
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl font-bold hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                        <FiSettings /> Manage Exam
                    </button>
                </div>
            ))}
        </div>
    </div>
);

export default TeacherExams;
