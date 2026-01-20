import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TeacherSidebar from './TeacherSidebar';
import { FiMenu, FiBell, FiSearch, FiUser } from 'react-icons/fi';
import LogoutButton from '../../../../shared/components/LogoutButton';

const TeacherLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { user } = useSelector(state => state.auth);

    return (
        <div className="flex h-screen bg-secondary-50 font-sans overflow-hidden">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block h-full shadow-xl shadow-secondary-200/50 z-10">
                <TeacherSidebar className="h-full" />
            </div>

            <div className="flex-1 flex flex-col min-w-0">
                <header className="bg-white/80 backdrop-blur-md border-b border-secondary-200 h-16 flex items-center justify-between px-6 lg:px-8 z-20 sticky top-0">
                    <div className="flex items-center gap-4 lg:hidden">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors">
                            <FiMenu size={24} />
                        </button>
                        <span className="font-display font-bold text-lg text-primary-900">TuitionApp</span>
                    </div>

                    {/* Search Bar Placeholder */}
                    <div className="hidden lg:flex items-center bg-secondary-50 border border-secondary-200 rounded-xl px-4 py-2 w-96 transition-all focus-within:ring-2 focus-within:ring-primary-100 focus-within:border-primary-300">
                        <FiSearch className="text-secondary-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search students, courses..."
                            className="bg-transparent border-none outline-none text-sm w-full placeholder-secondary-400 text-secondary-900"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 relative text-secondary-500 hover:bg-secondary-50 rounded-xl transition-colors">
                            <FiBell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-[1px] bg-secondary-200 hidden md:block"></div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-3 p-1.5 rounded-xl">
                                <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm">
                                    {user?.name?.charAt(0) || <FiUser />}
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-bold text-secondary-900 leading-none">{user?.name || "Teacher"}</p>
                                    <p className="text-xs text-secondary-500 mt-1">{user?.email || "teacher@school.com"}</p>
                                </div>
                            </div>

                            {/* Logout - Admin Style (Direct Icon) */}
                            <div className="border-l border-secondary-200 pl-4 ml-2">
                                <LogoutButton showText={true} />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 lg:p-8 relative scroll-smooth">
                    <div className="max-w-7xl mx-auto w-full">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {!isSidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex">
                    <div className="fixed inset-0 bg-secondary-900/20 backdrop-blur-sm" onClick={() => setSidebarOpen(true)}></div>
                    <TeacherSidebar className="w-72 h-full shadow-2xl relative z-50" />
                </div>
            )}
        </div>
    );
};

export default TeacherLayout;
