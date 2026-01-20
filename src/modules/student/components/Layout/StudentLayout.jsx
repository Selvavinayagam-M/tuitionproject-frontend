import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiMenu, FiHome, FiBook, FiCalendar, FiUser, FiLogOut } from 'react-icons/fi';
import StudentSidebar from './StudentSidebar';
import LogoutButton from '../../../../shared/components/LogoutButton';
import { motion, AnimatePresence } from 'framer-motion';
import authService from '../../../../services/auth.service';
import { logout } from '../../../../store/features/auth/authSlice';

const StudentLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user } = useSelector(state => state.auth);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="flex h-screen bg-blue-50/50 font-sans overflow-hidden">
            {/* Friendly Student Sidebar */}
            <div className="hidden lg:block h-full shadow-2xl shadow-blue-900/5 z-20">
                <StudentSidebar className="h-full border-r-0" />
            </div>

            <div className="flex-1 flex flex-col min-w-0">
                {/* Custom Student Header */}
                <header className="bg-white/80 backdrop-blur-md h-20 flex items-center justify-between px-6 lg:px-10 z-10 sticky top-0 shadow-sm">
                    <div className="flex items-center gap-4 lg:hidden">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-blue-900 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                            <FiMenu size={24} />
                        </button>
                        <span className="font-display font-bold text-xl text-blue-900">Student Portal</span>
                    </div>

                    <div className="hidden lg:block">
                        <h1 className="font-display font-bold text-2xl text-blue-900">
                            Hello, {user?.name?.split(' ')[0] || 'Student'}! 👋
                        </h1>
                        <p className="text-sm text-blue-500 font-medium">Ready to learn something new today?</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-3 bg-white border border-blue-100 pl-2 pr-4 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
                            >
                                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-inner">
                                    {user?.name?.charAt(0) || <FiUser />}
                                </div>
                                <span className="hidden md:block text-sm font-semibold text-gray-700">Account</span>
                            </button>

                            <AnimatePresence>
                                {showUserMenu && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)}></div>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                            className="absolute right-0 top-full mt-3 w-56 bg-white rounded-2xl shadow-xl border border-blue-100 z-20 overflow-hidden transform origin-top-right p-2"
                                        >
                                            <div className="px-4 py-3 bg-blue-50/50 rounded-xl mb-2">
                                                <p className="text-sm font-bold text-blue-900">{user?.name || 'Student Name'}</p>
                                                <p className="text-xs text-blue-500 truncate">{user?.email || 'student@example.com'}</p>
                                            </div>
                                            <Link to="/student/profile" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                                <FiUser className="text-blue-500" /> My Profile
                                            </Link>
                                            <div className="h-[1px] bg-gray-100 my-1"></div>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm("Are you sure you want to log out?")) {
                                                        authService.logout();
                                                        dispatch(logout()); // Redux action
                                                        localStorage.removeItem('user'); // Sync safety
                                                        navigate('/login');
                                                    }
                                                }}
                                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                                            >
                                                <FiLogOut /> Sign Out
                                            </button>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="h-8 w-[1px] bg-blue-100 hidden md:block"></div>

                        <div className="border-l border-blue-100 pl-3 ml-2 flex items-center">
                            <button
                                onClick={() => {
                                    if (window.confirm("Are you sure you want to log out?")) {
                                        authService.logout();
                                        dispatch(logout());
                                        localStorage.removeItem('user');
                                        navigate('/login');
                                    }
                                }}
                                title="Sign Out"
                                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-transparent hover:border-red-200 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 group"
                            >
                                <FiLogOut className="w-5 h-5 transition-transform group-hover:scale-110" />
                                <span className="hidden md:inline font-medium">Logout</span>
                            </button>
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
                    <div className="fixed inset-0 bg-blue-900/20 backdrop-blur-sm" onClick={() => setSidebarOpen(true)}></div>
                    <StudentSidebar className="w-72 h-full shadow-2xl relative z-50 bg-white" />
                </div>
            )}
        </div>
    );
};

export default StudentLayout;
