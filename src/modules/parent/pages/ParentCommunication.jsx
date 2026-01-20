import React from 'react';

const ParentCommunication = () => (
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

export default ParentCommunication;
