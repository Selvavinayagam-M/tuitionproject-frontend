import React from 'react';
import { announcements } from '../data/teacher.data';

const TeacherCommunication = () => (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
        <div className="grid gap-4">
            {announcements.map(ann => (
                <div key={ann.id} className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-gray-800">{ann.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{ann.message}</p>
                        <p className="text-xs text-gray-400 mt-2">To: {ann.audience} • {ann.date}</p>
                    </div>
                </div>
            ))}
        </div>

    </div>
);

export default TeacherCommunication;
