import React from 'react';

const StudentProfile = () => (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-6 mb-8">
                <img src="https://ui-avatars.com/api/?name=Rohan+Das&background=0D8ABC&color=fff&size=128" alt="Profile" className="w-24 h-24 rounded-full border-4 border-blue-50" />
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Rohan Das</h2>
                    <p className="text-gray-500">Class 10 • Batch A</p>
                    <button className="text-sm text-blue-600 font-medium hover:underline mt-1">Change Profile Photo</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" value="Rohan Das" readOnly className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-600" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" value="rohan.das@student.tuition.com" readOnly className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-600" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="text" value="+91 98765 43210" className="w-full bg-white border border-gray-200 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input type="text" value="123, Green Park, New Delhi" className="w-full bg-white border border-gray-200 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 flex justify-end gap-3">
                <button className="px-6 py-2 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50">Cancel</button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">Save Changes</button>
            </div>
        </div>
    </div>
);

export default StudentProfile;
