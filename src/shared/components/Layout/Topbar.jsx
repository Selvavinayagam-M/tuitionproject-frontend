import React from 'react';
import { useSelector } from 'react-redux';
import { FiMenu, FiBell, FiUser, FiSearch } from 'react-icons/fi';
import LogoutButton from '../LogoutButton';

const Topbar = ({ toggleSidebar }) => {
    const { user } = useSelector((state) => state.auth);

    return (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-14 md:h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30 transition-all">
            <div className="flex items-center gap-3 md:gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 focus:outline-none"
                >
                    <FiMenu className="w-6 h-6" />
                </button>

                {/* Global Search */}
                <div className="relative hidden md:block">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FiSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search..."
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                {/* Notifications */}
                <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors">
                    <FiBell className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-800"></span>
                </button>

                {/* Profile Dropdown (Simplified) */}
                <div className="flex items-center gap-2 md:gap-3 cursor-pointer group relative">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border border-blue-200">
                        {/* Avatar */}
                        <span className="text-blue-700 font-bold text-sm">
                            {user?.name?.charAt(0) || 'U'}
                        </span>
                    </div>
                    <div className="hidden md:block text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'Guest'}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role || 'Visitor'}</p>
                    </div>

                    <div className="border-l border-gray-200 dark:border-gray-600 pl-2 md:pl-4 ml-1 md:ml-2">
                        <LogoutButton showText={false} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
