import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBars, FaTimes, FaPhoneAlt, FaCaretDown, FaUserCircle } from 'react-icons/fa';
import LogoutButton from './LogoutButton';

import { motion } from 'framer-motion';
import { navSlideDown } from '../animations/motionVariants';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [portalOpen, setPortalOpen] = useState(false);
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Courses', path: '/courses' },
        { name: 'Admissions', path: '/admissions' },
        { name: 'Results', path: '/results' },
        { name: 'Faculty', path: '/faculty' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <>
            {/* Announcement Ticker */}
            <div className="bg-orange-600 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium tracking-wide">
                📢 Admissions Open for Academic Year 2026-27! Early Bird Scholarships available till Jan 31st.
            </div>

            <motion.nav
                variants={navSlideDown}
                initial="hidden"
                animate="visible"
                className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'top-0 bg-white shadow-lg' : 'top-9 bg-white/95 backdrop-blur-sm'}`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                                <span className="bg-blue-900 text-white w-10 h-10 flex items-center justify-center rounded-lg text-xl">E</span>
                                <span>Excellence<span className="text-orange-500">Tuition</span></span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex space-x-6 items-center">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-blue-900 font-bold border-b-2 border-orange-500 py-1'
                                            : 'text-gray-600 hover:text-blue-900 font-medium transition duration-300 py-1'
                                    }
                                >
                                    {link.name === 'Courses' ? 'Classes' : link.name}
                                </NavLink>
                            ))}

                            {/* User Profile / Login */}
                            {isAuthenticated ? (
                                <div
                                    className="relative group"
                                    onMouseEnter={() => setPortalOpen(true)}
                                    onMouseLeave={() => setPortalOpen(false)}
                                >
                                    <button className="flex items-center text-gray-700 font-medium hover:text-blue-900 px-3 py-2">
                                        <div className="flex items-center gap-2">
                                            <FaUserCircle className="w-5 h-5 text-blue-900" />
                                            <span>Hi, {user?.name?.split(' ')[0] || 'User'}</span>
                                        </div>
                                    </button>
                                    {portalOpen && (
                                        <div className="absolute right-0 mt-0 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden py-2 animate-fadeIn z-50">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm font-bold text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">{user?.name}</p>
                                                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                                            </div>
                                            <Link to={`/${user?.role === 'student' ? 'student-dashboard' : user?.role + '/dashboard'}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900">
                                                Dashboard
                                            </Link>
                                            <div className="border-t border-gray-100 mt-1 pt-1">
                                                <LogoutButton className="w-full text-left px-4 py-2 text-sm hover:bg-red-50" showIcon={true} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="bg-orange-500 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-orange-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Login
                                </Link>
                            )}



                            <Link
                                to="/admissions"
                                className="bg-orange-500 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-orange-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Enroll Now
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden flex items-center">
                            <button
                                onClick={toggleMenu}
                                className="text-gray-600 hover:text-blue-900 focus:outline-none p-2"
                            >
                                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden bg-white border-t absolute w-full transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={toggleMenu}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'block px-4 py-3 text-blue-900 font-bold bg-blue-50 rounded-lg'
                                        : 'block px-4 py-3 text-gray-600 hover:text-blue-900 hover:bg-gray-50 rounded-lg'
                                }
                            >
                                {link.name === 'Courses' ? 'Classes' : link.name}
                            </NavLink>
                        ))}
                        <div className="border-t border-gray-100 pt-4 mt-4">
                            <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">My Account</p>
                            <Link to="/login" className="block w-full text-center bg-orange-500 text-white px-4 py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-md mx-4 mb-2" style={{ width: 'calc(100% - 2rem)' }} onClick={toggleMenu}>Login</Link>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-6">

                            <Link
                                to="/admissions"
                                onClick={toggleMenu}
                                className="block w-full text-center bg-orange-500 text-white px-4 py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-md"
                            >
                                Enroll Now
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.nav>
        </>
    );
};

export default Navbar;
