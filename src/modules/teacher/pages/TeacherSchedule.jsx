import React from 'react';

const TeacherSchedule = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Weekly Timetable</h1>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm">Download PDF</button>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
            <p className="text-gray-500">Weekly calendar view will be implemented here.</p>
        </div>
    </div>
);

export default TeacherSchedule;
