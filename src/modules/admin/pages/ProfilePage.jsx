import React from 'react';
import useAdminAuth from '../hooks/useAdminAuth';

const ProfilePage = () => {
    const { user } = useAdminAuth();

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Profile</h1>
            <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600">
                    {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user?.name || 'Loading...'}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{user?.role}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div className="p-4 border rounded dark:border-gray-700">
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="font-medium dark:text-white">{user?.email}</p>
                </div>
                {/* Add more fields as needed */}
            </div>
        </div>
    );
};

export default ProfilePage;
