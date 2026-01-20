import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FiUser, FiLock, FiBell, FiShield, FiSave, FiLogOut } from 'react-icons/fi';
import teacherService from '../../../services/teacher.service';
import useAuth from '../../../shared/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const TeacherSettings = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Form States
    const [profile, setProfile] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '', // Assuming phone exists in user or we fetch it
        bio: 'Senior Mathematics Teacher'
    });

    const [security, setSecurity] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        smsAlerts: false,
        studentSubmissions: true
    });

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await teacherService.updateSettings(profile);
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900">Account Settings ⚙️</h1>

            {/* Profile Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        <FiUser className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Profile Information</h2>
                        <p className="text-sm text-gray-500">Update your personal details</p>
                    </div>
                </div>

                <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={profile.email}
                            disabled
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="+91 98765 43210"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio / Specialization</label>
                        <textarea
                            value={profile.bio}
                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        ></textarea>
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                        >
                            <FiSave /> {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg">
                        <FiLock className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Security</h2>
                        <p className="text-sm text-gray-500">Manage password and login sessions</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <button className="text-blue-600 text-sm font-bold hover:underline">Change Password</button>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-bold text-gray-800">Two-Factor Authentication</p>
                            <p className="text-xs text-gray-500">Add an extra layer of security</p>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                            <label htmlFor="toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 rounded-2xl border border-red-100 p-6 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-red-800 flex items-center gap-2">
                        <FiLogOut /> Session Control
                    </h2>
                    <p className="text-sm text-red-600">Logout from all devices immediately</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-white text-red-600 border border-red-200 rounded-lg font-bold hover:bg-red-100 transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default TeacherSettings;
