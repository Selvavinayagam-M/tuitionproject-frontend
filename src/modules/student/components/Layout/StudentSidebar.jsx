import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    FiHome, FiBook, FiCalendar, FiCheckSquare, FiAward,
    FiBarChart2, FiDollarSign, FiBell, FiMessageCircle, FiUser
} from 'react-icons/fi';

const StudentSidebar = ({ className }) => {
    const navItems = [
        { name: 'Dashboard', path: '/student/dashboard', icon: FiHome },
        { name: 'My Courses', path: '/student/courses', icon: FiBook },
        { name: 'Attendance', path: '/student/attendance', icon: FiCheckSquare },
        { name: 'Assignments', path: '/student/assignments', icon: FiCalendar }, // Assignments often have dates
        { name: 'Tests & Exams', path: '/student/exams', icon: FiAward },
        { name: 'Progress', path: '/student/progress', icon: FiBarChart2 },
        { name: 'Fees', path: '/student/fees', icon: FiDollarSign },
        { name: 'Support', path: '/student/support', icon: FiMessageCircle },
        { name: 'Profile', path: '/student/profile', icon: FiUser },
    ];

    return (
        <aside className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-64 flex-shrink-0 overflow-y-auto ${className}`}>
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-blue-900 dark:text-white flex items-center gap-2">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">S</span>
                    Student
                </h2>
            </div>

            <nav className="p-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                ? 'bg-blue-50 text-blue-700 dark:bg-gray-700 dark:text-blue-300'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 mt-auto border-t border-gray-100 dark:border-gray-700">
                <div className="bg-blue-50 dark:bg-gray-700 rounded-xl p-4">
                    <h4 className="text-sm font-bold text-blue-900 dark:text-white mb-1">Need Help?</h4>
                    <p className="text-xs text-blue-700 dark:text-gray-300 mb-3">Contact your tutor or admin for assistance.</p>
                </div>
            </div>
        </aside>
    );
};

export default StudentSidebar;
