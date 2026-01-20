import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    FiHome, FiUsers, FiCheckSquare, FiBookOpen, FiClipboard,
    FiAward, FiMessageSquare, FiCalendar, FiSettings
} from 'react-icons/fi';
import Button from '../../../../shared/components/ui/Button';

const TeacherSidebar = ({ className }) => {
    const navItems = [
        { name: 'Dashboard', path: '/teacher/dashboard', icon: FiHome },
        { name: 'My Students', path: '/teacher/students', icon: FiUsers },
        { name: 'Attendance', path: '/teacher/attendance', icon: FiCheckSquare },
        { name: 'Courses', path: '/teacher/courses', icon: FiBookOpen },
        { name: 'Assignments', path: '/teacher/assignments', icon: FiClipboard },
        { name: 'Exams', path: '/teacher/exams', icon: FiAward },
        { name: 'Schedule', path: '/teacher/schedule', icon: FiCalendar },
        { name: 'Messages', path: '/teacher/communication', icon: FiMessageSquare },
        { name: 'Settings', path: '/teacher/settings', icon: FiSettings },
    ];

    return (
        <aside className={`bg-white border-r border-secondary-200 w-64 flex-shrink-0 flex flex-col h-full ${className}`}>
            <div className="p-6">
                <h2 className="text-xl font-bold text-secondary-900 flex items-center gap-3 font-display tracking-tight">
                    <div className="w-8 h-8 rounded-xl bg-primary-600 text-white flex items-center justify-center">
                        <span className="font-bold text-lg">T</span>
                    </div>
                    TuitionApp
                </h2>
                <div className="mt-2 px-1">
                    <p className="text-xs font-medium text-secondary-400 uppercase tracking-wider">Teacher Panel</p>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                ? 'bg-primary-50 text-primary-700 shadow-sm'
                                : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-primary-600' : 'text-secondary-400 group-hover:text-secondary-600'}`} />
                                {item.name}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 mt-auto border-t border-secondary-100">
                <div className="bg-gradient-to-br from-primary-50 to-white border border-primary-100 rounded-2xl p-4 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary-100 rounded-full blur-2xl -mr-8 -mt-8 opacity-50"></div>
                    <h4 className="text-sm font-bold text-primary-900 mb-1 relative z-10">Next Class</h4>
                    <p className="text-xs text-secondary-600 mb-3 relative z-10">Advanced Math • 10:00 AM</p>
                    <Button variant="primary" size="sm" className="w-full text-xs py-1.5 h-8">
                        Join Class
                    </Button>
                </div>
            </div>
        </aside>
    );
};

export default TeacherSidebar;
