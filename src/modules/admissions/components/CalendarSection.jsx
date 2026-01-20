
import React from 'react';
import { FaCalendarAlt, FaExclamationCircle } from 'react-icons/fa';

const CalendarSection = ({ data }) => {
    if (!data) return null;

    const { title, description, note, events } = data;

    const getTypeStyles = (type) => {
        switch (type) {
            case 'deadline': return 'bg-red-100 text-red-800 border-red-200';
            case 'important': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'start': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-blue-50 text-blue-800 border-blue-200';
        }
    };

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/3">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <FaCalendarAlt className="mr-2 text-blue-600" /> {title}
                        </h3>
                        <p className="text-gray-600 mb-6">{description}</p>
                        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                            <div className="flex items-start">
                                <FaExclamationCircle className="text-blue-600 mt-1 mr-2" />
                                <p className="text-sm text-blue-900">
                                    {note}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-2/3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {events.map((evt, i) => (
                                <div key={i} className={`p-6 rounded-xl border ${getTypeStyles(evt.type)} hover:shadow-md transition`}>
                                    <span className="text-xs font-bold uppercase tracking-wider opacity-75">{evt.type}</span>
                                    <h4 className="text-xl font-bold mt-1 mb-2">{evt.date}</h4>
                                    <p className="font-medium">{evt.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CalendarSection;
