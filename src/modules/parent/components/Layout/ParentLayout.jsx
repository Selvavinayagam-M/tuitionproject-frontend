import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ParentSidebar from './ParentSidebar';
import { FiMenu, FiBell, FiUser } from 'react-icons/fi';
import LogoutButton from '../../../../shared/components/LogoutButton';
import { useSelector } from 'react-redux';

const ParentLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { user } = useSelector(state => state.auth);

    return (
        <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block h-full shadow-lg z-10">
                <ParentSidebar className="h-full" />
            </div>

            <div className="flex-1 flex flex-col min-w-0">
                {/* Custom Parent Portal Header */}
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 lg:px-8 z-20 sticky top-0 shadow-sm">
                    <div className="flex items-center gap-4 lg:hidden">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <FiMenu size={24} />
                        </button>
                        <span className="font-display font-bold text-lg text-blue-900">Parent Portal</span>
                    </div>

                    <div className="hidden lg:flex flex-col">
                        <h1 className="text-lg font-bold text-gray-900 leading-tight">Parent Portal</h1>
                        <p className="text-xs text-gray-500">Monitoring & Updates</p>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Notifications */}
                        <button className="relative p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <FiBell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <div className="h-8 w-[1px] bg-gray-200 hidden md:block"></div>

                        {/* Profile & Logout */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm border border-blue-100">
                                    {user?.name?.charAt(0) || <FiUser />}
                                </div>
                                <div className="hidden md:block text-right">
                                    <p className="text-sm font-bold text-gray-900 leading-none">{user?.name || "Parent Name"}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Guardian</p>
                                </div>
                            </div>

                            <div className="border-l border-gray-200 pl-4 ml-2">
                                <LogoutButton showText={true} />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 lg:p-8 relative">
                    <div className="max-w-6xl mx-auto w-full">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {!isSidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex">
                    <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm" onClick={() => setSidebarOpen(true)}></div>
                    <ParentSidebar className="w-72 h-full shadow-2xl relative z-50 bg-white" />
                </div>
            )}
        </div>
    );
};

export default ParentLayout;
