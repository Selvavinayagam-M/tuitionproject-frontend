import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from '../../../../shared/components/Layout/Topbar';
import Breadcrumbs from './Breadcrumbs';

const AdminLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100">
            {/* Desktop Sidebar: Fixed width, hidden on mobile */}
            <div className="hidden lg:block fixed inset-y-0 left-0 z-40 transition-all duration-300">
                <Sidebar isOpen={isSidebarOpen} />
            </div>

            {/* Mobile Sidebar Overlay: Hidden on desktop */}
            {!isSidebarOpen && (
                <div className="relative z-50 lg:hidden">
                    <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm" onClick={() => setSidebarOpen(true)}></div>
                    <div className="fixed inset-y-0 left-0 w-64 shadow-2xl">
                        <Sidebar isOpen={true} isMobile={true} />
                    </div>
                </div>
            )}

            {/* Main Content Wrapper */}
            <div className={`flex flex-col flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} w-full`}>

                {/* Topbar */}
                <Topbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-50 dark:bg-gray-900">
                    <div className="hidden lg:block">
                        <Breadcrumbs />
                    </div>
                    <div className="mt-2 lg:mt-4">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
