import React from 'react';
import { enrolledCourses } from '../data/student.data';
import { FiClock, FiUser, FiCheckCircle } from 'react-icons/fi';

const StudentCourses = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {enrolledCourses.length} Active Courses
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                    <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-50">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`text-xs font-bold px-2 py-1 rounded bg-blue-50 text-blue-600 uppercase tracking-wide`}>
                                    Regular Batch
                                </span>
                                <FiUser className="text-gray-400 w-5 h-5" title="Tutor Info" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-1">{course.subject}</h3>
                            <p className="text-sm text-gray-500 font-medium">Tutor: {course.tutor}</p>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FiClock className="text-orange-500" />
                                <span>{course.schedule}</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-semibold text-gray-500">
                                    <span>Course Progress</span>
                                    <span>{course.progress}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-500 rounded-full"
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Syllabus Preview */}
                            <div className="pt-2">
                                <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Recent Topics</h4>
                                <ul className="space-y-2">
                                    {course.syllabus.slice(0, 2).map((item, idx) => (
                                        <li key={idx} className="flex items-center justify-between text-sm">
                                            <span className={`${item.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                                                {item.topic}
                                            </span>
                                            {item.status === 'completed' && <FiCheckCircle className="text-green-500 w-4 h-4" />}
                                            {item.status === 'ongoing' && <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded">Ongoing</span>}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                            <button className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors text-sm">
                                View Full Syllabus
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentCourses;
