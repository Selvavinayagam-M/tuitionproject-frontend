import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    FiHome,
    FiUsers,
    FiBookOpen,
    FiCalendar,
    FiCreditCard,
    FiFileText,
    FiBarChart2,
    FiSettings,
    FiBriefcase,
    FiAward // Fallback for GraduationCap
} from 'react-icons/fi';

const Sidebar = ({ isOpen, isMobile = false }) => {
    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: FiHome },
        { name: 'Admissions', path: '/admin/admissions', icon: FiBriefcase },
        { name: 'Students', path: '/admin/students', icon: FiUsers },
        { name: 'Faculty', path: '/admin/faculty', icon: FiAward },
        { name: 'Courses', path: '/admin/courses', icon: FiBookOpen },
        { name: 'Exams', path: '/admin/exams', icon: FiFileText },
        { name: 'Attendance', path: '/admin/attendance', icon: FiCalendar },
        { name: 'Fees & Invoices', path: '/admin/fees', icon: FiCreditCard },
        { name: 'Reports', path: '/admin/reports', icon: FiBarChart2 },
        { name: 'Settings', path: '/admin/settings', icon: FiSettings },
    ];

    return (
        <aside
            className={`${isMobile ? 'absolute inset-0 w-64' : 'fixed top-0 left-0'} z-40 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-y-auto ${!isMobile && (isOpen ? 'w-64' : 'w-20')}`}
            aria-label="Sidebar"
        >
            <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
                <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 ${(isMobile || isOpen) ? 'block' : 'hidden'}`}>
                    TuitionAdmin
                </span>
                {!isMobile && !isOpen && <span className="text-xl font-bold text-blue-600">TA</span>}
            </div>

            <div className="py-4 overflow-y-auto">
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center p-3 text-base font-medium rounded-lg transition-colors group ${isActive
                                        ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-white border-r-4 border-blue-600'
                                        : 'text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`
                                }
                            >
                                <item.icon className={`w-6 h-6 transition duration-75 group-hover:text-blue-600 dark:group-hover:text-white ${(isMobile || isOpen) ? 'mr-3' : 'mx-auto'}`} />
                                <span className={`${(isMobile || isOpen) ? 'block' : 'hidden'}`}>{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
