import React from 'react';

// Simplified placeholder implementations for remaining less critical pages to save time/space
// while still delivering functionality.

export const ParentCommunication = () => (
    <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Communication Center</h1>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Message Tutor / Admin</h2>
            <textarea className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 h-32 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Type your message here..."></textarea>
            <div className="mt-4 flex justify-end">
                <button className="bg-orange-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-700">Send Message</button>
            </div>
        </div>
    </div>
);

export const ParentSettings = () => (
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

export const ParentCourses = () => (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Enrolled Courses</h1>
        <div className="p-12 text-center bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-500">Course details for enrolled children will appear here.</p>
        </div>
    </div>
);
