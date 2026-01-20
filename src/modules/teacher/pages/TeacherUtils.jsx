import React from 'react';
import { assignments, exams, announcements, classSchedule } from '../data/teacher.data';

export const TeacherAssignments = () => (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {assignments.map(assign => (
                <div key={assign.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-xs font-bold uppercase">{assign.class}</span>
                        <span className={`text-xs font-bold ${assign.status === 'Active' ? 'text-green-500' : 'text-orange-500'}`}>{assign.status}</span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{assign.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">Due: {assign.dueDate}</p>
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(assign.submitted / assign.total) * 100}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs font-medium text-gray-500">
                        <span>{assign.submitted} Submitted</span>
                        <span>{assign.total} Total</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const TeacherExams = () => (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Examinations</h1>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-50 text-left text-xs font-bold text-gray-500 uppercase">
                    <tr>
                        <th className="px-6 py-4">Title</th>
                        <th className="px-6 py-4">Class</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Marks</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {exams.map(exam => (
                        <tr key={exam.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-bold text-gray-800">{exam.title}</td>
                            <td className="px-6 py-4 text-gray-600">{exam.class}</td>
                            <td className="px-6 py-4 text-gray-600">{exam.date}</td>
                            <td className="px-6 py-4 text-gray-800">{exam.marks}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${exam.status === 'Scheduled' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{exam.status}</span>
                            </td>
                            <td className="px-6 py-4">
                                <button className="text-blue-600 font-bold text-xs hover:underline">Manage</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export const TeacherSchedule = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Weekly Timetable</h1>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm">Download PDF</button>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
            <p className="text-gray-500">Weekly calendar view will be implemented here.</p>
        </div>
    </div>
);

export const TeacherCommunication = () => (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
        <div className="grid gap-4">
            {announcements.map(ann => (
                <div key={ann.id} className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-gray-800">{ann.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{ann.message}</p>
                        <p className="text-xs text-gray-400 mt-2">To: {ann.audience} • {ann.date}</p>
                    </div>
                </div>
            ))}
        </div>

    </div>
);

export const TeacherCourses = () => (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Course & Syllabus</h1>
        <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center">
            <p className="text-gray-500">Syllabus management tools will appear here.</p>
        </div>
    </div>
);

export const TeacherSettings = () => (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Teacher Profile</h1>
        <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center">
            <p className="text-gray-500">Profile editing tools will appear here.</p>
        </div>
    </div>
);
