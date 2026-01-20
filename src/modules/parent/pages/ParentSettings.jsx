import React from 'react';

const ParentSettings = () => (
    <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Email Notifications</label>
                <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-orange-600 rounded" />
                    <span className="text-sm text-gray-600">Receive weekly performance reports</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-orange-600 rounded" />
                    <span className="text-sm text-gray-600">Receive fee due reminders</span>
                </div>
            </div>
            <button className="text-red-600 font-medium text-sm border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50">Log out of all devices</button>
        </div>
    </div>
);

export default ParentSettings;
